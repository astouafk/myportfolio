// //src/components/effects/CircularWave.tsx
// import React, { useEffect, useRef } from 'react'
// import * as THREE from 'three'

// const CircularWave = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null)

//   useEffect(() => {
//     if (!canvasRef.current) return

//     const scene = new THREE.Scene()
//     const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
//     const renderer = new THREE.WebGLRenderer({
//       canvas: canvasRef.current,
//       alpha: true,
//       antialias: true
//     })

//     // Ajuster la taille pour correspondre au conteneur de l'image
//     const size = 450
//     renderer.setSize(size, size)
//     camera.position.z = 5

//     // Ajuster les cercles pour qu'ils correspondent mieux à l'image
//     const circles: THREE.Line[] = []
//     const numCircles = 2 // Réduire le nombre de cercles

//     for (let i = 0; i < numCircles; i++) {
//       const points = []
//       const segments = 128 // Augmenter pour des cercles plus lisses
//       const radius = 1.8 + i * 0.3 // Ajuster le rayon pour correspondre à l'image
      
//       for (let j = 0; j <= segments; j++) {
//         const theta = (j / segments) * Math.PI * 2
//         points.push(new THREE.Vector3(
//           Math.cos(theta) * radius,
//           Math.sin(theta) * radius,
//           0
//         ))
//       }

//       const geometry = new THREE.BufferGeometry().setFromPoints(points)
//       const material = new THREE.LineBasicMaterial({ 
//         color: 0x4ADE80,
//         transparent: true,
//         opacity: 0.3 - (i * 0.1) // Réduire l'opacité
//       })
      
//       const circle = new THREE.Line(geometry, material)
//       circles.push(circle)
//       scene.add(circle)
//     }

//     // Ajuster les bulles
//     const bubbles: THREE.Mesh[] = []
//     const numBubbles = 15 // Réduire le nombre de bulles

//     for (let i = 0; i < numBubbles; i++) {
//       const geometry = new THREE.SphereGeometry(0.03, 16, 16) // Réduire la taille
//       const material = new THREE.MeshBasicMaterial({
//         color: 0x4ADE80,
//         transparent: true,
//         opacity: 0.4 // Réduire l'opacité
//       })
      
//       const bubble = new THREE.Mesh(geometry, material)
//       const angle = Math.random() * Math.PI * 2
//       const radius = 1.8 + Math.random() * 0.3 // Ajuster pour correspondre aux cercles
      
//       bubble.position.x = Math.cos(angle) * radius
//       bubble.position.y = Math.sin(angle) * radius
//       bubble.userData = {
//         angle,
//         radius,
//         speed: 0.0005 + Math.random() * 0.001, // Ralentir la vitesse
//         amplitude: 0.05 + Math.random() * 0.1, // Réduire l'amplitude
//         phase: Math.random() * Math.PI * 2
//       }
      
//       bubbles.push(bubble)
//       scene.add(bubble)
//     }

//     // Animation plus douce
//     const animate = () => {
//       requestAnimationFrame(animate)

//       // Animation des cercles
//       circles.forEach((circle, i) => {
//         const points = []
//         const segments = 128
//         const radius = 1.8 + i * 0.3
//         const time = Date.now() * 0.0005 // Ralentir l'animation
//         const waveHeight = 0.05 - (i * 0.01) // Réduire la hauteur des vagues
        
//         for (let j = 0; j <= segments; j++) {
//           const theta = (j / segments) * Math.PI * 2
//           const wave = Math.sin(theta * 6 + time) * waveHeight
//           points.push(new THREE.Vector3(
//             Math.cos(theta) * (radius + wave),
//             Math.sin(theta) * (radius + wave),
//             0
//           ))
//         }

//         circle.geometry.setFromPoints(points)
//       })

//       // Animation des bulles plus douce
//       bubbles.forEach(bubble => {
//         const time = Date.now() * 0.0005
//         const data = bubble.userData
        
//         data.angle += data.speed
//         const wobble = Math.sin(time * 2 + data.phase) * data.amplitude
        
//         bubble.position.x = Math.cos(data.angle) * (data.radius + wobble)
//         bubble.position.y = Math.sin(data.angle) * (data.radius + wobble)
//         bubble.scale.setScalar(0.9 + Math.sin(time * 2 + data.phase) * 0.1)
//       })

//       renderer.render(scene, camera)
//     }

//     animate()

//     // Cleanup
//     return () => {
//       circles.forEach(circle => {
//         circle.geometry.dispose()
//         if (circle.material instanceof THREE.Material) {
//           circle.material.dispose()
//         }
//       })
//       bubbles.forEach(bubble => {
//         bubble.geometry.dispose()
//         if (bubble.material instanceof THREE.Material) {
//           bubble.material.dispose()
//         }
//       })
//       renderer.dispose()
//     }
//   }, [])

//   return (
//     <canvas
//       ref={canvasRef}
//       className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
//       style={{ width: '450px', height: '450px' }}
//     />
//   )
// }

// export default CircularWave



import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'

