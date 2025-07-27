// 🚀 components/layout/Navigation.tsx - VERSION MODIFIÉE
import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { useNavigation } from '../../hooks/useNavigation';
import { useActiveSection } from '../../hooks/useActiveSection';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const scrollThrottleRef = useRef<NodeJS.Timeout | null>(null);
  
  // 🎯 MODIFIÉ : Récupérer la fonction de pointage manuel
  const { activeSection, setActiveSectionManually } = useActiveSection();
  
  // Hook de navigation centralisé
  const { navigateToSection } = useNavigation();
  
  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projets' },
    { id: 'testimonials', label: 'Témoignages' },
    { id: 'contact', label: 'Contact' }
  ];

  // Fonction throttle pour l'événement de scroll
  const handleScroll = useCallback(() => {
    if (scrollThrottleRef.current) return;
    
    scrollThrottleRef.current = setTimeout(() => {
      setIsScrolled(window.scrollY > 50);
      scrollThrottleRef.current = null;
    }, 100);
  }, []);

  // Animation d'entrée
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo('.nav-container',
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
      );
      
      tl.fromTo('.nav-link', 
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
        "-=0.5"
      );
    }, navRef);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
      
      if (scrollThrottleRef.current) {
        clearTimeout(scrollThrottleRef.current);
      }
    };
  }, [handleScroll]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // 🎯 MODIFIÉ : Navigation avec pointage immédiat
  const handleNavClick = useCallback((sectionId: string) => {
    setIsMobileMenuOpen(false);
    
    // Feedback tactile si disponible
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    // 🎯 CLÉS : Pointer immédiatement puis naviguer
    navigateToSection(sectionId, {
      onNavigate: setActiveSectionManually
    });
  }, [navigateToSection, setActiveSectionManually]);

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 nav-container
        ${isScrolled 
           ? 'bg-gray-800/95 backdrop-blur-md py-3 border-b border-gray-700' 
           : 'bg-gray-900/90 backdrop-blur-sm py-6'
          }}`}
      style={{
        boxShadow: isScrolled ? '0 4px 12px rgba(255, 255, 255, 0.15)' : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="text-2xl font-bold text-white hover:text-[#4ADE80] 
              transition-all duration-300 relative group"
            aria-label="Accueil"
          >
            AFKDEV
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#4ADE80] 
              transition-all duration-300 group-hover:w-full" />
          </button>

          {/* Menu principal avec indicateur actif */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className={`nav-link relative px-2 py-2 text-lg transition-all duration-300 ${
                  activeSection === id 
                    ? 'text-[#4ADE80] font-semibold' 
                    : 'text-white hover:text-[#4ADE80]'
                }`}
              >
                {label}
                
                {/* Indicateur visuel de section active */}
                {activeSection === id && (
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#4ADE80] 
                    animate-pulse"></span>
                )}
                
                {/* Effet hover */}
                <span className={`absolute left-0 bottom-0 h-0.5 bg-[#4ADE80]/50 
                  transition-all duration-300 ${
                    activeSection === id ? 'w-0' : 'w-0 group-hover:w-full'
                  }`}></span>
              </button>
            ))}
          </div>

          {/* Bouton Contact avec indication si actif */}
          <button
            onClick={() => handleNavClick('contact')}
            className={`hidden md:flex px-6 py-2 border rounded-full 
              transition-all duration-300 transform hover:scale-105 ${
                activeSection === 'contact'
                  ? 'bg-[#4ADE80] text-black border-[#4ADE80] shadow-lg shadow-[#4ADE80]/30'
                  : 'bg-[#4ADE80]/10 border-[#4ADE80] text-[#4ADE80] hover:bg-[#4ADE80] hover:text-black'
              }`}
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

      {/* Menu Mobile - Contenu avec indicateur actif */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg border-t border-gray-700">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {menuItems.map(({ id, label }) => (
              <button
                key={`mobile-${id}`}
                onClick={() => handleNavClick(id)}
                className={`block w-full py-3 px-4 rounded-md text-center 
                  transition-colors duration-300 ${
                    activeSection === id
                      ? 'bg-[#4ADE80]/20 text-[#4ADE80] border border-[#4ADE80]/50'
                      : 'text-white hover:bg-[#4ADE80]/10 hover:text-[#4ADE80]'
                  }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('contact')}
              className={`block w-full mt-3 py-3 px-4 rounded-md text-center 
                transition-all duration-300 ${
                  activeSection === 'contact'
                    ? 'bg-[#4ADE80] text-black border border-[#4ADE80]'
                    : 'bg-[#4ADE80]/10 border border-[#4ADE80] text-[#4ADE80] hover:bg-[#4ADE80] hover:text-black'
                }`}
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