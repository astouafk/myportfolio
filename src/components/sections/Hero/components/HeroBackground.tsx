// // src/components/sections/Hero/components/HeroBackground.tsx - VERSION OPTIMISÉE
// import { Canvas, useFrame, type RootState } from '@react-three/fiber';
// import { Points } from '@react-three/drei';
// import { useRef, useEffect, useState, memo } from 'react';
// import { easing } from 'maath';
// import type { Points as ThreePoints, BufferGeometry, Material } from 'three';

// const AnimatedBackground = memo(() => {
//   const pointsRef = useRef<ThreePoints<BufferGeometry, Material>>(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isReducedMotion, setIsReducedMotion] = useState(false);
//   const lastUpdateTimeRef = useRef(0);
  
//   // Détection optimisée
//   useEffect(() => {
//     const checkSettings = () => {
//       setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
//       setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
//     };
    
//     checkSettings();
    
//     const resizeObserver = new ResizeObserver(checkSettings);
//     resizeObserver.observe(document.body);
    
//     const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
//     motionMedia.addEventListener('change', checkSettings);
    
//     return () => {
//       resizeObserver.disconnect();
//       motionMedia.removeEventListener('change', checkSettings);
//     };
//   }, []);
  
//   // ⚡ OPTIMISATION PRO : Nombre raisonnable mais visible
//   const count = isReducedMotion ? 0 : (isMobile ? 30 : 60); // Équilibre performance/beauté
  
//   // ⚡ OPTIMISATION : Animation ultra-simplifiée avec throttling extrême
//   useFrame((state: RootState, delta: number) => {
//     if (!pointsRef.current || isReducedMotion || count === 0) return;
    
//     // 🔥 THROTTLING EXTRÊME : Mise à jour toutes les 200ms sur mobile
//     const now = state.clock.getElapsedTime();
//     const throttleDelay = isMobile ? 0.2 : 0.1;
    
//     if (now - lastUpdateTimeRef.current < throttleDelay) return;
//     lastUpdateTimeRef.current = now;
    
//     const position = pointsRef.current.position;
//     // ⚡ Animation plus lente et moins aggressive
//     easing.damp3(
//       position,
//       [
//         Math.sin(state.clock.elapsedTime * 0.02) * 1, // 🔥 Plus lent et amplitude réduite
//         Math.cos(state.clock.elapsedTime * 0.02) * 1,
//         0
//       ],
//       isMobile ? 0.5 : 0.3, // 🔥 Plus lent
//       delta
//     );
//   });

//   // 🔥 Ne pas rendre si pas de points
//   if (count === 0) return null;

//   return (
//     <Points
//       ref={pointsRef}
//       limit={count}
//       position={[0, 0, 0]}
//     >
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={count}
//           array={new Float32Array(count * 3).map(() => (Math.random() - 0.5) * 6)} // ⚡ Zone plus petite
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial
//         size={isMobile ? 0.02 : 0.03} // 🔥 Taille réduite
//         color="#4ADE80"
//         sizeAttenuation={false} // ⚡ Désactiver pour performances
//         transparent
//         opacity={0.4} // 🔥 Moins visible
//         depthWrite={false} // ⚡ Optimisation
//       />
//     </Points>
//   );
// });

// export const HeroBackground = memo(() => {
//   const [isVisible, setIsVisible] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isReducedMotion, setIsReducedMotion] = useState(false);
  
//   // Détection du type d'appareil et des préférences
//   useEffect(() => {
//     const checkSettings = () => {
//       setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
//       setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
//     };
    
//     checkSettings();
//     window.addEventListener('resize', checkSettings);
    
//     const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
//     motionMedia.addEventListener('change', checkSettings);
    
//     return () => {
//       window.removeEventListener('resize', checkSettings);
//       motionMedia.removeEventListener('change', checkSettings);
//     };
//   }, []);
  
//   // Observer l'intersection avec seuil plus élevé
//   useEffect(() => {
//     if (!containerRef.current) return;
    
//     const observer = new IntersectionObserver(
//       entries => {
//         entries.forEach(entry => {
//           setIsVisible(entry.isIntersecting);
//         });
//       },
//       {
//         threshold: 0.2, // ⚡ Seuil plus élevé
//         rootMargin: '100px' // ⚡ Marge plus grande
//       }
//     );
    
//     observer.observe(containerRef.current);
    
//     return () => {
//       if (containerRef.current) {
//         observer.unobserve(containerRef.current);
//       }
//     };
//   }, []);

//   // 🔥 Fallback statique si animations réduites
//   if (isReducedMotion) {
//     return (
//       <div ref={containerRef} className="absolute inset-0">
//         <div className="absolute inset-0 bg-gradient-to-br from-[#4ADE80]/10 via-transparent to-[#4ADE80]/5" />
//       </div>
//     );
//   }

//   return (
//     <div ref={containerRef} className="absolute inset-0">
//       {isVisible && (
//         <Canvas
//           // ⚡ OPTIMISATION MAJEURE : Configuration ultra-light
//           dpr={1} // 🔥 Pixel ratio fixé à 1
//           gl={{
//             antialias: false, // ❌ Désactivé
//             alpha: true,
//             powerPreference: 'high-performance',
//             precision: 'lowp', // ⚡ Précision minimale
//             depth: false, // ❌ Pas de test de profondeur
//             stencil: false, // ❌ Pas de stencil buffer
//             preserveDrawingBuffer: false, // ❌ Pas de préservation
//           }}
//           camera={{ fov: 75, position: [0, 0, 5] }}
//           style={{ pointerEvents: 'none' }}
//           frameloop="always" // ⚡ Animation fluide mais contrôlée
//         >
//           <color attach="background" args={['#000000']} />
//           <AnimatedBackground />
          
