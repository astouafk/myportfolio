// src/components/sections/Testimonials/components/TestimonialsBackground.tsx - VERSION PRO PERFORMANCE
import { memo, useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const TestimonialsBackground = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
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
  
  // 🎨 Track mouse position avec throttling professionnel
  useEffect(() => {
    if (isMobile || isReducedMotion) return;
    
    let ticking = false;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth) * 100;
          const y = (e.clientY / window.innerHeight) * 100;
          setMousePosition({ x, y });
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, isReducedMotion]);
  
  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* 🎨 Fond de base avec gradient dynamique professionnel */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(74, 222, 128, 0.06) 0%, 
              rgba(0, 0, 0, 0.95) 40%, 
              #000000 100%),
            linear-gradient(135deg, #000000 0%, #0a0f0a 50%, #000000 100%)
          `
        }}
        animate={!isReducedMotion ? {
          opacity: [0.9, 1, 0.9]
        } : {}}
        transition={{
          duration: 3, // ⚡ Plus rapide
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* 🎨 Grille hexagonale PROFESSIONNELLE - simplifiée mais visible */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-18"> {/* ⚡ Plus visible */}
        {/* Lignes horizontales optimisées */}
        {Array.from({ length: 15 }).map((_, i) => ( // ⚡ Réduites de 20 à 15
          <motion.div
            key={`h-line-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#4ADE80]/50 to-transparent"
            style={{
              top: `${(i + 1) * 6.5}%`,
              left: 0,
              right: 0,
            }}
            animate={!isReducedMotion ? {
              opacity: [0.2 - i * 0.008, 0.4 - i * 0.008, 0.2 - i * 0.008],
              scaleX: [1, 1.05, 1]
            } : {}}
            transition={{
              duration: 2 + i * 0.05, // ⚡ Plus rapide
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.05
            }}
          />
        ))}
        
        {/* Lignes verticales optimisées */}
        {Array.from({ length: 18 }).map((_, i) => ( // ⚡ Réduites de 25 à 18
          <motion.div
            key={`v-line-${i}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-[#4ADE80]/50 to-transparent"
            style={{
              left: `${(i + 1) * 5.5}%`,
              top: 0,
              bottom: 0,
            }}
            animate={!isReducedMotion ? {
              opacity: [0.2 - i * 0.004, 0.4 - i * 0.004, 0.2 - i * 0.004],
              scaleY: [1, 1.05, 1]
            } : {}}
            transition={{
              duration: 3 + i * 0.03, // ⚡ Plus rapide
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.03
            }}
          />
        ))}
        
        {/* 🎨 Points d'intersection lumineux - optimisés */}
        {Array.from({ length: 10 }).map((_, i) => ( // ⚡ Réduites de 15 à 10
          <motion.div
            key={`intersection-${i}`}
            className="absolute w-1 h-1 bg-[#4ADE80] rounded-full"
            style={{
              left: `${20 + (i % 4) * 20}%`, // ⚡ Pattern plus simple
              top: `${25 + Math.floor(i / 4) * 25}%`,
            }}
            animate={!isReducedMotion ? {
              scale: [0, 1.2, 0],
              opacity: [0, 0.8, 0],
              boxShadow: [
                '0 0 0 0 rgba(74, 222, 128, 0)',
                '0 0 15px 3px rgba(74, 222, 128, 0.4)',
                '0 0 0 0 rgba(74, 222, 128, 0)'
              ]
            } : {}}
            transition={{
              duration: 1.5, // ⚡ Plus rapide
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
      
      {/* 🎨 Effet de lumière centrale PROFESSIONNEL */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1],
          rotate: [0, 2, 0] // ⚡ Rotation plus subtile
        } : { opacity: 0 }}
        transition={{ 
          opacity: { duration: 1 },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }, // ⚡ Plus rapide
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" } // ⚡ Plus rapide
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          w-full h-full max-w-5xl max-h-[80vh] rounded-full 
          bg-gradient-radial from-[#4ADE80]/12 via-[#22D3EE]/8 to-transparent blur-3xl"
      />
      
      {/* 🎨 Orbes lumineux flottants - optimisés */}
      {!isReducedMotion && Array.from({ length: 8 }).map((_, i) => ( // ⚡ Réduites de 12 à 8
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full bg-gradient-radial from-[#4ADE80]/25 to-transparent blur-xl"
          style={{
            width: 50 + Math.random() * 80, // ⚡ Taille réduite
            height: 50 + Math.random() * 80,
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
          animate={{
            x: [
              0, 
              (Math.random() - 0.5) * 150, // ⚡ Mouvement réduit
              (Math.random() - 0.5) * 150,
              0
            ],
            y: [
              0,
              (Math.random() - 0.5) * 150,
              (Math.random() - 0.5) * 150,
              0
            ],
            scale: [1, 1.15, 0.9, 1], // ⚡ Variation réduite
            opacity: [0.3, 0.5, 0.3, 0.3]
          }}
          transition={{
            duration: 12 + Math.random() * 8, // ⚡ Plus rapide
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5
          }}
        />
      ))}
      
      {/* 🎨 Particules ultra-dynamiques - drastiquement optimisées */}
      <div className="absolute inset-0 pointer-events-none">
        {!isReducedMotion && Array.from({ length: isMobile ? 8 : 15 }).map((_, i) => ( // ⚡ Réduites de 30 à 8/15
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: 1.5 + Math.random() * 2.5, // ⚡ Taille réduite
              height: 1.5 + Math.random() * 2.5,
              background: `linear-gradient(45deg, #4ADE80, #22D3EE)`,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              x: [
                0,
                (Math.random() - 0.5) * 200, // ⚡ Mouvement réduit
                (Math.random() - 0.5) * 200,
                0
              ],
              y: [
                0,
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 200,
                0
              ],
              scale: [0, 1, 1, 0],
              opacity: [0, 0.7, 0.7, 0],
              rotate: [0, 180, 360, 540] // ⚡ Rotation réduite
            }}
            transition={{
              duration: 15 + Math.random() * 10, // ⚡ Plus rapide
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3
            }}
          />
        ))}
      </div>
      
      {/* 🎨 Vagues lumineuses - optimisées */}
      {!isReducedMotion && Array.from({ length: 2 }).map((_, i) => ( // ⚡ Réduites de 3 à 2
        <motion.div
          key={`wave-${i}`}
          className="absolute inset-0 rounded-full border border-[#4ADE80]/25"
          style={{
            transformOrigin: 'center center'
          }}
          animate={{
            scale: [0.6, 1.8, 0.6], // ⚡ Scale réduit
            opacity: [0, 0.4, 0],
            rotate: [0, 120, 240] // ⚡ Rotation réduite
          }}
          transition={{
            duration: 6, // ⚡ Plus rapide
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 2
          }}
        />
      ))}
      
      {/* 🎨 Rayons lumineux rotatifs - optimisés */}
      <div className="absolute inset-0 overflow-hidden">
        {!isReducedMotion && Array.from({ length: 6 }).map((_, i) => ( // ⚡ Réduites de 8 à 6
          <motion.div
            key={`ray-${i}`}
            className="absolute bg-gradient-to-r from-transparent via-[#4ADE80]/15 to-transparent"
            style={{
              width: '150%', // ⚡ Taille réduite
              height: '1px',
              left: '-25%',
              top: '50%',
              transformOrigin: '50% 0px',
            }}
            animate={{
              rotate: [i * 60, i * 60 + 360], // ⚡ Pattern plus simple
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: 15, // ⚡ Plus rapide
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.4
            }}
          />
        ))}
      </div>
      
      {/* 🎨 Effet de pulsation centrale - optimisé */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          w-2 h-2 bg-[#4ADE80] rounded-full"
        animate={!isReducedMotion ? {
          scale: [1, 30, 1], // ⚡ Scale réduit
          opacity: [1, 0, 1]
        } : {}}
        transition={{
          duration: 4, // ⚡ Plus rapide
          repeat: Infinity,
          ease: "easeOut"
        }}
      />
      
      {/* 🎨 Vignette dynamique professionnelle */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              transparent 30%, 
              rgba(0,0,0,0.2) 70%)
          `
        }}
        animate={!isReducedMotion ? {
          opacity: [0.4, 0.6, 0.4]
        } : {}}
        transition={{
          duration: 2.5, // ⚡ Plus rapide
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* 🎨 Fallback élégant pour animations réduites */}
      {isReducedMotion && (
        <div className="absolute inset-0 bg-gradient-radial from-[#4ADE80]/8 via-transparent to-transparent opacity-50" />
      )}
    </div>
  );
});

export default TestimonialsBackground;