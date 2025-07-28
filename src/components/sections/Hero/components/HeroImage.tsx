// /// src/components/sections/Hero/components/HeroImage.tsx - PHOTOEFFECTS CORRIGÉ
// import { useState, useRef, useEffect, useCallback, memo } from 'react'
// import { gsap } from 'gsap'
// import { lazy, Suspense } from 'react'

// // 🎯 IMAGES OPTIMISÉES
// import profileImageWebP from '../../../../assets/moi6.jpg'
// import profileImageJPG from '../../../../assets/moi6.jpg'

// const PhotoEffects = lazy(() => import('../../PhotoEffects'))

// const PhotoEffectsFallback = () => (
//   <div className="absolute inset-[-150px] rounded-full bg-gradient-radial from-[#4ADE80]/20 to-transparent animate-pulse"></div>
// )

// export const HeroImage = memo(() => {
//   const [isHoveringImage, setIsHoveringImage] = useState(false)
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//   const [isMobile, setIsMobile] = useState(false)
//   const [isReducedMotion, setIsReducedMotion] = useState(false)
//   const [imageLoaded, setImageLoaded] = useState(false)
//   const [imageError, setImageError] = useState(false)
  
//   const imageContainerRef = useRef<HTMLDivElement | null>(null)
//   const circleRefs = useRef<(HTMLDivElement | null)[]>([])
//   const bubblesRef = useRef<(HTMLDivElement | null)[]>([])
//   const particlesRef = useRef<(HTMLDivElement | null)[]>([])
//   const animationsRef = useRef<gsap.core.Timeline[]>([])
  
//   const BUBBLE_COUNT = isMobile ? 8 : 15
//   const PARTICLE_COUNT = isMobile ? 12 : 25
//   const FLOAT_AMPLITUDE = isMobile ? 20 : 40
//   const FLOAT_SPEED = isMobile ? 2 : 1.5

//   // Détection optimisée
//   useEffect(() => {
//     const checkDeviceSettings = () => {
//       setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
//       setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
//     }
    
//     checkDeviceSettings()
    
//     const resizeObserver = new ResizeObserver(() => {
//       checkDeviceSettings()
//     })
    
//     if (imageContainerRef.current) {
//       resizeObserver.observe(imageContainerRef.current)
//     }
    
//     const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
//     motionMedia.addEventListener('change', checkDeviceSettings)
    
//     return () => {
//       resizeObserver.disconnect()
//       motionMedia.removeEventListener('change', checkDeviceSettings)
      
//       animationsRef.current.forEach(timeline => {
//         if (timeline) timeline.kill()
//       })
//     }
//   }, [])

//   // 🎯 PRELOAD CRITIQUE
//   useEffect(() => {
//     const linkWebP = document.createElement('link')
//     linkWebP.rel = 'preload'
//     linkWebP.as = 'image'
//     linkWebP.href = profileImageWebP
//     linkWebP.type = 'image/webp'
//     document.head.appendChild(linkWebP)
    
//     const linkJPG = document.createElement('link')
//     linkJPG.rel = 'preload'
//     linkJPG.as = 'image' 
//     linkJPG.href = profileImageJPG
//     linkJPG.type = 'image/jpeg'
//     document.head.appendChild(linkJPG)
    
//     return () => {
//       document.head.removeChild(linkWebP)
//       document.head.removeChild(linkJPG)
//     }
//   }, [])

//   // Animations existantes (maintenues pour les cercles décoratifs)
//   useEffect(() => {
//     if (isReducedMotion) return
    
//     animationsRef.current.forEach(timeline => {
//       if (timeline) timeline.kill()
//     })
//     animationsRef.current = []
    
//     // Animation des cercles
//     const circleAnimations = [
//       { duration: isMobile ? 25 : 20, direction: 1 },
//       { duration: isMobile ? 20 : 15, direction: -1 },
//       { duration: isMobile ? 30 : 25, direction: 1 }
//     ]

//     circleRefs.current.forEach((circle, index) => {
//       if (circle && circleAnimations[index]) {
//         const animation = circleAnimations[index]
//         circle.style.willChange = 'transform'
        
//         const timeline = gsap.timeline()
        
//         timeline.to(circle, {
//           rotation: 360 * animation.direction,
//           duration: animation.duration,
//           repeat: -1,
//           ease: "none"
//         })

//         timeline.to(circle, {
//           scale: 1.05,
//           duration: 3 + index,
//           repeat: -1,
//           yoyo: true,
//           ease: "sine.inOut"
//         }, 0)
        
//         animationsRef.current.push(timeline)
//       }
//     })

//     // Animations bulles
//     const bubbleTimeline = gsap.timeline()
    
//     bubblesRef.current.forEach((bubble, index) => {
//       if (bubble) {
//         bubble.style.willChange = 'transform'
        
//         const delay = index * 0.1
//         const radius = 15 + Math.random() * 25
//         const angle = Math.random() * Math.PI * 2
        
//         bubbleTimeline.to(bubble, {
//           y: `-=${FLOAT_AMPLITUDE + Math.random() * 15}`,
//           x: `+=${Math.sin(angle) * radius}`,
//           rotation: Math.random() * 180,
//           duration: FLOAT_SPEED + Math.random() * 1.5,
//           repeat: -1,
//           yoyo: true,
//           ease: "power1.inOut",
//           delay,
//         }, 0)

