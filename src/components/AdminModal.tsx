import React, { useState, useEffect } from 'react';
import { X, Lock, Settings, Package, Truck, LogOut, Plus, Trash2, Edit, LogIn, Save, Image as ImageIcon, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { loginWithEmail, logout, subscribeToAuthChanges } from '../services/auth';
import { db } from '../services/firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { User as FirebaseUser } from 'firebase/auth';
import { Product, DeliveryZone } from '../types';
import { cn } from '../lib/utils';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'products' | 'zones' | 'settings'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [zones, setZones] = useState<DeliveryZone[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [formData, setFormData] = useState<Partial<Product & DeliveryZone>>({
    name: '',
    description: '',
    price: 0,
    image: '',
    available: true,
    category: 'Todos',
    isComplemento: false
  });

  const [emailForm, setEmailForm] = useState({ email: '', password: '' });

  useEffect(() => {
    const unsubscribeAuth = subscribeToAuthChanges((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Real-time subscriptions for products and zones
    const qProducts = query(collection(db, 'products'), orderBy('name'));
    const unsubscribeProducts = onSnapshot(qProducts, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[]);
    });

    const qZones = query(collection(db, 'deliveryZones'), orderBy('name'));
    const unsubscribeZones = onSnapshot(qZones, (snapshot) => {
      setZones(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as DeliveryZone[]);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeProducts();
      unsubscribeZones();
    };
  }, []);

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const user = await loginWithEmail(emailForm.email, emailForm.password);
      const email = user?.email?.toLowerCase();
      if (email === 'jonassantosclaro@gmail.com' || email === 'adminsushi@x.com') {
        const { initializeDatabase } = await import('../services/init');
        // Sincroniza e limpa repetidos automaticamente ao logar
        await initializeDatabase(true); 
      }
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        alert('Credenciais inválidas. Verifique seu e-mail e senha.');
      } else {
        alert('Erro ao fazer login: ' + error.message);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const openForm = (item: any = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        image: '',
        available: true
      });
    }
    setIsFormOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const collectionName = tab === 'products' ? 'products' : 'deliveryZones';
      
      if (editingItem) {
        const docRef = doc(db, collectionName, editingItem.id);
        await updateDoc(docRef, { ...formData });
      } else {
        await addDoc(collection(db, collectionName), { 
          ...formData,
          createdAt: new Date().toISOString()
        });
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar dados.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este item?')) return;
    try {
      const collectionName = tab === 'products' ? 'products' : 'deliveryZones';
      await deleteDoc(doc(db, collectionName, id));
    } catch (error) {
      console.error("Erro ao excluir:", error);
      alert("Erro ao excluir.");
    }
  };

  const email = currentUser?.email?.toLowerCase();
  const isAdminAuthenticated = email === 'jonassantosclaro@gmail.com' || email === 'adminsushi@x.com';

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-12 bg-surface border border-white/10 z-[201] shadow-2xl rounded-3xl flex flex-col overflow-hidden"
          >
            {loading ? (
              <div className="flex-grow flex items-center justify-center p-6 bg-japanese-pattern">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : !isAdminAuthenticated ? (
              <div className="flex-grow flex items-center justify-center p-6 bg-japanese-pattern">
                <div className="w-full max-w-sm glass-card p-8 rounded-2xl border border-primary/20 text-center">
                  <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                      <Lock size={32} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold uppercase tracking-widest text-white">Acesso Restrito</h2>
                    <p className="text-sm text-gray-500">Apenas administradores autorizados</p>
                  </div>
                  
                  {currentUser ? (
                    <div className="mb-6 px-4 py-3 bg-red-900/20 border border-red-500/30 rounded-xl text-red-500 text-xs italic">
                      Sua conta ({currentUser.email}) não possui permissões administrativas.
                    </div>
                  ) : null}

                  <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div className="text-left space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">E-mail</label>
                        <input 
                          required
                          type="email" 
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-primary transition-all"
                          placeholder="seu@email.com"
                          value={emailForm.email}
                          onChange={e => setEmailForm({ ...emailForm, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Senha</label>
                        <input 
                          required
                          type="password" 
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-primary transition-all"
                          placeholder="••••••••"
                          value={emailForm.password}
                          onChange={e => setEmailForm({ ...emailForm, password: e.target.value })}
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isLoggingIn}
                      className="btn-primary w-full py-4 mt-2 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoggingIn ? (
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        <LogIn size={20} />
                      )}
                      {isLoggingIn ? 'Entrando...' : 'Entrar no Painel'}
                    </button>
                  </form>
                  <button onClick={onClose} className="w-full mt-6 text-sm text-gray-500 hover:text-white transition-colors">Voltar para o site</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row h-full">
                {/* Sidebar */}
                <div className="w-full md:w-64 bg-black/40 border-b md:border-b-0 md:border-r border-white/5 p-6 flex flex-col">
                  <div className="flex items-center gap-3 mb-10">
                    <img src={currentUser?.photoURL || undefined} alt="User" className="w-10 h-10 rounded-full border border-primary" />
                    <div className="min-w-0">
                      <h3 className="font-bold text-white leading-none truncate">{currentUser?.displayName}</h3>
                      <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-tighter">Administrador</p>
                    </div>
                  </div>
                  
                  <nav className="space-y-2 flex-grow">
                    <AdminNavLink active={tab === 'products'} onClick={() => setTab('products')} icon={<Package size={18} />} label="Produtos" />
                    <AdminNavLink active={tab === 'zones'} onClick={() => setTab('zones')} icon={<Truck size={18} />} label="Bairros" />
                    <AdminNavLink active={tab === 'settings'} onClick={() => setTab('settings')} icon={<Settings size={18} />} label="Configuração" />
                  </nav>
                  
                  <button 
                    onClick={() => logout()}
                    className="flex items-center gap-2 text-red-500 hover:text-red-400 mt-auto pt-6 text-sm font-bold uppercase transition-colors"
                  >
                    <LogOut size={18} />
                    Sair
                  </button>
                </div>
                
                {/* Content */}
                <div className="flex-grow overflow-y-auto p-6 md:p-10 relative">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <h2 className="text-3xl font-bold uppercase tracking-tight">
                      {tab === 'products' && 'Gerenciar Produtos'}
                      {tab === 'zones' && 'Taxas de Entrega'}
                      {tab === 'settings' && 'Dados da Loja'}
                    </h2>
                    <div className="flex items-center gap-4">
                      {tab !== 'settings' && (
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                          <input 
                            type="text" 
                            placeholder="Buscar..." 
                            className="bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:border-primary outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      )}
                      <button 
                        onClick={() => openForm()}
                        className="btn-primary py-2 px-6 text-sm"
                      >
                        <Plus size={16} />
                        Novo {tab === 'products' ? 'Produto' : 'Bairro'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
                    {tab === 'products' && (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead className="bg-white/5 text-[10px] uppercase font-bold tracking-widest text-gray-400">
                            <tr>
                              <th className="px-6 py-4">Produto</th>
                              <th className="px-6 py-4">Preço</th>
                              <th className="px-6 py-4">Status</th>
                              <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {filteredProducts.map(product => (
                              <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-black/40 rounded-lg overflow-hidden border border-white/5">
                                      {product.image ? (
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-700">
                                          <ImageIcon size={20} />
                                        </div>
                                      )}
                                    </div>
                                    <div className="min-w-0">
                                      <p className="font-bold text-white truncate">{product.name}</p>
                                      <p className="text-[10px] text-gray-500 truncate">{product.description}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-secondary font-bold">R$ {product.price?.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                  <span className={cn(
                                    "text-[10px] uppercase font-bold px-2 py-1 rounded-full",
                                    product.available !== false ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                                  )}>
                                    {product.available !== false ? 'Disponível' : 'Esgotado'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                  <button 
                                    onClick={() => openForm(product)}
                                    className="p-2 text-gray-500 hover:text-white transition-colors"
                                  ><Edit size={16} /></button>
                                  <button 
                                    onClick={() => handleDelete(product.id)}
                                    className="p-2 text-red-500 hover:text-red-400 transition-colors"
                                  ><Trash2 size={16} /></button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    
                    {tab === 'zones' && (
                       <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead className="bg-white/5 text-[10px] uppercase font-bold tracking-widest text-gray-400">
                            <tr>
                              <th className="px-6 py-4">Bairro</th>
                              <th className="px-6 py-4">Taxa</th>
                              <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {zones.map(zone => (
                              <tr key={zone.id} className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4 font-bold">{zone.name}</td>
                                <td className="px-6 py-4 text-secondary font-bold">R$ {zone.price?.toFixed(2)}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                  <button 
                                    onClick={() => openForm(zone)}
                                    className="p-2 text-gray-500 hover:text-white transition-colors"
                                  ><Edit size={16} /></button>
                                  <button 
                                    onClick={() => handleDelete(zone.id)}
                                    className="p-2 text-red-500 hover:text-red-400 transition-colors"
                                  ><Trash2 size={16} /></button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {tab === 'settings' && (
                      <div className="p-8 space-y-8 max-w-xl">
                        <div className="space-y-4">
                           <div>
                            <label className="block text-xs font-bold uppercase mb-2 text-gray-500">Nome da Loja</label>
                            <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2" defaultValue="Sushi Austin" />
                           </div>
                           <div>
                            <label className="block text-xs font-bold uppercase mb-2 text-gray-500">WhatsApp</label>
                            <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2" defaultValue="5521992160657" />
                           </div>
                        </div>
                        
                        <div className="pt-8 border-t border-white/5">
                           <h4 className="text-sm font-bold uppercase text-white mb-4">Ferramentas de Sistema</h4>
                           <button 
                            onClick={async () => {
                              try {
                                const { initializeDatabase } = await import('../services/init');
                                await initializeDatabase(true);
                                alert('Sincronização concluída com sucesso!');
                              } catch (e) {
                                alert('Erro ao sincronizar.');
                              }
                            }}
                            className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl border border-white/10 transition-all text-xs font-bold uppercase tracking-widest"
                           >
                             Sincronizar Banco de Dados
                           </button>
                           <p className="text-[10px] text-gray-500 mt-2 italic">Força o carregamento dos produtos padrão.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Edit/Add Modal Overlay */}
                <AnimatePresence>
                  {isFormOpen && (
                    <>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm z-[210] flex items-center justify-center p-6"
                      >
                        <motion.div 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-3xl p-8"
                        >
                          <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold uppercase tracking-widest text-[#d4af37]">
                              {editingItem ? 'Editar' : 'Novo'} {tab === 'products' ? 'Produto' : 'Bairro'}
                            </h3>
                            <button onClick={() => setIsFormOpen(false)} className="text-gray-500 hover:text-white"><X /></button>
                          </div>

                          <form onSubmit={handleSave} className="space-y-4">
                            <div className="space-y-4">
                              <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Nome</label>
                                <input 
                                  required
                                  type="text" 
                                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm"
                                  value={formData.name}
                                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                              </div>

                              {tab === 'products' && (
                                <>
                                  <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Categoria</label>
                                    <select 
                                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm appearance-none outline-none focus:border-primary transition-all text-white"
                                      value={formData.category}
                                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                      {['Todos', 'Combinados', 'Hots', 'Temakis', 'Yakisobas', 'Uramakis', 'Harumakis', 'Joys', 'Sashimis', 'Pokes'].map(cat => (
                                        <option key={cat} value={cat} className="bg-black text-white">{cat}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Descrição</label>
                                    <textarea 
                                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm h-24 no-scrollbar"
                                      value={formData.description}
                                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">URL da Imagem</label>
                                    <input 
                                      type="text" 
                                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm"
                                      value={formData.image}
                                      onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    />
                                  </div>
                                </>
                              )}

                              <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Preço (R$)</label>
                                <input 
                                  required
                                  type="number" 
                                  step="0.01"
                                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-secondary"
                                  value={formData.price}
                                  onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                />
                              </div>

                              {tab === 'products' && (
                                <div className="space-y-3 pt-2">
                                  <div className="flex items-center gap-3">
                                    <input 
                                      type="checkbox" 
                                      id="available"
                                      checked={formData.available !== false}
                                      onChange={e => setFormData({ ...formData, available: e.target.checked })}
                                      className="w-5 h-5 rounded bg-black/40 border-white/10 text-primary accent-primary"
                                    />
                                    <label htmlFor="available" className="text-sm font-bold uppercase tracking-widest text-gray-400 cursor-pointer">Item em estoque</label>
                                  </div>
                                  
                                  <div className="flex items-center gap-3">
                                    <input 
                                      type="checkbox" 
                                      id="isComplemento"
                                      checked={formData.isComplemento === true}
                                      onChange={e => setFormData({ ...formData, isComplemento: e.target.checked })}
                                      className="w-5 h-5 rounded bg-black/40 border-white/10 text-secondary accent-secondary"
                                    />
                                    <label htmlFor="isComplemento" className="text-sm font-bold uppercase tracking-widest text-gray-400 cursor-pointer">Vender como Complemento</label>
                                  </div>
                                </div>
                              )}
                            </div>

                            <button type="submit" className="btn-primary w-full py-4 mt-6">
                              <Save size={18} />
                              Salvar Alterações
                            </button>
                          </form>
                        </motion.div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white md:hidden"
            >
              <X size={24} />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const AdminNavLink: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all",
      active ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-gray-500 hover:text-white hover:bg-white/5"
    )}
  >
    {icon}
    {label}
  </button>
);