//           // ❌ RÉACTIVÉ : EffectComposer mais optimisé pour mobile
//           {!isMobile && (
//             <>
//               {/* ⚡ Bloom léger seulement sur desktop */}
//               <fog attach="fog" args={['#000000', 1, 15]} />
//             </>
//           )}
//         </Canvas>
//       )}
//     </div>
//   );
// });

// export default HeroBackground;








// src/components/sections/Hero/components/HeroBackground.tsx - VERSION ULTRA-OPTIMISÉE
import { Canvas, useFrame, type RootState } from '@react-three/fiber';
import { Points } from '@react-three/drei';
import { useRef, useEffect, useState, memo } from 'react';
import { easing } from 'maath';
import type { Points as ThreePoints, BufferGeometry, Material } from 'three';

const AnimatedBackground = memo(() => {
  const pointsRef = useRef<ThreePoints<BufferGeometry, Material>>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const lastUpdateTimeRef = useRef(0);
  
  // Détection optimisée
  useEffect(() => {
    const checkSettings = () => {
      setIsMobile(window.innerWidth < 768);
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };
    
    checkSettings();
    
    const resizeObserver = new ResizeObserver(checkSettings);
    resizeObserver.observe(document.body);
    
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionMedia.addEventListener('change', checkSettings);
    
    return () => {
      resizeObserver.disconnect();
      motionMedia.removeEventListener('change', checkSettings);
    };
  }, []);
  
  // ⚡ OPTIMISATION PRO : Nombre ultra-réduit mais visible
  const count = isReducedMotion ? 0 : (isMobile ? 20 : 40); // 🔥 Drastiquement réduit
  
  // ⚡ OPTIMISATION : Animation ultra-simplifiée avec throttling extrême
  useFrame((state: RootState, delta: number) => {
    if (!pointsRef.current || isReducedMotion || count === 0) return;
    
    // 🔥 THROTTLING EXTRÊME : Mise à jour toutes les 300ms sur mobile, 150ms desktop
    const now = state.clock.getElapsedTime();
    const throttleDelay = isMobile ? 0.3 : 0.15;
    
    if (now - lastUpdateTimeRef.current < throttleDelay) return;
    lastUpdateTimeRef.current = now;
    
    const position = pointsRef.current.position;
    // ⚡ Animation ultra-lente et minimaliste
    easing.damp3(
      position,
      [
        Math.sin(state.clock.elapsedTime * 0.01) * 0.5, // 🔥 Très lent et amplitude minimale
        Math.cos(state.clock.elapsedTime * 0.01) * 0.5,
        0
      ],
      isMobile ? 0.8 : 0.6, // 🔥 Très lent
      delta
    );
  });

  // 🔥 Ne pas rendre si pas de points
  if (count === 0) return null;

  return (
    <Points
      ref={pointsRef}
      limit={count}
      position={[0, 0, 0]}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={new Float32Array(count * 3).map(() => (Math.random() - 0.5) * 4)} // ⚡ Zone encore plus petite
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.015 : 0.02} // 🔥 Encore plus petit
        color="#4ADE80"
        sizeAttenuation={false} // ⚡ Désactiver pour performances
        transparent
        opacity={0.3} // 🔥 Très discret
        depthWrite={false} // ⚡ Optimisation
      />
    </Points>
  );
});

export const HeroBackground = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false); // 🔥 Nouveau state
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  // Détection du type d'appareil et des préférences
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
  
  // Observer l'intersection avec seuil plus élevé
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1, // ⚡ Seuil réduit
        rootMargin: '200px' // ⚡ Marge très grande
      }
    );
    
    observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // 🔥 CHARGEMENT DIFFÉRÉ DU CANVAS APRÈS 2 SECONDES
  useEffect(() => {
    if (isVisible && !isReducedMotion) {
      const timer = setTimeout(() => {
        setShowCanvas(true);
      }, 2000); // ⚡ Attendre 2 secondes après visibilité
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, isReducedMotion]);

  // 🔥 Fallback statique immédiat
  if (isReducedMotion) {
    return (
      <div ref={containerRef} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4ADE80]/8 via-transparent to-[#4ADE80]/4" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* 🔥 FALLBACK IMMÉDIAT PENDANT CHARGEMENT */}
      {!showCanvas && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#4ADE80]/6 via-transparent to-[#4ADE80]/3" />
      )}
      
      {/* 🔥 CANVAS CHARGÉ APRÈS DÉLAI */}
      {isVisible && showCanvas && (
        <Canvas
          // ⚡ OPTIMISATION MAXIMALE : Configuration ultra-light
          dpr={isMobile ? 0.5 : 1} // 🔥 Pixel ratio ultra-réduit sur mobile
          gl={{
            antialias: false, // ❌ Désactivé
            alpha: true,
            powerPreference: 'high-performance',
            precision: 'lowp', // ⚡ Précision minimale
            depth: false, // ❌ Pas de test de profondeur
            stencil: false, // ❌ Pas de stencil buffer
            preserveDrawingBuffer: false, // ❌ Pas de préservation
            failIfMajorPerformanceCaveat: true, // 🔥 Fail si mauvaises perfs
          }}
          camera={{ fov: 75, position: [0, 0, 5] }}
          style={{ pointerEvents: 'none' }}
          frameloop="demand" // ⚡ Rendu à la demande uniquement
        >
          <color attach="background" args={['#000000']} />
          <AnimatedBackground />
        </Canvas>
      )}
    </div>
  );
});

export default HeroBackground;