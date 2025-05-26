// src/components/sections/Contact/components/ContactBackground.tsx
import { memo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ContactBackground = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  
  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Fond de base */}
      <div className="absolute inset-0 bg-black z-0" />
      
      {/* Grille avec lignes vertes */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-10">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`h-line-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#4ADE80]/30 to-transparent"
            style={{
              top: `${(i + 1) * 6}%`,
              left: 0,
              right: 0,
              opacity: 0.2 - i * 0.01
            }}
          />
        ))}
        
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`v-line-${i}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-[#4ADE80]/30 to-transparent"
            style={{
              left: `${(i + 1) * 5}%`,
              top: 0,
              bottom: 0,
              opacity: 0.2 - i * 0.005
            }}
          />
        ))}
      </div>
      
      {/* Effets de dégradés lumineux */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-1/4 left-1/4 w-1/2 h-1/4 bg-gradient-radial from-[#4ADE80]/10 to-transparent blur-3xl"
      />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-1/4 right-1/4 w-1/2 h-1/4 bg-gradient-radial from-[#4ADE80]/10 to-transparent blur-3xl"
      />
      
      {/* Particules */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-[#4ADE80]/80"
            initial={{ 
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0.2 + Math.random() * 0.5 
            }}
            animate={{
              x: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`
              ],
              y: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`
              ],
            }}
            transition={{
              duration: 20 + Math.random() * 30,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      {/* Motif d'enveloppes */}
      <div className="absolute inset-0 opacity-[0.02]">
        {Array.from({ length: 10 }).map((_, i) => {
          const symbols = ['@', '#', '✉', '✓', '✉️', '✦'];
          const symbol = symbols[Math.floor(Math.random() * symbols.length)];
          
          return (
            <div
              key={`symbol-${i}`}
              className="absolute text-[#4ADE80] select-none"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 2 + 1}rem`,
                opacity: Math.random() * 0.5 + 0.3,
                transform: `rotate(${Math.random() * 60 - 30}deg)`
              }}
            >
              {symbol}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default ContactBackground;