// //src/components/effects/Constellation.tsx
// import { useRef, useEffect } from 'react';
// import * as THREE from 'three';

// const Constellation = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     // Initialisation de la scène, caméra, et renderer
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({
//       canvas: canvasRef.current,
//       alpha: true,
//       antialias: true,
//     });

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     camera.position.z = 5;

//     // Création des points avec couleur PMS 399 C
//     const pointsCount = 150;
//     const positions = new Float32Array(pointsCount * 3);
//     const colors = new Float32Array(pointsCount * 3);

//     for (let i = 0; i < pointsCount * 3; i += 3) {
//       positions[i] = (Math.random() - 0.5) * 10; // Position X
//       positions[i + 1] = (Math.random() - 0.5) * 10; // Position Y
//       positions[i + 2] = (Math.random() - 0.5) * 3; // Position Z

//       // Couleur PMS 399 C (vert olive)
//       colors[i] = 0.6; // R (rouge)
//       colors[i + 1] = 0.6; // G (vert)
//       colors[i + 2] = 0.2; // B (bleu)
//     }

//     // Géométrie et matière des points
//     const pointsGeometry = new THREE.BufferGeometry();
//     pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
//     pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

//     const pointsMaterial = new THREE.PointsMaterial({
//       size: 0.03,
//       transparent: true,
//       opacity: 0.8,
//       vertexColors: true,
//       blending: THREE.NormalBlending, // Évite les mélanges additifs pour préserver la couleur
//     });

//     const points = new THREE.Points(pointsGeometry, pointsMaterial);
//     scene.add(points);

//     // Animation des points
//     const animate = () => {
//       requestAnimationFrame(animate);

//       points.rotation.y += 0.0005; // Rotation lente sur Y
//       points.rotation.x += 0.0002; // Rotation lente sur X

//       const time = Date.now() * 0.001;
//       const positions = points.geometry.attributes.position.array;

//       for (let i = 0; i < positions.length; i += 3) {
//         positions[i + 1] += Math.sin(time + positions[i] * 0.1) * 0.0015; // Animation sinusoïdale
//       }

//       points.geometry.attributes.position.needsUpdate = true;
//       renderer.render(scene, camera);
//     };

//     animate();

//     // Gestion du redimensionnement
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };

//     window.addEventListener('resize', handleResize);

//     // Nettoyage lors du démontage du composant
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       scene.remove(points);
//       pointsGeometry.dispose();
//       pointsMaterial.dispose();
//       renderer.dispose();
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed top-0 left-0 w-full h-full pointer-events-none"
//     />
//   );
// };

// export default Constellation;







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
  
  // Détection de la visibilité, mode mobile et préférences de mouvement réduit
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };
    
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    
    const checkReducedMotion = () => {
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', checkMobile);
    
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionMediaQuery.addEventListener('change', checkReducedMotion);
    
    checkMobile();
    checkReducedMotion();
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', checkMobile);
      motionMediaQuery.removeEventListener('change', checkReducedMotion);
    };
  }, []);
  
  // Fonction d'initialisation
  const initThree = useCallback(() => {
    if (!canvasRef.current) return;
    
    // Initialisation de la scène, caméra, et renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
      precision: isMobile ? 'mediump' : 'highp'
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;
    rendererRef.current = renderer;
    
    // Création des points avec couleur PMS 399 C
    const pointsCount = isMobile ? 80 : 150;
    const positions = new Float32Array(pointsCount * 3);
    const colors = new Float32Array(pointsCount * 3);
    
    for (let i = 0; i < pointsCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10; // Position X
      positions[i + 1] = (Math.random() - 0.5) * 10; // Position Y
      positions[i + 2] = (Math.random() - 0.5) * 3; // Position Z
      
      // Couleur PMS 399 C (vert olive)
      colors[i] = 0.6; // R (rouge)
      colors[i + 1] = 0.6; // G (vert)
      colors[i + 2] = 0.2; // B (bleu)
    }
    
    // Utiliser un buffer statique pour les positions immuables
    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const pointsMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.02 : 0.03,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      blending: THREE.NormalBlending,
      sizeAttenuation: true
    });
    
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    pointsRef.current = points;
    scene.add(points);
    
    return { scene, camera, renderer, points };
  }, [isMobile]);
  
  // Gestion du redimensionnement
  const handleResize = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current) return;
    
    cameraRef.current.aspect = window.innerWidth / window.innerHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
  }, []);
  
  // Animation optimisée
  const animate = useCallback(() => {
    if (!isVisible || !sceneRef.current || !cameraRef.current || !rendererRef.current || !pointsRef.current) {
      return;
    }
    
    const points = pointsRef.current;
    
    // Réduire l'animation si l'utilisateur préfère moins de mouvement
    const rotationSpeed = isReducedMotion ? 0.0001 : 0.0005;
    const waveSpeed = isReducedMotion ? 0.0005 : 0.001;
    
    points.rotation.y += rotationSpeed;
    points.rotation.x += rotationSpeed * 0.4;
    
    // N'animer les positions que si le mouvement n'est pas réduit
    if (!isReducedMotion) {
      const time = Date.now() * 0.001;
      const positions = points.geometry.attributes.position.array as Float32Array;
      
      // Optimisation: n'animer qu'un sous-ensemble de points par frame pour alléger le CPU
      const updateFraction = isMobile ? 0.3 : 0.5; // 30% ou 50% des points par frame
      const startIndex = Math.floor(Math.random() * (1 - updateFraction) * positions.length / 3) * 3;
      const endIndex = startIndex + Math.floor(updateFraction * positions.length);
      
      for (let i = startIndex; i < endIndex; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i] * 0.1) * waveSpeed;
      }
      
      points.geometry.attributes.position.needsUpdate = true;
    }
    
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    requestRef.current = requestAnimationFrame(animate);
  }, [isVisible, isReducedMotion, isMobile]);
  
  // Gestion de l'intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
      });
    }, {
      threshold: 0.1
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
    
    if (isVisible) {
      requestRef.current = requestAnimationFrame(animate);
    }
    
    // Nettoyage lors du démontage du composant
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      if (pointsRef.current) {
        sceneRef.current?.remove(pointsRef.current);
        pointsRef.current.geometry.dispose();
        
        if (pointsRef.current.material instanceof THREE.Material) {
          pointsRef.current.material.dispose();
        }
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [animate, initThree, handleResize, isVisible]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default React.memo(Constellation);