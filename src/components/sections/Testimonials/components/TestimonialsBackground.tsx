// src/components/sections/Testimonials/components/TestimonialsBackground.tsx
import { memo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TestimonialsBackground = memo(() => {
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
      
      {/* Effet de lumière */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          w-full h-full max-w-4xl max-h-[80vh] rounded-full bg-gradient-radial 
          from-[#4ADE80]/10 to-transparent blur-3xl"
      />
      
      {/* Particules */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-[#4ADE80]/70"
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
    </div>
  );
});

export default TestimonialsBackground;