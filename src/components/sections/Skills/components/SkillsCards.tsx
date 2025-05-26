// src/components/sections/Skills/components/SkillsCards.tsx
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
  
  // Vérifier si le défilement est possible
  const checkScrollability = useCallback(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const currentPos = container.scrollLeft;
    setScrollPosition(currentPos);
    
    setCanScrollLeft(currentPos > 10);
    setCanScrollRight(currentPos < container.scrollWidth - container.clientWidth - 10);
  }, []);
  
  // Fonction de défilement
  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scrollAmount = container.clientWidth * 0.7;
    
    container.scrollTo({
      left: container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
      behavior: 'smooth'
    });
  }, []);
  
  // Mettre à jour l'état de défilement lors des changements
  useEffect(() => {
    checkScrollability();
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      
      // Vérifier après le rendu complet
      const timeout = setTimeout(checkScrollability, 500);
      
      return () => {
        container.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
        clearTimeout(timeout);
      };
    }
  }, [category, checkScrollability]);
  
  // Obtenir les compétences de la catégorie actuelle
  const skills = skillsData[category];
  
  return (
    <div className="relative">
      {/* Description de la catégorie */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 text-gray-300 max-w-2xl mx-auto px-4"
      >
        <p>{categoryDescriptions[category]}</p>
      </motion.div>
      
      {/* Conteneur des cartes avec navigation */}
      <div className="relative">
        {/* Zone de sécurité pour la flèche gauche */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" 
            style={{ opacity: canScrollLeft ? 1 : 0, transition: 'opacity 0.3s ease' }} />
            
        {/* Bouton de défilement gauche */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 z-20
              w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center
              border border-[#4ADE80]/20 text-[#4ADE80] hover:bg-[#4ADE80]/20 transition-colors
              shadow-lg shadow-black/30"
            aria-label="Défiler vers la gauche"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        
        {/* Conteneur défilant des cartes avec padding pour éviter chevauchement */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto py-6 px-16 no-scrollbar"
          style={{ scrollBehavior: 'smooth', scrollPaddingLeft: '64px', scrollPaddingRight: '64px' }}
          onScroll={checkScrollability}
        >
          <div 
            ref={scrollAreaRef}
            className="flex flex-wrap justify-center md:flex-nowrap md:justify-start items-center gap-4 min-w-max mx-auto"
          >
            {skills.map((skill, index) => (
              <SkillCard key={`${category}-${skill.name}`} skill={skill} index={index} />
            ))}
          </div>
        </div>
        
        {/* Zone de sécurité pour la flèche droite */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" 
            style={{ opacity: canScrollRight ? 1 : 0, transition: 'opacity 0.3s ease' }} />
            
        {/* Bouton de défilement droit */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 z-20
              w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center
              border border-[#4ADE80]/20 text-[#4ADE80] hover:bg-[#4ADE80]/20 transition-colors
              shadow-lg shadow-black/30"
            aria-label="Défiler vers la droite"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
      
      {/* Indicateur de défilement */}
      <div className="flex justify-center mt-8 space-x-1">
        {Array.from({ length: 5 }).map((_, i) => {
          // Calcul approximatif de la position de défilement
          const isActive = i === Math.floor(scrollPosition / ((containerRef.current?.scrollWidth || 1000) / 5));
          
          return (
            <div 
              key={`indicator-${i}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                isActive ? 'w-8 bg-[#4ADE80]' : 'w-2 bg-[#4ADE80]/30'
              }`} 
            />
          );
        })}
      </div>
    </div>
  );
});

export default SkillsCards;