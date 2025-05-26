// src/components/sections/Hero/index.tsx
import { useRef } from 'react';
import { lazy, Suspense, memo } from 'react';
import { HeroTitle } from './components/HeroTitle';
import { HeroStats } from './components/HeroStats';

// Import dynamique des composants lourds
const HeroBackground = lazy(() => import('./components/HeroBackground'));
const HeroImage = lazy(() => import('./components/HeroImage').then(module => ({ default: module.default || module.HeroImage })));

// Fallbacks simples pour le chargement
const BackgroundFallback = () => <div className="absolute inset-0 bg-black" />;
const ImageFallback = () => (
  <div className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] mx-auto rounded-full bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
);

const Hero = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-12 sm:pt-24 md:pt-16 lg:pt-0">
      {/* Fond 3D avec chargement paresseux */}
      <Suspense fallback={<BackgroundFallback />}>
        <HeroBackground />
      </Suspense>

      <div 
        ref={containerRef} 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center
          relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center"
      >
        {/* Section image - Placée en haut sur mobile, à droite sur desktop */}
        <div className="order-1 lg:order-2 flex justify-center items-center py-4 md:py-6">
          <Suspense fallback={<ImageFallback />}>
            <HeroImage />
          </Suspense>
        </div>
        
        {/* Section texte - Placée en bas sur mobile, à gauche sur desktop */}
        <div className="order-2 lg:order-1 space-y-6 sm:space-y-8 md:space-y-10 relative">
          <HeroTitle />
          <HeroStats socialRef={socialRef} />
        </div>
      </div>

      {/* Particules d'ambiance */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#4ADE80] rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </section>
  );
});

export default Hero;