// //src/components/effects/CustomCursor.tsx
// import { useRef, useEffect } from 'react'
// import { useMousePosition } from '../../hooks/useMousePosition'

// const CustomCursor = () => {
//   const cursorRef = useRef<HTMLDivElement>(null)
//   const mousePosition = useMousePosition()

//   useEffect(() => {
//     if (!cursorRef.current) return
    
//     cursorRef.current.style.transform = `translate(${mousePosition.x - 2}px, ${mousePosition.y - 2}px)`
//   }, [mousePosition])

//   return (
//     <>
//       {/* Main cursor dot */}
//       <div
//         ref={cursorRef}
//         className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-50 mix-blend-difference"
//         style={{
//           backgroundColor: 'var(--primary)',
//           transition: 'transform 0.08s ease-out',
//         }}
//       />
//       {/* Subtle outer ring */}
//       <div
//         style={{
//           transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px)`,
//           backgroundColor: 'var(--primary)',
//           transition: 'transform 0.12s ease-out, opacity 0.15s ease-out',
//         }}
//         className="fixed top-0 left-0 w-4 h-4 bg-opacity-20 rounded-full pointer-events-none z-40 blur-[0.5px]"
//       />
//     </>
//   )
// }

// export default CustomCursor










import React, { useRef, useEffect, useState, useCallback } from 'react'
import { useMousePosition } from '../../hooks/useMousePosition'

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useMousePosition()
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const lastUpdateTimeRef = useRef<number>(0)
  const lastPositionRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  // Détection des préférences de mouvement réduit
  useEffect(() => {
    const checkReducedMotion = () => {
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }
    
    checkReducedMotion()
    
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    motionMediaQuery.addEventListener('change', checkReducedMotion)
    
    return () => {
      motionMediaQuery.removeEventListener('change', checkReducedMotion)
    }
  }, [])

  // Détection si l'utilisateur utilise un appareil tactile
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || 
                         navigator.maxTouchPoints > 0 ||
                         window.matchMedia('(pointer: coarse)').matches
    
    if (isTouchDevice) {
      // Sur les appareils tactiles, ne pas afficher le curseur personnalisé
      document.body.style.cursor = 'auto'
    } else {
      document.body.style.cursor = 'none'
      setIsVisible(true)
    }
    
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [])

  // Détection des éléments interactifs (liens, boutons, etc.)
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.tagName === 'A' || 
                           target.tagName === 'BUTTON' || 
                           target.closest('a') || 
                           target.closest('button') ||
                           target.getAttribute('role') === 'button' ||
                           target.getAttribute('tabindex') === '0'
      
      setIsPointer(!!isInteractive)
    }
    
    document.addEventListener('mouseover', handleMouseOver)
    
    return () => {
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  // Animation fluide du curseur avec throttling pour améliorer les performances
  const updateCursorPosition = useCallback(() => {
    if (!cursorRef.current || !outerRef.current || !isVisible) return
    
    const now = performance.now()
    
    // Si moins de 16.67ms se sont écoulées (60fps), sauter la mise à jour
    if (now - lastUpdateTimeRef.current < 16.67) {
      rafRef.current = requestAnimationFrame(updateCursorPosition)
      return
    }
    
    lastUpdateTimeRef.current = now
    
    // Interpolation fluide pour un mouvement plus naturel
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }
    
    const factor = isReducedMotion ? 1 : 0.5 // Facteur de lissage (1 = pas de lissage)
    
    lastPositionRef.current.x = lerp(lastPositionRef.current.x, mousePosition.x, factor)
    lastPositionRef.current.y = lerp(lastPositionRef.current.y, mousePosition.y, factor)
    
    const { x, y } = lastPositionRef.current
    
    // Utiliser transform plutôt que left/top pour de meilleures performances
    cursorRef.current.style.transform = `translate3d(${x - 2}px, ${y - 2}px, 0)`
    outerRef.current.style.transform = `translate3d(${x - 8}px, ${y - 8}px, 0)`
    
    rafRef.current = requestAnimationFrame(updateCursorPosition)
  }, [mousePosition, isVisible, isReducedMotion])

  // Démarrer l'animation du curseur
  useEffect(() => {
    if (isVisible) {
      rafRef.current = requestAnimationFrame(updateCursorPosition)
    }
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [updateCursorPosition, isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-50 mix-blend-difference transform-gpu will-change-transform
          ${isPointer ? 'scale-[3]' : 'scale-100'}`}
        style={{
          backgroundColor: 'var(--primary)',
          transition: isReducedMotion ? 'none' : 'transform 0.2s ease-out',
        }}
        aria-hidden="true"
      />
      
      {/* Subtle outer ring */}
      <div
        ref={outerRef}
        style={{
          backgroundColor: 'var(--primary)',
          transition: isReducedMotion ? 'none' : 'transform 0.3s ease-out, opacity 0.15s ease-out, scale 0.2s ease-out',
          opacity: isPointer ? 0.7 : 0.2,
          transform: 'translate(0, 0)',
        }}
        className={`fixed top-0 left-0 w-4 h-4 bg-opacity-20 rounded-full pointer-events-none z-40 
          blur-[0.5px] transform-gpu will-change-transform
          ${isPointer ? 'scale-150' : 'scale-100'}`}
        aria-hidden="true"
      />
    </>
  )
}

export default React.memo(CustomCursor)