// // src/components/sections/About/components/AboutImage.tsx
// import { memo, useRef, useEffect } from 'react';
// import { motion, useInView } from 'framer-motion';
// import { gsap } from 'gsap';
// import workspaceImage from '../../../../assets/about.png'; // Assurez-vous d'ajouter cette image à vos assets

// const AboutImage = memo(() => {
//   const imageContainerRef = useRef<HTMLDivElement>(null);
//   const isInView = useInView(imageContainerRef, { once: true, amount: 0.3 });
//   const bubblesRef = useRef<(HTMLDivElement | null)[]>([]);
//   const highlightsRef = useRef<(HTMLDivElement | null)[]>([]);
//   const animationsRef = useRef<gsap.core.Timeline[]>([]);

//   // Nombre d'éléments décoratifs
//   const BUBBLE_COUNT = 8;
//   const HIGHLIGHT_COUNT = 5;

//   // Effet d'animation avec GSAP quand l'image devient visible
//   useEffect(() => {
//     if (!isInView) return;

//     // Nettoyer les animations précédentes
//     animationsRef.current.forEach(timeline => {
//       if (timeline) timeline.kill();
//     });
//     animationsRef.current = [];

//     // Animation des bulles - corrigée pour TypeScript
//     const bubbleTimeline = gsap.timeline();
//     bubblesRef.current.forEach((bubble, index) => {
//       if (bubble) {
//         const delay = index * 0.2;
//         const duration = 2 + Math.random() * 3;
        
//         // Animation 1: Déplacement
//         bubbleTimeline.to(bubble, {
//           y: -20 - Math.random() * 30, // Valeur numérique au lieu de string template
//           x: Math.sin(index) * 15, // Valeur numérique au lieu de string template
//           duration: duration,
//           repeat: -1,
//           yoyo: true,
//           ease: "sine.inOut",
//           delay: delay
//         }, 0);
        
//         // Animation 2: Opacité (séparée)
//         bubbleTimeline.to(bubble, {
//           opacity: 0.8,
//           duration: duration / 2,
//           repeat: -1,
//           yoyo: true,
//           ease: "sine.inOut",
//           delay: delay
//         }, 0);
        
//         // Animation 3: Scale (séparée)
//         bubbleTimeline.to(bubble, {
//           scale: 1.2,
//           duration: duration / 2,
//           repeat: -1,
//           yoyo: true,
//           ease: "sine.inOut",
//           delay: delay + 0.1
//         }, 0);
//       }
//     });
//     animationsRef.current.push(bubbleTimeline);

//     // Animation des reflets - corrigée pour TypeScript
//     const highlightTimeline = gsap.timeline();
//     highlightsRef.current.forEach((highlight, index) => {
//       if (highlight) {
//         const delay = index * 0.3;
//         const duration = 3 + Math.random() * 2;
        
//         // Animation 1: Opacité 
//         highlightTimeline.to(highlight, {
//           opacity: 0.4, 
//           duration: duration / 2,
//           repeat: -1,
//           yoyo: true,
//           ease: "sine.inOut",
//           delay: delay
//         }, 0);
        
//         // Animation 2: Scale
//         highlightTimeline.to(highlight, {
//           scale: 1.1,
//           duration: duration / 2,
//           repeat: -1,
//           yoyo: true,
//           ease: "sine.inOut",
//           delay: delay + 0.2
//         }, 0);
//       }
//     });
//     animationsRef.current.push(highlightTimeline);

//     // Animation de l'image elle-même
//     const imageTimeline = gsap.timeline();
//     if (imageContainerRef.current) {
//       imageTimeline.to(imageContainerRef.current, {
//         boxShadow: "0 0 30px rgba(74, 222, 128, 0.3)",
//         duration: 3,
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut"
//       });
//     }
//     animationsRef.current.push(imageTimeline);

//     // Cleanup
//     return () => {
//       animationsRef.current.forEach(timeline => {
//         if (timeline) timeline.kill();
//       });
//     };
//   }, [isInView]);

//   return (
//     <div className="relative max-w-md mx-auto">
//       {/* Container de l'image avec effet */}
//       <motion.div
//         ref={imageContainerRef}
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={isInView ? { opacity: 1, scale: 1 } : {}}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-xl overflow-hidden
//           shadow-lg shadow-black/50 z-10"
//       >
//         {/* Image principale */}
//         <img
//           src={workspaceImage}
//           alt="Developer Workspace"
//           className="rounded-lg w-full h-auto relative z-10"
//         />

//         {/* Calque de grain */}
//         <div
//           className="absolute inset-0 mix-blend-overlay opacity-30 z-20"
//           style={{
//             backgroundImage: 'url("/noise.png")',
//           }}
//         />

//         {/* Effet de bordure brillante */}
//         <div className="absolute inset-0 rounded-xl border border-[#4ADE80]/20 z-30" />
//       </motion.div>

//       {/* Éléments décoratifs autour de l'image */}
//       {/* Bulles */}
//       {Array.from({ length: BUBBLE_COUNT }).map((_, i) => (
//         <div
//           key={`bubble-${i}`}
//           ref={el => bubblesRef.current[i] = el}
//           className="absolute rounded-full bg-[#4ADE80] blur-sm opacity-20 z-0"
//           style={{
//             width: `${10 + Math.random() * 15}px`,
//             height: `${10 + Math.random() * 15}px`,
//             left: `${10 + Math.random() * 80}%`,
//             top: `${10 + Math.random() * 80}%`,
//           }}
//         />
//       ))}

