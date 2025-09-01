// src/components/sections/Hero/components/HeroTitle.tsx - VERSION OPTIMISÉE
import { useRef, useEffect, useState, memo } from 'react';
import { gsap } from 'gsap';
import Typed from 'typed.js';

export const HeroTitle = memo(() => {
  const nameRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const typedElementRef = useRef<HTMLSpanElement>(null);
  const typedInstanceRef = useRef<Typed | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Détection optimisée
  useEffect(() => {
    const checkSettings = () => {
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      setIsMobile(window.innerWidth < 768);
    };
    
    checkSettings();
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkSettings);
    
    window.addEventListener('resize', checkSettings);
    
    return () => {
      mediaQuery.removeEventListener('change', checkSettings);
      window.removeEventListener('resize', checkSettings);
    };
  }, []);

  // Observer l'intersection optimisé
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // ⚡ Déconnecter après première apparition
          }
        });
      },
      { threshold: 0.2, rootMargin: '50px' } // ⚡ Marge plus grande
    );
    
    if (nameRef.current) {
      observer.observe(nameRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // ⚡ ANIMATIONS ULTRA-SIMPLIFIÉES
  useEffect(() => {
    if (!isVisible) return;
    
    // Nettoyer l'ancienne timeline
    if (tlRef.current) {
      tlRef.current.kill();
    }
    
    if (isReducedMotion) {
      // Mode sans animation : apparition instantanée
      if (nameRef.current) {
        gsap.set(nameRef.current, { opacity: 1, y: 0 });
      }
      if (descRef.current) {
        gsap.set(descRef.current, { opacity: 1, y: 0 });
      }
    } else {
      // ⚡ Animation simplifiée : seulement fade + slide
      const tl = gsap.timeline({ 
        defaults: { 
          ease: "power2.out",
          duration: isMobile ? 0.8 : 1
        }
      });
      
      tlRef.current = tl;
      
      tl.fromTo(nameRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0 }
      )
      .fromTo(descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        "-=0.5"
      );
    }
    
    // ⚡ TYPED.JS OPTIMISÉ
    if (typedElementRef.current) {
      // Cleanup l'ancienne instance
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
      }
      
      // Configuration simplifiée et plus rapide
      typedInstanceRef.current = new Typed(typedElementRef.current, {
        strings: [
          "Fullstack Developer",
          "IT Manager"
        ],
        typeSpeed: isReducedMotion ? 0 : (isMobile ? 70 : 50), // ⚡ Plus rapide
        backSpeed: isReducedMotion ? 0 : (isMobile ? 40 : 30),
        backDelay: isReducedMotion ? 500 : 1000, // ⚡ Délai réduit
        loop: true,
        showCursor: !isReducedMotion, // Pas de curseur si animations réduites
        cursorChar: '|',
        smartBackspace: true,
        startDelay: isReducedMotion ? 0 : 800 // ⚡ Démarrage plus rapide
      });
    }
    
    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
      
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
      }
    };
  }, [isVisible, isReducedMotion, isMobile]);

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 relative mb-10">
      
      <div ref={nameRef} className="space-y-2">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white">
          {/* <p className="text-sm sm:text-base md:text-xl text-white mt-10">JE SUIS</p> */}
          <span className="text-[#4ADE80]">Astou Fall KANE</span>
        </h1>
      </div>
      
      <div className="text-xl sm:text-2xl md:text-3xl font-semibold">
        <span className="text-white"> </span>
        <span 
          id="typed-text" 
          ref={typedElementRef} 
          className="text-[#4ADE80]"
        ></span>
      </div>
      
      <div ref={descRef} className="relative">
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl">
          Créatrice de solutions digitales innovantes, je donne vie à vos projets.
          Ensemble créons une expérience utilisateur exceptionnelle grâce à un code élégant et efficace.
        </p>
        {/* ⚡ Ligne décorative simplifiée */}
        <div className="absolute -left-3 sm:-left-5 top-0 w-0.5 sm:w-1 h-full bg-gradient-to-b
           from-[#4ADE80] via-[#4ADE80]/50 to-transparent" />
      </div>
    </div>
  );
});

export default HeroTitle;