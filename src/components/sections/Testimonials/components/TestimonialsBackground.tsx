// src/components/sections/Testimonials/components/TestimonialsBackground.tsx - VERSION SIMPLIFIÉE
import { memo, useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const TestimonialsBackground = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Détection optimisée
  useEffect(() => {
    const checkSettings = () => {
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      setIsMobile(window.innerWidth < 768);
    };
    
    checkSettings();
    
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionMedia.addEventListener('change', checkSettings);
    window.addEventListener('resize', checkSettings);
    
    return () => {
      motionMedia.removeEventListener('change', checkSettings);
      window.removeEventListener('resize', checkSettings);
    };
  }, []);
  
  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* 🎯 FOND DE BASE SIMPLE */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/30 to-black" />
      
      {/* 🎯 GRILLE SUBTILE - SIMPLIFIÉE */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {/* Lignes horizontales réduites */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`h-line-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#4ADE80]/40 to-transparent"
            style={{
              top: `${(i + 1) * 12}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        
        {/* Lignes verticales réduites */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`v-line-${i}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-[#4ADE80]/40 to-transparent"
            style={{
              left: `${(i + 1) * 10}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>
      
      {/* 🎯 EFFET DE LUMIÈRE CENTRALE SIMPLE */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { 
          opacity: 0.4,
          scale: [1, 1.02, 1]
        } : { opacity: 0 }}
        transition={{ 
          opacity: { duration: 1 },
          scale: { 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          w-full h-full max-w-4xl max-h-[70vh] rounded-full 
          bg-gradient-radial from-[#4ADE80]/15 via-[#22D3EE]/8 to-transparent blur-3xl"
      />
      
      {/* 🎯 PARTICULES RÉDUITES - POUR MOBILE ET PERFORMANCE */}
      {!isReducedMotion && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: isMobile ? 3 : 6 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: 2,
                height: 2,
                background: `linear-gradient(45deg, #4ADE80, #22D3EE)`,
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.5
              }}
            />
          ))}
        </div>
      )}
      
      {/* 🎯 VIGNETTE SIMPLE */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30" />
      
      {/* 🎯 FALLBACK SIMPLE POUR ANIMATIONS RÉDUITES */}
      {isReducedMotion && (
        <div className="absolute inset-0 bg-gradient-radial from-[#4ADE80]/8 via-transparent to-transparent opacity-40" />
      )}
    </div>
  );
});

export default TestimonialsBackground;