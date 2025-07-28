// // src/components/sections/Hero/index.tsx - VERSION OPTIMISÉE
// import { useRef, memo, lazy, Suspense } from 'react';
// import { HeroTitle } from './components/HeroTitle';
// import { HeroStats } from './components/HeroStats';

// // Import dynamique optimisé
// const HeroBackground = lazy(() => 
//   import('./components/HeroBackground').then(module => ({ 
//     default: module.default || module.HeroBackground 
//   }))
// );
// const HeroImage = lazy(() => 
//   import('./components/HeroImage').then(module => ({ 
//     default: module.default || module.HeroImage 
//   }))
// );

// // ⚡ Fallbacks ultra-légers
// const BackgroundFallback = () => (
//   <div className="absolute inset-0 bg-gradient-to-br from-[#4ADE80]/5 to-transparent" />
// );

// const ImageFallback = () => (
//   <div className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] mx-auto rounded-full bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
// );

// const Hero = memo(() => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const socialRef = useRef<HTMLDivElement>(null);

//   return (
//     <section id="home" className="relative min-h-screen overflow-hidden pt-12 sm:pt-24 md:pt-16 lg:pt-0">
//       {/* Fond 3D avec chargement paresseux */}
//       <Suspense fallback={<BackgroundFallback />}>
//         <HeroBackground />
//       </Suspense>

//       <div 
//         ref={containerRef}
//         className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center
//           relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center"
//       >
//         {/* Section image - Placée en haut sur mobile, à droite sur desktop */}
//         <div className="order-1 lg:order-2 flex justify-center items-center py-4 md:py-6">
//           <Suspense fallback={<ImageFallback />}>
//             <HeroImage />
//           </Suspense>
//         </div>
                
//         {/* Section texte - Placée en bas sur mobile, à gauche sur desktop */}
//         <div className="order-2 lg:order-1 space-y-6 sm:space-y-8 md:space-y-10 relative">
//           <HeroTitle />
//           <HeroStats socialRef={socialRef} />
//         </div>
//       </div>

//       {/* ✅ Particules d'ambiance optimisées - réduites mais présentes */}
//       <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
//         {[...Array(8)].map((_, i) => ( // ⚡ Réduit de 20 à 8
//           <div
//             key={i}
//             className="absolute w-1 h-1 bg-[#4ADE80] rounded-full animate-float"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${5 + Math.random() * 5}s`,
//               opacity: 0.3 + Math.random() * 0.3 // ⚡ Opacité réduite
//             }}
//           />
//         ))}
//       </div>
//     </section>
//   );
// });

// export default Hero;







// src/components/sections/Hero/index.tsx - VERSION ULTRA-OPTIMISÉE
import React, { useRef, memo, lazy, Suspense, useState, useEffect } from 'react';
import { HeroTitle } from './components/HeroTitle';
import { HeroStats } from './components/HeroStats';

// 🔥 IMPORTS DYNAMIQUES OPTIMISÉS AVEC DÉLAI - TYPÉS CORRECTEMENT
const HeroBackground = lazy(() => 
  new Promise<{ default: React.ComponentType<any> }>(resolve => {
    // Attendre 3 secondes avant de charger le background
    setTimeout(() => {
      import('./components/HeroBackground').then(module => {
        resolve({
          default: module.default || module.HeroBackground
        });
      });
    }, 3000);
  })
);

const HeroImage = lazy(() => 
  // Image chargée immédiatement mais avec lazy loading
  import('./components/HeroImage').then(module => ({
    default: module.default || module.HeroImage
  }))
);

// ⚡ FALLBACKS ULTRA-LÉGERS ET IMMÉDIATS
const BackgroundFallback = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-[#4ADE80]/6 via-transparent to-[#4ADE80]/3" />
);

