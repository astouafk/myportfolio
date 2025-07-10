// src/components/sections/About/components/AboutBackground.tsx - VERSION PRO PERFORMANCE
import { memo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useInView } from 'framer-motion';

// 🎨 Composant pour les points en arrière-plan PROFESSIONNEL
const BackgroundPoints = memo(() => {
  const pointsRef = useRef<THREE.Points>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const lastUpdateTime = useRef(0);
  
  // Détection optimisée des paramètres
  useEffect(() => {
    const checkSettings = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
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
  
  // ⚡ OPTIMISATION : Nombre de points réduit mais toujours impressionnant
  const count = isReducedMotion ? 0 : (isMobile ? 400 : 800); // Au lieu de 800-2000
  
  // Génération optimisée des positions avec distribution intelligente
  const [positions] = useState(() => {
    if (count === 0) return new Float32Array(0);
    
    const positionsArray = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // 🎨 Distribution plus artistique et concentrée au centre
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(180);
      
      // ⚡ Zone plus concentrée pour de meilleures performances
      const radius = 8 + Math.random() * 4; // Au lieu de 15
      
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);
      
      positionsArray[i * 3] = x;
      positionsArray[i * 3 + 1] = y;
      positionsArray[i * 3 + 2] = z;
    }
    
    return positionsArray;
  });

  // ⚡ ANIMATION PROFESSIONNELLE avec throttling intelligent
  useFrame((state, delta) => {
    if (!pointsRef.current || isReducedMotion || count === 0) return;
    
    const now = state.clock.getElapsedTime();
    
    // 🎨 Throttling adaptatif pour maintenir la fluidité
    const throttleInterval = isMobile ? 0.05 : 0.033; // 20fps mobile, 30fps desktop
    if (now - lastUpdateTime.current < throttleInterval) return;
    lastUpdateTime.current = now;
    
    // 🎨 Rotation professionnelle et fluide
    pointsRef.current.rotation.x += delta * 0.008; // ⚡ Plus lent mais visible
    pointsRef.current.rotation.y += delta * 0.012;
  });

  if (count === 0) return null;

  return (
    <Points
      ref={pointsRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#4ADE80"
        size={isMobile ? 0.04 : 0.06} // 🎨 Taille optimale pour la visibilité
        sizeAttenuation
        depthWrite={false}
        opacity={0.4} // 🎨 Plus subtil mais visible
      />
    </Points>
  );
});

// 🎨 Composant gradient professionnel
const GradientBackground = memo(() => {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90 z-0" />
  );
});

// 🎨 Composant de lignes géométriques OPTIMISÉ
const GeometricLines = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Lignes horizontales optimisées */}
      {Array.from({ length: 8 }).map((_, i) => ( // ⚡ Réduit de 10 à 8
        <div
          key={`h-line-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-[#4ADE80]/15 to-transparent"
          style={{
            top: `${(i + 1) * 12}%`, // ⚡ Espacement plus large
            left: 0,
            right: 0,
            opacity: 0.4 - i * 0.03
          }}
        />
      ))}
      
      {/* Lignes verticales optimisées */}
      {Array.from({ length: 6 }).map((_, i) => ( // ⚡ Réduit de 8 à 6
        <div
          key={`v-line-${i}`}
          className="absolute w-px bg-gradient-to-b from-transparent via-[#4ADE80]/15 to-transparent"
          style={{
            left: `${(i + 1) * 16}%`, // ⚡ Espacement plus large
            top: 0,
            bottom: 0,
            opacity: 0.4 - i * 0.04
          }}
        />
      ))}
    </div>
  );
});

// 🎨 Composant de particules flottantes PROFESSIONNEL
const FloatingParticles = memo(() => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
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

  if (isReducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* ⚡ OPTIMISATION : Nombre réduit mais toujours visible */}
      {Array.from({ length: 15 }).map((_, i) => ( // Au lieu de 30
        <div
          key={`particle-${i}`}
          className="absolute rounded-full bg-[#4ADE80]/25 blur-sm" // 🎨 Plus visible
          style={{
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${6 + Math.random() * 8}s linear infinite`, // ⚡ Plus lent
            animationDelay: `${Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );
});

// 🎨 Composant principal PROFESSIONNEL
const AboutBackground = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
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

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Fond de base avec gradient professionnel */}
      <GradientBackground />
      
      {/* Lignes géométriques optimisées */}
      <GeometricLines />
      
      {/* Particules flottantes */}
      <FloatingParticles />
      
      {/* 🎨 Étoiles/Points 3D - Rendu conditionnel et optimisé */}
      {isInView && !isReducedMotion && (
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 60 }}
            dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)} // ⚡ Pixel ratio optimisé
            gl={{
              antialias: !isMobile, // ⚡ Antialiasing conditionnel
              alpha: true,
              powerPreference: 'high-performance',
              precision: isMobile ? 'mediump' : 'highp',
              depth: false,
              stencil: false
            }}
            frameloop="demand" // ⚡ OPTIMISATION MAJEURE : Rendu à la demande
          >
            <BackgroundPoints />
          </Canvas>
        </div>
      )}
      
      {/* 🎨 Fallback élégant pour animations réduites */}
      {isReducedMotion && (
        <div className="absolute inset-0 bg-gradient-radial from-[#4ADE80]/8 via-transparent to-transparent opacity-50" />
      )}
      
      {/* Vignette professionnelle pour adoucir les bords */}
      <div className="absolute inset-0 bg-radial-gradient-vignette pointer-events-none z-0 opacity-40" />
    </div>
  );
});

export default AboutBackground;