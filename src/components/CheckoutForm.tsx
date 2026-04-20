import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { DeliveryZone } from '../types';
import { db } from '../services/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { INITIAL_DELIVERY_ZONES } from '../constants';
import { ArrowLeft, Send } from 'lucide-react';
import { cn } from '../lib/utils';

interface CheckoutFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onBack, onSuccess }) => {
  const { items, subtotal, clearCart } = useCart();
  const [zones, setZones] = useState<DeliveryZone[]>([]);
  const [selectedZone, setSelectedZone] = useState<DeliveryZone | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Austin, Nova Iguaçu'
  });

  useEffect(() => {
    const q = query(collection(db, "deliveryZones"), orderBy('name'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let zonesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as DeliveryZone[];

      if (zonesData.length === 0) {
        zonesData = INITIAL_DELIVERY_ZONES.map((z, index) => ({
          id: `zone-${index}`,
          ...z
        })) as DeliveryZone[];
      }

      setZones(zonesData);
    }, (error) => {
      console.error("Erro ao sincronizar bairros:", error);
      const fallback = INITIAL_DELIVERY_ZONES.map((z, index) => ({
        id: `fzone-${index}`,
        ...z
      })) as DeliveryZone[];
      setZones(fallback);
    });

    return () => unsubscribe();
  }, []);

  const total = subtotal + (selectedZone?.price || 0);

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedZone) {
      alert('Por favor, selecione um bairro para entrega.');
      return;
    }

    const message = `*🍱 NOVO PEDIDO - SUSHI AUSTIN*

*Dados do Cliente:*
👤 Nome: ${formData.name}
📞 Tel: ${formData.phone}
📍 Endereço: ${formData.address}
🏠 Bairro: ${selectedZone.name}
🏙️ Cidade: ${formData.city}

*Resumo do Pedido:*
${items.map(item => `• ${item.quantity}x ${item.product.name} (R$ ${(item.product.price * item.quantity).toFixed(2)})`).join('\n')}

---
💰 Subtotal: R$ ${subtotal.toFixed(2)}
🚚 Taxa de Entrega: R$ ${selectedZone.price.toFixed(2)}
⭐ *Total: R$ ${total.toFixed(2)}*
---

_Enviado pelo site Sushi Austin_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5521992160657?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
    onSuccess();
  };

  return (
    <div className="p-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 text-xs font-bold uppercase tracking-widest transition-colors"
      >
        <ArrowLeft size={14} />
        Voltar à cesta
      </button>

      <form onSubmit={handleSendWhatsApp} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37] mb-2">Dados Pessoais</label>
            <div className="space-y-2">
              <input 
                required
                type="text"
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-3 text-sm text-white focus:border-red-500 outline-none transition-all"
                placeholder="Nome Completo"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
              <input 
                required
                type="tel"
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-3 text-sm text-white focus:border-red-500 outline-none transition-all"
                placeholder="Telefone (WhatsApp)"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37] mb-2">Entrega</label>
            <div className="space-y-2">
              <input 
                required
                type="text"
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-3 text-sm text-white focus:border-red-500 outline-none transition-all"
                placeholder="Rua, Número e Complemento"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
              />
              <div className="relative">
                <select 
                  required
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-3 text-sm text-white focus:border-red-500 outline-none transition-all appearance-none"
                  value={selectedZone?.id || ''}
                  onChange={e => setSelectedZone(zones.find(z => z.id === e.target.value) || null)}
                >
                  <option value="" className="bg-[#111]">Selecione o Bairro...</option>
                  {zones.map(zone => (
                    <option key={zone.id} value={zone.id} className="bg-[#111]">
                      {zone.name} - R$ {zone.price.toFixed(2)}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  ↓
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 space-y-2 border-t border-[#2a2a2a]">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Subtotal</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Taxa de Entrega</span>
            <span>{selectedZone ? `R$ ${selectedZone.price.toFixed(2)}` : '--'}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-white pt-2">
            <span className="font-serif italic">Total Final</span>
            <span className="text-[#d4af37]">R$ {total.toFixed(2)}</span>
          </div>
        </div>

        <button 
          type="submit"
          disabled={!selectedZone}
          className={cn(
            "btn-whatsapp w-full py-4 text-sm uppercase tracking-widest mt-4 shadow-xl",
            !selectedZone && "opacity-50 cursor-not-allowed grayscale"
          )}
        >
          <Send size={18} />
          Finalizar via WhatsApp
        </button>
      </form>
    </div>
  );
};
