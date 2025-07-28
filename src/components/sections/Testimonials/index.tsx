// // src/components/sections/Testimonials/index.tsx - VERSION SIMPLIFIÉE
// import { useState, useRef, lazy, Suspense, memo, useEffect, useCallback } from 'react';
// import { motion, useInView } from 'framer-motion';
// import { testimonialsData } from './types';
// import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

// const TestimonialsBackground = lazy(() => import('./components/TestimonialsBackground'));

// const BackgroundFallback = () => (
//   <div className="absolute inset-0 bg-gradient-to-br from-black via-[#4ADE80]/5 to-black">
//     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#4ADE80]/8 via-transparent to-transparent" />
//   </div>
// );

// // 🎯 COMPOSANT CARTE SIMPLIFIÉ - SANS ANIMATIONS EXCESSIVES
// const TestimonialCard = memo(({ testimonial, isActive }: { testimonial: any, isActive: boolean }) => {
//   if (!isActive) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 50 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: -50 }}
//       transition={{ duration: 0.4, ease: "easeOut" }}
//       className="relative mx-auto max-w-4xl"
//     >
//       {/* 🎯 CARTE SIMPLE ET ÉLÉGANTE */}
//       <div className="relative bg-gradient-to-br from-gray-900/40 via-gray-800/30 to-gray-900/40 
//                      backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10
//                      shadow-lg hover:shadow-xl transition-all duration-300 p-8 md:p-12
//                      hover:border-[#4ADE80]/30 group">
        
//         <div className="flex flex-col lg:flex-row gap-8 items-start">
//           {/* 🎯 SECTION PROFIL SIMPLIFIÉE */}
//           <div className="flex flex-col items-center lg:items-start gap-4 lg:w-1/3">
//             {/* Image de profil */}
//             <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden
//                            border-3 border-[#4ADE80]/50 mx-auto lg:mx-0 group-hover:border-[#4ADE80] transition-colors">
//               {testimonial.personImage ? (
//                 <img
//                   src={testimonial.personImage}
//                   alt={testimonial.personName}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#4ADE80] to-[#22D3EE] text-xl font-bold text-black">
//                   {testimonial.personName.charAt(0)}
//                 </div>
//               )}
//             </div>
            
//             {/* Étoiles */}
//             <div className="flex gap-1">
//               {[...Array(5)].map((_, i) => (
//                 <Star key={i} className="w-4 h-4 text-[#4ADE80] fill-current" />
//               ))}
//             </div>
            
//             {/* Informations de l'auteur */}
//             <div className="text-center lg:text-left space-y-1">
//               <div className="font-bold text-lg text-white">
//                 {testimonial.personName}
//               </div>
//               <div className="text-gray-400 text-sm">
//                 {testimonial.personTitle}
//               </div>
//               <div className="text-[#4ADE80] font-medium text-sm">
//                 {testimonial.company}
//               </div>
//             </div>
//           </div>
          
//           {/* 🎯 CONTENU DU TÉMOIGNAGE - SIMPLE ET DIRECT */}
//           <div className="flex-1 lg:w-2/3">
//             {/* Icône de guillemet */}
//             <Quote className="w-8 h-8 text-[#4ADE80] opacity-60 mb-4" />
            
//             {/* 🎯 TEXTE AFFICHÉ IMMÉDIATEMENT - SANS TYPEWRITER */}
//             <blockquote className="text-gray-200 text-lg leading-relaxed mb-6 italic">
//               "{testimonial.text}"
//             </blockquote>
            
//             {/* Badge de recommandation */}
//             <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4ADE80]/10 
//                            border border-[#4ADE80]/30 rounded-full text-[#4ADE80] text-sm font-medium">
//               <Star className="w-3 h-3 fill-current" />
//               Recommandation
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// });

// const Testimonials = memo(() => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);
  
//   const sectionRef = useRef<HTMLElement>(null);
//   const headingRef = useRef<HTMLDivElement>(null);
  
