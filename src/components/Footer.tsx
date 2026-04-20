import React from 'react';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="px-8 py-4 bg-[#0a0a0a] border-t border-[#2a2a2a] flex flex-col md:flex-row items-center justify-between text-[10px] text-gray-600 gap-4">
      <div className="flex items-center gap-6">
        <span className="font-medium tracking-tight">© 2024 Sushi Austin</span>
        <div className="flex gap-4 text-gray-400 font-bold uppercase tracking-widest hidden sm:flex">
          <a href="#" className="hover:text-red-500 transition-all">Instagram</a>
          <a href="#" className="hover:text-red-500 transition-all">Facebook</a>
        </div>
      </div>
      
      <div className="flex items-center gap-3 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
        <span className="leading-none uppercase tracking-tighter">Cozinha Aberta • Austin, Nova Iguaçu</span>
      </div>

      <div className="flex items-center gap-1">
        {/* Hidden Admin Access */}
        <button 
          onClick={onOpenAdmin}
          className="opacity-10 hover:opacity-100 transition-opacity uppercase font-black"
        >
          Panel
        </button>
      </div>
    </footer>
  );
};
