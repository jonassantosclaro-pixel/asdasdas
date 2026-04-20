import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2, ChevronRight, ShoppingBag, PlusCircle } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { motion, AnimatePresence } from 'motion/react';
import { CheckoutForm } from './CheckoutForm';
import { db } from '../services/firebase';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { Product } from '../types';

interface CartSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSidePanel: React.FC<CartSidePanelProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, subtotal, addToCart } = useCart();
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [complementos, setComplementos] = useState<Product[]>([]);

  useEffect(() => {
    // Real-time listener for add-ons
    const q = query(
      collection(db, "products"), 
      where("isComplemento", "==", true),
      orderBy("price", "asc")
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setComplementos(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              onClose();
              setStep('cart');
            }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-surface z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-[#2a2a2a] flex items-center justify-between bg-[#111]">
              <h2 className="text-lg font-serif italic flex items-center gap-2">
                <span className="text-red-500">●</span>
                {step === 'cart' ? 'Meu Pedido' : 'Finalizar Pedido'}
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white">
                <X size={20} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto custom-scrollbar bg-[#111]">
              {step === 'cart' ? (
                <>
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-500">
                      <ShoppingBag size={48} className="mb-4 opacity-10" />
                      <p className="text-sm font-serif italic">Sua cesta está vazia</p>
                      <button 
                        onClick={onClose}
                        className="mt-4 text-primary text-xs font-bold uppercase tracking-widest hover:underline"
                      >
                        Ver cardápio
                      </button>
                    </div>
                  ) : (
                    <div className="p-6 space-y-4">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex items-center justify-between pb-4 border-b border-[#222]">
                          <div className="flex-1 min-w-0 mr-4">
                            <p className="text-sm text-white font-medium line-clamp-1">{item.product.name}</p>
                            <p className="text-[10px] text-gray-500">{item.quantity}x R$ {item.product.price.toFixed(2)}</p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-[#0a0a0a] rounded-lg px-2 py-1 border border-[#2a2a2a]">
                               <button 
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="text-gray-500 hover:text-white"
                               ><Minus size={12} /></button>
                               <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                               <button 
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="text-gray-500 hover:text-white"
                               ><Plus size={12} /></button>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-gray-700 hover:text-red-500 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      ))}

                      {complementos.length > 0 && (
                        <div className="mt-10 pt-6">
                          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37] mb-4">Adicione Complementos</h3>
                          <div className="space-y-3">
                            {complementos.map((comp) => (
                              <div key={comp.id} className="bg-[#1a1a1a] p-3 rounded-xl border border-white/5 flex items-center justify-between group hover:border-[#d4af37]/30 transition-all">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#222] border border-white/5">
                                    <img 
                                      src={comp.image || undefined} 
                                      alt={comp.name} 
                                      className="w-full h-full object-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs text-white font-medium truncate">{comp.name}</p>
                                    <p className="text-[10px] text-red-500 font-bold">R$ {comp.price.toFixed(2)}</p>
                                  </div>
                                </div>
                                <button 
                                  onClick={() => addToCart(comp)}
                                  className="p-2 text-primary hover:bg-primary hover:text-white rounded-lg transition-all"
                                >
                                  <PlusCircle size={20} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <CheckoutForm onBack={() => setStep('cart')} onSuccess={onClose} />
              )}
            </div>

            {items.length > 0 && step === 'cart' && (
              <div className="p-6 border-t border-[#2a2a2a] bg-[#0d0d0d]">
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-[#333]">
                    <span className="font-serif italic">Total</span>
                    <span className="text-[#d4af37]">R$ {subtotal.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setStep('checkout')}
                  className="btn-primary w-full py-4 uppercase tracking-widest text-sm"
                >
                  Continuar
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
