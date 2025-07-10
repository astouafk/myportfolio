// src/components/sections/Projects/components/ProjectsBackground.tsx
import { memo, useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const ProjectsBackground = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const [isMobile, setIsMobile] = useState(false);
  
  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Fond de base avec gradient */}
      <div className="absolute inset-0 bg-black z-0" />
      
      {/* Grille avec lignes vertes */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-10">
        {/* Lignes horizontales */}
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
        
        {/* Lignes verticales */}
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
      
      {/* Motif de points */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(#4ADE80 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />
      
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
      
      {/* Particules animées */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-[#4ADE80]/80"
              initial={{ 
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                opacity: 0 
              }}
              animate={isInView ? {
                x: [
                  Math.random() * 100 - 50,
                  Math.random() * 100 - 50,
                  Math.random() * 100 - 50
                ],
                y: [
                  Math.random() * 100 - 50,
                  Math.random() * 100 - 50,
                  Math.random() * 100 - 50
                ],
                opacity: [0, 0.8, 0]
              } : {}}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default ProjectsBackground;






