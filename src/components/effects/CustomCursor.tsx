//src/components/effects/CustomCursor.tsx
import React, { useRef, useEffect, useState, useCallback } from 'react'
import { useMousePosition } from '../../hooks/useMousePosition'

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const mousePosition = useMousePosition()
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [isMouseMoving, setIsMouseMoving] = useState(false)
  const lastUpdateTimeRef = useRef<number>(0)
  const lastPositionRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)
  const mouseMoveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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
      document.body.style.cursor = 'auto'
    } else {
      document.body.style.cursor = 'none'
      setIsVisible(true)
    }
    
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [])

  // Détection du mouvement de la souris
  useEffect(() => {
    const handleMouseMove = () => {
      setIsMouseMoving(true)
      
      if (mouseMoveTimeoutRef.current) {
        clearTimeout(mouseMoveTimeoutRef.current)
      }
      
      mouseMoveTimeoutRef.current = setTimeout(() => {
        setIsMouseMoving(false)
      }, 150)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (mouseMoveTimeoutRef.current) {
        clearTimeout(mouseMoveTimeoutRef.current)
      }
    }
  }, [])

  // Détection des éléments interactifs
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.tagName === 'A' || 
                           target.tagName === 'BUTTON' || 
                           target.closest('a') || 
                           target.closest('button') ||
                           target.getAttribute('role') === 'button' ||
                           target.getAttribute('tabindex') === '0' ||
                           target.closest('[data-cursor-hover]') ||
                           window.getComputedStyle(target).cursor === 'pointer'
      
      setIsPointer(!!isInteractive)
    }
    
    document.addEventListener('mouseover', handleMouseOver)
    
    return () => {
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  // Animation fluide du curseur avec éclairage
  const updateCursorPosition = useCallback(() => {
    if (!cursorRef.current || !outerRef.current || !spotlightRef.current || !isVisible) return
    
    const now = performance.now()
    
    if (now - lastUpdateTimeRef.current < 16.67) {
      rafRef.current = requestAnimationFrame(updateCursorPosition)
      return
    }
    
    lastUpdateTimeRef.current = now
    
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }
    
    const cursorFactor = isReducedMotion ? 1 : 0.5
    const spotlightFactor = isReducedMotion ? 1 : 0.3 // Plus lent pour l'éclairage
    
    lastPositionRef.current.x = lerp(lastPositionRef.current.x, mousePosition.x, cursorFactor)
    lastPositionRef.current.y = lerp(lastPositionRef.current.y, mousePosition.y, cursorFactor)
    
    const { x, y } = lastPositionRef.current
    
    // Position du curseur principal
    cursorRef.current.style.transform = `translate3d(${x - 2}px, ${y - 2}px, 0)`
    outerRef.current.style.transform = `translate3d(${x - 8}px, ${y - 8}px, 0)`
    
    // Position de l'éclairage (plus lent et plus grand)
    const spotlightX = lerp(
      parseFloat(spotlightRef.current.style.left || '0'), 
      x - 150, 
      spotlightFactor
    )
    const spotlightY = lerp(
      parseFloat(spotlightRef.current.style.top || '0'), 
      y - 150, 
      spotlightFactor
    )
    
    spotlightRef.current.style.transform = `translate3d(${spotlightX}px, ${spotlightY}px, 0)`
    
    rafRef.current = requestAnimationFrame(updateCursorPosition)
  }, [mousePosition, isVisible, isReducedMotion])

  // Démarrer l'animation
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
      {/* Éclairage de fond */}
      <div
        ref={spotlightRef}
        className={`fixed top-0 left-0 w-[300px] h-[300px] pointer-events-none z-10 transform-gpu will-change-transform
          ${isMouseMoving ? 'opacity-40' : 'opacity-20'}`}
        style={{
          background: `radial-gradient(circle, 
            rgba(var(--primary-rgb, 59, 130, 246), ${isPointer ? '0.3' : '0.15'}) 0%, 
            rgba(var(--primary-rgb, 59, 130, 246), ${isPointer ? '0.2' : '0.1'}) 30%, 
            rgba(var(--primary-rgb, 59, 130, 246), 0.05) 60%, 
            transparent 100%)`,
          filter: `blur(${isPointer ? '20px' : '30px'})`,
          transition: isReducedMotion ? 'none' : 'opacity 0.3s ease-out, filter 0.3s ease-out',
          mixBlendMode: 'multiply',
        }}
        aria-hidden="true"
      />

      {/* Éclairage secondaire plus subtil */}
      <div
        className={`fixed top-0 left-0 w-[500px] h-[500px] pointer-events-none z-[5] transform-gpu will-change-transform
          ${isMouseMoving ? 'opacity-20' : 'opacity-10'}`}
        style={{
          background: `radial-gradient(circle, 
            rgba(var(--primary-rgb, 59, 130, 246), 0.1) 0%, 
            rgba(var(--primary-rgb, 59, 130, 246), 0.05) 40%, 
            transparent 70%)`,
          filter: 'blur(50px)',
          transform: `translate3d(${mousePosition.x - 250}px, ${mousePosition.y - 250}px, 0)`,
          transition: isReducedMotion ? 'none' : 'opacity 0.5s ease-out',
          mixBlendMode: 'screen',
        }}
        aria-hidden="true"
      />

      {/* Curseur principal */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-50 mix-blend-difference transform-gpu will-change-transform
          ${isPointer ? 'scale-[3]' : 'scale-100'}`}
        style={{
          backgroundColor: 'var(--primary)',
          boxShadow: isPointer ? '0 0 20px rgba(var(--primary-rgb, 59, 130, 246), 0.6)' : 'none',
          transition: isReducedMotion ? 'none' : 'transform 0.2s ease-out, box-shadow 0.2s ease-out',
        }}
        aria-hidden="true"
      />
      
      {/* Anneau extérieur */}
      <div
        ref={outerRef}
        style={{
          backgroundColor: 'var(--primary)',
          transition: isReducedMotion ? 'none' : 'transform 0.3s ease-out, opacity 0.15s ease-out, scale 0.2s ease-out',
          opacity: isPointer ? 0.8 : 0.3,
          transform: 'translate(0, 0)',
          boxShadow: isPointer ? '0 0 30px rgba(var(--primary-rgb, 59, 130, 246), 0.4)' : 'none',
        }}
        className={`fixed top-0 left-0 w-4 h-4 bg-opacity-20 rounded-full pointer-events-none z-40 
          blur-[0.5px] transform-gpu will-change-transform
          ${isPointer ? 'scale-[200%]' : 'scale-100'}`}
        aria-hidden="true"
      />

      {/* Particules d'éclairage (optionnel) */}
      {isMouseMoving && (
        <div
          className="fixed top-0 left-0 w-1 h-1 rounded-full pointer-events-none z-45 transform-gpu will-change-transform"
          style={{
            background: 'rgba(var(--primary-rgb, 59, 130, 246), 0.8)',
            transform: `translate3d(${mousePosition.x + Math.sin(Date.now() * 0.01) * 10}px, ${mousePosition.y + Math.cos(Date.now() * 0.01) * 10}px, 0)`,
            boxShadow: '0 0 10px rgba(var(--primary-rgb, 59, 130, 246), 0.8)',
            animation: 'pulse 0.5s ease-in-out infinite alternate',
          }}
          aria-hidden="true"
        />
      )}

      {/* Styles CSS pour les animations */}
      <style>{`
        @keyframes pulse {
          0% {
            opacity: 0.6;
            transform: scale(1);
          }
          100% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
        
        /* Variables CSS personnalisées pour les couleurs */
        :root {
          --primary-rgb: 59, 130, 246;
        }
        
        /* Mode sombre */
        @media (prefers-color-scheme: dark) {
          :root {
            --primary-rgb: 96, 165, 250;
          }
        }
      `}</style>
    </>
  )
}

export default React.memo(CustomCursor)