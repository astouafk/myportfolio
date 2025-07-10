// src/components/sections/Testimonials/index.tsx - VERSION PRO PERFORMANCE
import { useState, useRef, lazy, Suspense, memo, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { testimonialsData } from './types';
import TestimonialCard from './components/TestimonialCard';
import { ChevronLeft, ChevronRight, Quote, Star, Pause, Play } from 'lucide-react';

const TestimonialsBackground = lazy(() => import('./components/TestimonialsBackground'));

const BackgroundFallback = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-black via-[#4ADE80]/5 to-black">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#4ADE80]/8 via-transparent to-transparent" />
  </div>
);

const Testimonials = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });
  
  const totalTestimonials = testimonialsData.length;
  const AUTO_PLAY_DURATION = 12000; // ⚡ Réduit de 16s à 12s (plus professionnel)
  const TRANSITION_DURATION = 800; // ⚡ Plus rapide
  
  // Détection des préférences et appareil
  useEffect(() => {
    const checkSettings = () => {
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      setIsMobile(window.innerWidth < 768);
    };
    
    checkSettings();
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionMedia.addEventListener('change', checkSettings);
    window.addEventListener('resize', checkSettings);
    
    return () => {
      motionMedia.removeEventListener('change', checkSettings);
      window.removeEventListener('resize', checkSettings);
    };
  }, []);
  
  // 🎨 Track mouse avec throttling professionnel
  useEffect(() => {
    if (isMobile || isReducedMotion) return;
    
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, isReducedMotion]);
  
  const handlePrevious = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setProgress(0);
    progressRef.current = 0;
    setCurrentIndex(prev => (prev - 1 + totalTestimonials) % totalTestimonials);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, TRANSITION_DURATION);
  }, [isAnimating, totalTestimonials]);
  
  const handleNext = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setProgress(0);
    progressRef.current = 0;
    setCurrentIndex(prev => (prev + 1) % totalTestimonials);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, TRANSITION_DURATION);
  }, [isAnimating, totalTestimonials]);
  
  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    
    setIsAnimating(true);
    setProgress(0);
    progressRef.current = 0;
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, TRANSITION_DURATION);
  }, [isAnimating, currentIndex]);
  
  // 🎨 Gestion du clavier optimisée
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrevious]);
  
  // ⚡ Auto-play optimisé avec progress bar fluide
  useEffect(() => {
    if (!isPlaying || isAnimating || isReducedMotion) return;
    
    const startTime = Date.now();
    progressRef.current = 0;
    
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / AUTO_PLAY_DURATION) * 100, 100);
      
      progressRef.current = newProgress;
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        handleNext();
      }
    }, 100); // ⚡ Update plus fréquent pour fluidité
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentIndex, isAnimating, handleNext, isReducedMotion]);
  
  // Pause auto-play on hover
  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(true);
  
  const headingVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        damping: 15,
        stiffness: 120,
        duration: 0.8 
      }
    }
  };
  
  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black flex items-center py-20 mt-40"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(74, 222, 128, 0.06) 0%, 
            transparent 50%),
          linear-gradient(135deg, #000000 0%, #0a0f0a 50%, #000000 100%)
        `
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 🎨 Curseur lumineux optimisé */}
      {!isMobile && !isReducedMotion && (
        <motion.div
          className="fixed pointer-events-none z-30 w-60 h-60 rounded-full" // ⚡ Taille réduite
          style={{
            background: 'radial-gradient(circle, rgba(74, 222, 128, 0.04) 0%, transparent 70%)',
            filter: 'blur(25px)', // ⚡ Blur réduit
            x: mousePosition.x - 120,
            y: mousePosition.y - 120,
          }}
          animate={{
            scale: [1, 1.08, 1], // ⚡ Animation plus subtile
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 3, // ⚡ Plus rapide
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      <Suspense fallback={<BackgroundFallback />}>
        <TestimonialsBackground />
      </Suspense>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* 🎨 En-tête optimisé */}
        <motion.div
          ref={headingRef}
          variants={headingVariants}
          initial="hidden"
          animate={isHeadingInView ? "visible" : "hidden"}
          className="text-center mb-16 relative"
        >
          <motion.div
            className="absolute inset-0 blur-3xl opacity-20"
            animate={!isReducedMotion ? {
              scale: [1, 1.03, 1],
              opacity: [0.2, 0.35, 0.2]
            } : {}}
            transition={{
              duration: 3, // ⚡ Plus rapide
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-[#4ADE80]">
              Témoignages
            </h2>
          </motion.div>
          
          <motion.div
            className="absolute -top-4 left-1/2 transform -translate-x-1/2"
            animate={!isReducedMotion ? {
              y: [-8, -15, -8], // ⚡ Amplitude réduite
              rotate: [0, 3, 0],
              scale: [1, 1.05, 1]
            } : {}}
            transition={{
              duration: 2.5, // ⚡ Plus rapide
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Quote className="w-8 h-8 text-[#4ADE80]/50" />
          </motion.div>
          
          <h2 className="relative text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
            <span className="text-[#4ADE80]">Té</span>moignages
          </h2>
          
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Ce que mes clients et collègues disent à propos de mon travail.
          </motion.p>
          
          {/* 🎨 Étoiles avec animation optimisée */}
          <div className="flex justify-center mt-4 space-x-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={isHeadingInView ? { 
                  opacity: 1, 
                  scale: 1,
                  rotate: !isReducedMotion ? [0, 180, 0] : 0
                } : {}}
                transition={{ 
                  delay: 0.5 + i * 0.08, // ⚡ Plus rapide
                  duration: !isReducedMotion ? 1.5 : 0.5,
                  repeat: !isReducedMotion ? Infinity : 0,
                  repeatDelay: 6 // ⚡ Plus fréquent
                }}
              >
                <Star className="w-5 h-5 text-[#4ADE80] fill-current" />
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="h-1 w-32 bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] mx-auto rounded-full mt-6"
            initial={{ width: 0 }}
            animate={isHeadingInView ? { width: 128 } : { width: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          />
        </motion.div>
        
        {/* 🎨 Contrôles optimisés */}
        <div className="flex justify-center mb-8">
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full
              border border-[#4ADE80]/30 text-[#4ADE80] hover:bg-[#4ADE80]/20 transition-colors"
            whileHover={{ scale: 1.03 }} // ⚡ Scale réduit
            whileTap={{ scale: 0.97 }}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="text-sm">{isPlaying ? 'Pause' : 'Play'}</span>
          </motion.button>
        </div>
        
        {/* 🎨 Carrousel optimisé */}
        <div className="relative px-16">
          {/* Bouton précédent */}
          <motion.button
            onClick={handlePrevious}
            disabled={isAnimating}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20
              w-14 h-14 bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] rounded-full 
              flex items-center justify-center text-black font-bold
              shadow-2xl shadow-[#4ADE80]/50 backdrop-blur-sm
              border-2 border-white/20 disabled:opacity-50"
            whileHover={{ 
              scale: 1.08, // ⚡ Scale réduit
              rotate: -8, // ⚡ Rotation réduite
              boxShadow: "0 0 30px rgba(74, 222, 128, 0.6)" // ⚡ Glow réduit
            }}
            whileTap={{ scale: 0.92 }}
          >
            <ChevronLeft className="w-7 h-7" />
          </motion.button>
          
          {/* Conteneur des témoignages */}
          <div className="relative overflow-hidden my-12 min-h-[500px] perspective-1000">
            <AnimatePresence mode="wait">
              {testimonialsData.map((testimonial, index) => (
                currentIndex === index && (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    isActive={currentIndex === index}
                  />
                )
              ))}
            </AnimatePresence>
          </div>
          
          {/* Bouton suivant */}
          <motion.button
            onClick={handleNext}
            disabled={isAnimating}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20
              w-14 h-14 bg-gradient-to-r from-[#22D3EE] to-[#4ADE80] rounded-full 
              flex items-center justify-center text-black font-bold
              shadow-2xl shadow-[#22D3EE]/50 backdrop-blur-sm
              border-2 border-white/20 disabled:opacity-50"
            whileHover={{ 
              scale: 1.08,
              rotate: 8,
              boxShadow: "0 0 30px rgba(34, 211, 238, 0.6)"
            }}
            whileTap={{ scale: 0.92 }}
          >
            <ChevronRight className="w-7 h-7" />
          </motion.button>
        </div>
        
        {/* 🎨 Indicateurs optimisés */}
        <div className="flex justify-center mt-12 space-x-3">
          {testimonialsData.map((_, index) => (
            <motion.button
              key={`indicator-${index}`}
              onClick={() => goToSlide(index)}
              className={`relative rounded-full transition-all duration-400 ${
                index === currentIndex 
                  ? 'w-12 h-4 bg-gradient-to-r from-[#4ADE80] to-[#22D3EE]' 
                  : 'w-4 h-4 bg-white/20 hover:bg-white/40'
              }`}
              whileHover={{ scale: 1.15 }} // ⚡ Scale réduit
              whileTap={{ scale: 0.9 }}
            >
              {index === currentIndex && !isReducedMotion && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 1.8, // ⚡ Plus rapide
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>
        
        {/* 🎨 Progress bar professionnelle */}
        <div className="w-64 h-2 bg-white/10 rounded-full mx-auto mt-8 overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] rounded-full relative"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          >
            {/* Effet de brillance */}
            {!isReducedMotion && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 1.5, // ⚡ Plus rapide
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.div>
          
          {/* Segments pour chaque témoignage */}
          <div className="absolute inset-0 flex">
            {testimonialsData.map((_, index) => (
              <div
                key={index}
                className="flex-1 border-r border-white/20 last:border-r-0"
              />
            ))}
          </div>
        </div>
        
        {/* Timer display optimisé */}
        <div className="text-center mt-4 text-[#4ADE80] text-sm">
          {isPlaying && !isReducedMotion && `${Math.ceil((AUTO_PLAY_DURATION - (progress * AUTO_PLAY_DURATION / 100)) / 1000)}s`}
        </div>
      </div>
    </section>
  );
});

export default Testimonials;