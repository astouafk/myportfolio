// // 1️⃣ hooks/useNavigation.ts
// // Hook centralisé pour toute la logique de navigation
// import { useCallback } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// export const useNavigation = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Fonction principale pour naviguer vers une section
//   const navigateToSection = useCallback((sectionId: string, options?: {
//     page?: 'home' | 'projects';
//     immediate?: boolean;
//   }) => {
//     const { page = 'home', immediate = false } = options || {};

//     // Si on navigue vers la page des projets complète
//     if (sectionId === 'projects' && page === 'projects') {
//       navigate('/projects');
//       window.scrollTo(0, 0);
//       return;
//     }

//     // Si on est déjà sur la bonne page, scroll direct
//     if (location.pathname === '/' && page === 'home') {
//       scrollToSection(sectionId, immediate);
//       return;
//     }

//     // Navigation vers la home avec scroll différé
//     if (page === 'home') {
//       // Stocker l'intention de scroll
//       sessionStorage.setItem('pendingScroll', sectionId);
//       navigate('/');
//       return;
//     }

//     // Par défaut, navigation simple
//     const targetPath = page === 'projects' ? '/projects' : '/';
//     navigate(targetPath);
//   }, [navigate, location.pathname]);

//   // Fonction pour naviguer vers un projet spécifique
//   const navigateToProject = useCallback((projectId: string) => {
//     navigate(`/projects/${projectId}`);
//     window.scrollTo(0, 0);
//   }, [navigate]);

//   // Fonction pour revenir à la home depuis n'importe où
//   const navigateToHome = useCallback((targetSection?: string) => {
//     if (targetSection) {
//       sessionStorage.setItem('pendingScroll', targetSection);
//     }
//     navigate('/');
//   }, [navigate]);

//   // Fonction de scroll vers une section
//   const scrollToSection = useCallback((sectionId: string, immediate = false) => {
//     const element = document.getElementById(sectionId);
    
//     if (!element) {
//       console.warn(`Section "${sectionId}" not found`);
//       return;
//     }

//     const yOffset = -80; // Hauteur de la navigation
//     const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

//     if (immediate) {
//       window.scrollTo(0, y);
//     } else {
//       window.scrollTo({
//         top: y,
//         behavior: 'smooth'
//       });
//     }
//   }, []);

//   // Utilitaire pour vérifier si on est sur une page spécifique
//   const isOnPage = useCallback((page: 'home' | 'projects' | 'project-detail') => {
//     switch (page) {
//       case 'home':
//         return location.pathname === '/';
//       case 'projects':
//         return location.pathname === '/projects';
//       case 'project-detail':
//         return location.pathname.startsWith('/projects/');
//       default:
//         return false;
//     }
//   }, [location.pathname]);

//   return {
//     navigateToSection,
//     navigateToProject,
//     navigateToHome,
//     scrollToSection,
//     isOnPage,
//     currentPath: location.pathname
//   };
// };








// // 2️⃣ hooks/useNavigation.ts - VERSION AMÉLIORÉE AVEC SCROLL PRÉCIS
// import { useCallback } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// export const useNavigation = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Fonction pour calculer la position exacte d'une section
//   const calculateSectionPosition = useCallback((element: HTMLElement) => {
//     const rect = element.getBoundingClientRect();
//     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
//     // Hauteur de la navigation (ajustable selon ton design)
//     const navHeight = 80;
    
//     // Position exacte en tenant compte de l'espacement
//     const elementTop = rect.top + scrollTop;
//     const targetPosition = elementTop - navHeight;
    
//     // S'assurer qu'on ne scroll pas au-dessus de la page
//     return Math.max(0, targetPosition);
//   }, []);

//   // Fonction de scroll améliorée avec feedback visuel
//   const scrollToSection = useCallback((sectionId: string, options?: {
//     immediate?: boolean;
//     offset?: number;
//   }) => {
//     const { immediate = false, offset = 0 } = options || {};
    
//     const element = document.getElementById(sectionId);
    
//     if (!element) {
//       console.warn(`Section "${sectionId}" not found`);
//       return;
//     }

//     // Calculer la position exacte
//     const targetPosition = calculateSectionPosition(element) + offset;

//     // Feedback visuel : ajouter une classe temporaire pour highlighting
//     element.classList.add('section-highlight');
//     setTimeout(() => {
//       element.classList.remove('section-highlight');
//     }, 1000);

//     if (immediate) {
//       window.scrollTo(0, targetPosition);
//     } else {
//       // Scroll fluide avec meilleur contrôle
//       window.scrollTo({
//         top: targetPosition,
//         behavior: 'smooth'
//       });
//     }
//   }, [calculateSectionPosition]);

//   // Fonction principale pour naviguer vers une section
//   const navigateToSection = useCallback((sectionId: string, options?: {
//     page?: 'home' | 'projects';
//     immediate?: boolean;
//     offset?: number;
//   }) => {
//     const { page = 'home', immediate = false, offset = 0 } = options || {};

//     // Si on navigue vers la page des projets complète
//     if (sectionId === 'projects' && page === 'projects') {
//       navigate('/projects');
//       window.scrollTo(0, 0);
//       return;
//     }

//     // Si on est déjà sur la bonne page, scroll direct
//     if (location.pathname === '/' && page === 'home') {
//       scrollToSection(sectionId, { immediate, offset });
//       return;
//     }