//   const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
//   const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });
  
//   const totalTestimonials = testimonialsData.length;
//   const TRANSITION_DURATION = 300; // 🎯 Plus rapide
  
//   // 🎯 NAVIGATION SIMPLIFIÉE
//   const handlePrevious = useCallback(() => {
//     if (isAnimating) return;
//     setIsAnimating(true);
//     setCurrentIndex(prev => (prev - 1 + totalTestimonials) % totalTestimonials);
//     setTimeout(() => setIsAnimating(false), TRANSITION_DURATION);
//   }, [isAnimating, totalTestimonials]);
  
//   const handleNext = useCallback(() => {
//     if (isAnimating) return;
//     setIsAnimating(true);
//     setCurrentIndex(prev => (prev + 1) % totalTestimonials);
//     setTimeout(() => setIsAnimating(false), TRANSITION_DURATION);
//   }, [isAnimating, totalTestimonials]);
  
//   const goToSlide = useCallback((index: number) => {
//     if (isAnimating || index === currentIndex) return;
//     setIsAnimating(true);
//     setCurrentIndex(index);
//     setTimeout(() => setIsAnimating(false), TRANSITION_DURATION);
//   }, [isAnimating, currentIndex]);
  
//   // 🎯 GESTION CLAVIER SIMPLIFIÉE
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'ArrowLeft') handlePrevious();
//       else if (e.key === 'ArrowRight') handleNext();
//     };
    
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [handleNext, handlePrevious]);
  
//   const headingVariants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { 
//         duration: 0.6,
//         ease: "easeOut"
//       }
//     }
//   };
  
//   return (
//     <section
//       id="testimonials"
//       ref={sectionRef}
//       className="relative min-h-screen overflow-hidden bg-black flex items-center py-20"
//     >
//       <Suspense fallback={<BackgroundFallback />}>
//         <TestimonialsBackground />
//       </Suspense>
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
//         {/* 🎯 EN-TÊTE SIMPLIFIÉ */}
//         <motion.div
//           ref={headingRef}
//           variants={headingVariants}
//           initial="hidden"
//           animate={isHeadingInView ? "visible" : "hidden"}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
//             <span className="text-[#4ADE80]">Té</span>moignages
//           </h2>
          
//           <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-6">
//             Ce que mes clients et collègues disent à propos de mon travail.
//           </p>
          
//           {/* 🎯 ÉTOILES SIMPLES */}
//           <div className="flex justify-center mt-4 space-x-1">
//             {[...Array(5)].map((_, i) => (
//               <Star key={i} className="w-5 h-5 text-[#4ADE80] fill-current" />
//             ))}
//           </div>
          
//           <div className="h-1 w-24 bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] mx-auto rounded-full mt-6" />
//         </motion.div>
        
//         {/* 🎯 CARROUSEL SIMPLIFIÉ */}
//         <div className="relative px-16">
//           {/* Bouton précédent */}
//           <button
//             onClick={handlePrevious}
//             disabled={isAnimating}
//             className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20
//               w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full 
//               flex items-center justify-center text-white
//               border border-white/20 hover:bg-[#4ADE80]/20 hover:border-[#4ADE80]/50
//               disabled:opacity-50 transition-all duration-200"
//             aria-label="Témoignage précédent"
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </button>
          
//           {/* 🎯 CONTENEUR TÉMOIGNAGE SIMPLE */}
//           <div className="relative overflow-hidden my-12 min-h-[400px]">
//             {testimonialsData.map((testimonial, index) => (
//               <TestimonialCard
//                 key={testimonial.id}
//                 testimonial={testimonial}
//                 isActive={currentIndex === index}
//               />
//             ))}
//           </div>
          
//           {/* Bouton suivant */}
//           <button
//             onClick={handleNext}
//             disabled={isAnimating}
//             className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20
//               w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full 
//               flex items-center justify-center text-white
//               border border-white/20 hover:bg-[#4ADE80]/20 hover:border-[#4ADE80]/50
//               disabled:opacity-50 transition-all duration-200"
//             aria-label="Témoignage suivant"
//           >
//             <ChevronRight className="w-6 h-6" />
//           </button>
//         </div>
        