const CircularWave = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number>()
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const circlesRef = useRef<THREE.Line[]>([])
  const bubblesRef = useRef<THREE.Mesh[]>([])
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Détection de la visibilité de la page
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    // Détection d'appareil mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(mobile)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Fonction d'initialisation de Three.js
  const initThree = useCallback(() => {
    if (!canvasRef.current) return

    // Créer la scène
    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    // Créer la caméra
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    cameraRef.current = camera
    
    // Créer le renderer avec des options optimisées
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: !isMobile, // Désactiver l'antialiasing sur mobile
      powerPreference: 'high-performance',
      precision: isMobile ? 'mediump' : 'highp' // Précision réduite sur mobile
    })

    // Ajuster la taille pour correspondre au conteneur de l'image
    const size = 450
    renderer.setSize(size, size)
    renderer.setPixelRatio(isMobile ? 1 : window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio)
    camera.position.z = 5
    rendererRef.current = renderer

    // Optimiser le nombre de cercles et de bulles pour les appareils mobiles
    const numCircles = isMobile ? 1 : 2
    const numBubbles = isMobile ? 8 : 15

    // Ajuster les cercles pour qu'ils correspondent mieux à l'image
    const circles: THREE.Line[] = []

    for (let i = 0; i < numCircles; i++) {
      const points = []
      const segments = isMobile ? 64 : 128 // Réduire les segments sur mobile
      const radius = 1.8 + i * 0.3
      
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2
        points.push(new THREE.Vector3(
          Math.cos(theta) * radius,
          Math.sin(theta) * radius,
          0
        ))
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({ 
        color: 0x4ADE80,
        transparent: true,
        opacity: 0.3 - (i * 0.1)
      })
      
      const circle = new THREE.Line(geometry, material)
      circles.push(circle)
      scene.add(circle)
    }
    circlesRef.current = circles

    // Ajuster les bulles
    const bubbles: THREE.Mesh[] = []

    for (let i = 0; i < numBubbles; i++) {
      const geometry = new THREE.SphereGeometry(0.03, isMobile ? 8 : 16, isMobile ? 8 : 16) // Réduire la complexité sur mobile
      const material = new THREE.MeshBasicMaterial({
        color: 0x4ADE80,
        transparent: true,
        opacity: 0.4
      })
      
      const bubble = new THREE.Mesh(geometry, material)
      const angle = Math.random() * Math.PI * 2
      const radius = 1.8 + Math.random() * 0.3
      
      bubble.position.x = Math.cos(angle) * radius
      bubble.position.y = Math.sin(angle) * radius
      bubble.userData = {
        angle,
        radius,
        speed: 0.0005 + Math.random() * 0.001,
        amplitude: 0.05 + Math.random() * 0.1,
        phase: Math.random() * Math.PI * 2
      }
      
      bubbles.push(bubble)
      scene.add(bubble)
    }
    bubblesRef.current = bubbles

    return { scene, camera, renderer, circles, bubbles }
  }, [isMobile])

  // Fonction d'animation optimisée
  const animate = useCallback(() => {
    if (!isVisible || !sceneRef.current || !cameraRef.current || !rendererRef.current) return

    const time = Date.now() * 0.0005

    // Animation des cercles
    circlesRef.current.forEach((circle, i) => {
      const points = []
      const segments = isMobile ? 64 : 128
      const radius = 1.8 + i * 0.3
      const waveHeight = 0.05 - (i * 0.01)
      
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2
        const wave = Math.sin(theta * 6 + time) * waveHeight
        points.push(new THREE.Vector3(
          Math.cos(theta) * (radius + wave),
          Math.sin(theta) * (radius + wave),
          0
        ))
      }

      circle.geometry.setFromPoints(points)
    })

    // Animation des bulles plus douce
    bubblesRef.current.forEach(bubble => {
      const data = bubble.userData
      
      data.angle += data.speed
      const wobble = Math.sin(time * 2 + data.phase) * data.amplitude
      
      bubble.position.x = Math.cos(data.angle) * (data.radius + wobble)
      bubble.position.y = Math.sin(data.angle) * (data.radius + wobble)
      bubble.scale.setScalar(0.9 + Math.sin(time * 2 + data.phase) * 0.1)
    })

    rendererRef.current.render(sceneRef.current, cameraRef.current)
    requestRef.current = requestAnimationFrame(animate)
  }, [isVisible, isMobile])

  // Gestion de l'intersection observer pour n'animer que lorsque visible
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting)
      })
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    })

    if (canvasRef.current) {
      observer.observe(canvasRef.current)
    }

    return () => {
      if (canvasRef.current) {
        observer.unobserve(canvasRef.current)
      }
    }
  }, [])

  // Initialisation et animation
  useEffect(() => {
    initThree()

    // Démarrer l'animation si le composant est visible
    if (isVisible) {
      requestRef.current = requestAnimationFrame(animate)
    }

    // Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }

      // Nettoyer les ressources Three.js
      circlesRef.current.forEach(circle => {
        circle.geometry.dispose()
        if (circle.material instanceof THREE.Material) {
          circle.material.dispose()
        }
      })
      
      bubblesRef.current.forEach(bubble => {
        bubble.geometry.dispose()
        if (bubble.material instanceof THREE.Material) {
          bubble.material.dispose()
        }
      })
      
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
    }
  }, [animate, initThree, isVisible])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
      style={{ width: '450px', height: '450px' }}
      aria-label="Animation de vague circulaire"
    />
  )
}

export default React.memo(CircularWave)