//         bubbleTimeline.to(bubble, {
//           opacity: 0.6,
//           scale: 1.5,
//           duration: 1.5 + Math.random() * 1,
//           repeat: -1,
//           yoyo: true,
//           ease: "sine.inOut",
//           delay: Math.random() * 0.5,
//         }, 0)
//       }
//     })
    
//     animationsRef.current.push(bubbleTimeline)

//     // Animations particules
//     const particlesTimeline = gsap.timeline()
    
//     particlesRef.current.forEach((particle, index) => {
//       if (particle) {
//         particle.style.willChange = 'transform'
        
//         const angle = (index / PARTICLE_COUNT) * Math.PI * 2
//         const radius = 100 + Math.random() * 30
//         const speed = 8 + Math.random() * 4
        
//         particlesTimeline.to(particle, {
//           rotation: "+=180",
//           duration: speed,
//           repeat: -1,
//           ease: "none",
//           motionPath: {
//             path: [
//               { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius },
//               { x: Math.cos(angle + Math.PI) * radius, y: Math.sin(angle + Math.PI) * radius }
//             ],
//             curviness: 1
//           }
//         }, 0)
//       }
//     })
    
//     animationsRef.current.push(particlesTimeline)

//     // Animations aura
//     const auraTimeline = gsap.timeline()
    
//     auraTimeline.to('.aura', {
//       scale: 1.1,
//       opacity: 0.5,
//       duration: 3,
//       repeat: -1,
//       yoyo: true,
//       ease: "sine.inOut"
//     }, 0)

//     auraTimeline.to('.energy-halo', {
//       rotation: 360,
//       duration: 25,
//       repeat: -1,
//       ease: "none"
//     }, 0)
    
//     animationsRef.current.push(auraTimeline)
    
//     return () => {
//       animationsRef.current.forEach(timeline => {
//         if (timeline) timeline.kill()
//       })
      
//       circleRefs.current.forEach(circle => {
//         if (circle) circle.style.willChange = 'auto'
//       })
//       bubblesRef.current.forEach(bubble => {
//         if (bubble) bubble.style.willChange = 'auto'
//       })
//       particlesRef.current.forEach(particle => {
//         if (particle) particle.style.willChange = 'auto'
//       })
//     }
//   }, [isMobile, isReducedMotion, FLOAT_AMPLITUDE, FLOAT_SPEED, BUBBLE_COUNT, PARTICLE_COUNT])

//   // Gestion souris
//   const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
//     if (imageContainerRef.current && !isMobile && !isReducedMotion) {
//       const rect = imageContainerRef.current.getBoundingClientRect()
//       const x = (e.clientX - rect.left) / rect.width
//       const y = (e.clientY - rect.top) / rect.height
//       setMousePosition({ x, y })

//       if (Date.now() % 3 === 0) {
//         requestAnimationFrame(() => {
//           circleRefs.current.forEach((circle, index) => {
//             if (circle) {
//               const depth = (index + 1) * 8
//               gsap.to(circle, {
//                 x: (x - 0.5) * depth,
//                 y: (y - 0.5) * depth,
//                 duration: 0.4,
//                 ease: "power2.out"
//               })
//             }
//           })
//         })
//       }
//     }
//   }, [isMobile, isReducedMotion])

//   // Gestion hover
//   const handleImageHover = useCallback((hovering: boolean) => {
//     setIsHoveringImage(hovering)
    
//     if (imageContainerRef.current && !isReducedMotion) {
//       gsap.to(imageContainerRef.current, {
//         scale: hovering ? 1.05 : 1,
//         duration: 0.6,
//         ease: "elastic.out(1, 0.3)"
//       })

//       particlesRef.current.forEach((particle, index) => {
//         if (particle) {
//           gsap.to(particle, {
//             scale: hovering ? 1.8 : 1,
//             opacity: hovering ? 0.7 : 0.4,
//             duration: 0.4,
//             ease: "power2.out",
//             delay: index * 0.005
//           })
//         }
//       })

//       bubblesRef.current.forEach((bubble, index) => {
//         if (bubble) {
//           const angle = (index / BUBBLE_COUNT) * Math.PI * 2
//           const radius = hovering ? 80 : 0
          
//           gsap.to(bubble, {
//             x: hovering ? Math.cos(angle) * radius : 0,
//             y: hovering ? Math.sin(angle) * radius : 0,
//             scale: hovering ? 1.8 : 1,
//             opacity: hovering ? 0.7 : 0.4,
//             duration: 0.6,
//             ease: "power2.out",
//             delay: index * 0.01
//           })
//         }
//       })
//     }
//   }, [isMobile, isReducedMotion, BUBBLE_COUNT])

//   // Gestion des états de chargement
//   const handleImageLoad = () => {
//     setImageLoaded(true)
//     setImageError(false)
//   }

//   const handleImageError = () => {
//     setImageError(true)
//     setImageLoaded(false)
//   }

//   return (
//     <div
//       ref={imageContainerRef}
//       className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] mx-auto transform-gpu"
//       onMouseEnter={() => handleImageHover(true)}
//       onMouseLeave={() => handleImageHover(false)}
//       onMouseMove={handleMouseMove}
//     >
//       {/* 🎯 PHOTOEFFECTS CORRECTEMENT POSITIONNÉ */}
//       <div className="absolute inset-[-150px] z-0">
//         <Suspense fallback={<PhotoEffectsFallback />}>
//           <PhotoEffects />
//         </Suspense>
//       </div>