//     // Navigation vers la home avec scroll différé
//     if (page === 'home') {
//       // Stocker l'intention de scroll avec les options
//       sessionStorage.setItem('pendingScroll', JSON.stringify({
//         sectionId,
//         immediate,
//         offset
//       }));
//       navigate('/');
//       return;
//     }

//     // Par défaut, navigation simple
//     const targetPath = page === 'projects' ? '/projects' : '/';
//     navigate(targetPath);
//   }, [navigate, location.pathname, scrollToSection]);

//   // Fonction pour naviguer vers un projet spécifique
//   const navigateToProject = useCallback((projectId: string) => {
//     navigate(`/projects/${projectId}`);
//     window.scrollTo(0, 0);
//   }, [navigate]);

//   // Fonction pour revenir à la home depuis n'importe où
//   const navigateToHome = useCallback((targetSection?: string, options?: {
//     immediate?: boolean;
//     offset?: number;
//   }) => {
//     if (targetSection) {
//       sessionStorage.setItem('pendingScroll', JSON.stringify({
//         sectionId: targetSection,
//         ...options
//       }));
//     }
//     navigate('/');
//   }, [navigate]);

//   // Utilitaire pour vérifier si on est sur une page spécifique
//   const isOnPage = useCallback((page: 'home' | 'projects' | 'project-detail') => {
//     switch (page) {
//       case 'home':
//         return location.pathname === '/';
//       case 'projects':
//         return location.pathname === '/projects';
//       case 'project-detail':
//         return location.pathname.startsWith('/projects/');
//       default:
//         return false;
//     }
//   }, [location.pathname]);

//   return {
//     navigateToSection,
//     navigateToProject,
//     navigateToHome,
//     scrollToSection,
//     isOnPage,
//     currentPath: location.pathname
//   };
// };





import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavigationOptions {
  page?: 'home' | 'projects';
  immediate?: boolean;
  offset?: number;
  onNavigate?: (sectionId: string) => void; // 🎯 NOUVEAU : Callback pour le pointage immédiat
}

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Fonction pour calculer la position exacte d'une section
  const calculateSectionPosition = useCallback((element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const navHeight = 80;
    const elementTop = rect.top + scrollTop;
    const targetPosition = elementTop - navHeight;
    
    return Math.max(0, targetPosition);
  }, []);

  // Fonction de scroll améliorée
  const scrollToSection = useCallback((sectionId: string, options?: {
    immediate?: boolean;
    offset?: number;
  }) => {
    const { immediate = false, offset = 0 } = options || {};
    
    const element = document.getElementById(sectionId);
    
    if (!element) {
      console.warn(`Section "${sectionId}" not found`);
      return;
    }

    const targetPosition = calculateSectionPosition(element) + offset;

    // Feedback visuel
    element.classList.add('section-highlight');
    setTimeout(() => {
      element.classList.remove('section-highlight');
    }, 1000);

    if (immediate) {
      window.scrollTo(0, targetPosition);
    } else {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }, [calculateSectionPosition]);

  // 🎯 FONCTION PRINCIPALE MODIFIÉE
  const navigateToSection = useCallback((sectionId: string, options?: NavigationOptions) => {
    const { page = 'home', immediate = false, offset = 0, onNavigate } = options || {};

    // 🎯 NOUVEAU : Appeler le callback pour le pointage immédiat
    if (onNavigate) {
      onNavigate(sectionId);
    }

    // Si on navigue vers la page des projets complète
    if (sectionId === 'projects' && page === 'projects') {
      navigate('/projects');
      window.scrollTo(0, 0);
      return;
    }

    // Si on est déjà sur la bonne page, scroll direct
    if (location.pathname === '/' && page === 'home') {
      scrollToSection(sectionId, { immediate, offset });
      return;
    }

    // Navigation vers la home avec scroll différé
    if (page === 'home') {
      sessionStorage.setItem('pendingScroll', JSON.stringify({
        sectionId,
        immediate,
        offset
      }));
      navigate('/');
      return;
    }

    // Par défaut, navigation simple
    const targetPath = page === 'projects' ? '/projects' : '/';
    navigate(targetPath);
  }, [navigate, location.pathname, scrollToSection]);

  // Fonction pour naviguer vers un projet spécifique
  const navigateToProject = useCallback((projectId: string) => {
    navigate(`/projects/${projectId}`);
    window.scrollTo(0, 0);
  }, [navigate]);

  // Fonction pour revenir à la home depuis n'importe où
  const navigateToHome = useCallback((targetSection?: string, options?: {
    immediate?: boolean;
    offset?: number;
  }) => {
    if (targetSection) {
      sessionStorage.setItem('pendingScroll', JSON.stringify({
        sectionId: targetSection,
        ...options
      }));
    }
    navigate('/');
  }, [navigate]);

  // Utilitaire pour vérifier si on est sur une page spécifique
  const isOnPage = useCallback((page: 'home' | 'projects' | 'project-detail') => {
    switch (page) {
      case 'home':
        return location.pathname === '/';
      case 'projects':
        return location.pathname === '/projects';
      case 'project-detail':
        return location.pathname.startsWith('/projects/');
      default:
        return false;
    }
  }, [location.pathname]);

  return {
    navigateToSection,
    navigateToProject,
    navigateToHome,
    scrollToSection,
    isOnPage,
    currentPath: location.pathname
  };
};