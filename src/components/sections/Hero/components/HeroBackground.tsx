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
  const count = isReducedMotion ? 0 : (isMobile ? 20 : 40); 
  
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
        Math.sin(state.clock.elapsedTime * 0.01) * 0.5, 
        Math.cos(state.clock.elapsedTime * 0.01) * 0.5,
        0
      ],
      isMobile ? 0.8 : 0.6, 
      delta
    );
  });

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
          array={new Float32Array(count * 3).map(() => (Math.random() - 0.5) * 4)} 
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.015 : 0.02}
        color="#4ADE80"
        sizeAttenuation={false} 
        transparent
        opacity={0.3}
        depthWrite={false} 
      />
    </Points>
  );
});

export const HeroBackground = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false); 
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
        threshold: 0.1, 
        rootMargin: '200px' 
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
      }, 2000);
      
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
          dpr={isMobile ? 0.5 : 1} 
          gl={{
            antialias: false, 
            alpha: true,
            powerPreference: 'high-performance',
            precision: 'lowp', 
            depth: false, 
            stencil: false, 
            preserveDrawingBuffer: false, 
            failIfMajorPerformanceCaveat: true, 
          }}
          camera={{ fov: 75, position: [0, 0, 5] }}
          style={{ pointerEvents: 'none' }}
          frameloop="demand" 
        >
          <color attach="background" args={['#000000']} />
          <AnimatedBackground />
        </Canvas>
      )}
    </div>
  );
});

export default HeroBackground;