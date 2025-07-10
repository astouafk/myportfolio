// src/components/sections/Hero/components/HeroImage.tsx - VERSION PRO PERFORMANTE
import { useState, useRef, useEffect, useCallback, memo } from 'react'
import { gsap } from 'gsap'
import profileImage from '../../../../assets/moi6.png'
import { lazy, Suspense } from 'react'

const PhotoEffects = lazy(() => import('../../PhotoEffects'))

const PhotoEffectsFallback = () => (
  <div className="absolute inset-0 rounded-full bg-gradient-radial from-[#4ADE80]/20 to-transparent animate-pulse"></div>
)

export const HeroImage = memo(() => {
  const [isHoveringImage, setIsHoveringImage] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  
  const imageContainerRef = useRef<HTMLDivElement | null>(null)
  const circleRefs = useRef<(HTMLDivElement | null)[]>([])
  const bubblesRef = useRef<(HTMLDivElement | null)[]>([])
  const particlesRef = useRef<(HTMLDivElement | null)[]>([])
  const animationsRef = useRef<gsap.core.Timeline[]>([])
  
  // ⚡ VALEURS PRO : Équilibre performance/beauté
  const BUBBLE_COUNT = isMobile ? 8 : 15 // Réduit mais visible
  const PARTICLE_COUNT = isMobile ? 12 : 25 // Réduit mais magique
  const FLOAT_AMPLITUDE = isMobile ? 20 : 40 // Mouvement visible
  const FLOAT_SPEED = isMobile ? 2 : 1.5 // Plus fluide

  // Détection optimisée
  useEffect(() => {
    const checkDeviceSettings = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }
    
    checkDeviceSettings()
    
    const resizeObserver = new ResizeObserver(() => {
      checkDeviceSettings()
    })
    
    if (imageContainerRef.current) {
      resizeObserver.observe(imageContainerRef.current)
    }
    
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
    motionMedia.addEventListener('change', checkDeviceSettings)
    
    return () => {
      resizeObserver.disconnect()
      motionMedia.removeEventListener('change', checkDeviceSettings)
      
      animationsRef.current.forEach(timeline => {
        if (timeline) timeline.kill()
      })
    }
  }, [])

  // ⚡ ANIMATIONS PRO PERFORMANTES : RequestAnimationFrame optimisé
  useEffect(() => {
    if (isReducedMotion) return
    
    animationsRef.current.forEach(timeline => {
      if (timeline) timeline.kill()
    })
    animationsRef.current = []
    
    // ✅ Animation des cercles - optimisée avec will-change
    const circleAnimations = [
      { duration: isMobile ? 25 : 20, direction: 1 },
      { duration: isMobile ? 20 : 15, direction: -1 },
      { duration: isMobile ? 30 : 25, direction: 1 }
    ]

    circleRefs.current.forEach((circle, index) => {
      if (circle && circleAnimations[index]) {
        const animation = circleAnimations[index]
        
        // ⚡ OPTIMISATION : will-change pour GPU
        circle.style.willChange = 'transform'
        
        const timeline = gsap.timeline()
        
        timeline.to(circle, {
          rotation: 360 * animation.direction,
          duration: animation.duration,
          repeat: -1,
          ease: "none"
        })

        timeline.to(circle, {
          scale: 1.05,
          duration: 3 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        }, 0)
        
        animationsRef.current.push(timeline)
      }
    })

    // ✅ Animation des bulles - quantité réduite mais présente
    const bubbleTimeline = gsap.timeline()
    
    bubblesRef.current.forEach((bubble, index) => {
      if (bubble) {
        // ⚡ OPTIMISATION : will-change
        bubble.style.willChange = 'transform'
        
        const delay = index * 0.1 // ⚡ Délai réduit
        const radius = 15 + Math.random() * 25 // ⚡ Rayon réduit
        const angle = Math.random() * Math.PI * 2
        
        bubbleTimeline.to(bubble, {
          y: `-=${FLOAT_AMPLITUDE + Math.random() * 15}`,
          x: `+=${Math.sin(angle) * radius}`,
          rotation: Math.random() * 180, // ⚡ Rotation réduite
          duration: FLOAT_SPEED + Math.random() * 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay,
        }, 0)

        bubbleTimeline.to(bubble, {
          opacity: 0.6, // ⚡ Opacité réduite
          scale: 1.5, // ⚡ Scale réduit
          duration: 1.5 + Math.random() * 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 0.5,
        }, 0)
      }
    })
    
    animationsRef.current.push(bubbleTimeline)

    // ✅ Animations particules - simplifiées mais présentes
    const particlesTimeline = gsap.timeline()
    
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        // ⚡ OPTIMISATION : will-change
        particle.style.willChange = 'transform'
        
        const angle = (index / PARTICLE_COUNT) * Math.PI * 2
        const radius = 100 + Math.random() * 30 // ⚡ Rayon réduit
        const speed = 8 + Math.random() * 4 // ⚡ Plus rapide
        
        particlesTimeline.to(particle, {
          rotation: "+=180", // ⚡ Rotation réduite
          duration: speed,
          repeat: -1,
          ease: "none",
          motionPath: {
            path: [
              { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius },
              { x: Math.cos(angle + Math.PI) * radius, y: Math.sin(angle + Math.PI) * radius }
            ],
            curviness: 1
          }
        }, 0)
      }
    })
    
    animationsRef.current.push(particlesTimeline)

    // ✅ Animations des effets d'aura - conservées
    const auraTimeline = gsap.timeline()
    
    auraTimeline.to('.aura', {
      scale: 1.1,
      opacity: 0.5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    }, 0)

    auraTimeline.to('.energy-halo', {
      rotation: 360,
      duration: 25, // ⚡ Plus rapide
      repeat: -1,
      ease: "none"
    }, 0)
    
    animationsRef.current.push(auraTimeline)
    
    return () => {
      animationsRef.current.forEach(timeline => {
        if (timeline) timeline.kill()
      })
      
      // ⚡ Cleanup will-change
      circleRefs.current.forEach(circle => {
        if (circle) circle.style.willChange = 'auto'
      })
      bubblesRef.current.forEach(bubble => {
        if (bubble) bubble.style.willChange = 'auto'
      })
      particlesRef.current.forEach(particle => {
        if (particle) particle.style.willChange = 'auto'
      })
    }
  }, [isMobile, isReducedMotion, FLOAT_AMPLITUDE, FLOAT_SPEED, BUBBLE_COUNT, PARTICLE_COUNT])

  // ⚡ GESTION SOURIS OPTIMISÉE avec throttling
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (imageContainerRef.current && !isMobile && !isReducedMotion) {
      const rect = imageContainerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setMousePosition({ x, y })

      // ⚡ THROTTLING : Mise à jour moins fréquente
      if (Date.now() % 3 === 0) { // Toutes les 3 frames
        requestAnimationFrame(() => {
          circleRefs.current.forEach((circle, index) => {
            if (circle) {
              const depth = (index + 1) * 8 // ⚡ Profondeur réduite
              gsap.to(circle, {
                x: (x - 0.5) * depth,
                y: (y - 0.5) * depth,
                duration: 0.4,
                ease: "power2.out"
              })
            }
          })
        })
      }
    }
  }, [isMobile, isReducedMotion])

  // ✅ Gestion du hover conservée mais optimisée
  const handleImageHover = useCallback((hovering: boolean) => {
    setIsHoveringImage(hovering)
    
    if (imageContainerRef.current && !isReducedMotion) {
      gsap.to(imageContainerRef.current, {
        scale: hovering ? 1.05 : 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)" // ⚡ Elastic réduit
      })

      // ✅ Animations hover conservées mais optimisées
      particlesRef.current.forEach((particle, index) => {
        if (particle) {
          gsap.to(particle, {
            scale: hovering ? 1.8 : 1, // ⚡ Scale réduit
            opacity: hovering ? 0.7 : 0.4,
            duration: 0.4,
            ease: "power2.out",
            delay: index * 0.005 // ⚡ Délai réduit
          })
        }
      })

      bubblesRef.current.forEach((bubble, index) => {
        if (bubble) {
          const angle = (index / BUBBLE_COUNT) * Math.PI * 2
          const radius = hovering ? 80 : 0 // ⚡ Rayon réduit
          
          gsap.to(bubble, {
            x: hovering ? Math.cos(angle) * radius : 0,
            y: hovering ? Math.sin(angle) * radius : 0,
            scale: hovering ? 1.8 : 1,
            opacity: hovering ? 0.7 : 0.4,
            duration: 0.6,
            ease: "power2.out",
            delay: index * 0.01
          })
        }
      })
    }
  }, [isMobile, isReducedMotion, BUBBLE_COUNT])

  return (
    <div
      ref={imageContainerRef}
      className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] mx-auto transform-gpu"
      onMouseEnter={() => handleImageHover(true)}
      onMouseLeave={() => handleImageHover(false)}
      onMouseMove={handleMouseMove}
    >
      <Suspense fallback={<PhotoEffectsFallback />}>
        <PhotoEffects />
      </Suspense>

      {/* ✅ Cercles conservés - 3 cercles */}
      {[30, 15, 45].map((offset, index) => (
        <div
          key={index}
          ref={el => circleRefs.current[index] = el}
          className={`absolute sm:inset-[-${offset}px] inset-[-${Math.floor(offset * 0.7)}px] rounded-full border-2 
            ${index % 2 === 0 ? 'border-dashed' : 'border-solid'}
            border-[#4ADE80]/30 
            before:content-[''] before:absolute before:inset-0 
            before:rounded-full before:bg-gradient-to-r 
            before:from-[#4ADE80]/20 before:via-[#4ADE80]/5 before:to-transparent
            ${!isReducedMotion ? 'before:animate-spin-slow' : ''}`}
        />
      ))}

      {/* ✅ Particules conservées mais réduites */}
      {!isReducedMotion && Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <div
          key={`particle-${i}`}
          ref={el => particlesRef.current[i] = el}
          className="absolute w-1 h-1 rounded-full blur-[1px]"
          style={{
            left: '50%',
            top: '50%',
            backgroundColor: '#4ADE80',
            boxShadow: '0 0 6px #4ADE80', // ⚡ Ombre réduite
            opacity: 0.4,
          }}
        />
      ))}

      {/* ✅ Bulles conservées mais réduites */}
      {!isReducedMotion && Array.from({ length: BUBBLE_COUNT }).map((_, i) => (
        <div
          key={`bubble-${i}`}
          ref={el => bubblesRef.current[i] = el}
          className="absolute w-2 h-2 rounded-full blur-[2px]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: '#4ADE80',
            boxShadow: '0 0 10px #4ADE80', // ⚡ Ombre réduite
            opacity: 0.4,
          }}
        />
      ))}

      {/* Image principale */}
      <div className="absolute inset-[5%] rounded-full overflow-hidden bg-gray-800 z-10
        shadow-2xl shadow-[#4ADE80]/30">
        <img
          src={profileImage}
          alt="Profile"
          width={450}
          height={450}
          className="w-full h-full object-cover object-center transform scale-105
            transition-all duration-500 ease-out"
          style={{
            filter: `brightness(${isHoveringImage ? 1.3 : 1.1})
              contrast(${isHoveringImage ? 1.15 : 1.05})
              saturate(${isHoveringImage ? 1.1 : 1})`,
          }}
        />

        <div
          className="absolute inset-0 mix-blend-overlay backdrop-blur-[1px]
            animate-grain opacity-20"
          style={{
            backgroundImage: 'url("/noise.png")',
          }}
        />
      </div>

      {/* ✅ Auras conservées */}
      <div className="aura absolute inset-[-15%] rounded-full opacity-40
        bg-gradient-radial from-[#4ADE80]/40 via-[#4ADE80]/20 to-transparent
        blur-2xl -z-10" />
      
      <div className="energy-halo absolute inset-[-5%] rounded-full opacity-30
        bg-gradient-conic from-[#4ADE80]/0 via-[#4ADE80]/40 to-[#4ADE80]/0
        blur-xl -z-5" />
        
      <div className="absolute inset-0 bg-gradient-radial from-[#4ADE80]/10 to-transparent
        blur-3xl -z-20 animate-pulse" />
    </div>
  )
})

export default HeroImage