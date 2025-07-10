//src/components/effects/Constellation.tsx - VERSION OPTIMISÉE
import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

const Constellation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const lastFrameTime = useRef(0);
  
  // Détection optimisée
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };
    
    const checkSettings = () => {
      const mobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };
    
    checkSettings();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', checkSettings);
    
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionMediaQuery.addEventListener('change', checkSettings);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', checkSettings);
      motionMediaQuery.removeEventListener('change', checkSettings);
    };
  }, []);
  
  // Fonction d'initialisation ultra-optimisée
  const initThree = useCallback(() => {
    if (!canvasRef.current) return;
    
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    
    // ⚡ OPTIMISATION MAJEURE : Configuration ultra-light
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: false, // ❌ Désactivé
      powerPreference: 'high-performance',
      precision: 'lowp', // ⚡ Précision minimale
      depth: false, // ❌ Pas de test de profondeur
      stencil: false // ❌ Pas de stencil
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    // ⚡ OPTIMISATION : Pixel ratio limité
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;
    rendererRef.current = renderer;
    
    // 🔥 RÉDUCTION DRASTIQUE : Nombre de points divisé par 3-4
    const pointsCount = isReducedMotion ? 0 : (isMobile ? 20 : 40); // Au lieu de 80-150
    
    if (pointsCount === 0) return; // Pas de points si animations réduites
    
    const positions = new Float32Array(pointsCount * 3);
    const colors = new Float32Array(pointsCount * 3);
    
    for (let i = 0; i < pointsCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8; // ⚡ Zone plus petite
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 2; // ⚡ Profondeur réduite
      
      // Couleur PMS 399 C simplifiée
      colors[i] = 0.6;
      colors[i + 1] = 0.6;
      colors[i + 2] = 0.2;
    }
    
    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // ⚡ OPTIMISATION : Material simplifié
    const pointsMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.015 : 0.02, // 🔥 Taille réduite
      transparent: true,
      opacity: 0.6, // 🔥 Moins visible
      vertexColors: true,
      sizeAttenuation: false, // ⚡ Désactiver pour performances
      depthWrite: false, // ⚡ Pas d'écriture depth
    });
    
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    pointsRef.current = points;
    scene.add(points);
    
    return { scene, camera, renderer, points };
  }, [isMobile, isReducedMotion]);
  
  // Gestion du redimensionnement optimisée
  const handleResize = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current) return;
    
    cameraRef.current.aspect = window.innerWidth / window.innerHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
  }, []);
  
  // ⚡ OPTIMISATION MAJEURE : Animation ultra-simplifiée
  const animate = useCallback(() => {
    if (!isVisible || !sceneRef.current || !cameraRef.current || !rendererRef.current || !pointsRef.current) {
      return;
    }
    
    if (isReducedMotion) return; // 🔥 Pas d'animation
    
    // ⚡ THROTTLING AGRESSIF : Limiter à 20 FPS sur mobile
    const now = performance.now();
    const deltaTime = now - lastFrameTime.current;
    const targetFrameTime = isMobile ? 50 : 33; // 20 FPS mobile, 30 FPS desktop
    
    if (deltaTime < targetFrameTime) {
      requestRef.current = requestAnimationFrame(animate);
      return;
    }
    
    lastFrameTime.current = now;
    
    const points = pointsRef.current;
    
    // 🔥 ANIMATION ULTRA-SIMPLIFIÉE : Seulement rotation
    const rotationSpeed = isReducedMotion ? 0 : 0.0002; // Plus lent
    points.rotation.y += rotationSpeed;
    points.rotation.x += rotationSpeed * 0.5;
    
    // ❌ SUPPRIMÉ : Animation des positions individuelles (trop lourd)
    
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    requestRef.current = requestAnimationFrame(animate);
  }, [isVisible, isReducedMotion, isMobile]);
  
  // Intersection observer avec seuil plus élevé
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
      });
    }, {
      threshold: 0.1,
      rootMargin: '100px' // ⚡ Marge plus grande
    });
    
    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }
    
    return () => {
      if (canvasRef.current) {
        observer.unobserve(canvasRef.current);
      }
    };
  }, []);
  
  // Initialisation et animation
  useEffect(() => {
    initThree();
    window.addEventListener('resize', handleResize);
    
    if (isVisible && !isReducedMotion) {
      requestRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      // ⚡ CLEANUP optimisé
      if (pointsRef.current) {
        sceneRef.current?.remove(pointsRef.current);
        if (pointsRef.current.geometry) {
          pointsRef.current.geometry.dispose();
        }
        if (pointsRef.current.material instanceof THREE.Material) {
          pointsRef.current.material.dispose();
        }
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [animate, initThree, handleResize, isVisible, isReducedMotion]);
  
  // 🔥 Fallback statique si animations réduites
  if (isReducedMotion) {
    return <div className="fixed top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-b from-[#4ADE80]/5 to-transparent" />;
  }
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default React.memo(Constellation);