// 🔥 FALLBACK IMAGE AVEC CONTENU UTILE
const ImageFallback = () => (
  <div className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] mx-auto rounded-full relative overflow-hidden">
    {/* Base gradient immédiate */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900" />
    
    {/* Cercles décoratifs immédiats */}
    <div className="absolute inset-[-30px] rounded-full border-2 border-dashed border-[#4ADE80]/30" />
    <div className="absolute inset-[-15px] rounded-full border-2 border-solid border-[#4ADE80]/20" />
    
    {/* Contenu placeholder */}
    <div className="absolute inset-[5%] rounded-full bg-gradient-to-br from-[#4ADE80]/20 to-[#22D3EE]/20 
      flex items-center justify-center text-white font-bold text-3xl">
      AFK
    </div>
    
    {/* Animation de chargement */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
      animate-pulse rounded-full" />
  </div>
);

const Hero = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const [showBackground, setShowBackground] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Détection des préférences d'animation
  useEffect(() => {
    const checkSettings = () => {
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };
    
    checkSettings();
    
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionMedia.addEventListener('change', checkSettings);
    
    return () => {
      motionMedia.removeEventListener('change', checkSettings);
    };
  }, []);

  // 🔥 CHARGEMENT DIFFÉRÉ DU BACKGROUND APRÈS INTERACTION OU DÉLAI
  useEffect(() => {
    if (isReducedMotion) {
      // Pas de background animé si animations réduites
      return;
    }

    // Démarrer le background après 4 secondes OU première interaction
    let timer: NodeJS.Timeout;
    let hasInteracted = false;

    const startBackground = () => {
      if (!hasInteracted) {
        hasInteracted = true;
        setShowBackground(true);
      }
    };

    // Listener pour première interaction
    const handleFirstInteraction = () => {
      clearTimeout(timer);
      startBackground();
      
      // Supprimer les listeners après première interaction
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('mousemove', handleFirstInteraction);
    };

    // Ajouter les listeners d'interaction
    window.addEventListener('scroll', handleFirstInteraction, { passive: true });
    window.addEventListener('click', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    window.addEventListener('mousemove', handleFirstInteraction, { passive: true });

    // Fallback : démarrer après 4 secondes même sans interaction
    timer = setTimeout(() => {
      startBackground();
    }, 4000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('mousemove', handleFirstInteraction);
    };
  }, [isReducedMotion]);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-12 sm:pt-24 md:pt-16 lg:pt-0">
      {/* 🔥 FOND STATIQUE IMMÉDIAT */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      {/* 🔥 FOND 3D AVEC CHARGEMENT ULTRA-DIFFÉRÉ */}
      {showBackground && (
        <Suspense fallback={<BackgroundFallback />}>
          <HeroBackground />
        </Suspense>
      )}

      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center
          relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center"
      >
        {/* 🔥 SECTION IMAGE - PRIORITÉ ABSOLUE */}
        <div className="order-1 lg:order-2 flex justify-center items-center py-4 md:py-6">
          <Suspense fallback={<ImageFallback />}>
            <HeroImage />
          </Suspense>
        </div>
                       
        {/* Section texte */}
        <div className="order-2 lg:order-1 space-y-6 sm:space-y-8 md:space-y-10 relative">
          <HeroTitle />
          <HeroStats socialRef={socialRef} />
        </div>
      </div>

      {/* ⚡ PARTICULES D'AMBIANCE ULTRA-RÉDUITES ET DIFFÉRÉES */}
      {showBackground && !isReducedMotion && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {[...Array(4)].map((_, i) => ( // 🔥 Réduit de 8 à 4
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#4ADE80] rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationName: 'float',
                animationDelay: `${Math.random() * 10}s`, // ⚡ Délai plus long
                animationDuration: `${8 + Math.random() * 8}s`, // ⚡ Plus lent
                animationIterationCount: 'infinite',
                animationTimingFunction: 'ease-in-out'
              }}
            />
          ))}
        </div>
      )}

      {/* 🔥 STYLES CSS POUR ANIMATION FLOAT */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
      `}</style>
    </section>
  );
});

export default Hero;