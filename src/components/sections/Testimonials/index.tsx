// // src/components/sections/Testimonials/index.tsx - VERSION PRO PERFORMANCE
// import { useState, useRef, lazy, Suspense, memo, useEffect, useCallback } from 'react';
// import { motion, useInView, AnimatePresence } from 'framer-motion';
// import { testimonialsData } from './types';
// import TestimonialCard from './components/TestimonialCard';
// import { ChevronLeft, ChevronRight, Quote, Star, Pause, Play } from 'lucide-react';

// const TestimonialsBackground = lazy(() => import('./components/TestimonialsBackground'));

// const BackgroundFallback = () => (
//   <div className="absolute inset-0 bg-gradient-to-br from-black via-[#4ADE80]/5 to-black">
//     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#4ADE80]/8 via-transparent to-transparent" />
//   </div>
// );

// const Testimonials = memo(() => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [progress, setProgress] = useState(0);
//   const [isReducedMotion, setIsReducedMotion] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
  
//   const sectionRef = useRef<HTMLElement>(null);
//   const headingRef = useRef<HTMLDivElement>(null);
//   const progressRef = useRef<number>(0);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
//   const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
//   const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });
  
//   const totalTestimonials = testimonialsData.length;
//   const AUTO_PLAY_DURATION = 12000; // ⚡ Réduit de 16s à 12s (plus professionnel)
//   const TRANSITION_DURATION = 800; // ⚡ Plus rapide
  
//   // Détection des préférences et appareil
//   useEffect(() => {
//     const checkSettings = () => {
//       setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkSettings();
//     const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
//     motionMedia.addEventListener('change', checkSettings);
//     window.addEventListener('resize', checkSettings);
    
//     return () => {
//       motionMedia.removeEventListener('change', checkSettings);
//       window.removeEventListener('resize', checkSettings);
//     };
//   }, []);
  
//   // 🎨 Track mouse avec throttling professionnel
//   useEffect(() => {
//     if (isMobile || isReducedMotion) return;
    
//     let ticking = false;
//     const handleMouseMove = (e: MouseEvent) => {
//       if (!ticking) {
//         requestAnimationFrame(() => {
//           setMousePosition({ x: e.clientX, y: e.clientY });
//           ticking = false;
//         });
//         ticking = true;
//       }
//     };
    
//     window.addEventListener('mousemove', handleMouseMove, { passive: true });
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, [isMobile, isReducedMotion]);
  
//   const handlePrevious = useCallback(() => {
//     if (isAnimating) return;
    
//     setIsAnimating(true);
//     setProgress(0);
//     progressRef.current = 0;
//     setCurrentIndex(prev => (prev - 1 + totalTestimonials) % totalTestimonials);
    
//     setTimeout(() => {
//       setIsAnimating(false);
//     }, TRANSITION_DURATION);
//   }, [isAnimating, totalTestimonials]);
  
//   const handleNext = useCallback(() => {
//     if (isAnimating) return;
    
//     setIsAnimating(true);
//     setProgress(0);
//     progressRef.current = 0;
//     setCurrentIndex(prev => (prev + 1) % totalTestimonials);
    
//     setTimeout(() => {
//       setIsAnimating(false);
//     }, TRANSITION_DURATION);
//   }, [isAnimating, totalTestimonials]);
  
//   const goToSlide = useCallback((index: number) => {
//     if (isAnimating || index === currentIndex) return;
    
//     setIsAnimating(true);
//     setProgress(0);
//     progressRef.current = 0;
//     setCurrentIndex(index);
    
//     setTimeout(() => {
//       setIsAnimating(false);
//     }, TRANSITION_DURATION);
//   }, [isAnimating, currentIndex]);
  
//   // 🎨 Gestion du clavier optimisée
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'ArrowLeft') handlePrevious();
//       else if (e.key === 'ArrowRight') handleNext();
//       else if (e.key === ' ') {
//         e.preventDefault();
//         setIsPlaying(prev => !prev);
//       }
//     };
    
//     window.addEventListener('keydown', handleKeyDown, { passive: false });
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [handleNext, handlePrevious]);
  
