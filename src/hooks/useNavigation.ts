// src/hooks/useNavigation.ts

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