/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductCard } from './components/ProductCard';
import { CartSidePanel } from './components/CartSidePanel';
import { AdminModal } from './components/AdminModal';
import { IntroSplash } from './components/IntroSplash';
import { CartProvider } from './hooks/useCart';
import { INITIAL_PRODUCTS } from './constants';
import { Product } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { UtensilsCrossed, Clock, Star, MapPin } from 'lucide-react';

import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './services/firebase';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  useEffect(() => {
    // 7 seconds timer for splash screen
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 7000);

    const q = query(collection(db, "products"), orderBy('name'));
    
    // Real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allFetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];

      // DEDUPLICAÇÃO NO CLIENTE (Garantia de que o usuário nunca veja repetidos)
      const seenNames = new Set<string>();
      const uniqueProducts: Product[] = [];
      
      for (const p of allFetched) {
        if (!seenNames.has(p.name)) {
          seenNames.add(p.name);
          uniqueProducts.push(p);
        }
      }

      let productsData = uniqueProducts;

      // Fallback if DB is empty
      if (productsData.length === 0) {
        productsData = INITIAL_PRODUCTS.map((p, index) => ({
          id: `local-${index}`,
          ...p,
          available: true
        })) as Product[];
      }

      setProducts(productsData);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao sincronizar produtos:", error);
      // Fallback on error
      const fallback = INITIAL_PRODUCTS.map((p, index) => ({
        id: `err-${index}`,
        ...p,
        available: true
      })) as Product[];
      setProducts(fallback);
      setLoading(false);
    });

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const categories = ['Todos', 'Combinados', 'Hots', 'Temakis', 'Yakisobas', 'Uramakis', 'Harumakis', 'Joys', 'Sashimis', 'Pokes'];

  const filteredProducts = products.filter(p => {
    // Excluir complementos da vitrine principal
    if (p.isComplemento) return false;

    if (selectedCategory === 'Todos') return true;
    
    // Se o produto tiver uma categoria definida explicitamente no admin
    if (p.category && p.category !== 'Todos') {
      return p.category === selectedCategory;
    }

    // Fallback logic for category filtering based on name (auto-categorization)
    const name = p.name.toLowerCase();
    const cat = selectedCategory.toLowerCase();
    
    if (cat === 'combinados') return name.includes('barca') || name.includes('combo');
    if (cat === 'hots') return name.includes('hot');
    if (cat === 'temakis') return name.includes('temaki');
    if (cat === 'yakisobas') return name.includes('yakisoba');
    if (cat === 'uramakis') return name.includes('uramaki');
    if (cat === 'harumakis') return name.includes('harumaki');
    if (cat === 'joys') return name.includes('joy');
    if (cat === 'sashimis') return name.includes('sashimi');
    if (cat === 'pokes') return name.includes('poke');
    
    return name.includes(cat.slice(0, -1));
  });

  return (
    <CartProvider>
      <AnimatePresence>
        {showSplash && <IntroSplash key="splash" />}
      </AnimatePresence>

      <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-white overflow-x-hidden">
        {/* Background Decorative Overlay */}
        <div className="fixed inset-0 pointer-events-none japanese-pattern" />
        
        <Header 
          onOpenCart={() => setIsCartOpen(true)} 
          onOpenAdmin={() => setIsAdminOpen(true)} 
        />

        <main className="flex flex-1 overflow-hidden h-[calc(100vh-80px)]">
          {/* Rail Navigation */}
          <nav className="w-24 border-r border-[#2a2a2a] flex flex-col items-center py-8 gap-5 bg-[#0d0d0d] hidden md:flex overflow-y-auto no-scrollbar">
            {categories.slice(0, 7).map((cat, i) => {
              const emojis = ['🍱', '🚢', '🔥', '🍣', '🥘', '🌀', '🥐'];
              return (
                <button key={cat} onClick={() => setSelectedCategory(cat)}>
                  <NavItem active={selectedCategory === cat} emoji={emojis[i]} label={cat} />
                </button>
              );
            })}
          </nav>

          <section className="flex-1 bg-[radial-gradient(circle_at_top_right,_#1a1111,_#0a0a0a)] overflow-y-auto custom-scrollbar p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-6">
                <div>
                  <h2 className="text-3xl font-serif italic text-white uppercase tracking-tighter">
                    {selectedCategory === 'Todos' ? 'Todos Produtos' : selectedCategory}
                  </h2>
                  <p className="text-[10px] uppercase tracking-widest text-gray-600 mt-1">Sushi Austin • Menu Autêntico • {filteredProducts.length} itens</p>
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                  {categories.map((cat) => (
                    <button 
                      key={cat} 
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full border transition-all whitespace-nowrap",
                        selectedCategory === cat 
                          ? "bg-primary border-primary text-white" 
                          : "border-white/5 bg-white/5 hover:border-primary/50 text-gray-400"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {loading ? (
                  Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="bg-[#141414] border border-[#2a2a2a] rounded-2xl h-32 animate-pulse" />
                  ))
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 text-gray-500 font-serif italic">
                    Nenhum produto nesta categoria no momento.
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>

        <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

        <CartSidePanel 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
        
        <AdminModal 
          isOpen={isAdminOpen} 
          onClose={() => setIsAdminOpen(false)} 
        />
      </div>
    </CartProvider>
  );
}

const Feature: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="flex flex-col items-center text-center group">
    <div className="mb-6 p-5 bg-surface border border-white/5 rounded-2xl text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 uppercase tracking-widest">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed max-w-[250px]">{text}</p>
  </div>
);

const NavItem: React.FC<{ active?: boolean; emoji: string; label: string }> = ({ active, emoji, label }) => (
  <div className={cn(
    "flex flex-col items-center gap-2 cursor-pointer transition-all hover:opacity-100",
    active ? "opacity-100" : "opacity-40"
  )}>
    <div className={cn(
      "w-10 h-10 bg-[#1a1a1a] rounded-lg border flex items-center justify-center text-xl transition-colors",
      active ? "border-[#d4af37]" : "border-transparent group-hover:border-[#d4af37]/50"
    )}>
      {emoji}
    </div>
    <span className={cn(
      "text-[10px] font-bold uppercase tracking-tighter",
      active ? "text-primary" : "text-gray-400"
    )}>
      {label}
    </span>
  </div>
);

import { cn } from './lib/utils';
