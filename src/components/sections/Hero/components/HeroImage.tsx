// src/components/sections/Hero/components/HeroImage.tsx
import { useState, useRef, useEffect, useCallback, memo } from 'react'
import { gsap } from 'gsap'
import profileImage from '../../../../assets/moi6.png'
import { lazy, Suspense } from 'react'

// Import dynamique pour l'effet photo
const PhotoEffects = lazy(() => import('../../PhotoEffects'))

// Fallback simple pendant le chargement de PhotoEffects
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
  
  // Valeurs optimisées pour mobile
  const BUBBLE_COUNT = isMobile ? 15 : 30
  const PARTICLE_COUNT = isMobile ? 25 : 50
  const FLOAT_AMPLITUDE = isMobile ? 30 : 60
  const FLOAT_SPEED = isMobile ? 1.5 : 2

  // Détection du type d'appareil et des préférences d'animation
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
      
      // Nettoyage des animations GSAP
      animationsRef.current.forEach(timeline => {
        if (timeline) timeline.kill()
      })
    }
  }, [])

  // Animations avec GSAP, optimisées et respectant les préférences d'accessibilité
  useEffect(() => {
    if (isReducedMotion) return
    
    // Nettoyer les animations précédentes
    animationsRef.current.forEach(timeline => {
      if (timeline) timeline.kill()
    })
    animationsRef.current = []
    
    const circleAnimations = [
      { duration: isMobile ? 25 : 20, direction: 1 },
      { duration: isMobile ? 20 : 15, direction: -1 },
      { duration: isMobile ? 30 : 25, direction: 1 }
    ]

    // Animation des cercles
    circleRefs.current.forEach((circle, index) => {
      if (circle && circleAnimations[index]) {
        const animation = circleAnimations[index]
        
        const timeline = gsap.timeline()
        
        timeline.to(circle, {
          rotation: 360 * animation.direction,
          duration: animation.duration,
          repeat: -1,
          ease: "none"
        })

        timeline.to(circle, {
          scale: 1.1,
          duration: 3 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        }, 0)
        
        animationsRef.current.push(timeline)
      }
    })

    // Animation des bulles
    if (!isMobile) {
      const bubbleTimeline = gsap.timeline()
      
      bubblesRef.current.forEach((bubble, index) => {
        if (bubble) {
          const delay = index * 0.15
          const radius = 20 + Math.random() * 40
          const angle = Math.random() * Math.PI * 2
          
          bubbleTimeline.to(bubble, {
            y: `-=${FLOAT_AMPLITUDE + Math.random() * 20}`,
            x: `+=${Math.sin(angle) * radius}`,
            rotation: Math.random() * 360,
            duration: FLOAT_SPEED + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay,
          }, 0)

          bubbleTimeline.to(bubble, {
            opacity: 0.8,
            scale: 1.8,
            duration: 2 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "none",
            delay: Math.random(),
          }, 0)
        }
      })
      
      animationsRef.current.push(bubbleTimeline)
    }

    // Animations particules
    const particlesTimeline = gsap.timeline()
    if (!isMobile) {
      particlesRef.current.forEach((particle, index) => {
        if (particle) {
          const angle = (index / PARTICLE_COUNT) * Math.PI * 2
          const radius = 150 + Math.random() * 50
          const speed = 5 + Math.random() * 5
          
          particlesTimeline.to(particle, {
            rotation: "+=360",
            duration: speed,
            repeat: -1,
            ease: "none",
            motionPath: {
              path: [
                { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius },
                { x: Math.cos(angle + Math.PI) * radius, y: Math.sin(angle + Math.PI) * radius },
                { x: Math.cos(angle + Math.PI * 2) * radius, y: Math.sin(angle + Math.PI * 2) * radius }
              ],
              curviness: 1.5
            }
          }, 0)
        }
      })
    } else {
      // Version simplifiée pour mobile
      particlesRef.current.forEach((particle, index) => {
        if (particle) {
          particlesTimeline.to(particle, {
            x: `random(-30, 30)`,
            y: `random(-30, 30)`,
            rotation: "+=180",
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.05
          }, 0)
        }
      })
    }
    
    animationsRef.current.push(particlesTimeline)

    // Animations des effets d'aura
    const auraTimeline = gsap.timeline()
    
    auraTimeline.to('.aura', {
      scale: 1.2,
      opacity: 0.6,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    }, 0)

    auraTimeline.to('.energy-halo', {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: "none"
    }, 0)
    
    animationsRef.current.push(auraTimeline)
    
    // Cleanup function
    return () => {
      animationsRef.current.forEach(timeline => {
        if (timeline) timeline.kill()
      })
    }
  }, [isMobile, isReducedMotion, FLOAT_AMPLITUDE, FLOAT_SPEED])

  // Gestion optimisée du mouvement de la souris
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (imageContainerRef.current && !isMobile && !isReducedMotion) {
      const rect = imageContainerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setMousePosition({ x, y })

      // Utiliser requestAnimationFrame pour optimiser les mises à jour du DOM
      requestAnimationFrame(() => {
        circleRefs.current.forEach((circle, index) => {
          if (circle) {
            const depth = (index + 1) * 10
            gsap.to(circle, {
              x: (x - 0.5) * depth,
              y: (y - 0.5) * depth,
              duration: 0.5,
              ease: "power2.out"
            })
          }
        })
      })
    }
  }, [isMobile, isReducedMotion])

  // Gestion du hover sur l'image
  const handleImageHover = useCallback((hovering: boolean) => {
    setIsHoveringImage(hovering)
    
    if (imageContainerRef.current && !isReducedMotion) {
      gsap.to(imageContainerRef.current, {
        scale: hovering ? 1.05 : 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)"
      })

      // Animations différentes selon le type d'appareil
      if (!isMobile) {
        particlesRef.current.forEach((particle, index) => {
          if (particle) {
            gsap.to(particle, {
              scale: hovering ? 2 : 1,
              opacity: hovering ? 0.8 : 0.4,
              duration: 0.5,
              ease: "power2.out",
              delay: index * 0.01
            })
          }
        })

        bubblesRef.current.forEach((bubble, index) => {
          if (bubble) {
            const angle = (index / BUBBLE_COUNT) * Math.PI * 2
            const radius = hovering ? 100 : 0
            
            gsap.to(bubble, {
              x: hovering ? Math.cos(angle) * radius : 0,
              y: hovering ? Math.sin(angle) * radius : 0,
              scale: hovering ? 2 : 1,
              opacity: hovering ? 0.8 : 0.4,
              duration: 0.8,
              ease: "power2.out",
              delay: index * 0.02
            })
          }
        })
      }
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

      {/* Réduire la quantité de particules sur mobile */}
      {!isReducedMotion && Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <div
          key={`particle-${i}`}
          ref={el => particlesRef.current[i] = el}
          className="absolute w-1 h-1 rounded-full blur-[1px]"
          style={{
            left: '50%',
            top: '50%',
            backgroundColor: '#4ADE80',
            boxShadow: '0 0 8px #4ADE80',
            opacity: 0.4,
          }}
        />
      ))}

      {/* Conditionnellement rendre les bulles pour optimiser sur mobile */}
      {!isReducedMotion && Array.from({ length: BUBBLE_COUNT }).map((_, i) => (
        <div
          key={`bubble-${i}`}
          ref={el => bubblesRef.current[i] = el}
          className="absolute w-2 h-2 rounded-full blur-[2px]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: '#4ADE80',
            boxShadow: '0 0 15px #4ADE80',
            opacity: 0.4,
          }}
        />
      ))}

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
            filter: `brightness(${isHoveringImage ? 1.4 : 1.1})
              contrast(${isHoveringImage ? 1.2 : 1.1})
              saturate(${isHoveringImage ? 1.2 : 1})`,
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