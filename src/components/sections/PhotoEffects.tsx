//src/components/sections/PhotoEffects.tsx
import { useRef, useEffect, useState, memo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'

const WaveCircle = memo(() => {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  
  // Détection mobile et préférences de mouvement
  useEffect(() => {
    const checkSettings = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }
    
    checkSettings()
    
    window.addEventListener('resize', checkSettings)
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
    motionMedia.addEventListener('change', checkSettings)
    
    return () => {
      window.removeEventListener('resize', checkSettings)
      motionMedia.removeEventListener('change', checkSettings)
    }
  }, [])
  
  // Shader optimisé pour mobile
  const waveShader = {
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color('#4ADE80') },
      amplitude: { value: isMobile ? 0.1 : 0.2 },
      frequency: { value: isMobile ? 2.0 : 3.0 },
      isReducedMotion: { value: isReducedMotion ? 1.0 : 0.0 },
    },
    vertexShader: `
      uniform float time;
      uniform float amplitude;
      uniform float frequency;
      uniform float isReducedMotion;
      
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        vec3 pos = position;
        
        if (isReducedMotion < 0.5) {
          float angle = atan(pos.y, pos.x);
          float wave = sin(angle * frequency + time) * amplitude;
          pos.x *= 1.0 + wave;
          pos.y *= 1.0 + wave;
        }
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float time;
      uniform float isReducedMotion;
      
      varying vec2 vUv;
      
      void main() {
        float alpha = 0.5;
        
        if (isReducedMotion < 0.5) {
          alpha = 0.5 + 0.5 * sin(vUv.x * 10.0 + time);
        }
        
        gl_FragColor = vec4(color, alpha * 0.5);
      }
    `
  }

  // Animation optimisée
  useFrame(({ clock }) => {
    if (materialRef.current && !isReducedMotion) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime()
      // Mise à jour du statut des préférences d'animation
      materialRef.current.uniforms.isReducedMotion.value = isReducedMotion ? 1.0 : 0.0
    }
  })

  return (
    <mesh>
      <ringGeometry args={[1.9, 2.0, isMobile ? 90 : 180]} />
      <shaderMaterial
        ref={materialRef}
        {...waveShader}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
})

const Bubbles = memo(() => {
  const bubblesRef = useRef<THREE.Points>(null)
  const initialPositionsRef = useRef<Float32Array | null>(null)
  const initialTimeRef = useRef(Date.now())
  const [isMobile, setIsMobile] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  
  // Détection mobile et préférences de mouvement
  useEffect(() => {
    const checkSettings = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }
    
    checkSettings()
    window.addEventListener('resize', checkSettings)
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
    motionMedia.addEventListener('change', checkSettings)
    
    return () => {
      window.removeEventListener('resize', checkSettings)
      motionMedia.removeEventListener('change', checkSettings)
    }
  }, [])
  
  // Nombre optimisé de bulles
  const count = isMobile ? 25 : 50

  // Création des positions une seule fois au montage
  useEffect(() => {
    // Création des positions aléatoires des bulles
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const startPositions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * Math.PI * 2)
      const radius = 2 + Math.random() * 0.3
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = Math.sin(angle) * radius
      positions[i * 3 + 2] = 0
      speeds[i] = 0.2 + Math.random() * 0.3
      startPositions[i * 3] = positions[i * 3]
      startPositions[i * 3 + 1] = positions[i * 3 + 1]
      startPositions[i * 3 + 2] = positions[i * 3 + 2]
    }

    initialPositionsRef.current = startPositions
    
    // Si le composant a un bubblesRef, mettre à jour sa géométrie
    if (bubblesRef.current) {
      const geometry = bubblesRef.current.geometry as THREE.BufferGeometry
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    }
  }, [count])

  // Animation avec throttling pour économiser les ressources
  useFrame(({ clock }) => {
    if (!bubblesRef.current || !initialPositionsRef.current || isReducedMotion) return
    
    const now = Date.now()
    // N'animer que toutes les 50ms (20fps) pour économiser le CPU sur mobile
    if (isMobile && now - initialTimeRef.current < 50) return
    
    initialTimeRef.current = now
    
    const time = clock.getElapsedTime()
    const positions = bubblesRef.current.geometry.attributes.position.array as Float32Array
    const startPositions = initialPositionsRef.current
    
    // Animer seulement 1/3 des bulles par frame sur mobile
    const animationStep = isMobile ? 3 : 1
    
    for (let i = 0; i < count; i++) {
      // Sauter certaines bulles pour optimiser
      if (isMobile && i % animationStep !== 0) continue
      
      const i3 = i * 3
      const angle = time * (0.2 + Math.sin(i) * 0.1)
      positions[i3] = startPositions[i3] + Math.sin(angle) * 0.1
      positions[i3 + 1] = startPositions[i3 + 1] + Math.cos(angle) * 0.1
    }

    bubblesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={bubblesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={new Float32Array(count * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.03 : 0.04}
        color="#4ADE80"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        // Désactiver le sizeAttenuation pour économiser des calculs
        sizeAttenuation={false}
      />
    </points>
  )
})

// Composant principal persistant
const PhotoEffects = memo(() => {
  return (
    <div className="absolute inset-[-50px]">
      <Canvas
        gl={{
          antialias: window.innerWidth > 768,
          alpha: true,
          preserveDrawingBuffer: false,
          powerPreference: 'high-performance'
        }}
        dpr={window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio}
      >
        <WaveCircle />
        <Bubbles />
      </Canvas>
    </div>
  )
})

export default PhotoEffects