// src/components/sections/Skills/components/SkillsBackground.tsx
import { memo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useInView } from 'framer-motion';

// Composant pour les petites particules flottantes
const FloatingParticles = memo(() => {
  const pointsRef = useRef<THREE.Points>(null);
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
  
  // Nombre de points adapté selon l'appareil
  const count = isMobile ? 100 : 200;
  
  // Génération des positions des particules
  const [positions] = useState(() => {
    const positionsArray = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positionsArray[i * 3] = (Math.random() - 0.5) * 20;
      positionsArray[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positionsArray[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    
    return positionsArray;
  });
  
  // Animation des particules
  useFrame((state, delta) => {
    if (!pointsRef.current || isReducedMotion) return;
    
    // Rotation lente
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x += delta * 0.01;
    
    // Effet d'ondulation
    const position = pointsRef.current.geometry.attributes.position;
    const time = state.clock.getElapsedTime();
    
    // Optimisation: n'animer qu'un sous-ensemble de points par frame pour alléger le CPU
    const updateFraction = isMobile ? 0.2 : 0.4; // 20% ou 40% des points par frame
    const startIndex = Math.floor(Math.random() * (1 - updateFraction) * count) * 3;
    const endIndex = startIndex + Math.floor(updateFraction * count * 3);
    
    for (let i = startIndex; i < endIndex; i += 3) {
      position.array[i + 1] += Math.sin(time + position.array[i] * 0.5) * 0.01;
    }
    
    position.needsUpdate = true;
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.03 : 0.05}
        color="#4ADE80"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
});

// Composant de motif hexagonal
const HexagonPattern = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 opacity-10">
      {/* Lignes horizontales avec espacement variable */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`h-line-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-[#4ADE80]/30 to-transparent"
          style={{
            top: `${(i + 1) * 6}%`,
            left: 0,
            right: 0,
            opacity: 0.2 - i * 0.01
          }}
        />
      ))}
      
      {/* Lignes verticales avec espacement variable */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`v-line-${i}`}
          className="absolute w-px bg-gradient-to-b from-transparent via-[#4ADE80]/30 to-transparent"
          style={{
            left: `${(i + 1) * 5}%`,
            top: 0,
            bottom: 0,
            opacity: 0.2 - i * 0.005
          }}
        />
      ))}
      
      {/* Motif hexagonal */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#4ADE80 1px, transparent 2px)',
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0',
          maskImage: 'linear-gradient(to right, transparent, black, transparent)'
        }}
      />
    </div>
  );
});

// Composant principal pour l'arrière-plan
const SkillsBackground = memo(() => {
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
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black z-0" />
      
      {/* Motif hexagonal */}
      <HexagonPattern />
      
      {/* Particules flottantes 3D - ne les rendre que si la section est visible */}
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
            <ambientLight intensity={0.5} />
            <FloatingParticles />
          </Canvas>
        </div>
      )}
      
      {/* Effets de dégradés lumineux */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/4 bg-gradient-radial from-[#4ADE80]/10 to-transparent opacity-30 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/4 bg-gradient-radial from-[#4ADE80]/10 to-transparent opacity-30 blur-3xl" />
      
      {/* Vignette pour adoucir les bords */}
      <div className="absolute inset-0 bg-radial-gradient-vignette pointer-events-none z-0" />
    </div>
  );
});

export default SkillsBackground;