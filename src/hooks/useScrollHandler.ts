// // 2️⃣ hooks/useScrollHandler.ts
// // Hook pour gérer le scroll automatique après navigation
// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useNavigation } from './useNavigation';

// export const useScrollHandler = () => {
//   const location = useLocation();
//   const { scrollToSection } = useNavigation();

//   useEffect(() => {
//     // Vérifier s'il y a un scroll en attente
//     const pendingScroll = sessionStorage.getItem('pendingScroll');
    
//     if (pendingScroll && location.pathname === '/') {
//       // Nettoyer le stockage
//       sessionStorage.removeItem('pendingScroll');
      
//       // Attendre que la page soit complètement rendue
//       const timeoutId = setTimeout(() => {
//         scrollToSection(pendingScroll);
//       }, 500);
      
//       return () => clearTimeout(timeoutId);
//     }
//   }, [location.pathname, scrollToSection]);
// };



// 3️⃣ hooks/useScrollHandler.ts - VERSION AMÉLIORÉE
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigation } from './useNavigation';

export const useScrollHandler = () => {
  const location = useLocation();
  const { scrollToSection } = useNavigation();

  useEffect(() => {
    // Vérifier s'il y a un scroll en attente
    const pendingScrollData = sessionStorage.getItem('pendingScroll');
    
    if (pendingScrollData && location.pathname === '/') {
      try {
        const scrollData = JSON.parse(pendingScrollData);
        
        // Nettoyer le stockage
        sessionStorage.removeItem('pendingScroll');
        
        // Attendre que la page soit complètement rendue
        const timeoutId = setTimeout(() => {
          scrollToSection(scrollData.sectionId, {
            immediate: scrollData.immediate || false,
            offset: scrollData.offset || 0
          });
        }, 600); // Délai légèrement augmenté pour s'assurer du rendu complet
        
        return () => clearTimeout(timeoutId);
      } catch (error) {
        console.warn('Erreur lors du parsing des données de scroll:', error);
        sessionStorage.removeItem('pendingScroll');
      }
    }
  }, [location.pathname, scrollToSection]);
};