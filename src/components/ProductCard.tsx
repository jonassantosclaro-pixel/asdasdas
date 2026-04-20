import React from 'react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import { Plus, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#141414] border border-[#2a2a2a] p-4 rounded-2xl flex gap-4 hover:border-[#d4af37] transition-all group lg:min-h-[140px]"
    >
      <div className="w-24 h-24 bg-[#1f1f1f] rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-[#333]">
        <img 
          src={product.image || undefined} 
          alt={product.name} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-all duration-500" 
        />
      </div>
      
      <div className="flex flex-col justify-between flex-grow min-w-0">
        <div>
          <h3 className="font-serif text-lg leading-tight text-white group-hover:text-[#d4af37] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description || 'Ingredientes selecionados com frescor diário.'}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-red-500 font-bold">
            R$ {product.price.toFixed(2)}
          </span>
          <button 
            onClick={() => addToCart(product)}
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-all active:scale-90"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