//       {/* 🎯 CERCLES DÉCORATIFS AU BON Z-INDEX */}
//       {[30, 15, 45].map((offset, index) => (
//         <div
//           key={index}
//           ref={el => circleRefs.current[index] = el}
//           className={`absolute z-5 rounded-full border-2 
//             ${index % 2 === 0 ? 'border-dashed' : 'border-solid'}
//             border-[#4ADE80]/30 
//             before:content-[''] before:absolute before:inset-0 
//             before:rounded-full before:bg-gradient-to-r 
//             before:from-[#4ADE80]/20 before:via-[#4ADE80]/5 before:to-transparent
//             ${!isReducedMotion ? 'before:animate-spin-slow' : ''}`}
//           style={{
//             inset: `-${offset}px`,
//           }}
//         />
//       ))}

//       {/* 🎯 PARTICULES AU BON Z-INDEX */}
//       {!isReducedMotion && Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
//         <div
//           key={`particle-${i}`}
//           ref={el => particlesRef.current[i] = el}
//           className="absolute w-1 h-1 rounded-full blur-[1px] z-5"
//           style={{
//             left: '50%',
//             top: '50%',
//             backgroundColor: '#4ADE80',
//             boxShadow: '0 0 6px #4ADE80',
//             opacity: 0.4,
//           }}
//         />
//       ))}

//       {/* 🎯 BULLES AU BON Z-INDEX */}
//       {!isReducedMotion && Array.from({ length: BUBBLE_COUNT }).map((_, i) => (
//         <div
//           key={`bubble-${i}`}
//           ref={el => bubblesRef.current[i] = el}
//           className="absolute w-2 h-2 rounded-full blur-[2px] z-5"
//           style={{
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             backgroundColor: '#4ADE80',
//             boxShadow: '0 0 10px #4ADE80',
//             opacity: 0.4,
//           }}
//         />
//       ))}

//       {/* 🎯 IMAGE AU Z-INDEX PRINCIPAL */}
//       <div className="absolute inset-[5%] rounded-full overflow-hidden bg-gray-800 z-10
//         shadow-2xl shadow-[#4ADE80]/30">
        
//         {/* Skeleton loader */}
//         {!imageLoaded && !imageError && (
//           <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse">
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
//               animate-[shimmer_2s_infinite] rounded-full" />
//           </div>
//         )}

//         {/* Picture element optimisé */}
//         <picture>
//           <source 
//             srcSet={profileImageWebP} 
//             type="image/webp"
//           />
//           <img
//             src={profileImageJPG}
//             alt="Astou Fall KANE - Développeuse Fullstack"
//             width={450}
//             height={450}
//             className={`w-full h-full object-cover object-center transform scale-105
//               transition-all duration-500 ease-out ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
//             style={{
//               filter: `brightness(${isHoveringImage ? 1.3 : 1.1})
//                 contrast(${isHoveringImage ? 1.15 : 1.05})
//                 saturate(${isHoveringImage ? 1.1 : 1})`,
//             }}
//             onLoad={handleImageLoad}
//             onError={handleImageError}
//             loading="eager"
//             decoding="async"
//           />
//         </picture>

//         {/* Image d'erreur */}
//         {imageError && (
//           <div className="absolute inset-0 bg-gradient-to-br from-[#4ADE80]/20 to-[#22D3EE]/20 
//             flex items-center justify-center text-white font-bold text-2xl">
//             AFK
//           </div>
//         )}

//         {/* Grain et effets */}
//         <div
//           className="absolute inset-0 mix-blend-overlay backdrop-blur-[1px]
//             animate-grain opacity-20"
//           style={{
//             backgroundImage: 'url("/noise.png")',
//           }}
//         />
//       </div>

//       {/* 🎯 AURAS EN ARRIÈRE-PLAN */}
//       <div className="aura absolute inset-[-15%] rounded-full opacity-40
//         bg-gradient-radial from-[#4ADE80]/40 via-[#4ADE80]/20 to-transparent
//         blur-2xl -z-10" />
      
//       <div className="energy-halo absolute inset-[-5%] rounded-full opacity-30
//         bg-gradient-conic from-[#4ADE80]/0 via-[#4ADE80]/40 to-[#4ADE80]/0
//         blur-xl -z-5" />
        
//       <div className="absolute inset-0 bg-gradient-radial from-[#4ADE80]/10 to-transparent
//         blur-3xl -z-20 animate-pulse" />
//     </div>
//   )
// })

// export default HeroImage








// // src/components/sections/Hero/components/HeroImage.tsx - VERSION ULTRA-OPTIMISÉE
// import { useState, useRef, useEffect, useCallback, memo } from 'react'
// import { gsap } from 'gsap'
// import { lazy, Suspense } from 'react'

// // 🎯 PRELOAD CRITIQUE : Images en priorité absolue
// import profileImageWebP from '../../../../assets/moi6.webp' // Assure-toi d'avoir une version WebP
// import profileImageJPG from '../../../../assets/moi6.jpg'

// const PhotoEffects = lazy(() => import('../../PhotoEffects'))

// // ⚡ FALLBACK IMMÉDIAT SANS SUSPENSE
// const PhotoEffectsFallback = () => (
//   <div className="absolute inset-[-150px] rounded-full bg-gradient-radial from-[#4ADE80]/20 to-transparent opacity-60"></div>
// )