//   // ⚡ Auto-play optimisé avec progress bar fluide
//   useEffect(() => {
//     if (!isPlaying || isAnimating || isReducedMotion) return;
    
//     const startTime = Date.now();
//     progressRef.current = 0;
    
//     intervalRef.current = setInterval(() => {
//       const elapsed = Date.now() - startTime;
//       const newProgress = Math.min((elapsed / AUTO_PLAY_DURATION) * 100, 100);
      
//       progressRef.current = newProgress;
//       setProgress(newProgress);
      
//       if (newProgress >= 100) {
//         handleNext();
//       }
//     }, 100); // ⚡ Update plus fréquent pour fluidité
    
//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [isPlaying, currentIndex, isAnimating, handleNext, isReducedMotion]);
  
//   // Pause auto-play on hover
//   const handleMouseEnter = () => setIsPlaying(false);
//   const handleMouseLeave = () => setIsPlaying(true);
  
//   const headingVariants = {
//     hidden: { opacity: 0, y: -30, scale: 0.9 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       scale: 1,
//       transition: { 
//         type: "spring",
//         damping: 15,
//         stiffness: 120,
//         duration: 0.8 
//       }
//     }
//   };
  
//   return (
//     <section
//       id="testimonials"
//       ref={sectionRef}
//       className="relative min-h-screen overflow-hidden bg-black flex items-center py-20 mt-40"
//       style={{
//         background: `
//           radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
//             rgba(74, 222, 128, 0.06) 0%, 
//             transparent 50%),
//           linear-gradient(135deg, #000000 0%, #0a0f0a 50%, #000000 100%)
//         `
//       }}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       {/* 🎨 Curseur lumineux optimisé */}
//       {!isMobile && !isReducedMotion && (
//         <motion.div
//           className="fixed pointer-events-none z-30 w-60 h-60 rounded-full" // ⚡ Taille réduite
//           style={{
//             background: 'radial-gradient(circle, rgba(74, 222, 128, 0.04) 0%, transparent 70%)',
//             filter: 'blur(25px)', // ⚡ Blur réduit
//             x: mousePosition.x - 120,
//             y: mousePosition.y - 120,
//           }}
//           animate={{
//             scale: [1, 1.08, 1], // ⚡ Animation plus subtile
//             opacity: [0.3, 0.5, 0.3]
//           }}
//           transition={{
//             duration: 3, // ⚡ Plus rapide
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         />
//       )}

//       <Suspense fallback={<BackgroundFallback />}>
//         <TestimonialsBackground />
//       </Suspense>
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
//         {/* 🎨 En-tête optimisé */}
//         <motion.div
//           ref={headingRef}
//           variants={headingVariants}
//           initial="hidden"
//           animate={isHeadingInView ? "visible" : "hidden"}
//           className="text-center mb-16 relative"
//         >
//           <motion.div
//             className="absolute inset-0 blur-3xl opacity-20"
//             animate={!isReducedMotion ? {
//               scale: [1, 1.03, 1],
//               opacity: [0.2, 0.35, 0.2]
//             } : {}}
//             transition={{
//               duration: 3, // ⚡ Plus rapide
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           >
//             <h2 className="text-5xl md:text-7xl font-black text-[#4ADE80]">
//               Témoignages
//             </h2>
//           </motion.div>
          
//           <motion.div
//             className="absolute -top-4 left-1/2 transform -translate-x-1/2"
//             animate={!isReducedMotion ? {
//               y: [-8, -15, -8], // ⚡ Amplitude réduite
//               rotate: [0, 3, 0],
//               scale: [1, 1.05, 1]
//             } : {}}
//             transition={{
//               duration: 2.5, // ⚡ Plus rapide
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           >
//             <Quote className="w-8 h-8 text-[#4ADE80]/50" />
//           </motion.div>
          
//           <h2 className="relative text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
//             <span className="text-[#4ADE80]">Té</span>moignages
//           </h2>
          
//           <motion.p 
//             className="text-gray-300 max-w-2xl mx-auto text-lg"
//             initial={{ opacity: 0, y: 20 }}
//             animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.3, duration: 0.6 }}
//           >
//             Ce que mes clients et collègues disent à propos de mon travail.
//           </motion.p>
          