//         {/* 🎯 INDICATEURS SIMPLIFIÉS */}
//         <div className="flex justify-center mt-8 space-x-2">
//           {testimonialsData.map((_, index) => (
//             <button
//               key={`indicator-${index}`}
//               onClick={() => goToSlide(index)}
//               className={`w-3 h-3 rounded-full transition-all duration-200 ${
//                 index === currentIndex 
//                   ? 'bg-[#4ADE80] scale-125' 
//                   : 'bg-white/30 hover:bg-white/50'
//               }`}
//               aria-label={`Aller au témoignage ${index + 1}`}
//             />
//           ))}
//         </div>
        
//         {/* 🎯 COMPTEUR SIMPLE */}
//         <div className="text-center mt-6 text-gray-400 text-sm">
//           {currentIndex + 1} / {testimonialsData.length}
//         </div>
//       </div>
//     </section>
//   );
// });

// export default Testimonials;





// src/components/sections/Testimonials/index.tsx - VERSION MOBILE OPTIMISÉE
import { useState, useRef, lazy, Suspense, memo, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { testimonialsData } from './types';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const TestimonialsBackground = lazy(() => import('./components/TestimonialsBackground'));

const BackgroundFallback = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-black via-[#4ADE80]/5 to-black">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#4ADE80]/8 via-transparent to-transparent" />
  </div>
);

// 🎯 COMPOSANT CARTE ADAPTATIF MOBILE/DESKTOP
const TestimonialCard = memo(({ testimonial, isActive, isMobile }: { 
  testimonial: any, 
  isActive: boolean,
  isMobile: boolean 
}) => {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 20 : 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? -20 : 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative mx-auto ${isMobile ? 'max-w-sm' : 'max-w-4xl'}`}
    >
      {/* MOBILE: Version verticale compacte */}
      {isMobile ? (
        <div className="relative bg-gradient-to-b from-gray-900/60 via-gray-800/40 to-gray-900/60 
                       backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10
                       shadow-xl p-6 mx-4">
          
          {/* Profil en haut */}
          <div className="flex items-center gap-4 mb-6">
            {/* Image de profil */}
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#4ADE80]/50 flex-shrink-0">
              {testimonial.personImage ? (
                <img
                  src={testimonial.personImage}
                  alt={testimonial.personName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#4ADE80] to-[#22D3EE] text-lg font-bold text-black">
                  {testimonial.personName.charAt(0)}
                </div>
              )}
            </div>
            
            {/* Infos à droite */}
            <div className="flex-1 min-w-0">
              <div className="font-bold text-lg text-white truncate">
                {testimonial.personName}
              </div>
              <div className="text-gray-400 text-sm truncate">
                {testimonial.personTitle}
              </div>
              <div className="text-[#4ADE80] font-medium text-sm truncate">
                {testimonial.company}
              </div>
            </div>
          </div>
          
          {/* Étoiles */}
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-[#4ADE80] fill-current" />
            ))}
          </div>
          
          {/* Quote icon centré */}
          <div className="flex justify-center mb-4">
            <Quote className="w-8 h-8 text-[#4ADE80] opacity-60" />
          </div>
          
          {/* Texte adapté mobile */}
          <blockquote className="text-gray-200 text-base leading-relaxed text-center mb-6">
            "{testimonial.text.length > 180 ? 
              testimonial.text.substring(0, 180) + '...' : 
              testimonial.text}"
          </blockquote>
          
          {/* Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4ADE80]/10 
                           border border-[#4ADE80]/30 rounded-full text-[#4ADE80] text-sm font-medium">
              <Star className="w-3 h-3 fill-current" />
              Recommandation
            </div>
          </div>
        </div>
      ) : (
        /* DESKTOP: Version horizontale complète */
        <div className="relative bg-gradient-to-br from-gray-900/40 via-gray-800/30 to-gray-900/40 
                       backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10
                       shadow-lg hover:shadow-xl transition-all duration-300 p-8 md:p-12
                       hover:border-[#4ADE80]/30 group">
          
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Section profil desktop */}
            <div className="flex flex-col items-center lg:items-start gap-4 lg:w-1/3">
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
              
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#4ADE80] fill-current" />
                ))}
              </div>
              
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
            
            {/* Contenu desktop */}
            <div className="flex-1 lg:w-2/3">
              <Quote className="w-8 h-8 text-[#4ADE80] opacity-60 mb-4" />
              
              <blockquote className="text-gray-200 text-lg leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </blockquote>
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4ADE80]/10 
                             border border-[#4ADE80]/30 rounded-full text-[#4ADE80] text-sm font-medium">
                <Star className="w-3 h-3 fill-current" />
                Recommandation
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
});

const Testimonials = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });
  
  const totalTestimonials = testimonialsData.length;
  const TRANSITION_DURATION = 300;
  
  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
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
  
  // Auto-play optionnel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 8000); // Change toutes les 8 secondes
    
    return () => clearInterval(interval);
  }, [handleNext, isAnimating]);
  
  // Gestion clavier
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
        {/* En-tête adaptatif */}
        <motion.div
          ref={headingRef}
          variants={headingVariants}
          initial="hidden"
          animate={isHeadingInView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <h2 className={`font-bold text-white mb-6 ${
            isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'
          }`}>
            <span className="text-[#4ADE80]">Té</span>moignages
          </h2>
          
          <p className={`text-gray-300 max-w-2xl mx-auto mb-6 ${
            isMobile ? 'text-base px-4' : 'text-lg'
          }`}>
            Ce que mes clients et collègues disent à propos de mon travail.
          </p>
          
          <div className="flex justify-center mt-4 space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-[#4ADE80] fill-current" />
            ))}
          </div>
          
          <div className="h-1 w-24 bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] mx-auto rounded-full mt-6" />
        </motion.div>
        
        {/* Carrousel adaptatif */}
        <div className={`relative ${isMobile ? 'px-4' : 'px-16'}`}>
          {/* Boutons de navigation - adaptés mobile */}
          {!isMobile && (
            <>
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
            </>
          )}
          
          {/* Navigation mobile en haut */}
          {isMobile && (
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={handlePrevious}
                disabled={isAnimating}
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full 
                  flex items-center justify-center text-white
                  border border-white/20 hover:bg-[#4ADE80]/20 hover:border-[#4ADE80]/50
                  disabled:opacity-50 transition-all duration-200"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {/* <div className="text-gray-400 text-sm font-medium">
                {currentIndex + 1} / {testimonialsData.length}
              </div> */}
              
              <button
                onClick={handleNext}
                disabled={isAnimating}
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full 
                  flex items-center justify-center text-white
                  border border-white/20 hover:bg-[#4ADE80]/20 hover:border-[#4ADE80]/50
                  disabled:opacity-50 transition-all duration-200"
                aria-label="Témoignage suivant"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
          
          {/* Conteneur témoignage avec hauteur adaptative */}
          <div className={`relative overflow-hidden ${
            isMobile ? 'min-h-[500px] my-6' : 'min-h-[400px] my-12'
          }`}>
            <AnimatePresence mode="wait">
              {testimonialsData.map((testimonial, index) => (
                currentIndex === index && (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    isActive={currentIndex === index}
                    isMobile={isMobile}
                  />
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Indicateurs */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonialsData.map((_, index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => goToSlide(index)}
              className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3'} rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-[#4ADE80] scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Aller au témoignage ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Compteur desktop seulement */}
        {!isMobile && (
          <div className="text-center mt-6 text-gray-400 text-sm">
            {currentIndex + 1} / {testimonialsData.length}
          </div>
        )}
      </div>
    </section>
  );
});

export default Testimonials;