// export const HeroImage = memo(() => {
//   const [isHoveringImage, setIsHoveringImage] = useState(false)
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//   const [isMobile, setIsMobile] = useState(false)
//   const [isReducedMotion, setIsReducedMotion] = useState(false)
//   const [imageLoaded, setImageLoaded] = useState(false)
//   const [imageError, setImageError] = useState(false)
//   const [showEffects, setShowEffects] = useState(false) // 🔥 Nouvelle stratégie
  
//   const imageContainerRef = useRef<HTMLDivElement | null>(null)
//   const circleRefs = useRef<(HTMLDivElement | null)[]>([])
//   const bubblesRef = useRef<(HTMLDivElement | null)[]>([])
//   const particlesRef = useRef<(HTMLDivElement | null)[]>([])
//   const animationsRef = useRef<gsap.core.Timeline[]>([])
  
//   const BUBBLE_COUNT = isMobile ? 6 : 12 // ⚡ Réduit
//   const PARTICLE_COUNT = isMobile ? 8 : 16 // ⚡ Réduit
//   const FLOAT_AMPLITUDE = isMobile ? 15 : 30 // ⚡ Réduit
//   const FLOAT_SPEED = isMobile ? 3 : 2 // ⚡ Plus rapide

//   // 🔥 PRELOAD ULTRA-CRITIQUE - AVANT TOUT
//   useEffect(() => {
//     // Précharger les images immédiatement
//     const preloadImages = () => {
//       const webpImg = new Image()
//       const jpgImg = new Image()
      
//       webpImg.onload = () => setImageLoaded(true)
//       jpgImg.onload = () => setImageLoaded(true)
      
//       webpImg.onerror = () => {
//         jpgImg.onload = () => setImageLoaded(true)
//         jpgImg.src = profileImageJPG
//       }
      
//       // Commencer par WebP
//       webpImg.src = profileImageWebP
//     }
    
//     // Lancer immédiatement
//     preloadImages()
    
//     // Ajouter les balises de preload dans le DOM
//     const linkWebP = document.createElement('link')
//     linkWebP.rel = 'preload'
//     linkWebP.as = 'image'
//     linkWebP.href = profileImageWebP
//     linkWebP.type = 'image/webp'
//     document.head.appendChild(linkWebP)
    
//     const linkJPG = document.createElement('link')
//     linkJPG.rel = 'preload'
//     linkJPG.as = 'image' 
//     linkJPG.href = profileImageJPG
//     linkJPG.type = 'image/jpeg'
//     document.head.appendChild(linkJPG)
    
//     return () => {
//       try {
//         document.head.removeChild(linkWebP)
//         document.head.removeChild(linkJPG)
//       } catch (e) {
//         // Ignore si déjà supprimé
//       }
//     }
//   }, [])

//   // Détection optimisée
//   useEffect(() => {
//     const checkDeviceSettings = () => {
//       setIsMobile(window.innerWidth < 768)
//       setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
//     }
    
//     checkDeviceSettings()
    
//     const resizeObserver = new ResizeObserver(checkDeviceSettings)
//     if (imageContainerRef.current) {
//       resizeObserver.observe(imageContainerRef.current)
//     }
    
//     const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
//     motionMedia.addEventListener('change', checkDeviceSettings)
    
//     return () => {
//       resizeObserver.disconnect()
//       motionMedia.removeEventListener('change', checkDeviceSettings)
//     }
//   }, [])

//   // 🔥 CHARGEMENT DIFFÉRÉ DES EFFETS APRÈS IMAGE
//   useEffect(() => {
//     if (imageLoaded) {
//       // Attendre un peu que l'image soit bien affichée
//       const timer = setTimeout(() => {
//         setShowEffects(true)
//       }, 500) // ⚡ Délai court mais suffisant
      
//       return () => clearTimeout(timer)
//     }
//   }, [imageLoaded])

//   // ⚡ ANIMATIONS SIMPLIFIÉES ET RETARDÉES
//   useEffect(() => {
//     if (isReducedMotion || !showEffects) return
    
//     // Nettoyer les anciennes animations
//     animationsRef.current.forEach(timeline => {
//       if (timeline) timeline.kill()
//     })
//     animationsRef.current = []
    
//     // Animation des cercles - plus simple
//     circleRefs.current.forEach((circle, index) => {
//       if (circle) {
//         circle.style.willChange = 'transform'
        
//         const timeline = gsap.timeline()
        
//         timeline.to(circle, {
//           rotation: 360 * (index % 2 === 0 ? 1 : -1),
//           duration: 20 + index * 5, // ⚡ Plus lent = moins de CPU
//           repeat: -1,
//           ease: "none"
//         })
        
//         animationsRef.current.push(timeline)
//       }
//     })

//     // Animations bulles - ultra-simplifiées
//     const bubbleTimeline = gsap.timeline()
    
//     bubblesRef.current.forEach((bubble, index) => {
//       if (bubble) {
//         bubble.style.willChange = 'transform'
        
//         bubbleTimeline.to(bubble, {
//           y: `-=${FLOAT_AMPLITUDE}`,
//           duration: FLOAT_SPEED,
//           repeat: -1,
//           yoyo: true,
//           ease: "sine.inOut",
//           delay: index * 0.2,
//         }, 0)
//       }
//     })
    
//     animationsRef.current.push(bubbleTimeline)

//     // Particules - version ultra-légère
//     const particlesTimeline = gsap.timeline()
    
//     particlesRef.current.forEach((particle, index) => {
//       if (particle) {
//         particle.style.willChange = 'transform'
        
