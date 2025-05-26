// src/components/layout/Navigation.tsx
import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const scrollThrottleRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'testimonials', label: 'Témoignages' },
    { id: 'contact', label: 'Contact' } // to come
  ];

  // Fonction throttle pour l'événement de scroll simplifiée
  const handleScroll = useCallback(() => {
    if (scrollThrottleRef.current) return;
    
    scrollThrottleRef.current = setTimeout(() => {
      setIsScrolled(window.scrollY > 50);
      scrollThrottleRef.current = null;
    }, 100); // throttle à 100ms
  }, []);

  // Animation d'entrée de la navigation
  useEffect(() => {
    // Utiliser un contexte GSAP pour faciliter le nettoyage
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline();
      
      tl.current.fromTo('.nav-container',
        { 
          y: -100,
          opacity: 0 
        },
        { 
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.5
        }
      );
      
      // Animation séquentielle des liens de navigation
      tl.current.fromTo('.nav-link', 
        {
          y: -20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out'
        },
        "-=0.5"
      );
    }, navRef);

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Appeler une fois au chargement pour définir l'état initial
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert(); // Nettoyer toutes les animations GSAP
      
      if (scrollThrottleRef.current) {
        clearTimeout(scrollThrottleRef.current);
      }
    };
  }, [handleScroll]);

  // Gestion du menu mobile
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Fonction pour faire défiler vers une section - mise à jour pour gérer les navigations
  const scrollToSection = useCallback((sectionId: string) => {
    // Si nous sommes sur une autre page, naviguer vers la page d'accueil avec l'ancre
    if (location.pathname !== '/') {
      sessionStorage.setItem(`scrollTo${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}`, 'true');
      navigate('/');
      return;
    }
    
    // Pour Home, défiler vers le haut de la page
    if (sectionId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
      return;
    }
    
    // Pour les autres sections
    const section = document.getElementById(sectionId);
    
    if (section) {
      const yOffset = -80; // Tenir compte de la hauteur de la barre de navigation
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
    
    // Fermer le menu mobile après avoir cliqué
    setIsMobileMenuOpen(false);
  }, [location.pathname, navigate]);

  // Gérer la navigation vers l'ancre lors du chargement de la page
  useEffect(() => {
    // Vérifier si nous avons une ancre dans l'URL
    if (location.hash && location.pathname === '/') {
      const sectionId = location.hash.substring(1); // Enlever le # du début
      
      // Utiliser setTimeout pour s'assurer que la page est complètement chargée
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 500);
    }
  }, [location.hash, location.pathname, scrollToSection]);

  return (
    // <nav 
    //   ref={navRef}
    //   className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 nav-container
    //     ${isScrolled 
    //        ? 'bg-gray-800 py-3 border-b border-gray-700' 
    //        : 'bg-gray-900 py-6'
    //       }}`}
    // >
    <nav 
  ref={navRef}
  className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 nav-container
    ${isScrolled 
       ? 'bg-gray-800 py-3 border-b border-gray-700' 
       : 'bg-gray-900 py-6'
      }}`}
  style={{
    boxShadow: isScrolled ? '0 4px 12px rgba(255, 255, 255, 0.15)' : 'none'
  }}
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('home')}
            className="text-2xl font-bold text-white hover:text-[#4ADE80] 
              transition-all duration-300 relative group"
            aria-label="Accueil"
          >
            AFKDEV
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#4ADE80] 
              transition-all duration-300 group-hover:w-full" />
          </button>

          {/* Menu principal - Tous les liens identiques, sans focus actif */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="nav-link relative px-2 py-2 text-lg text-white hover:text-[#4ADE80] 
                  transition-all duration-300"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Bouton Contact */}
          <button
            onClick={() => scrollToSection('contact')}
            className="hidden md:flex px-6 py-2 bg-[#4ADE80]/10 border border-[#4ADE80] 
              text-[#4ADE80] rounded-full hover:bg-[#4ADE80] hover:text-black
              transition-all duration-300 transform hover:scale-105"
          >
            Discutons
          </button>

          {/* Menu Mobile - Bouton */}
          <button 
            className="md:hidden w-10 h-10 flex items-center justify-center
              text-white hover:text-[#4ADE80] transition-colors duration-300"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Menu navigation"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16m-7 6h7" 
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Mobile - Contenu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-lg">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {menuItems.map(({ id, label }) => (
              <button
                key={`mobile-${id}`}
                onClick={() => scrollToSection(id)}
                className="block w-full py-3 px-4 rounded-md text-center 
                  text-white hover:bg-[#4ADE80]/10 hover:text-[#4ADE80]
                  transition-colors duration-300"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full mt-3 py-3 px-4 bg-[#4ADE80]/10 border border-[#4ADE80] 
                text-[#4ADE80] rounded-md text-center hover:bg-[#4ADE80] hover:text-black
                transition-all duration-300"
            >
              Discutons
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default memo(Navigation);