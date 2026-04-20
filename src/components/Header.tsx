import React from 'react';
import { ShoppingCart, User, Menu } from 'lucide-react';
import { APP_LOGO_BASE64 } from '../assets/logo';
import { useCart } from '../hooks/useCart';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onOpenCart: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCart, onOpenAdmin }) => {
  const { items } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-[#111] border-b border-[#2a2a2a] px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-4 cursor-pointer" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-14 h-14 bg-[#1a1a1a] rounded-full overflow-hidden flex items-center justify-center border-2 border-[#d4af37] shadow-lg shadow-[#d4af37]/20">
            <img 
              src="https://i.imgur.com/WJvF9CI.jpeg" 
              alt="Austin Logo" 
              className="w-full h-full object-cover scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h1 className="text-2xl font-serif tracking-tight font-bold text-[#d4af37]">Sushi Austin</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Experiência Oriental Premium</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-6 text-sm font-medium tracking-wide">
            <a href="#menu" className="text-red-500 border-b border-red-500 pb-1 hover:text-red-400 transition-colors">Cardápio</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Promoções</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Sobre Nós</a>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={onOpenCart}
              className="relative bg-[#1a1a1a] p-3 rounded-xl border border-[#333] cursor-pointer text-[#d4af37] hover:border-red-500 transition-all group"
            >
              <ShoppingCart size={24} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#0a0a0a] font-bold"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            
            <button 
              onClick={onOpenAdmin}
              className="p-2 text-gray-600 hover:text-white transition-all"
              title="Área Administrativa"
            >
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