//         const angle = (index / PARTICLE_COUNT) * Math.PI * 2
//         const radius = 80 + Math.random() * 20
        
//         particlesTimeline.to(particle, {
//           rotation: "+=180",
//           duration: 12 + Math.random() * 8, // ⚡ Plus lent
//           repeat: -1,
//           ease: "none",
//           x: Math.cos(angle) * radius,
//           y: Math.sin(angle) * radius
//         }, 0)
//       }
//     })
    
//     animationsRef.current.push(particlesTimeline)
    
//     return () => {
//       animationsRef.current.forEach(timeline => {
//         if (timeline) timeline.kill()
//       })
      
//       // Nettoyer willChange
//       circleRefs.current.forEach(circle => {
//         if (circle) circle.style.willChange = 'auto'
//       })
//       bubblesRef.current.forEach(bubble => {
//         if (bubble) bubble.style.willChange = 'auto'
//       })
//       particlesRef.current.forEach(particle => {
//         if (particle) particle.style.willChange = 'auto'
//       })
//     }
//   }, [showEffects, isReducedMotion, isMobile, FLOAT_AMPLITUDE, FLOAT_SPEED, BUBBLE_COUNT, PARTICLE_COUNT])

//   // ⚡ MOUSE MOVE OPTIMISÉ avec throttling
//   const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
//     if (imageContainerRef.current && !isMobile && !isReducedMotion && showEffects) {
//       // Throttling à 60fps max
//       if (Date.now() % 2 !== 0) return
      
//       const rect = imageContainerRef.current.getBoundingClientRect()
//       const x = (e.clientX - rect.left) / rect.width
//       const y = (e.clientY - rect.top) / rect.height
//       setMousePosition({ x, y })

//       requestAnimationFrame(() => {
//         circleRefs.current.forEach((circle, index) => {
//           if (circle) {
//             const depth = (index + 1) * 6 // ⚡ Réduit
//             gsap.to(circle, {
//               x: (x - 0.5) * depth,
//               y: (y - 0.5) * depth,
//               duration: 0.6, // ⚡ Plus lent
//               ease: "power1.out" // ⚡ Moins agressif
//             })
//           }
//         })
//       })
//     }
//   }, [isMobile, isReducedMotion, showEffects])

//   // Gestion hover simplifiée
//   const handleImageHover = useCallback((hovering: boolean) => {
//     setIsHoveringImage(hovering)
    
//     if (imageContainerRef.current && !isReducedMotion && showEffects) {
//       gsap.to(imageContainerRef.current, {
//         scale: hovering ? 1.03 : 1, // ⚡ Moins prononcé
//         duration: 0.4, // ⚡ Plus rapide
//         ease: "power2.out"
//       })
//     }
//   }, [isReducedMotion, showEffects])

//   // Gestion des états de chargement
//   const handleImageLoad = () => {
//     setImageLoaded(true)
//     setImageError(false)
//   }

//   const handleImageError = () => {
//     setImageError(true)
//     setImageLoaded(false)
//   }

//   return (
//     <div
//       ref={imageContainerRef}
//       className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] mx-auto transform-gpu"
//       onMouseEnter={() => handleImageHover(true)}
//       onMouseLeave={() => handleImageHover(false)}
//       onMouseMove={handleMouseMove}
//     >
//       {/* 🔥 PHOTOEFFECTS CHARGÉS APRÈS L'IMAGE */}
//       {showEffects && !isReducedMotion && (
//         <div className="absolute inset-[-150px] z-0">
//           <Suspense fallback={<PhotoEffectsFallback />}>
//             <PhotoEffects />
//           </Suspense>
//         </div>
//       )}

//       {/* 🔥 FALLBACK IMMÉDIAT SI PAS D'EFFETS */}
//       {!showEffects && (
//         <div className="absolute inset-[-150px] z-0">
//           <PhotoEffectsFallback />
//         </div>
//       )}

//       {/* 🔥 CERCLES DÉCORATIFS - CHARGÉS APRÈS IMAGE */}
//       {showEffects && [30, 15, 45].map((offset, index) => (
//         <div
//           key={index}
//           ref={el => circleRefs.current[index] = el}
//           className={`absolute z-5 rounded-full border-2 
//             ${index % 2 === 0 ? 'border-dashed' : 'border-solid'}
//             border-[#4ADE80]/30 
//             before:content-[''] before:absolute before:inset-0 
//             before:rounded-full before:bg-gradient-to-r 
//             before:from-[#4ADE80]/20 before:via-[#4ADE80]/5 before:to-transparent`}
//           style={{
//             inset: `-${offset}px`,
//           }}
//         />
//       ))}

//       {/* 🔥 PARTICULES - CHARGÉES APRÈS IMAGE */}
//       {showEffects && !isReducedMotion && Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
//         <div
//           key={`particle-${i}`}
//           ref={el => particlesRef.current[i] = el}
//           className="absolute w-1 h-1 rounded-full blur-[1px] z-5"
//           style={{
//             left: '50%',
//             top: '50%',
//             backgroundColor: '#4ADE80',
//             boxShadow: '0 0 6px #4ADE80',
//             opacity: 0.4,
//           }}
//         />
//       ))}

