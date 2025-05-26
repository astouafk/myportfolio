// // src/components/sections/ProjectDetail/components/ScreenshotCarousel.tsx
// import { useState, useRef, useEffect, useCallback, memo } from 'react';
// import { motion } from 'framer-motion';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { Screenshot } from '../types';

// interface ScreenshotCarouselProps {
//   screenshots: Screenshot[];
// }

// const ScreenshotCarousel = memo(({ screenshots }: ScreenshotCarouselProps) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(true);
  
//   // Vérifier les possibilités de défilement
//   const checkScrollability = useCallback(() => {
//     if (!containerRef.current) return;
    
//     setCanScrollLeft(currentIndex > 0);
//     setCanScrollRight(currentIndex < screenshots.length - 1);
//   }, [currentIndex, screenshots.length]);
  
//   // Initialisation et mise à jour
//   useEffect(() => {
//     checkScrollability();
    
//     // Écouteur d'événements clavier pour la navigation
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'ArrowLeft' && canScrollLeft && !isAnimating) {
//         handlePrevious();
//       } else if (e.key === 'ArrowRight' && canScrollRight && !isAnimating) {
//         handleNext();
//       }
//     };
    
//     window.addEventListener('keydown', handleKeyDown);
    
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [canScrollLeft, canScrollRight, checkScrollability, isAnimating]);
  
//   // Navigation précédente
//   const handlePrevious = useCallback(() => {
//     if (currentIndex > 0 && !isAnimating) {
//       setIsAnimating(true);
//       setCurrentIndex(prev => prev - 1);
      
//       // Réinitialiser l'état d'animation après la transition
//       setTimeout(() => {
//         setIsAnimating(false);
//         checkScrollability();
//       }, 500);
//     }
//   }, [currentIndex, isAnimating, checkScrollability]);
  
//   // Navigation suivante
//   const handleNext = useCallback(() => {
//     if (currentIndex < screenshots.length - 1 && !isAnimating) {
//       setIsAnimating(true);
//       setCurrentIndex(prev => prev + 1);
      
//       // Réinitialiser l'état d'animation après la transition
//       setTimeout(() => {
//         setIsAnimating(false);
//         checkScrollability();
//       }, 500);
//     }
//   }, [currentIndex, screenshots.length, isAnimating, checkScrollability]);
  
//   // Préchargement des images pour une transition fluide
//   useEffect(() => {
//     screenshots.forEach(screenshot => {
//       const img = new Image();
//       img.src = screenshot.imageUrl;
//     });
//   }, [screenshots]);
  
//   if (screenshots.length === 0) {
//     return <div className="text-gray-400 italic">Aucune capture d'écran disponible</div>;
//   }
  
//   return (
//     <div className="relative w-full overflow-hidden rounded-xl">
//       {/* Zone sécurisée pour les boutons de navigation */}
//       <div className="relative w-full aspect-video md:aspect-[16/9] lg:aspect-video xl:aspect-[21/9] bg-gray-900 rounded-xl overflow-hidden">
//         {/* Masque de dégradé à gauche */}
//         <div 
//           className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none"
//           style={{ opacity: canScrollLeft ? 1 : 0, transition: 'opacity 0.3s ease' }}
//         />
        
//         {/* Bouton précédent */}
//         {canScrollLeft && (
//           <button
//             onClick={handlePrevious}
//             className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20
//               w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center
//               border border-[#4ADE80]/20 text-[#4ADE80] hover:bg-[#4ADE80]/20 transition-colors"
//             disabled={isAnimating || !canScrollLeft}
//             aria-label="Image précédente"
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </button>
//         )}
        
//         {/* Conteneur des captures d'écran */}
//         <div 
//           ref={containerRef}
//           className="relative w-full h-full overflow-hidden"
//         >
//           {/* Les captures d'écran */}
//           {screenshots.map((screenshot, index) => (
//             <motion.div
//               key={screenshot.id}
//               className="absolute inset-0 flex items-center justify-center bg-gray-900"
//               initial={{ opacity: 0, x: index > currentIndex ? '100%' : '-100%' }}
//               animate={{ 
//                 opacity: index === currentIndex ? 1 : 0,
//                 x: index === currentIndex ? 0 : (index > currentIndex ? '100%' : '-100%'),
//                 transition: { duration: 0.5, ease: "easeInOut" }
//               }}
//             >
//               <img 
//                 src={screenshot.imageUrl} 
//                 alt={screenshot.caption}
//                 className="w-full h-full object-contain"
//               />
              
