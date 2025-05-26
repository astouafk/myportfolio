// src/components/sections/Hero/components/HeroBackground.tsx
import { Canvas, useFrame, type RootState } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Points, Sparkles } from '@react-three/drei';
import { useRef, useEffect, useState, memo } from 'react';
import { easing } from 'maath';
import type { Points as ThreePoints, BufferGeometry, Material } from 'three';

const AnimatedBackground = memo(() => {
  const pointsRef = useRef<ThreePoints<BufferGeometry, Material>>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const lastUpdateTimeRef = useRef(0);
  
  // Détection du type d'appareil et des préférences
  useEffect(() => {
    const checkSettings = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
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
  
  // Nombre de points ajusté en fonction de l'appareil
  const count = isMobile ? 50 : 100;
  
  // Animation avec throttling
  useFrame((state: RootState, delta: number) => {
    if (!pointsRef.current || isReducedMotion) return;
    
    // Throttling pour les appareils mobiles (environ 30fps)
    const now = state.clock.getElapsedTime();
    if (isMobile && now - lastUpdateTimeRef.current < 0.033) return;
    lastUpdateTimeRef.current = now;
    
    const position = pointsRef.current.position;
    easing.damp3(
      position,
      [
        Math.sin(state.clock.elapsedTime * 0.05) * 2,
        Math.cos(state.clock.elapsedTime * 0.05) * 2,
        0
      ],
      isMobile ? 0.3 : 0.2,
      delta
    );
  });

  return (
    <>
      <Points
        ref={pointsRef}
        limit={count}
        position={[0, 0, 0]}
      >
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={new Float32Array(count * 3).map(() => (Math.random() - 0.5) * 10)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.03 : 0.05}
          color="#4ADE80"
          sizeAttenuation={!isMobile} // Désactiver sur mobile pour améliorer les performances
          transparent
        />
      </Points>
      
      {/* Conditionnellement rendre les sparkles en fonction de l'appareil */}
      {!isMobile && !isReducedMotion && (
        <Sparkles
          count={isMobile ? 20 : 50}
          scale={10}
          size={2}
          speed={0.5}
          color="#4ADE80"
        />
      )}
    </>
  );
});

export const HeroBackground = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Détection du type d'appareil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Observer l'intersection pour n'activer que lorsque visible
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
        rootMargin: '0px'
      }
    );
    
    observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {isVisible && (
        <Canvas
          dpr={isMobile ? 1 : (window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio)}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: 'high-performance',
            precision: isMobile ? 'mediump' : 'highp',
            depth: false, // Désactiver le test de profondeur pour de meilleures performances
            stencil: false // Désactiver le stencil buffer
          }}
          camera={{ fov: 75, position: [0, 0, 5] }}
          style={{ pointerEvents: 'none' }}
        >
          <color attach="background" args={['#000000']} />
          <AnimatedBackground />
          
          {/* Conditionnellement ajouter EffectComposer en fonction de l'appareil */}
          {!isMobile && (
            <EffectComposer enabled={!isMobile}>
              <Bloom
                intensity={1.0}
                luminanceThreshold={0.6}
                luminanceSmoothing={0.9}
              />
            </EffectComposer>
          )}
        </Canvas>
      )}
    </div>
  );
});

export default HeroBackground;