//       {/* 🔥 BULLES - CHARGÉES APRÈS IMAGE */}
//       {showEffects && !isReducedMotion && Array.from({ length: BUBBLE_COUNT }).map((_, i) => (
//         <div
//           key={`bubble-${i}`}
//           ref={el => bubblesRef.current[i] = el}
//           className="absolute w-2 h-2 rounded-full blur-[2px] z-5"
//           style={{
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             backgroundColor: '#4ADE80',
//             boxShadow: '0 0 10px #4ADE80',
//             opacity: 0.4,
//           }}
//         />
//       ))}

//       {/* 🔥 IMAGE AVEC PRIORITÉ ABSOLUE */}
//       <div className="absolute inset-[5%] rounded-full overflow-hidden bg-gray-800 z-10
//         shadow-2xl shadow-[#4ADE80]/30">
        
//         {/* Skeleton loader amélioré */}
//         {!imageLoaded && !imageError && (
//           <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800">
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
//               animate-pulse rounded-full" />
//             <div className="absolute inset-0 flex items-center justify-center text-[#4ADE80] font-bold text-2xl">
//               AFK
//             </div>
//           </div>
//         )}

//         {/* 🔥 PICTURE OPTIMISÉ AVEC PRIORITÉ */}
//         <picture>
//           <source 
//             srcSet={profileImageWebP} 
//             type="image/webp"
//           />
//           <img
//             src={profileImageJPG}
//             alt="Astou Fall KANE - Développeuse Fullstack"
//             width={450}
//             height={450}
//             className={`w-full h-full object-cover object-center transform scale-105
//               transition-all duration-500 ease-out ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
//             style={{
//               filter: `brightness(${isHoveringImage ? 1.2 : 1.1})
//                 contrast(${isHoveringImage ? 1.1 : 1.05})
//                 saturate(${isHoveringImage ? 1.05 : 1})`,
//             }}
//             onLoad={handleImageLoad}
//             onError={handleImageError}
//             loading="eager" // 🔥 PRIORITÉ MAXIMALE
//             decoding="async"
//             fetchPriority="high" // 🔥 PRIORITÉ NAVIGATEUR
//           />
//         </picture>

//         {/* Image d'erreur */}
//         {imageError && (
//           <div className="absolute inset-0 bg-gradient-to-br from-[#4ADE80]/20 to-[#22D3EE]/20 
//             flex items-center justify-center text-white font-bold text-2xl">
//             AFK
//           </div>
//         )}

//         {/* 🔥 GRAIN CONDITIONNEL */}
//         {showEffects && (
//           <div
//             className="absolute inset-0 mix-blend-overlay backdrop-blur-[1px]
//               opacity-20"
//             style={{
//               backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.4"/%3E%3C/svg%3E")',
//             }}
//           />
//         )}
//       </div>

//       {/* 🔥 AURAS - CHARGÉES APRÈS IMAGE */}
//       {showEffects && (
//         <>
//           <div className="absolute inset-[-15%] rounded-full opacity-40
//             bg-gradient-radial from-[#4ADE80]/40 via-[#4ADE80]/20 to-transparent
//             blur-2xl -z-10" />
          
//           <div className="absolute inset-[-5%] rounded-full opacity-30
//             bg-gradient-conic from-[#4ADE80]/0 via-[#4ADE80]/40 to-[#4ADE80]/0
//             blur-xl -z-5" />
            
//           <div className="absolute inset-0 bg-gradient-radial from-[#4ADE80]/10 to-transparent
//             blur-3xl -z-20" />
//         </>
//       )}
//     </div>
//   )
// })

// export default HeroImage










// src/components/sections/Hero/components/HeroImage.tsx - VERSION ULTRA-OPTIMISÉE
import { useState, useRef, useEffect, useCallback, memo } from 'react'
import { gsap } from 'gsap'
import { lazy, Suspense } from 'react'

// 🎯 PRELOAD CRITIQUE : Images en priorité absolue
import profileImageWebP from '../../../../assets/moi6.webp' // Assure-toi d'avoir une version WebP
import profileImageJPG from '../../../../assets/moi6.jpg'

const PhotoEffects = lazy(() => import('../../PhotoEffects'))

// ⚡ FALLBACK IMMÉDIAT SANS SUSPENSE
const PhotoEffectsFallback = () => (
  <div className="absolute inset-[-150px] rounded-full bg-gradient-radial from-[#4ADE80]/20 to-transparent opacity-60"></div>
)

