// src/components/sections/Skills/components/SkillCard.tsx
import { memo, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../types';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const SkillCard = memo(({ skill, index }: SkillCardProps) => {
  // Animation d'apparition retardée en fonction de l'index
  const appearanceDelay = index * 0.08;
  
  // Référence à l'élément de carte
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  
  // État pour détecter si l'appareil est mobile
  const [isMobile, setIsMobile] = useState(false);
  
  // Détecter si l'appareil est mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 
                  'ontouchstart' in window || 
                  navigator.maxTouchPoints > 0);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Effet pour initialiser l'animation 3D (uniquement sur desktop)
  useEffect(() => {
    const card = cardRef.current;
    const cardInner = cardInnerRef.current;
    
    if (!card || !cardInner || isMobile) return;
    
    let isHovered = false;
    let bounds: DOMRect;
    
    // Fonction pour mettre à jour l'effet 3D
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      
      // Calculer la position relative de la souris
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;
      
      const rotateY = 20 * ((mouseX / bounds.width) - 0.5);
      const rotateX = -20 * ((mouseY / bounds.height) - 0.5);
      
      // Appliquer la rotation
      cardInner.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        scale3d(1.05, 1.05, 1.05)
      `;
      
      // Ajouter une ombre dynamique
      cardInner.style.boxShadow = `
        0 5px 15px -5px rgba(0, 0, 0, 0.5),
        0 10px 30px -10px rgba(74, 222, 128, 0.3),
        ${-rotateY/2}px ${-rotateX/2}px 20px rgba(74, 222, 128, 0.2)
      `;
    };
    
    // Fonction pour gérer l'entrée de la souris
    const handleMouseEnter = () => {
      isHovered = true;
      bounds = card.getBoundingClientRect();
      
      // Transition douce pour l'entrée
      cardInner.style.transition = 'transform 0.2s ease-out, box-shadow 0.2s ease-out';
      setTimeout(() => {
        cardInner.style.transition = 'none'; // Désactiver la transition après l'entrée
      }, 200);
    };
    
    // Fonction pour gérer la sortie de la souris
    const handleMouseLeave = () => {
      isHovered = false;
      
      // Réinitialiser avec transition douce
      cardInner.style.transition = 'transform 0.5s ease-out, box-shadow 0.5s ease-out';
      cardInner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      cardInner.style.boxShadow = '0 5px 15px -3px rgba(0, 0, 0, 0.3), 0 0 6px rgba(0, 0, 0, 0.2)';
    };
    
    // Ajouter les écouteurs d'événements
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mousemove', handleMouseMove);
    
    // Nettoyer les écouteurs d'événements
    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]); // Dépend de isMobile pour se réappliquer si nécessaire
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: appearanceDelay,
          ease: "easeOut"
        }
      }}
      whileHover={isMobile ? {
        y: -5,
        scale: 1.03,
        transition: { duration: 0.2 }
      } : undefined}
      className="w-36 h-36 md:w-40 md:h-40 flex-shrink-0 m-4 relative cursor-pointer"
    >
      <div
        ref={cardInnerRef}
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-white/5
                   backdrop-blur-md border border-white/10 overflow-hidden hover:border-[#4ADE80]/40
                   transition-all duration-300 shadow-lg group"
        style={isMobile ? {
          boxShadow: '0 5px 15px -3px rgba(0, 0, 0, 0.3), 0 0 6px rgba(0, 0, 0, 0.2)'
        } : {
          transformStyle: 'preserve-3d',
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          boxShadow: '0 5px 15px -3px rgba(0, 0, 0, 0.3), 0 0 6px rgba(0, 0, 0, 0.2)'
        }}
      >
        {/* Effet lumineux */}
        <div 
          className="absolute -inset-1 bg-gradient-to-r from-transparent via-[#4ADE80]/20 to-transparent
                    opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
        />
        
        {/* Fond coloré */}
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundColor: skill.color || '#4ADE80' }}
        />
        
        {/* Contenu */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center p-4"
          style={isMobile ? {} : { transform: 'translateZ(10px)' }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
            style={{ 
              backgroundColor: `${skill.color}30` || '#4ADE8030',
              ...(isMobile ? {} : { transform: 'translateZ(20px)' })
            }}
          >
            <div
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: skill.color || '#4ADE80' }}
            />
          </div>
          
          <h3 
            className="text-white font-medium text-center"
            style={isMobile ? {} : { transform: 'translateZ(15px)' }}
          >
            {skill.name}
          </h3>
          
          {/* Barre de progression */}
          <div className="w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: appearanceDelay + 0.3 }}
              className="h-full rounded-full"
              style={{ backgroundColor: skill.color || '#4ADE80' }}
            />
          </div>
          
          <span className="text-xs text-white/70 mt-2">{skill.level}%</span>
        </div>
      </div>
    </motion.div>
  );
});

export default SkillCard;