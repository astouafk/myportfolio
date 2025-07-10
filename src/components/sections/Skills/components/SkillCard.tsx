// src/components/sections/Skills/components/SkillCard.tsx - VERSION PRO PERFORMANCE
import { memo, useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../types';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const SkillCard = memo(({ skill, index }: SkillCardProps) => {
  const appearanceDelay = index * 0.08; // ⚡ Légèrement plus rapide
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  // Détection optimisée avec debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const checkSettings = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0);
        setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      }, 100);
    };
    
    checkSettings();
    window.addEventListener('resize', checkSettings);
    
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionMedia.addEventListener('change', checkSettings);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkSettings);
      motionMedia.removeEventListener('change', checkSettings);
    };
  }, []);

  // ⚡ Animation 360° optimisée avec timing professionnel
  useEffect(() => {
    if (isReducedMotion) return;
    
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, appearanceDelay * 1000 + 1500); // ⚡ Timing plus professionnel

    return () => clearTimeout(timer);
  }, [appearanceDelay, isReducedMotion]);
  
  // 🎨 EFFET 3D HOVER PROFESSIONNEL - Optimisé avec RAF
  useEffect(() => {
    const card = cardRef.current;
    const cardInner = cardInnerRef.current;
    
    if (!card || !cardInner || isMobile || isReducedMotion) return;
    
    let isHovering = false;
    let bounds: DOMRect;
    let rafId: number;
    
    const updateTransform = (mouseX: number, mouseY: number) => {
      if (!isHovering) return;
      
      const rotateY = 15 * ((mouseX / bounds.width) - 0.5); // ⚡ Amplitude réduite mais visible
      const rotateX = -15 * ((mouseY / bounds.height) - 0.5);
      
      // ⚡ Transformation optimisée avec translate3d pour GPU
      cardInner.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        scale3d(1.05, 1.05, 1.05)
        translateZ(20px)
      `;
      
      // 🎨 Ombre professionnelle avec couleur de skill
      const rgbColor = hexToRgb(skill.color || '#4ADE80');
      cardInner.style.boxShadow = `
        0 20px 40px -10px rgba(0, 0, 0, 0.6),
        0 0 30px rgba(${rgbColor}, 0.4),
        ${-rotateY/3}px ${-rotateX/3}px 20px rgba(${rgbColor}, 0.3)
      `;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        updateTransform(mouseX, mouseY);
      });
    };
    
    const handleMouseEnter = () => {
      isHovering = true;
      bounds = card.getBoundingClientRect();
      setIsHovered(true);
      
      cardInner.style.transition = 'transform 0.15s ease-out, box-shadow 0.15s ease-out';
      setTimeout(() => {
        cardInner.style.transition = 'none';
      }, 150);
    };
    
    const handleMouseLeave = () => {
      isHovering = false;
      setIsHovered(false);
      
      if (rafId) cancelAnimationFrame(rafId);
      
      cardInner.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease-out';
      cardInner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)';
      cardInner.style.boxShadow = '0 8px 20px -5px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)';
    };
    
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile, skill.color, isReducedMotion]);

  // Fonction utilitaire optimisée
  const hexToRgb = useCallback((hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result 
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '74, 222, 128';
  }, []);
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ 
        opacity: 0, 
        y: 40,
        scale: 0.9,
        rotateX: -10
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: {
          type: "spring",
          damping: 15,
          stiffness: 120,
          delay: appearanceDelay,
        }
      }}
      whileHover={isMobile ? {
        y: -8,
        scale: 1.03,
        transition: { type: "spring", damping: 15, stiffness: 400 }
      } : undefined}
      className="w-40 h-40 md:w-44 md:h-44 flex-shrink-0 m-4 relative cursor-pointer group"
    >
      <motion.div
        ref={cardInnerRef}
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/15 via-white/5 to-transparent
                   backdrop-blur-xl border border-white/20 overflow-hidden
                   transition-all duration-300 shadow-xl group-hover:border-white/40"
        style={isMobile ? {
          boxShadow: '0 8px 20px -5px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)'
        } : {
          transformStyle: 'preserve-3d',
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          boxShadow: '0 8px 20px -5px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)'
        }}
        // 🎨 Animation de rotation 360° professionnelle
        animate={hasAnimated && !isReducedMotion ? {
          rotateY: [0, 360],
          transition: {
            duration: 1.2,
            ease: "easeInOut",
            repeat: 0
          }
        } : {}}
      >
        {/* ⚡ Effet de lueur optimisé avec moins d'animations simultanées */}
        <motion.div 
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(circle at center, rgba(${hexToRgb(skill.color || '#4ADE80')}, 0.25) 0%, transparent 70%)`,
          }}
          animate={!isReducedMotion ? {
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.05, 1]
          } : {}}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* 🎨 Effet de brillance professionnel */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          animate={isHovered && !isReducedMotion ? {
            x: ['-100%', '200%']
          } : {}}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Fond coloré subtil */}
        <motion.div
          className="absolute inset-0 opacity-15 rounded-2xl"
          style={{ backgroundColor: skill.color }}
          animate={isHovered && !isReducedMotion ? {
            opacity: [0.15, 0.25, 0.15]
          } : {}}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Contenu principal optimisé */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center p-4"
          style={isMobile ? {} : { transform: 'translateZ(25px)' }}
        >
          {/* 🎨 Icône avec animation professionnelle */}
          <motion.div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-4 relative"
            style={{ 
              backgroundColor: `rgba(${hexToRgb(skill.color || '#4ADE80')}, 0.2)`,
              ...(isMobile ? {} : { transform: 'translateZ(30px)' })
            }}
            animate={!isReducedMotion ? {
              boxShadow: [
                `0 0 0 0 rgba(${hexToRgb(skill.color || '#4ADE80')}, 0.3)`,
                `0 0 20px 8px rgba(${hexToRgb(skill.color || '#4ADE80')}, 0.15)`,
                `0 0 0 0 rgba(${hexToRgb(skill.color || '#4ADE80')}, 0.3)`
              ]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{
              scale: 1.15,
              rotate: 90,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <motion.div
              className="w-6 h-6 rounded-full relative"
              style={{ backgroundColor: skill.color }}
              animate={!isReducedMotion ? {
                scale: [1, 1.2, 1]
              } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          {/* Nom avec effet professionnel */}
          <motion.h3 
            className="text-white font-bold text-center text-sm leading-tight"
            style={isMobile ? {} : { transform: 'translateZ(20px)' }}
            animate={!isReducedMotion ? {
              textShadow: [
                '0 0 0 transparent',
                `0 0 10px rgba(${hexToRgb(skill.color || '#4ADE80')}, 0.6)`,
                '0 0 0 transparent'
              ]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {skill.name}
          </motion.h3>
          
          {/* 🎨 Barre de progression professionnelle */}
          <div className="w-full h-2 bg-white/10 rounded-full mt-4 overflow-hidden relative">
            <motion.div
              initial={{ width: 0, x: '-100%' }}
              animate={{ 
                width: `${skill.level}%`,
                x: 0
              }}
              transition={{ 
                duration: 1.5, 
                delay: appearanceDelay + 0.4,
                ease: "easeOut"
              }}
              className="h-full rounded-full relative overflow-hidden"
              style={{ backgroundColor: skill.color }}
            >
              {/* Effet de lueur interne professionnel */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `linear-gradient(90deg, 
                    rgba(255,255,255,0.2) 0%, 
                    rgba(255,255,255,0.5) 50%, 
                    rgba(255,255,255,0.2) 100%)`
                }}
                animate={!isReducedMotion ? {
                  x: ['-100%', '200%']
                } : {}}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: "easeInOut"
                }}
              />
              
              {/* Lueur externe subtile */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: `0 0 15px rgba(${hexToRgb(skill.color || '#4ADE80')}, 0.4)`
                }}
                animate={!isReducedMotion ? {
                  opacity: [0.4, 0.8, 0.4]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
          
          {/* Pourcentage avec animation de compteur professionnelle */}
          <motion.span 
            className="text-xs font-bold mt-2 relative"
            style={{ 
              color: skill.color,
              textShadow: `0 0 8px rgba(${hexToRgb(skill.color || '#4ADE80')}, 0.6)`
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              textShadow: !isReducedMotion ? [
                `0 0 5px rgba(${hexToRgb(skill.color || '#4ADE80')}, 0.4)`,
                `0 0 15px rgba(${hexToRgb(skill.color || '#4ADE80')}, 0.8)`,
                `0 0 5px rgba(${hexToRgb(skill.color || '#4ADE80')}, 0.4)`
              ] : `0 0 8px rgba(${hexToRgb(skill.color || '#4ADE80')}, 0.6)`
            }}
            transition={{ 
              opacity: { delay: appearanceDelay + 1.2 },
              textShadow: {
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            {skill.level}%
          </motion.span>
        </div>
        
        {/* 🎨 Bordure lumineuse professionnelle */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 opacity-0"
          style={{ borderColor: skill.color }}
          animate={isHovered && !isReducedMotion ? {
            opacity: [0, 0.8, 0],
            scale: [1, 1.01, 1]
          } : {}}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
});

export default SkillCard;