//           {/* 🎨 Étoiles avec animation optimisée */}
//           <div className="flex justify-center mt-4 space-x-1">
//             {[...Array(5)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, scale: 0 }}
//                 animate={isHeadingInView ? { 
//                   opacity: 1, 
//                   scale: 1,
//                   rotate: !isReducedMotion ? [0, 180, 0] : 0
//                 } : {}}
//                 transition={{ 
//                   delay: 0.5 + i * 0.08, // ⚡ Plus rapide
//                   duration: !isReducedMotion ? 1.5 : 0.5,
//                   repeat: !isReducedMotion ? Infinity : 0,
//                   repeatDelay: 6 // ⚡ Plus fréquent
//                 }}
//               >
//                 <Star className="w-5 h-5 text-[#4ADE80] fill-current" />
//               </motion.div>
//             ))}
//           </div>
          
//           <motion.div 
//             className="h-1 w-32 bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] mx-auto rounded-full mt-6"
//             initial={{ width: 0 }}
//             animate={isHeadingInView ? { width: 128 } : { width: 0 }}
//             transition={{ duration: 1, delay: 0.7 }}
//           />
//         </motion.div>
        
//         {/* 🎨 Contrôles optimisés */}
//         <div className="flex justify-center mb-8">
//           <motion.button
//             onClick={() => setIsPlaying(!isPlaying)}
//             className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full
//               border border-[#4ADE80]/30 text-[#4ADE80] hover:bg-[#4ADE80]/20 transition-colors"
//             whileHover={{ scale: 1.03 }} // ⚡ Scale réduit
//             whileTap={{ scale: 0.97 }}
//           >
//             {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//             <span className="text-sm">{isPlaying ? 'Pause' : 'Play'}</span>
//           </motion.button>
//         </div>
        
//         {/* 🎨 Carrousel optimisé */}
//         <div className="relative px-16">
//           {/* Bouton précédent */}
//           <motion.button
//             onClick={handlePrevious}
//             disabled={isAnimating}
//             className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20
//               w-14 h-14 bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] rounded-full 
//               flex items-center justify-center text-black font-bold
//               shadow-2xl shadow-[#4ADE80]/50 backdrop-blur-sm
//               border-2 border-white/20 disabled:opacity-50"
//             whileHover={{ 
//               scale: 1.08, // ⚡ Scale réduit
//               rotate: -8, // ⚡ Rotation réduite
//               boxShadow: "0 0 30px rgba(74, 222, 128, 0.6)" // ⚡ Glow réduit
//             }}
//             whileTap={{ scale: 0.92 }}
//           >
//             <ChevronLeft className="w-7 h-7" />
//           </motion.button>
          
//           {/* Conteneur des témoignages */}
//           <div className="relative overflow-hidden my-12 min-h-[500px] perspective-1000">
//             <AnimatePresence mode="wait">
//               {testimonialsData.map((testimonial, index) => (
//                 currentIndex === index && (
//                   <TestimonialCard
//                     key={testimonial.id}
//                     testimonial={testimonial}
//                     isActive={currentIndex === index}
//                   />
//                 )
//               ))}
//             </AnimatePresence>
//           </div>
          
//           {/* Bouton suivant */}
//           <motion.button
//             onClick={handleNext}
//             disabled={isAnimating}
//             className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20
//               w-14 h-14 bg-gradient-to-r from-[#22D3EE] to-[#4ADE80] rounded-full 
//               flex items-center justify-center text-black font-bold
//               shadow-2xl shadow-[#22D3EE]/50 backdrop-blur-sm
//               border-2 border-white/20 disabled:opacity-50"
//             whileHover={{ 
//               scale: 1.08,
//               rotate: 8,
//               boxShadow: "0 0 30px rgba(34, 211, 238, 0.6)"
//             }}
//             whileTap={{ scale: 0.92 }}
//           >
//             <ChevronRight className="w-7 h-7" />
//           </motion.button>
//         </div>
        
