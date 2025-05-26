// src/components/sections/Testimonials/index.tsx
import { useState, useRef, lazy, Suspense, memo, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { testimonialsData } from './types';
import TestimonialCard from './components/TestimonialCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Chargement dynamique de l'arrière-plan
const TestimonialsBackground = lazy(() => import('./components/TestimonialsBackground'));

// Fallback pour le chargement de l'arrière-plan
const BackgroundFallback = () => <div className="absolute inset-0 bg-black/50" />;

const Testimonials = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });
  
  // Nombre total de témoignages
  const totalTestimonials = testimonialsData.length;
  
  // Navigation précédente
  const handlePrevious = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(prev => (prev - 1 + totalTestimonials) % totalTestimonials);
    
    // Réinitialiser l'état d'animation après la transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  }, [isAnimating, totalTestimonials]);
  
  // Navigation suivante
  const handleNext = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(prev => (prev + 1) % totalTestimonials);
    
    // Réinitialiser l'état d'animation après la transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  }, [isAnimating, totalTestimonials]);
  
  // Gestion du clavier pour la navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNext, handlePrevious]);
  
  // Animation de l'en-tête
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };
  
  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black flex items-center py-20"
    >
      {/* Arrière-plan */}
      <Suspense fallback={<BackgroundFallback />}>
        <TestimonialsBackground />
      </Suspense>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* En-tête */}
        <motion.div
          ref={headingRef}
          variants={headingVariants}
          initial="hidden"
          animate={isHeadingInView ? "visible" : "hidden"}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="text-[#4ADE80]">Té</span>moignages
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Ce que mes clients et collègues disent à propos de mon travail.
          </p>
        </motion.div>
        
        {/* Carrousel de témoignages */}
        <div className="relative px-10">
          {/* Bouton précédent */}
          <button
            onClick={handlePrevious}
            disabled={isAnimating}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10
              w-10 h-10 sm:w-12 sm:h-12 bg-black/50 rounded-full flex items-center justify-center
              border border-[#4ADE80]/30 text-[#4ADE80] hover:bg-[#4ADE80]/20 transition-colors"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          {/* Conteneur des témoignages */}
          <div className="relative overflow-hidden my-8 min-h-[300px] sm:min-h-[250px]">
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
          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10
              w-10 h-10 sm:w-12 sm:h-12 bg-black/50 rounded-full flex items-center justify-center
              border border-[#4ADE80]/30 text-[#4ADE80] hover:bg-[#4ADE80]/20 transition-colors"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        {/* Indicateurs de position */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonialsData.map((_, index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAnimating(false), 600);
                }
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-[#4ADE80]' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Aller au témoignage ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Testimonials;