//               {/* Légende */}
//               <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
//                 <p className="text-white text-center text-sm md:text-base">{screenshot.caption}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
        
//         {/* Masque de dégradé à droite */}
//         <div 
//           className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none"
//           style={{ opacity: canScrollRight ? 1 : 0, transition: 'opacity 0.3s ease' }}
//         />
        
//         {/* Bouton suivant */}
//         {canScrollRight && (
//           <button
//             onClick={handleNext}
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20
//               w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center
//               border border-[#4ADE80]/20 text-[#4ADE80] hover:bg-[#4ADE80]/20 transition-colors"
//             disabled={isAnimating || !canScrollRight}
//             aria-label="Image suivante"
//           >
//             <ChevronRight className="w-6 h-6" />
//           </button>
//         )}
//       </div>
      
//       {/* Indicateurs de position */}
//       <div className="mt-4 flex justify-center space-x-1">
//         {screenshots.map((_, index) => (
//           <button
//             key={`indicator-${index}`}
//             onClick={() => {
//               if (!isAnimating) {
//                 setIsAnimating(true);
//                 setCurrentIndex(index);
//                 setTimeout(() => {
//                   setIsAnimating(false);
//                   checkScrollability();
//                 }, 500);
//               }
//             }}
//             className={`w-2 h-2 rounded-full transition-all ${
//               index === currentIndex 
//                 ? 'bg-[#4ADE80] w-6' 
//                 : 'bg-gray-600 hover:bg-gray-400'
//             }`}
//             aria-label={`Aller à l'image ${index + 1}`}
//           />
//         ))}
//       </div>
      
//       {/* Miniatures générées dynamiquement uniquement si moins de 10 images */}
//       {screenshots.length < 10 && (
//         <div className="hidden md:flex overflow-x-auto space-x-2 py-2 px-4 no-scrollbar mt-2">
//           {screenshots.map((screenshot, index) => (
//             <button
//               key={`thumb-${screenshot.id}`}
//               onClick={() => {
//                 if (!isAnimating) {
//                   setIsAnimating(true);
//                   setCurrentIndex(index);
//                   setTimeout(() => {
//                     setIsAnimating(false);
//                     checkScrollability();
//                   }, 500);
//                 }
//               }}
//               className={`relative flex-shrink-0 w-20 h-12 rounded-md overflow-hidden border-2 transition-all ${
//                 index === currentIndex 
//                   ? 'border-[#4ADE80]' 
//                   : 'border-transparent opacity-60 hover:opacity-100'
//               }`}
//             >
//               <img 
//                 src={screenshot.imageUrl} 
//                 alt=""
//                 aria-hidden="true"
//                 className="w-full h-full object-cover"
//               />
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// });

// export default ScreenshotCarousel;






// src/components/sections/ProjectDetail/components/ScreenshotCarousel.tsx
import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Screenshot } from '../types';

interface ScreenshotCarouselProps {
  screenshots: Screenshot[];
}

