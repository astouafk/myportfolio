//src/components/effects/CircularWave.tsx - VERSION OPTIMISÉE
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
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  // Détection optimisée
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    const checkSettings = () => {
      const mobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(mobile)
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }
    
    checkSettings()
    window.addEventListener('resize', checkSettings)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
    motionMedia.addEventListener('change', checkSettings)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('resize', checkSettings)
      motionMedia.removeEventListener('change', checkSettings)
    }
  }, [])

  // Fonction d'initialisation optimisée
  const initThree = useCallback(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    cameraRef.current = camera
    
    // ⚡ OPTIMISATION : Configuration renderer allégée
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: false, // ❌ Désactivé pour performances
      powerPreference: 'high-performance',
      precision: 'lowp' // ⚡ Précision réduite
    })

    const size = 450
    renderer.setSize(size, size)
    // ⚡ OPTIMISATION : Limiter le pixel ratio
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    camera.position.z = 5
    rendererRef.current = renderer

    // ⚡ OPTIMISATION : Réduire drastiquement les éléments
    const numCircles = isReducedMotion ? 0 : (isMobile ? 1 : 2) // 🔥 Aucun cercle si animations réduites
    const numBubbles = isReducedMotion ? 0 : (isMobile ? 4 : 8) // 🔥 Divisé par 2

    // Cercles optimisés
    const circles: THREE.Line[] = []
    for (let i = 0; i < numCircles; i++) {
      const points = []
      const segments = isMobile ? 32 : 64 // 🔥 Divisé par 2
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
        opacity: 0.4 - (i * 0.1)
      })
      
      const circle = new THREE.Line(geometry, material)
      circles.push(circle)
      scene.add(circle)
    }
    circlesRef.current = circles

    // Bulles optimisées
    const bubbles: THREE.Mesh[] = []
    for (let i = 0; i < numBubbles; i++) {
      // ⚡ OPTIMISATION : Géométrie plus simple
      const geometry = new THREE.SphereGeometry(0.03, isMobile ? 6 : 8, isMobile ? 6 : 8) // 🔥 Moins de segments
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
        speed: 0.0003 + Math.random() * 0.0005, // 🔥 Plus lent
        amplitude: 0.03 + Math.random() * 0.05, // 🔥 Moins d'amplitude
        phase: Math.random() * Math.PI * 2
      }
      
      bubbles.push(bubble)
      scene.add(bubble)
    }
    bubblesRef.current = bubbles

    return { scene, camera, renderer, circles, bubbles }
  }, [isMobile, isReducedMotion])

  // ⚡ OPTIMISATION : Animation avec throttling agressif
  const animate = useCallback(() => {
    if (!isVisible || !sceneRef.current || !cameraRef.current || !rendererRef.current) return
    if (isReducedMotion) return // 🔥 Pas d'animation si préférences réduites

    const time = Date.now() * 0.0003 // 🔥 Plus lent

    // Animation des cercles - optimisée
    circlesRef.current.forEach((circle, i) => {
      const segments = isMobile ? 32 : 64
      const radius = 1.8 + i * 0.3
      const waveHeight = 0.03 - (i * 0.005) // 🔥 Amplitude réduite
      
      // ⚡ OPTIMISATION : Mise à jour moins fréquente
      if (Date.now() % (isMobile ? 100 : 50) === 0) {
        const points = []
        for (let j = 0; j <= segments; j++) {
          const theta = (j / segments) * Math.PI * 2
          const wave = Math.sin(theta * 4 + time) * waveHeight // 🔥 Moins de répétitions
          points.push(new THREE.Vector3(
            Math.cos(theta) * (radius + wave),
            Math.sin(theta) * (radius + wave),
            0
          ))
        }
        circle.geometry.setFromPoints(points)
      }
    })

    // Animation des bulles - simplifiée
    bubblesRef.current.forEach(bubble => {
      const data = bubble.userData
      data.angle += data.speed
      const wobble = Math.sin(time + data.phase) * data.amplitude
      
      bubble.position.x = Math.cos(data.angle) * (data.radius + wobble)
      bubble.position.y = Math.sin(data.angle) * (data.radius + wobble)
      // ⚡ OPTIMISATION : Scale plus simple
      bubble.scale.setScalar(0.95 + Math.sin(time + data.phase) * 0.05)
    })

    rendererRef.current.render(sceneRef.current, cameraRef.current)
    
    // ⚡ OPTIMISATION : FPS limité sur mobile
    if (isMobile) {
      setTimeout(() => {
        requestRef.current = requestAnimationFrame(animate)
      }, 33) // ~30 FPS sur mobile
    } else {
      requestRef.current = requestAnimationFrame(animate)
    }
  }, [isVisible, isMobile, isReducedMotion])

  // Intersection observer optimisé
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting)
      })
    }, {
      root: null,
      rootMargin: '50px', // ⚡ Marge plus grande pour éviter les clignotements
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

    if (isVisible && !isReducedMotion) {
      requestRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }

      // ⚡ OPTIMISATION : Cleanup plus robuste
      circlesRef.current.forEach(circle => {
        if (circle.geometry) circle.geometry.dispose()
        if (circle.material instanceof THREE.Material) {
          circle.material.dispose()
        }
      })
      
      bubblesRef.current.forEach(bubble => {
        if (bubble.geometry) bubble.geometry.dispose()
        if (bubble.material instanceof THREE.Material) {
          bubble.material.dispose()
        }
      })
      
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
    }
  }, [animate, initThree, isVisible, isReducedMotion])

  // 🔥 Ne pas rendre si animations réduites
  if (isReducedMotion) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 w-[450px] h-[450px] rounded-full bg-gradient-to-r from-[#4ADE80]/10 to-[#4ADE80]/5 blur-xl" />
    )
  }

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