// // 🚀 hooks/useActiveSection.ts - VERSION CLEAN CODE
// import { useState, useEffect } from 'react';

// export const useActiveSection = () => {
//   const [activeSection, setActiveSection] = useState<string>('home');

//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = ['home', 'about', 'skills', 'projects', 'testimonials', 'contact'];
//       const scrollPosition = window.scrollY + 120; // Offset pour la navigation (ajustable)
      
//       // Parcourir les sections dans l'ordre inverse pour détecter la plus proche
//       for (let i = sections.length - 1; i >= 0; i--) {
//         const sectionId = sections[i];
//         const element = document.getElementById(sectionId);
        
//         if (element && scrollPosition >= element.offsetTop) {
//           setActiveSection(sectionId);
//           break;
//         }
//       }
//     };

//     // Throttle le scroll pour optimiser les performances
//     let timeoutId: NodeJS.Timeout;
//     const throttledScroll = () => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(handleScroll, 50);
//     };

//     // Écouter le scroll et faire un check initial
//     window.addEventListener('scroll', throttledScroll, { passive: true });
//     handleScroll(); // Check initial pour définir la section active au chargement
    
//     return () => {
//       window.removeEventListener('scroll', throttledScroll);
//       clearTimeout(timeoutId);
//     };
//   }, []);

//   return activeSection;
// };







// 🚀 hooks/useActiveSection.ts - VERSION AVEC POINTAGE IMMÉDIAT
import { useState, useEffect, useCallback } from 'react';

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolling, setIsScrolling] = useState(false);

  // Fonction pour définir manuellement la section active (lors du clic)
  const setActiveSectionManually = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    setIsScrolling(true);
    
    // Désactiver la détection automatique pendant 2 secondes
    setTimeout(() => {
      setIsScrolling(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // 🎯 CLÉS : Ignorer la détection automatique si on est en train de scroller après un clic
      if (isScrolling) return;

      const sections = ['home', 'about', 'skills', 'projects', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 120;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    // Throttle le scroll
    let timeoutId: NodeJS.Timeout;
    const throttledScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 50);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Check initial seulement si on n'est pas en train de scroller
    if (!isScrolling) {
      handleScroll();
    }
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(timeoutId);
    };
  }, [isScrolling]);

  return {
    activeSection,
    setActiveSectionManually
  };
};