const ScreenshotCarousel = memo(({ screenshots }: ScreenshotCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  // Vérifier les possibilités de défilement
  const checkScrollability = useCallback(() => {
    if (!containerRef.current) return;
    
    setCanScrollLeft(currentIndex > 0);
    setCanScrollRight(currentIndex < screenshots.length - 1);
  }, [currentIndex, screenshots.length]);
  
  // Initialisation et mise à jour
  useEffect(() => {
    checkScrollability();
    
    // Écouteur d'événements clavier pour la navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && canScrollLeft && !isAnimating) {
        handlePrevious();
      } else if (e.key === 'ArrowRight' && canScrollRight && !isAnimating) {
        handleNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [canScrollLeft, canScrollRight, checkScrollability, isAnimating]);
  
  // Navigation précédente
  const handlePrevious = useCallback(() => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(prev => prev - 1);
      
      // Réinitialiser l'état d'animation après la transition
      setTimeout(() => {
        setIsAnimating(false);
        checkScrollability();
      }, 500);
    }
  }, [currentIndex, isAnimating, checkScrollability]);
  
  // Navigation suivante
  const handleNext = useCallback(() => {
    if (currentIndex < screenshots.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(prev => prev + 1);
      
      // Réinitialiser l'état d'animation après la transition
      setTimeout(() => {
        setIsAnimating(false);
        checkScrollability();
      }, 500);
    }
  }, [currentIndex, screenshots.length, isAnimating, checkScrollability]);
  
  // Préchargement des images pour une transition fluide
  useEffect(() => {
    screenshots.forEach(screenshot => {
      const img = new Image();
      img.src = screenshot.imageUrl;
    });
  }, [screenshots]);
  
  if (screenshots.length === 0) {
    return <div className="text-gray-400 italic">Aucune capture d'écran disponible</div>;
  }
  
  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      {/* Zone sécurisée pour les boutons de navigation */}
      <div className="relative w-full aspect-video md:aspect-[16/9] lg:aspect-[16/9] xl:aspect-[21/9] 
        bg-gray-900 rounded-xl overflow-hidden" 
        style={{ minHeight: '400px', height: 'auto' }}>
        {/* Masque de dégradé à gauche */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none"
          style={{ opacity: canScrollLeft ? 1 : 0, transition: 'opacity 0.3s ease' }}
        />
        
        {/* Bouton précédent */}
        {canScrollLeft && (
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20
              w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center
              border border-[#4ADE80]/20 text-[#4ADE80] hover:bg-[#4ADE80]/20 transition-colors"
            disabled={isAnimating || !canScrollLeft}
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        
        {/* Conteneur des captures d'écran */}
        <div 
          ref={containerRef}
          className="relative w-full h-full overflow-hidden"
        >
          {/* Les captures d'écran */}
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={screenshot.id}
              className="absolute inset-0 flex items-center justify-center bg-gray-900"
              initial={{ opacity: 0, x: index > currentIndex ? '100%' : '-100%' }}
              animate={{ 
                opacity: index === currentIndex ? 1 : 0,
                x: index === currentIndex ? 0 : (index > currentIndex ? '100%' : '-100%'),
                transition: { duration: 0.5, ease: "easeInOut" }
              }}
            >
              <img 
                src={screenshot.imageUrl} 
                alt={screenshot.caption}
                className="w-full h-full object-contain"
              />
              
              {/* Légende */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white text-center text-sm md:text-base">{screenshot.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Masque de dégradé à droite */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none"
          style={{ opacity: canScrollRight ? 1 : 0, transition: 'opacity 0.3s ease' }}
        />
        
        {/* Bouton suivant */}
        {canScrollRight && (
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20
              w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center
              border border-[#4ADE80]/20 text-[#4ADE80] hover:bg-[#4ADE80]/20 transition-colors"
            disabled={isAnimating || !canScrollRight}
            aria-label="Image suivante"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
      
      {/* Indicateurs de position */}
      <div className="mt-6 flex justify-center space-x-1">
        {screenshots.map((_, index) => (
          <button
            key={`indicator-${index}`}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => {
                  setIsAnimating(false);
                  checkScrollability();
                }, 500);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-[#4ADE80] w-6' 
                : 'bg-gray-600 hover:bg-gray-400'
            }`}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Miniatures générées dynamiquement uniquement si moins de 10 images */}
      {screenshots.length < 10 && (
        <div className="hidden md:flex overflow-x-auto space-x-2 py-4 px-4 no-scrollbar mt-4">
          {screenshots.map((screenshot, index) => (
            <button
              key={`thumb-${screenshot.id}`}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentIndex(index);
                  setTimeout(() => {
                    setIsAnimating(false);
                    checkScrollability();
                  }, 500);
                }
              }}
              className={`relative flex-shrink-0 w-24 h-16 rounded-md overflow-hidden border-2 transition-all ${
                index === currentIndex 
                  ? 'border-[#4ADE80]' 
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img 
                src={screenshot.imageUrl} 
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

export default ScreenshotCarousel;