//       {/* Points de reflet */}
//       {Array.from({ length: HIGHLIGHT_COUNT }).map((_, i) => (
//         <div
//           key={`highlight-${i}`}
//           ref={el => highlightsRef.current[i] = el}
//           className="absolute rounded-full bg-white blur-md opacity-10 z-0"
//           style={{
//             width: `${4 + Math.random() * 8}px`,
//             height: `${4 + Math.random() * 8}px`,
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//           }}
//         />
//       ))}

//       {/* Effet de lueur ambient */}
//       <div className="absolute -inset-4 bg-gradient-radial from-[#4ADE80]/10 to-transparent blur-2xl opacity-20 z-0" />
//     </div>
//   );
// });

// export default AboutImage;












// src/components/sections/About/components/AboutImage.tsx
import { memo, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import aboutImage from '../../../../assets/about.png'; // Mis à jour pour utiliser about.png

const AboutImage = memo(() => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(imageContainerRef, { once: true, amount: 0.3 });
  const bubblesRef = useRef<(HTMLDivElement | null)[]>([]);
  const highlightsRef = useRef<(HTMLDivElement | null)[]>([]);
  const animationsRef = useRef<gsap.core.Timeline[]>([]);

  // Nombre d'éléments décoratifs
  const BUBBLE_COUNT = 8;
  const HIGHLIGHT_COUNT = 5;

  // Effet d'animation avec GSAP quand l'image devient visible
  useEffect(() => {
    if (!isInView) return;

    // Nettoyer les animations précédentes
    animationsRef.current.forEach(timeline => {
      if (timeline) timeline.kill();
    });
    animationsRef.current = [];

    // Animation des bulles - corrigée pour TypeScript
    const bubbleTimeline = gsap.timeline();
    bubblesRef.current.forEach((bubble, index) => {
      if (bubble) {
        const delay = index * 0.2;
        const duration = 2 + Math.random() * 3;
        
        // Animation 1: Déplacement
        bubbleTimeline.to(bubble, {
          y: -20 - Math.random() * 30, // Valeur numérique au lieu de string template
          x: Math.sin(index) * 15, // Valeur numérique au lieu de string template
          duration: duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: delay
        }, 0);
        
        // Animation 2: Opacité (séparée)
        bubbleTimeline.to(bubble, {
          opacity: 0.8,
          duration: duration / 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: delay
        }, 0);
        
        // Animation 3: Scale (séparée)
        bubbleTimeline.to(bubble, {
          scale: 1.2,
          duration: duration / 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: delay + 0.1
        }, 0);
      }
    });
    animationsRef.current.push(bubbleTimeline);

    // Animation des reflets - corrigée pour TypeScript
    const highlightTimeline = gsap.timeline();
    highlightsRef.current.forEach((highlight, index) => {
      if (highlight) {
        const delay = index * 0.3;
        const duration = 3 + Math.random() * 2;
        
        // Animation 1: Opacité 
        highlightTimeline.to(highlight, {
          opacity: 0.4, 
          duration: duration / 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: delay
        }, 0);
        
        // Animation 2: Scale
        highlightTimeline.to(highlight, {
          scale: 1.1,
          duration: duration / 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: delay + 0.2
        }, 0);
      }
    });
    animationsRef.current.push(highlightTimeline);

    // Animation de l'image elle-même
    const imageTimeline = gsap.timeline();
    if (imageContainerRef.current) {
      imageTimeline.to(imageContainerRef.current, {
        boxShadow: "0 0 30px rgba(74, 222, 128, 0.3)",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    animationsRef.current.push(imageTimeline);

    // Cleanup
    return () => {
      animationsRef.current.forEach(timeline => {
        if (timeline) timeline.kill();
      });
    };
  }, [isInView]);

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {/* Container de l'image avec effet - plus grand pour s'adapter à l'image */}
      <motion.div
        ref={imageContainerRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-4 sm:p-6 rounded-xl overflow-hidden
          shadow-lg shadow-black/50 z-10 transform-gpu"
      >
        {/* Image principale - dimensions augmentées */}
        <img
          src={aboutImage}
          alt="Developer Workspace"
          className="rounded-lg w-full h-auto object-contain relative z-10"
          style={{ 
            minHeight: "320px",
            maxHeight: "550px"
          }}
        />

        {/* Calque de grain */}
        <div
          className="absolute inset-0 mix-blend-overlay opacity-30 z-20"
          style={{
            backgroundImage: 'url("/noise.png")',
          }}
        />

        {/* Effet de bordure brillante */}
        <div className="absolute inset-0 rounded-xl border border-[#4ADE80]/20 z-30" />
      </motion.div>

      {/* Éléments décoratifs autour de l'image */}
      {/* Bulles */}
      {Array.from({ length: BUBBLE_COUNT }).map((_, i) => (
        <div
          key={`bubble-${i}`}
          ref={el => bubblesRef.current[i] = el}
          className="absolute rounded-full bg-[#4ADE80] blur-sm opacity-20 z-0"
          style={{
            width: `${10 + Math.random() * 15}px`,
            height: `${10 + Math.random() * 15}px`,
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
        />
      ))}

      {/* Points de reflet */}
      {Array.from({ length: HIGHLIGHT_COUNT }).map((_, i) => (
        <div
          key={`highlight-${i}`}
          ref={el => highlightsRef.current[i] = el}
          className="absolute rounded-full bg-white blur-md opacity-10 z-0"
          style={{
            width: `${4 + Math.random() * 8}px`,
            height: `${4 + Math.random() * 8}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Effet de lueur ambient */}
      <div className="absolute -inset-4 bg-gradient-radial from-[#4ADE80]/10 to-transparent blur-2xl opacity-20 z-0" />
    </div>
  );
});

export default AboutImage;