//         {/* 🎨 Indicateurs optimisés */}
//         <div className="flex justify-center mt-12 space-x-3">
//           {testimonialsData.map((_, index) => (
//             <motion.button
//               key={`indicator-${index}`}
//               onClick={() => goToSlide(index)}
//               className={`relative rounded-full transition-all duration-400 ${
//                 index === currentIndex 
//                   ? 'w-12 h-4 bg-gradient-to-r from-[#4ADE80] to-[#22D3EE]' 
//                   : 'w-4 h-4 bg-white/20 hover:bg-white/40'
//               }`}
//               whileHover={{ scale: 1.15 }} // ⚡ Scale réduit
//               whileTap={{ scale: 0.9 }}
//             >
//               {index === currentIndex && !isReducedMotion && (
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
//                   animate={{
//                     x: ['-100%', '200%']
//                   }}
//                   transition={{
//                     duration: 1.8, // ⚡ Plus rapide
//                     repeat: Infinity,
//                     ease: "easeInOut"
//                   }}
//                 />
//               )}
//             </motion.button>
//           ))}
//         </div>
        
//         {/* 🎨 Progress bar professionnelle */}
//         <div className="w-64 h-2 bg-white/10 rounded-full mx-auto mt-8 overflow-hidden relative">
//           <motion.div
//             className="h-full bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] rounded-full relative"
//             style={{ width: `${progress}%` }}
//             transition={{ duration: 0.1 }}
//           >
//             {/* Effet de brillance */}
//             {!isReducedMotion && (
//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
//                 animate={{
//                   x: ['-100%', '200%']
//                 }}
//                 transition={{
//                   duration: 1.5, // ⚡ Plus rapide
//                   repeat: Infinity,
//                   ease: "easeInOut"
//                 }}
//               />
//             )}
//           </motion.div>
          
//           {/* Segments pour chaque témoignage */}
//           <div className="absolute inset-0 flex">
//             {testimonialsData.map((_, index) => (
//               <div
//                 key={index}
//                 className="flex-1 border-r border-white/20 last:border-r-0"
//               />
//             ))}
//           </div>
//         </div>
        
//         {/* Timer display optimisé */}
//         <div className="text-center mt-4 text-[#4ADE80] text-sm">
//           {isPlaying && !isReducedMotion && `${Math.ceil((AUTO_PLAY_DURATION - (progress * AUTO_PLAY_DURATION / 100)) / 1000)}s`}
//         </div>
//       </div>
//     </section>
//   );
// });

// export default Testimonials;




