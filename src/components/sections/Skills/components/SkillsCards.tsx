// src/components/sections/Skills/components/SkillsCards.tsx - VERSION PRO PERFORMANCE
import { memo, useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SkillsCategory, skillsData, categoryDescriptions } from '../types';
import SkillCard from './SkillCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SkillsCardsProps {
  category: SkillsCategory;
}

const SkillsCards = memo(({ category }: SkillsCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  // Détection des préférences d'animation
  useEffect(() => {
    const checkSettings = () => {
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };
    
    checkSettings();
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionMedia.addEventListener('change', checkSettings);
    
    return () => motionMedia.removeEventListener('change', checkSettings);
  }, []);
  
  // ⚡ Vérification du défilement optimisée avec debouncing
  const checkScrollability = useCallback(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const currentPos = container.scrollLeft;
    setScrollPosition(currentPos);
    
    setCanScrollLeft(currentPos > 10);
    setCanScrollRight(currentPos < container.scrollWidth - container.clientWidth - 10);
  }, []);
  
  // 🎨 Fonction de défilement PROFESSIONNELLE avec animation fluide
  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scrollAmount = container.clientWidth * 0.6; // ⚡ Scroll plus précis
    const targetPosition = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    
    // 🎨 Animation de scroll fluide et professionnelle
    if (!isReducedMotion) {
      container.scrollTo({
        left: targetPosition,
        behavior: 'smooth'
      });
    } else {
      // Scroll instantané si animations réduites
      container.scrollLeft = targetPosition;
    }
  }, [isReducedMotion]);
  
  // ⚡ Optimisation avec debouncing pour les événements de scroll
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const debouncedCheck = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkScrollability, 50);
    };
    
    debouncedCheck();
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', debouncedCheck, { passive: true });
      window.addEventListener('resize', debouncedCheck);
      
      // Vérifier après le rendu complet
      const initialCheck = setTimeout(checkScrollability, 300);
      
      return () => {
        clearTimeout(timeoutId);
        clearTimeout(initialCheck);
        container.removeEventListener('scroll', debouncedCheck);
        window.removeEventListener('resize', debouncedCheck);
      };
    }
  }, [category, checkScrollability]);
  
  // Obtenir les compétences de la catégorie actuelle
  const skills = skillsData[category];
  
  return (
    <div className="relative">
      {/* 🎨 Description de la catégorie avec animation professionnelle */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-8 text-gray-300 max-w-2xl mx-auto px-4"
      >
        <p className="text-base leading-relaxed">{categoryDescriptions[category]}</p>
      </motion.div>
      
      {/* Conteneur des cartes avec navigation professionnelle */}
      <div className="relative">
        {/* 🎨 Zone de sécurité avec dégradé professionnel */}
        <motion.div 
          className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none"
          animate={{ opacity: canScrollLeft ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
            
        {/* 🎨 Bouton de défilement gauche professionnel */}
        <motion.button
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20
            w-12 h-12 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center
            border-2 border-[#4ADE80]/30 text-[#4ADE80] transition-all duration-300
            shadow-lg shadow-black/40 hover:border-[#4ADE80]/60 hover:bg-[#4ADE80]/10"
          aria-label="Défiler vers la gauche"
          animate={{ 
            opacity: canScrollLeft ? 1 : 0,
            scale: canScrollLeft ? 1 : 0.8,
            x: canScrollLeft ? 0 : -10
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        
        {/* 🎨 Conteneur défilant optimisé */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto py-8 px-20 no-scrollbar"
          style={{ 
            scrollBehavior: isReducedMotion ? 'auto' : 'smooth',
            scrollPaddingLeft: '80px', 
            scrollPaddingRight: '80px' 
          }}
          onScroll={checkScrollability}
        >
          <div 
            ref={scrollAreaRef}
            className="flex flex-wrap justify-center md:flex-nowrap md:justify-start items-center gap-6 min-w-max mx-auto"
          >
            {skills.map((skill, index) => (
              <SkillCard key={`${category}-${skill.name}`} skill={skill} index={index} />
            ))}
          </div>
        </div>
        
        {/* 🎨 Zone de sécurité droite */}
        <motion.div 
          className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none"
          animate={{ opacity: canScrollRight ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
            
        {/* 🎨 Bouton de défilement droit professionnel */}
        <motion.button
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20
            w-12 h-12 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center
            border-2 border-[#4ADE80]/30 text-[#4ADE80] transition-all duration-300
            shadow-lg shadow-black/40 hover:border-[#4ADE80]/60 hover:bg-[#4ADE80]/10"
          aria-label="Défiler vers la droite"
          animate={{ 
            opacity: canScrollRight ? 1 : 0,
            scale: canScrollRight ? 1 : 0.8,
            x: canScrollRight ? 0 : 10
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>
      
      {/* 🎨 Indicateur de défilement professionnel */}
      <motion.div 
        className="flex justify-center mt-8 space-x-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {Array.from({ length: Math.min(5, Math.ceil(skills.length / 3)) }).map((_, i) => {
          // 🎨 Calcul intelligent de la position active
          const totalWidth = containerRef.current?.scrollWidth || 1000;
          const containerWidth = containerRef.current?.clientWidth || 800;
          const sectionWidth = totalWidth / 5;
          const isActive = scrollPosition >= (i * sectionWidth - 50) && scrollPosition < ((i + 1) * sectionWidth + 50);
          
          return (
            <motion.div 
              key={`indicator-${i}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'w-8 bg-[#4ADE80] shadow-lg shadow-[#4ADE80]/50' 
                  : 'w-2 bg-[#4ADE80]/30 hover:bg-[#4ADE80]/50'
              }`}
              animate={{
                scale: isActive ? 1.1 : 1,
                opacity: isActive ? 1 : 0.6
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          );
        })}
      </motion.div>
    </div>
  );
});

export default SkillsCards;