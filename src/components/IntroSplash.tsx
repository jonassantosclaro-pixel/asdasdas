import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const IntroSplash: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Japanese Pattern */}
      <div className="absolute inset-0 opacity-5 japanese-pattern pointer-events-none" />

      {/* Animation Container */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Noodles (CSS Waves) */}
        <div className="absolute bottom-20 flex gap-1 items-end">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                height: [40, 60, 40],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="w-1.5 bg-yellow-100/30 rounded-full"
              style={{ height: `${40 + i * 5}px` }}
            />
          ))}
        </div>

        {/* Chopsticks (Hashi) */}
        <div className="relative flex gap-12 rotate-[-15deg]">
          {/* Left Stick */}
          <motion.div
            animate={{ 
              rotate: [-5, 5, -5],
              x: [-2, 2, -2],
              y: [0, -5, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-2 h-48 bg-gradient-to-b from-[#8B4513] to-[#5D2E0A] rounded-full origin-top"
          />
          {/* Right Stick */}
          <motion.div
            animate={{ 
              rotate: [5, -5, 5],
              x: [2, -2, 2],
              y: [0, -8, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2
            }}
            className="w-2 h-48 bg-gradient-to-b from-[#8B4513] to-[#5D2E0A] rounded-full origin-top"
          />
        </div>

        {/* Smoke/Steam Effect */}
        <div className="absolute top-10 flex gap-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 0.2, 0], y: -40, scale: [1, 1.5, 2] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: "linear"
              }}
              className="w-8 h-8 rounded-full bg-white/10 blur-xl"
            />
          ))}
        </div>
      </div>

      {/* Loading Text */}
      <div className="mt-12 text-center space-y-4">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white font-serif italic text-xl tracking-tighter"
        >
          Sushi Austin
        </motion.p>
        
        <div className="flex flex-col items-center gap-2">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary"
          >
            Carregando suas delícias
          </motion.span>
          
          {/* Progress Bar (7s duration) */}
          <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 7, ease: "linear" }}
              className="absolute inset-0 bg-primary shadow-[0_0_10px_#ef4444]"
            />
          </div>
        </div>
      </div>

      {/* Red Circle in background */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.05, 0.03] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] border border-primary/20 rounded-full -z-10 bg-primary/5"
      />
    </motion.div>
  );
};