export const HeroImage = memo(() => {
  const [isHoveringImage, setIsHoveringImage] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [showEffects, setShowEffects] = useState(false) // 🔥 Nouvelle stratégie
  
  const imageContainerRef = useRef<HTMLDivElement | null>(null)
  const circleRefs = useRef<(HTMLDivElement | null)[]>([])
  const bubblesRef = useRef<(HTMLDivElement | null)[]>([])
  const particlesRef = useRef<(HTMLDivElement | null)[]>([])
  const animationsRef = useRef<gsap.core.Timeline[]>([])
  
  const BUBBLE_COUNT = isMobile ? 6 : 12 // ⚡ Réduit
  const PARTICLE_COUNT = isMobile ? 8 : 16 // ⚡ Réduit
  const FLOAT_AMPLITUDE = isMobile ? 15 : 30 // ⚡ Réduit
  const FLOAT_SPEED = isMobile ? 3 : 2 // ⚡ Plus rapide

  // 🔥 PRELOAD ULTRA-CRITIQUE - AVANT TOUT
  useEffect(() => {
    // Précharger les images immédiatement
    const preloadImages = () => {
      const webpImg = new Image()
      const jpgImg = new Image()
      
      webpImg.onload = () => setImageLoaded(true)
      jpgImg.onload = () => setImageLoaded(true)
      
      webpImg.onerror = () => {
        jpgImg.onload = () => setImageLoaded(true)
        jpgImg.src = profileImageJPG
      }
      
      // Commencer par WebP
      webpImg.src = profileImageWebP
    }
    
    // Lancer immédiatement
    preloadImages()
    
    // Ajouter les balises de preload dans le DOM
    const linkWebP = document.createElement('link')
    linkWebP.rel = 'preload'
    linkWebP.as = 'image'
    linkWebP.href = profileImageWebP
    linkWebP.type = 'image/webp'
    document.head.appendChild(linkWebP)
    
    const linkJPG = document.createElement('link')
    linkJPG.rel = 'preload'
    linkJPG.as = 'image' 
    linkJPG.href = profileImageJPG
    linkJPG.type = 'image/jpeg'
    document.head.appendChild(linkJPG)
    
    return () => {
      try {
        document.head.removeChild(linkWebP)
        document.head.removeChild(linkJPG)
      } catch (e) {
        // Ignore si déjà supprimé
      }
    }
  }, [])

  // Détection optimisée
  useEffect(() => {
    const checkDeviceSettings = () => {
      setIsMobile(window.innerWidth < 768)
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }
    
    checkDeviceSettings()
    
    const resizeObserver = new ResizeObserver(checkDeviceSettings)
    if (imageContainerRef.current) {
      resizeObserver.observe(imageContainerRef.current)
    }
    
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
    motionMedia.addEventListener('change', checkDeviceSettings)
    
    return () => {
      resizeObserver.disconnect()
      motionMedia.removeEventListener('change', checkDeviceSettings)
    }
  }, [])

  // 🔥 CHARGEMENT DIFFÉRÉ DES EFFETS APRÈS IMAGE
  useEffect(() => {
    if (imageLoaded) {
      // Attendre un peu que l'image soit bien affichée
      const timer = setTimeout(() => {
        setShowEffects(true)
      }, 500) // ⚡ Délai court mais suffisant
      
      return () => clearTimeout(timer)
    }
  }, [imageLoaded])

  // ⚡ ANIMATIONS SIMPLIFIÉES ET RETARDÉES
  useEffect(() => {
    if (isReducedMotion || !showEffects) return
    
    // Nettoyer les anciennes animations
    animationsRef.current.forEach(timeline => {
      if (timeline) timeline.kill()
    })
    animationsRef.current = []
    
    // Animation des cercles - plus simple
    circleRefs.current.forEach((circle, index) => {
      if (circle) {
        circle.style.willChange = 'transform'
        
        const timeline = gsap.timeline()
        
        timeline.to(circle, {
          rotation: 360 * (index % 2 === 0 ? 1 : -1),
          duration: 20 + index * 5, // ⚡ Plus lent = moins de CPU
          repeat: -1,
          ease: "none"
        })
        
        animationsRef.current.push(timeline)
      }
    })

    // Animations bulles - ultra-simplifiées
    const bubbleTimeline = gsap.timeline()
    
    bubblesRef.current.forEach((bubble, index) => {
      if (bubble) {
        bubble.style.willChange = 'transform'
        
        bubbleTimeline.to(bubble, {
          y: `-=${FLOAT_AMPLITUDE}`,
          duration: FLOAT_SPEED,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        }, 0)
      }
    })
    
    animationsRef.current.push(bubbleTimeline)

    // Particules - version ultra-légère
    const particlesTimeline = gsap.timeline()
    
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        particle.style.willChange = 'transform'
        
        const angle = (index / PARTICLE_COUNT) * Math.PI * 2
        const radius = 80 + Math.random() * 20
        
        particlesTimeline.to(particle, {
          rotation: "+=180",
          duration: 12 + Math.random() * 8, // ⚡ Plus lent
          repeat: -1,
          ease: "none",
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
        }, 0)
      }
    })
    
    animationsRef.current.push(particlesTimeline)
    
    return () => {
      animationsRef.current.forEach(timeline => {
        if (timeline) timeline.kill()
      })
      
      // Nettoyer willChange
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
  }, [showEffects, isReducedMotion, isMobile, FLOAT_AMPLITUDE, FLOAT_SPEED, BUBBLE_COUNT, PARTICLE_COUNT])

  // ⚡ MOUSE MOVE OPTIMISÉ avec throttling
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (imageContainerRef.current && !isMobile && !isReducedMotion && showEffects) {
      // Throttling à 60fps max
      if (Date.now() % 2 !== 0) return
      
      const rect = imageContainerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setMousePosition({ x, y })

      requestAnimationFrame(() => {
        circleRefs.current.forEach((circle, index) => {
          if (circle) {
            const depth = (index + 1) * 6 // ⚡ Réduit
            gsap.to(circle, {
              x: (x - 0.5) * depth,
              y: (y - 0.5) * depth,
              duration: 0.6, // ⚡ Plus lent
              ease: "power1.out" // ⚡ Moins agressif
            })
          }
        })
      })
    }
  }, [isMobile, isReducedMotion, showEffects])

  // Gestion hover simplifiée
  const handleImageHover = useCallback((hovering: boolean) => {
    setIsHoveringImage(hovering)
    
    if (imageContainerRef.current && !isReducedMotion && showEffects) {
      gsap.to(imageContainerRef.current, {
        scale: hovering ? 1.03 : 1, // ⚡ Moins prononcé
        duration: 0.4, // ⚡ Plus rapide
        ease: "power2.out"
      })
    }
  }, [isReducedMotion, showEffects])

  // Gestion des états de chargement
  const handleImageLoad = () => {
    setImageLoaded(true)
    setImageError(false)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(false)
  }

  return (
    <div
      ref={imageContainerRef}
      className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] mx-auto transform-gpu"
      onMouseEnter={() => handleImageHover(true)}
      onMouseLeave={() => handleImageHover(false)}
      onMouseMove={handleMouseMove}
    >
      {/* 🔥 PHOTOEFFECTS CHARGÉS APRÈS L'IMAGE */}
      {showEffects && !isReducedMotion && (
        <div className="absolute inset-[-150px] z-0">
          <Suspense fallback={<PhotoEffectsFallback />}>
            <PhotoEffects />
          </Suspense>
        </div>
      )}

      {/* 🔥 FALLBACK IMMÉDIAT SI PAS D'EFFETS */}
      {!showEffects && (
        <div className="absolute inset-[-150px] z-0">
          <PhotoEffectsFallback />
        </div>
      )}

      {/* 🔥 CERCLES DÉCORATIFS - CHARGÉS APRÈS IMAGE */}
      {showEffects && [30, 15, 45].map((offset, index) => (
        <div
          key={index}
          ref={el => circleRefs.current[index] = el}
          className={`absolute z-5 rounded-full border-2 
            ${index % 2 === 0 ? 'border-dashed' : 'border-solid'}
            border-[#4ADE80]/30 
            before:content-[''] before:absolute before:inset-0 
            before:rounded-full before:bg-gradient-to-r 
            before:from-[#4ADE80]/20 before:via-[#4ADE80]/5 before:to-transparent`}
          style={{
            inset: `-${offset}px`,
          }}
        />
      ))}

      {/* 🔥 PARTICULES - CHARGÉES APRÈS IMAGE */}
      {showEffects && !isReducedMotion && Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <div
          key={`particle-${i}`}
          ref={el => particlesRef.current[i] = el}
          className="absolute w-1 h-1 rounded-full blur-[1px] z-5"
          style={{
            left: '50%',
            top: '50%',
            backgroundColor: '#4ADE80',
            boxShadow: '0 0 6px #4ADE80',
            opacity: 0.4,
          }}
        />
      ))}

      {/* 🔥 BULLES - CHARGÉES APRÈS IMAGE */}
      {showEffects && !isReducedMotion && Array.from({ length: BUBBLE_COUNT }).map((_, i) => (
        <div
          key={`bubble-${i}`}
          ref={el => bubblesRef.current[i] = el}
          className="absolute w-2 h-2 rounded-full blur-[2px] z-5"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: '#4ADE80',
            boxShadow: '0 0 10px #4ADE80',
            opacity: 0.4,
          }}
        />
      ))}

      {/* 🔥 IMAGE AVEC PRIORITÉ ABSOLUE */}
      <div className="absolute inset-[5%] rounded-full overflow-hidden bg-gray-800 z-10
        shadow-2xl shadow-[#4ADE80]/30">
        
        {/* Skeleton loader amélioré */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
              animate-pulse rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center text-[#4ADE80] font-bold text-2xl">
              AFK
            </div>
          </div>
        )}

        {/* 🔥 PICTURE OPTIMISÉ AVEC PRIORITÉ */}
        <picture>
          <source 
            srcSet={profileImageWebP} 
            type="image/webp"
          />
          <img
            src={profileImageJPG}
            alt="Astou Fall KANE - Développeuse Fullstack"
            width={450}
            height={450}
            className={`w-full h-full object-cover object-center transform scale-105
              transition-all duration-500 ease-out ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{
              filter: `brightness(${isHoveringImage ? 1.2 : 1.1})
                contrast(${isHoveringImage ? 1.1 : 1.05})
                saturate(${isHoveringImage ? 1.05 : 1})`,
            }}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="eager" // 🔥 PRIORITÉ MAXIMALE
            decoding="async"
            fetchPriority="high" // 🔥 PRIORITÉ NAVIGATEUR
          />
        </picture>

        {/* Image d'erreur */}
        {imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#4ADE80]/20 to-[#22D3EE]/20 
            flex items-center justify-center text-white font-bold text-2xl">
            AFK
          </div>
        )}

        {/* 🔥 GRAIN CONDITIONNEL */}
        {showEffects && (
          <div
            className="absolute inset-0 mix-blend-overlay backdrop-blur-[1px]
              opacity-20"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.4"/%3E%3C/svg%3E")',
            }}
          />
        )}
      </div>

      {/* 🔥 AURAS - CHARGÉES APRÈS IMAGE */}
      {showEffects && (
        <>
          <div className="absolute inset-[-15%] rounded-full opacity-40
            bg-gradient-radial from-[#4ADE80]/40 via-[#4ADE80]/20 to-transparent
            blur-2xl -z-10" />
          
          <div className="absolute inset-[-5%] rounded-full opacity-30
            bg-gradient-conic from-[#4ADE80]/0 via-[#4ADE80]/40 to-[#4ADE80]/0
            blur-xl -z-5" />
            
          <div className="absolute inset-0 bg-gradient-radial from-[#4ADE80]/10 to-transparent
            blur-3xl -z-20" />
        </>
      )}
    </div>
  )
})

export default HeroImage