// src/components/sections/Testimonials/index.tsx - VERSION SIMPLIFIÉE
import { useState, useRef, lazy, Suspense, memo, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { testimonialsData } from './types';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const TestimonialsBackground = lazy(() => import('./components/TestimonialsBackground'));

const BackgroundFallback = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-black via-[#4ADE80]/5 to-black">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#4ADE80]/8 via-transparent to-transparent" />
  </div>
);

// 🎯 COMPOSANT CARTE SIMPLIFIÉ - SANS ANIMATIONS EXCESSIVES
const TestimonialCard = memo(({ testimonial, isActive }: { testimonial: any, isActive: boolean }) => {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative mx-auto max-w-4xl"
    >
      {/* 🎯 CARTE SIMPLE ET ÉLÉGANTE */}
      <div className="relative bg-gradient-to-br from-gray-900/40 via-gray-800/30 to-gray-900/40 
                     backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10
                     shadow-lg hover:shadow-xl transition-all duration-300 p-8 md:p-12
                     hover:border-[#4ADE80]/30 group">
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* 🎯 SECTION PROFIL SIMPLIFIÉE */}
          <div className="flex flex-col items-center lg:items-start gap-4 lg:w-1/3">
            {/* Image de profil */}
            <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden
                           border-3 border-[#4ADE80]/50 mx-auto lg:mx-0 group-hover:border-[#4ADE80] transition-colors">
              {testimonial.personImage ? (
                <img
                  src={testimonial.personImage}
                  alt={testimonial.personName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#4ADE80] to-[#22D3EE] text-xl font-bold text-black">
                  {testimonial.personName.charAt(0)}
                </div>
              )}
            </div>
            
            {/* Étoiles */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[#4ADE80] fill-current" />
              ))}
            </div>
            
            {/* Informations de l'auteur */}
            <div className="text-center lg:text-left space-y-1">
              <div className="font-bold text-lg text-white">
                {testimonial.personName}
              </div>
              <div className="text-gray-400 text-sm">
                {testimonial.personTitle}
              </div>
              <div className="text-[#4ADE80] font-medium text-sm">
                {testimonial.company}
              </div>
            </div>
          </div>
          
          {/* 🎯 CONTENU DU TÉMOIGNAGE - SIMPLE ET DIRECT */}
          <div className="flex-1 lg:w-2/3">
            {/* Icône de guillemet */}
            <Quote className="w-8 h-8 text-[#4ADE80] opacity-60 mb-4" />
            
            {/* 🎯 TEXTE AFFICHÉ IMMÉDIATEMENT - SANS TYPEWRITER */}
            <blockquote className="text-gray-200 text-lg leading-relaxed mb-6 italic">
              "{testimonial.text}"
            </blockquote>
            
            {/* Badge de recommandation */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4ADE80]/10 
                           border border-[#4ADE80]/30 rounded-full text-[#4ADE80] text-sm font-medium">
              <Star className="w-3 h-3 fill-current" />
              Recommandation
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const Testimonials = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });
  
  const totalTestimonials = testimonialsData.length;
  const TRANSITION_DURATION = 300; // 🎯 Plus rapide
  
  // 🎯 NAVIGATION SIMPLIFIÉE
  const handlePrevious = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev - 1 + totalTestimonials) % totalTestimonials);
    setTimeout(() => setIsAnimating(false), TRANSITION_DURATION);
  }, [isAnimating, totalTestimonials]);
  
  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev + 1) % totalTestimonials);
    setTimeout(() => setIsAnimating(false), TRANSITION_DURATION);
  }, [isAnimating, totalTestimonials]);
  
  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), TRANSITION_DURATION);
  }, [isAnimating, currentIndex]);
  
  // 🎯 GESTION CLAVIER SIMPLIFIÉE
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      else if (e.key === 'ArrowRight') handleNext();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrevious]);
  
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black flex items-center py-20"
    >
      <Suspense fallback={<BackgroundFallback />}>
        <TestimonialsBackground />
      </Suspense>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* 🎯 EN-TÊTE SIMPLIFIÉ */}
        <motion.div
          ref={headingRef}
          variants={headingVariants}
          initial="hidden"
          animate={isHeadingInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="text-[#4ADE80]">Té</span>moignages
          </h2>
          
          <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-6">
            Ce que mes clients et collègues disent à propos de mon travail.
          </p>
          
          {/* 🎯 ÉTOILES SIMPLES */}
          <div className="flex justify-center mt-4 space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-[#4ADE80] fill-current" />
            ))}
          </div>
          
          <div className="h-1 w-24 bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] mx-auto rounded-full mt-6" />
        </motion.div>
        
        {/* 🎯 CARROUSEL SIMPLIFIÉ */}
        <div className="relative px-16">
          {/* Bouton précédent */}
          <button
            onClick={handlePrevious}
            disabled={isAnimating}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20
              w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full 
              flex items-center justify-center text-white
              border border-white/20 hover:bg-[#4ADE80]/20 hover:border-[#4ADE80]/50
              disabled:opacity-50 transition-all duration-200"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          {/* 🎯 CONTENEUR TÉMOIGNAGE SIMPLE */}
          <div className="relative overflow-hidden my-12 min-h-[400px]">
            {testimonialsData.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                isActive={currentIndex === index}
              />
            ))}
          </div>
          
          {/* Bouton suivant */}
          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20
              w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full 
              flex items-center justify-center text-white
              border border-white/20 hover:bg-[#4ADE80]/20 hover:border-[#4ADE80]/50
              disabled:opacity-50 transition-all duration-200"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        {/* 🎯 INDICATEURS SIMPLIFIÉS */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonialsData.map((_, index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-[#4ADE80] scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Aller au témoignage ${index + 1}`}
            />
          ))}
        </div>
        
        {/* 🎯 COMPTEUR SIMPLE */}
        <div className="text-center mt-6 text-gray-400 text-sm">
          {currentIndex + 1} / {testimonialsData.length}
        </div>
      </div>
    </section>
  );
});

export default Testimonials;