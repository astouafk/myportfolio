// src/components/sections/About/components/AboutImage.tsx - VERSION PRO PERFORMANCE
import { memo, useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import aboutImage from '../../../../assets/about.png';

const AboutImage = memo(() => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(imageContainerRef, { once: true, amount: 0.3 });
  const bubblesRef = useRef<(HTMLDivElement | null)[]>([]);
  const highlightsRef = useRef<(HTMLDivElement | null)[]>([]);
  const animationsRef = useRef<gsap.core.Timeline[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // ⚡ OPTIMISATION : Nombre d'éléments drastiquement réduit mais toujours visible
  const BUBBLE_COUNT = 4; // Au lieu de 8
  const HIGHLIGHT_COUNT = 3; // Au lieu de 5

  // Détection optimisée des paramètres
  useEffect(() => {
    const checkSettings = () => {
      setIsMobile(window.innerWidth < 768);
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };
    
    checkSettings();
    window.addEventListener('resize', checkSettings);
    
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionMedia.addEventListener('change', checkSettings);
    
    return () => {
      window.removeEventListener('resize', checkSettings);
      motionMedia.removeEventListener('change', checkSettings);
    };
  }, []);

  // 🎨 ANIMATIONS GSAP PROFESSIONNELLES mais optimisées
  useEffect(() => {
    if (!isInView || isReducedMotion) return;

    // Nettoyer les animations précédentes
    animationsRef.current.forEach(timeline => {
      if (timeline) timeline.kill();
    });
    animationsRef.current = [];

    // 🎨 Animation des bulles OPTIMISÉE
    if (!isMobile) { // Seulement sur desktop pour les performances
      const bubbleTimeline = gsap.timeline();
      
      bubblesRef.current.forEach((bubble, index) => {
        if (bubble) {
          const delay = index * 0.3; // ⚡ Délai plus espacé
          const duration = 3 + Math.random() * 2; // ⚡ Plus lent mais fluide
          
          // Animation Y optimisée
          bubbleTimeline.to(bubble, {
            y: -15 - Math.random() * 20, // ⚡ Amplitude réduite
            duration: duration,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: delay
          }, 0);
          
          // Animation d'opacité séparée et plus subtile
          bubbleTimeline.to(bubble, {
            opacity: 0.6, // ⚡ Moins intense
            duration: duration / 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: delay
          }, 0);
        }
      });
      
      animationsRef.current.push(bubbleTimeline);
    }

    // 🎨 Animation des reflets OPTIMISÉE
    const highlightTimeline = gsap.timeline();
    highlightsRef.current.forEach((highlight, index) => {
      if (highlight) {
        const delay = index * 0.4; // ⚡ Délai plus espacé
        const duration = 4 + Math.random() * 2; // ⚡ Plus lent
        
        // Animation d'opacité optimisée
        highlightTimeline.to(highlight, {
          opacity: 0.3, // ⚡ Moins intense
          duration: duration / 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: delay
        }, 0);
      }
    });
    animationsRef.current.push(highlightTimeline);

    // 🎨 Animation de l'image PROFESSIONNELLE
    const imageTimeline = gsap.timeline();
    if (imageContainerRef.current) {
      imageTimeline.to(imageContainerRef.current, {
        boxShadow: "0 0 25px rgba(74, 222, 128, 0.2)", // ⚡ Effet plus subtil
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    animationsRef.current.push(imageTimeline);

    // Cleanup
    return () => {
      animationsRef.current.forEach(timeline => {
        if (timeline) timeline.kill();
      });
    };
  }, [isInView, isMobile, isReducedMotion]);

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {/* 🎨 Container de l'image avec effet professionnel */}
      <motion.div
        ref={imageContainerRef}
        initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
        animate={isInView ? { 
          opacity: 1, 
          scale: 1,
          rotateY: 0 
        } : {}}
        transition={{ 
          duration: 1, 
          ease: "easeOut",
          type: "spring",
          damping: 20,
          stiffness: 100
        }}
        className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-4 sm:p-6 rounded-xl overflow-hidden
          shadow-lg shadow-black/50 z-10 transform-gpu"
        whileHover={!isMobile ? {
          scale: 1.02,
          rotateY: 2,
          transition: { duration: 0.3, ease: "easeOut" }
        } : undefined}
      >
        {/* Image principale optimisée */}
        <img
          src={aboutImage}
          alt="Developer Workspace"
          className="rounded-lg w-full h-auto object-contain relative z-10"
          style={{ 
            minHeight: "320px",
            maxHeight: "550px"
          }}
          loading="lazy" // ⚡ Lazy loading
        />

        {/* Calque de grain léger */}
        <div
          className="absolute inset-0 mix-blend-overlay opacity-20 z-20"
          style={{
            backgroundImage: 'url("/noise.png")',
          }}
        />

        {/* Effet de bordure brillante professionnel */}
        <motion.div 
          className="absolute inset-0 rounded-xl border border-[#4ADE80]/20 z-30"
          animate={!isReducedMotion ? {
            borderColor: [
              'rgba(74, 222, 128, 0.2)',
              'rgba(74, 222, 128, 0.4)',
              'rgba(74, 222, 128, 0.2)'
            ]
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* 🎨 Éléments décoratifs OPTIMISÉS */}
      {!isReducedMotion && (
        <>
          {/* Bulles optimisées - seulement sur desktop */}
          {!isMobile && Array.from({ length: BUBBLE_COUNT }).map((_, i) => (
            <div
              key={`bubble-${i}`}
              ref={el => bubblesRef.current[i] = el}
              className="absolute rounded-full bg-[#4ADE80]/30 blur-sm opacity-25 z-0" // 🎨 Plus visible
              style={{
                width: `${8 + Math.random() * 12}px`, // ⚡ Taille réduite
                height: `${8 + Math.random() * 12}px`,
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
            />
          ))}

          {/* Points de reflet optimisés */}
          {Array.from({ length: HIGHLIGHT_COUNT }).map((_, i) => (
            <div
              key={`highlight-${i}`}
              ref={el => highlightsRef.current[i] = el}
              className="absolute rounded-full bg-white/40 blur-md opacity-15 z-0" // 🎨 Plus visible
              style={{
                width: `${3 + Math.random() * 6}px`, // ⚡ Taille réduite
                height: `${3 + Math.random() * 6}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </>
      )}

      {/* 🎨 Effet de lueur ambient professionnel */}
      <motion.div 
        className="absolute -inset-6 bg-gradient-radial from-[#4ADE80]/12 to-transparent blur-2xl opacity-30 z-0"
        animate={!isReducedMotion ? {
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
});

export default AboutImage;