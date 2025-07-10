// 1️⃣ hooks/useNavigation.ts
// Hook centralisé pour toute la logique de navigation
import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Fonction principale pour naviguer vers une section
  const navigateToSection = useCallback((sectionId: string, options?: {
    page?: 'home' | 'projects';
    immediate?: boolean;
  }) => {
    const { page = 'home', immediate = false } = options || {};

    // Si on navigue vers la page des projets complète
    if (sectionId === 'projects' && page === 'projects') {
      navigate('/projects');
      window.scrollTo(0, 0);
      return;
    }

    // Si on est déjà sur la bonne page, scroll direct
    if (location.pathname === '/' && page === 'home') {
      scrollToSection(sectionId, immediate);
      return;
    }

    // Navigation vers la home avec scroll différé
    if (page === 'home') {
      // Stocker l'intention de scroll
      sessionStorage.setItem('pendingScroll', sectionId);
      navigate('/');
      return;
    }

    // Par défaut, navigation simple
    const targetPath = page === 'projects' ? '/projects' : '/';
    navigate(targetPath);
  }, [navigate, location.pathname]);

  // Fonction pour naviguer vers un projet spécifique
  const navigateToProject = useCallback((projectId: string) => {
    navigate(`/projects/${projectId}`);
    window.scrollTo(0, 0);
  }, [navigate]);

  // Fonction pour revenir à la home depuis n'importe où
  const navigateToHome = useCallback((targetSection?: string) => {
    if (targetSection) {
      sessionStorage.setItem('pendingScroll', targetSection);
    }
    navigate('/');
  }, [navigate]);

  // Fonction de scroll vers une section
  const scrollToSection = useCallback((sectionId: string, immediate = false) => {
    const element = document.getElementById(sectionId);
    
    if (!element) {
      console.warn(`Section "${sectionId}" not found`);
      return;
    }

    const yOffset = -80; // Hauteur de la navigation
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    if (immediate) {
      window.scrollTo(0, y);
    } else {
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  }, []);

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