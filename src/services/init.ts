import { collection, getDocs, addDoc, doc, setDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db, auth } from './firebase';
import { INITIAL_DELIVERY_ZONES, INITIAL_PRODUCTS } from '../constants';

export async function initializeDatabase(force = false) {
  try {
    // Sincronização de Produtos
    console.log('Verificando integridade do cardápio...');
    const productsSnap = await getDocs(collection(db, 'products'));
    const existingProducts = productsSnap.docs.map(d => ({ id: d.id, ...d.data() as any }));

    // Sincroniza cada produto do arquivo de constantes individualmente
    const currentUser = auth.currentUser;
    const email = currentUser?.email?.toLowerCase();
    const isAdmin = email === 'jonassantosclaro@gmail.com' || email === 'adminsushi@x.com';

    if (!isAdmin) {
      console.log('Acesso negado para sincronização. Faça login com um e-mail de administrador.');
      return;
    }

    console.log('Iniciando sincronização de produtos...');

    for (const product of INITIAL_PRODUCTS) {
      const existing = existingProducts.find(p => p.name === product.name);
      
      if (existing) {
        // Atualiza se houver mudanças significativas (preço ou descrição)
        if (existing.price !== product.price || existing.description !== product.description || existing.image !== product.image) {
          console.log(`Atualizando produto: ${product.name}`);
          await setDoc(doc(db, 'products', existing.id), {
            ...existing,
            ...product,
            updatedAt: new Date().toISOString()
          });
        }
      } else {
        // Adiciona novo se não existir
        console.log(`Adicionando novo item: ${product.name}`);
        await addDoc(collection(db, 'products'), {
          ...product,
          available: true,
          createdAt: new Date().toISOString()
        });
      }
    }

    // REMOVER ITENS QUE NÃO ESTÃO NO INITIAL_PRODUCTS OU QUE SÃO DUPLICADOS (pelo nome normalizado)
    if (force) {
      console.log('Iniciando limpeza de itens obsoletos/repetidos...');
      const processedNames = new Set<string>();
      
      for (const existing of existingProducts) {
        const normalizedName = existing.name.toLowerCase().trim();
        const isStillInConstants = INITIAL_PRODUCTS.some(p => p.name.toLowerCase().trim() === normalizedName);
        
        // Se não está nas constantes OU se já processamos um item com esse nome (é duplicado)
        if (!isStillInConstants || processedNames.has(normalizedName)) {
          console.log(`Removendo item obsoleto/repetido: ${existing.name}`);
          await deleteDoc(doc(db, 'products', existing.id));
        } else {
          processedNames.add(normalizedName);
        }
      }
    }

    // Sincronização de Bairros de Entrega
    console.log('Sincronizando bairros de entrega...');
    const zonesSnap = await getDocs(collection(db, 'deliveryZones'));
    
    // Se for forçado, deletamos tudo antes para garantir nomes limpos
    if (force) {
      for (const d of zonesSnap.docs) {
        await deleteDoc(doc(db, 'deliveryZones', d.id));
      }
    }

    const existingZones = force ? [] : zonesSnap.docs.map(d => ({ id: d.id, ...d.data() as any }));

    for (const zone of INITIAL_DELIVERY_ZONES) {
      const existingZone = existingZones.find(z => z.name === zone.name);
      if (!existingZone) {
        await addDoc(collection(db, 'deliveryZones'), zone);
      } else if (existingZone.price !== zone.price) {
        await setDoc(doc(db, 'deliveryZones', existingZone.id), zone);
      }
    }
    
    console.log('Sincronização completa com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar banco de dados:', error);
  }
}
