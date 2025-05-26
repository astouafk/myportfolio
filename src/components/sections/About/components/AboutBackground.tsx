// src/components/sections/About/components/AboutBackground.tsx
import { memo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useInView } from 'framer-motion';

// Composant pour les points en arrière-plan
const BackgroundPoints = memo(() => {
  const pointsRef = useRef<THREE.Points>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  // Détection du type d'appareil et des préférences
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
  
  // Nombre de points adapté selon l'appareil
  const count = isMobile ? 800 : 2000;
  
  // Génération aléatoire des positions des points
  // Utilisons useState au lieu de useRef pour stocker le tableau
  const [positions] = useState(() => {
    const positionsArray = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Distribuer les points dans l'espace 3D, avec plus de concentration au centre
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(180);
      
      const x = 15 * Math.sin(theta) * Math.cos(phi);
      const y = 15 * Math.sin(theta) * Math.sin(phi);
      const z = 15 * Math.cos(theta);
      
      positionsArray[i * 3] = x;
      positionsArray[i * 3 + 1] = y;
      positionsArray[i * 3 + 2] = z;
    }
    
    return positionsArray;
  });

  useFrame((state, delta) => {
    if (pointsRef.current && !isReducedMotion) {
      // Rotation lente
      pointsRef.current.rotation.x += delta * 0.01;
      pointsRef.current.rotation.y += delta * 0.02;
    }
  });

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
        size={isMobile ? 0.05 : 0.08}
        sizeAttenuation
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
});

// Composant gradient pour fond
const GradientBackground = memo(() => {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/90 z-0" />
  );
});

// Composant de lignes géométriques
const GeometricLines = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Lignes horizontales avec espacement variable */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={`h-line-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-[#4ADE80]/10 to-transparent"
          style={{
            top: `${(i + 1) * 10}%`,
            left: 0,
            right: 0,
            opacity: 0.3 - i * 0.02
          }}
        />
      ))}
      
      {/* Lignes verticales avec espacement variable */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`v-line-${i}`}
          className="absolute w-px bg-gradient-to-b from-transparent via-[#4ADE80]/10 to-transparent"
          style={{
            left: `${(i + 1) * 12.5}%`,
            top: 0,
            bottom: 0,
            opacity: 0.3 - i * 0.03
          }}
        />
      ))}
    </div>
  );
});

// Composant de particules flottantes
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

  // Ne pas rendre les particules si les animations réduites sont activées
  if (isReducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute rounded-full bg-[#4ADE80]/20 blur-sm"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${5 + Math.random() * 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
});

// Composant principal pour l'arrière-plan
const AboutBackground = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Fond de base avec gradient */}
      <GradientBackground />
      
      {/* Lignes géométriques */}
      <GeometricLines />
      
      {/* Particules flottantes */}
      <FloatingParticles />
      
      {/* Étoiles/Points 3D - ne les rendre que si la section est visible */}
      {isInView && (
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 60 }}
            dpr={isMobile ? 1 : (window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio)}
            gl={{
              antialias: !isMobile,
              alpha: true,
              powerPreference: 'high-performance',
              precision: isMobile ? 'mediump' : 'highp',
              depth: false,
              stencil: false
            }}
          >
            <BackgroundPoints />
          </Canvas>
        </div>
      )}
      
      {/* Vignette pour adoucir les bords */}
      <div className="absolute inset-0 bg-radial-gradient-vignette pointer-events-none z-0" />
    </div>
  );
});

export default AboutBackground;