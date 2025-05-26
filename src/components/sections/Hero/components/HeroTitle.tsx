// src/components/sections/Hero/components/HeroTitle.tsx
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

  // Détecter les préférences d'accessibilité et le type d'appareil
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

  // Observer l'intersection pour n'animer que lorsque visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (nameRef.current) {
      observer.observe(nameRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Gérer les animations en fonction de la visibilité et des préférences
  useEffect(() => {
    if (!isVisible) return;
    
    // Nettoyer l'ancienne timeline si elle existe
    if (tlRef.current) {
      tlRef.current.kill();
    }
    
    // Créer une nouvelle timeline avec GSAP
    const tl = gsap.timeline({ 
      defaults: { 
        ease: isReducedMotion ? "none" : "power4.out",
        duration: isReducedMotion ? 0.1 : (isMobile ? 1 : 1.5)
      }
    });
    
    tlRef.current = tl;
    
    if (isReducedMotion) {
      // Version sans animation pour les préférences réduites
      if (nameRef.current) {
        gsap.set(nameRef.current, { 
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          opacity: 1
        });
      }
      
      if (descRef.current) {
        gsap.set(descRef.current, {
          y: 0,
          opacity: 1
        });
      }
    } else {
      // Version avec animations
      tl.fromTo(nameRef.current,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0 },
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }
      )
      .fromTo(descRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: isMobile ? 0.8 : 1 },
        "-=1"
      );
    }
    
    // Initialiser Typed.js pour les rôles
    if (typedElementRef.current) {
      // Cleanup l'ancienne instance si elle existe
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
      }
      
      // Typed.js pour les rôles avec vitesse adaptée
      typedInstanceRef.current = new Typed(typedElementRef.current, {
        strings: [
          "Frontend Developer",
          "Backend Developer",
          "Fullstack and Mobile Developer"
        ],
        typeSpeed: isReducedMotion ? 0 : 50,
        backSpeed: isReducedMotion ? 0 : 30,
        backDelay: isReducedMotion ? 500 : 1500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        smartBackspace: true
      });
    }
    
    // Cleanup
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
      {/* <div className="absolute -top-6 sm:-top-8 -left-4 sm:-left-10 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#4ADE80]/10
         border border-[#4ADE80]/20 rounded-lg backdrop-blur-sm animate-float mb-10">
        <span className="text-[#4ADE80] text-xs sm:text-sm font-medium mb-10">
          Available for freelance
        </span>
      </div> */}
      
      <div ref={nameRef} className="space-y-2">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white">
          <p className="text-sm sm:text-base md:text-xl text-white mt-10">JE SUIS</p>
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
        <div className="absolute -left-3 sm:-left-5 top-0 w-0.5 sm:w-1 h-full bg-gradient-to-b
           from-[#4ADE80] via-[#4ADE80]/50 to-transparent" />
      </div>
    </div>
  );
});

export default HeroTitle;