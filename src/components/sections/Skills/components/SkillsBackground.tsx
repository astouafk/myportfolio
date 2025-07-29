// src/components/sections/Skills/components/SkillsBackground.tsx - VERSION PRO PERFORMANCE
import { memo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useInView } from 'framer-motion';

// Composant pour les particules flottantes PROFESSIONNELLES
const FloatingParticles = memo(() => {
  const pointsRef = useRef<THREE.Points>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const lastUpdateTime = useRef(0);
  
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
  
  // OPTIMISATION PRO : Nombre ajusté pour être visible mais performant
  const count = isReducedMotion ? 0 : (isMobile ? 60 : 120); // Equilibre visuel/performance
  
  // Génération optimisée des positions
  const [positions] = useState(() => {
    if (count === 0) return new Float32Array(0);
    
    const positionsArray = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Distribution plus artistique
      positionsArray[i * 3] = (Math.random() - 0.5) * 16;
      positionsArray[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positionsArray[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    
    return positionsArray;
  });
  
  // ⚡ ANIMATION PROFESSIONNELLE avec throttling intelligent
  useFrame((state, delta) => {
    if (!pointsRef.current || isReducedMotion || count === 0) return;
    
    const now = state.clock.getElapsedTime();
    
    // Throttling adaptatif : Plus fluide sur desktop, plus économe sur mobile
    const throttleInterval = isMobile ? 0.033 : 0.016; // 30fps mobile, 60fps desktop
    if (now - lastUpdateTime.current < throttleInterval) return;
    lastUpdateTime.current = now;
    
    // Rotation professionnelle et fluide
    pointsRef.current.rotation.y += delta * 0.015;
    pointsRef.current.rotation.x += delta * 0.008;
    
    // Effet d'ondulation subtil et professionnel
    const position = pointsRef.current.geometry.attributes.position;
    const time = state.clock.getElapsedTime();
    
    // ⚡ OPTIMISATION : Animation seulement d'un sous-ensemble intelligent
    const updateFraction = isMobile ? 0.25 : 0.4;
    const startIndex = Math.floor(Math.random() * (1 - updateFraction) * count) * 3;
    const endIndex = startIndex + Math.floor(updateFraction * count * 3);
    
    for (let i = startIndex; i < endIndex; i += 3) {
      // Ondulation plus douce et professionnelle
      position.array[i + 1] += Math.sin(time * 0.5 + position.array[i] * 0.3) * 0.008;
    }
    
    position.needsUpdate = true;
  });
  
  if (count === 0) return null;
  
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
        size={isMobile ? 0.025 : 0.035} 
        color="#4ADE80"
        transparent
        opacity={0.7} 
        sizeAttenuation={!isMobile} 
        depthWrite={false}
        blending={THREE.AdditiveBlending} 
      />
    </points>
  );
});

// Composant de motif hexagonal PROFESSIONNEL
const HexagonPattern = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 opacity-12"> {/* ⚡ Légèrement plus visible */}
      {/* Lignes horizontales avec dégradé professionnel */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`h-line-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-[#4ADE80]/40 to-transparent"
          style={{
            top: `${(i + 1) * 8}%`,
            left: 0,
            right: 0,
            opacity: 0.3 - i * 0.015 
          }}
        />
      ))}
      
      {/* Lignes verticales avec espacement professionnel */}
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={`v-line-${i}`}
          className="absolute w-px bg-gradient-to-b from-transparent via-[#4ADE80]/40 to-transparent"
          style={{
            left: `${(i + 1) * 6.25}%`,
            top: 0,
            bottom: 0,
            opacity: 0.3 - i * 0.008 
          }}
        />
      ))}
      
      {/* 🎨 Motif de points professionnel */}
      <div 
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'radial-gradient(#4ADE80 1px, transparent 2px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      />
    </div>
  );
});

// 🎨 Composant principal PROFESSIONNEL
const SkillsBackground = memo(() => {
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
      {/* 🎨 Fond de base avec gradient professionnel */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/98 to-black z-0" />
      
      {/* Motif hexagonal professionnel */}
      <HexagonPattern />
      
      {/* ⚡ Particules flottantes 3D - Rendu conditionnel optimisé */}
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
            frameloop="demand" // ⚡ OPTIMISATION : Rendu à la demande
          >
            <ambientLight intensity={0.4} />
            <FloatingParticles />
          </Canvas>
        </div>
      )}
      
      {/* 🎨 Effets de dégradés lumineux professionnels */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-gradient-radial from-[#4ADE80]/12 to-transparent opacity-40 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/3 bg-gradient-radial from-[#4ADE80]/12 to-transparent opacity-40 blur-3xl" />
      
      {/* 🎨 Fallback élégant pour animations réduites */}
      {isReducedMotion && (
        <div className="absolute inset-0 bg-gradient-radial from-[#4ADE80]/8 via-transparent to-transparent opacity-60" />
      )}
      
      {/* Vignette professionnelle pour adoucir les bords */}
      <div className="absolute inset-0 bg-radial-gradient-vignette pointer-events-none z-0 opacity-30" />
    </div>
  );
});

export default SkillsBackground;