// // src/components/sections/About/index.tsx - VERSION PRO PERFORMANCE
// import { useRef, useState, useEffect, lazy, Suspense, memo } from 'react';
// import { motion, useInView } from 'framer-motion';
// import AboutImage from './components/AboutImage';
// import AboutTabs from './components/AboutTabs';
// import { AboutEducation } from './components/AboutEducation';
// import { AboutCertifications } from './components/AboutCertifications';
// import { Sparkles, Code, Heart, Coffee, Rocket } from 'lucide-react';

// const AboutBackground = lazy(() => import('./components/AboutBackground'));

// // ⚡ Fallback professionnel et léger
// const BackgroundFallback = () => (
//   <div className="absolute inset-0 bg-gradient-to-br from-black via-[#4ADE80]/5 to-black opacity-60" />
// );

// type TabType = 'education' | 'certifications';

// const About = memo(() => {
//   const [activeTab, setActiveTab] = useState<TabType>('education');
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [typedText, setTypedText] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [isReducedMotion, setIsReducedMotion] = useState(false);
  
//   const sectionRef = useRef<HTMLElement>(null);
//   const headingRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);
  
//   const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
//   const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });
//   const isContentInView = useInView(contentRef, { once: true, amount: 0.3 });

//   // Détection des préférences d'animation
//   useEffect(() => {
//     const checkSettings = () => {
//       setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
//     };
    
//     checkSettings();
//     const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
//     motionMedia.addEventListener('change', checkSettings);
    
//     return () => motionMedia.removeEventListener('change', checkSettings);
//   }, []);

//   // ⚡ Track mouse optimisé avec throttling
//   useEffect(() => {
//     let timeoutId: NodeJS.Timeout;
    
//     const handleMouseMove = (e: MouseEvent) => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => {
//         setMousePosition({ x: e.clientX, y: e.clientY });
//       }, 16); // 60fps max
//     };
    
//     if (!isReducedMotion) {
//       window.addEventListener('mousemove', handleMouseMove);
//     }
    
//     return () => {
//       clearTimeout(timeoutId);
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, [isReducedMotion]);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         staggerChildren: 0.12, 
//         delayChildren: 0.2,
//         duration: 0.5 
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 30, opacity: 0, scale: 0.95 },
//     visible: { 
//       y: 0, 
//       opacity: 1,
//       scale: 1,
//       transition: { 
//         type: "spring",
//         damping: 18,
//         stiffness: 120,
//         duration: 0.6 // ⚡ Plus rapide
//       }
//     }
//   };

//   const titleVariants = {
//     hidden: { opacity: 0, y: -30, scale: 0.9 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       scale: 1,
//       transition: { 
//         type: "spring",
//         damping: 15,
//         stiffness: 120,
//         duration: 0.8 // ⚡ Plus rapide
//       }
//     }
//   };

//   return (
//     <section 
//       id="about" 
//       ref={sectionRef}
//       className="relative min-h-screen overflow-hidden bg-black flex items-center"
//       style={!isReducedMotion ? {
//         background: `
//           radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
//             rgba(74, 222, 128, 0.06) 0%, 
//             transparent 50%),
//           linear-gradient(135deg, #000000 0%, #0a0f0a 50%, #000000 100%)
//         `
//       } : undefined}
//     >
//       {/* 🎨 Curseur lumineux interactif OPTIMISÉ */}
//       {!isReducedMotion && (
//         <motion.div
//           className="fixed pointer-events-none z-30 w-80 h-80 rounded-full"
//           style={{
//             background: 'radial-gradient(circle, rgba(74, 222, 128, 0.04) 0%, transparent 70%)',
//             filter: 'blur(30px)',
//             x: mousePosition.x - 160,
//             y: mousePosition.y - 160,
//           }}
//           animate={{
//             scale: [1, 1.1, 1],
//             opacity: [0.3, 0.5, 0.3]
//           }}
//           transition={{
//             duration: 3, // ⚡ Plus rapide
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         />
//       )}

//       <Suspense fallback={<BackgroundFallback />}>
//         <AboutBackground />
//       </Suspense>
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
//         {/* 🎨 Heading PROFESSIONNEL */}
//         <motion.div 
//           ref={headingRef}
//           variants={titleVariants}
//           initial="hidden"
//           animate={isHeadingInView ? "visible" : "hidden"}
//           className="text-center mb-16 relative"
//         >
//           {/* Effet de halo derrière le titre */}
//           <motion.div
//             className="absolute inset-0 blur-3xl opacity-20"
//             animate={!isReducedMotion ? {
//               scale: [1, 1.03, 1],
//               opacity: [0.2, 0.3, 0.2]
//             } : {}}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           >
//             <h2 className="text-5xl md:text-7xl font-black text-[#4ADE80]">
//               À propos de Moi
//             </h2>
//           </motion.div>
          
//           {/* 🎨 Icônes flottantes OPTIMISÉES */}
//           <motion.div
//             className="absolute -top-6 left-1/2 transform -translate-x-1/2"
//             animate={!isReducedMotion ? {
//               y: [-8, -15, -8],
//               rotate: [0, 8, 0],
//               scale: [1, 1.1, 1]
//             } : {}}
//             transition={{
//               duration: 2.5,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           >
//             <Sparkles className="w-8 h-8 text-[#4ADE80]/60" />
//           </motion.div>
          
//           <motion.div
//             className="absolute -top-4 -left-16"
//             animate={!isReducedMotion ? {
//               rotate: [0, 360],
//               scale: [1, 1.2, 1]
//             } : {}}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               ease: "easeInOut",
//               delay: 0.5
//             }}
//           >
//             <Code className="w-6 h-6 text-[#22D3EE]/50" />
//           </motion.div>
          
//           <motion.div
//             className="absolute -top-4 -right-16"
//             animate={!isReducedMotion ? {
//               y: [-3, -12, -3],
//               rotate: [0, -8, 0]
//             } : {}}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               ease: "easeInOut",
//               delay: 0.2
//             }}
//           >
//             <Heart className="w-6 h-6 text-pink-400/50" />
//           </motion.div>
          
//           {/* 🎨 Titre principal avec gradient animé PROFESSIONNEL */}
//           <h2 className="relative text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
//             <motion.span 
//               className="bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] bg-clip-text text-transparent"
//               animate={!isReducedMotion ? {
//                 backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
//               } : {}}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 ease: "linear"
//               }}
//               style={{
//                 backgroundSize: '200% 200%'
//               }}
//             >
//               À propos de
//             </motion.span>{' '}
//             <span className="text-white">Moi</span>
//           </h2>
          
//           {/* 🎨 Ligne décorative PROFESSIONNELLE */}
//           <motion.div 
//             className="relative h-2 w-32 mx-auto rounded-full overflow-hidden"
//             initial={{ width: 0 }}
//             animate={isHeadingInView ? { width: 128 } : { width: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] rounded-full" />
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
//               animate={!isReducedMotion ? {
//                 x: ['-100%', '200%']
//               } : {}}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 repeatDelay: 1,
//                 ease: "easeInOut"
//               }}
//             />
//           </motion.div>
//         </motion.div>
        
//         {/* Image mobile avec performance optimisée */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={isHeadingInView ? { opacity: 1, scale: 1 } : {}}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="mb-12 md:hidden"
//         >
//           <AboutImage />
//         </motion.div>
        
//         {/* 🎨 Content grid optimisé */}
//         <div 
//           ref={contentRef}
//           className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
//         >
//           {/* Image desktop avec effets simplifiés */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={isContentInView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
//             className="order-2 lg:order-1 hidden md:block"
//             whileHover={!isReducedMotion ? {
//               scale: 1.02,
//               transition: { duration: 0.3 }
//             } : {}}
//           >
//             <AboutImage />
//           </motion.div>
          
//           {/* Content avec animations performantes */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate={isContentInView ? "visible" : "hidden"}
//             className="order-1 lg:order-2 space-y-8"
//           >
//             {/* Bio section optimisée */}
//             <motion.div variants={itemVariants} className="space-y-6">
//               {/* Titre avec icônes optimisées */}
//               <motion.h3 
//                 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3"
//                 animate={!isReducedMotion ? {
//                   textShadow: [
//                     '0 0 0 transparent',
//                     '0 0 15px rgba(74, 222, 128, 0.2)',
//                     '0 0 0 transparent'
//                   ]
//                 } : {}}
//                 transition={{
//                   duration: 3,
//                   repeat: Infinity,
//                   ease: "easeInOut"
//                 }}
//               >
//                 <motion.span
//                   animate={!isReducedMotion ? {
//                     rotate: [0, 8, -8, 0]
//                   } : {}}
//                   transition={{
//                     duration: 2,
//                     repeat: Infinity,
//                     ease: "easeInOut"
//                   }}
//                 >
//                   <Rocket className="w-8 h-8 text-[#4ADE80]" />
//                 </motion.span>
//                 Développeur Full Stack
//                 <motion.span
//                   animate={!isReducedMotion ? {
//                     rotate: [0, 12, 0]
//                   } : {}}
//                   transition={{
//                     duration: 1.5,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                     delay: 0.5
//                   }}
//                 >
//                   <Coffee className="w-6 h-6 text-[#22D3EE]" />
//                 </motion.span>
//               </motion.h3>
              
//               {/* Bio text avec typewriter effect optimisé */}
//               <motion.div 
//                 className="relative"
//                 animate={!isReducedMotion ? {
//                   boxShadow: [
//                     '0 0 0 rgba(74, 222, 128, 0)',
//                     '0 0 20px rgba(74, 222, 128, 0.08)',
//                     '0 0 0 rgba(74, 222, 128, 0)'
//                   ]
//                 } : {}}
//                 transition={{
//                   duration: 4,
//                   repeat: Infinity,
//                   ease: "easeInOut"
//                 }}
//               >
//                 <div className="bg-black/20 backdrop-blur-sm border border-[#4ADE80]/20 rounded-xl p-6">
//                   <p className="text-gray-300 text-lg leading-relaxed">
//                     {typedText}
//                     {isTyping && (
//                       <motion.span
//                         className="text-[#4ADE80] text-xl"
//                         animate={{ opacity: [0, 1, 0] }}
//                         transition={{
//                           duration: 0.8,
//                           repeat: Infinity,
//                           ease: "easeInOut"
//                         }}
//                       >
//                         |
//                       </motion.span>
//                     )}
//                   </p>
//                 </div>
//               </motion.div>
              
//               {/* Stats optimisés */}
//               <motion.div 
//                 className="flex flex-wrap gap-4"
//                 variants={itemVariants}
//               >
//                 {[
//                   { label: "Projets", value: "15+", icon: "🚀" },
//                   { label: "Technologies", value: "20+", icon: "⚡" },
//                   { label: "Café/jour", value: "∞", icon: "☕" }
//                 ].map((stat, index) => (
//                   <motion.div
//                     key={stat.label}
//                     className="bg-gradient-to-r from-[#4ADE80]/10 to-[#22D3EE]/10 
//                              border border-[#4ADE80]/30 rounded-lg px-4 py-3 text-center"
//                     whileHover={!isReducedMotion ? {
//                       scale: 1.05,
//                       backgroundColor: "rgba(74, 222, 128, 0.1)",
//                       borderColor: "rgba(74, 222, 128, 0.5)"
//                     } : {}}
//                     animate={!isReducedMotion ? {
//                       y: [0, -3, 0]
//                     } : {}}
//                     transition={{
//                       duration: 2,
//                       repeat: Infinity,
//                       delay: index * 0.2,
//                       ease: "easeInOut"
//                     }}
//                   >
//                     <div className="text-2xl mb-1">{stat.icon}</div>
//                     <div className="text-2xl font-bold text-[#4ADE80]">{stat.value}</div>
//                     <div className="text-sm text-gray-400">{stat.label}</div>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </motion.div>
            
//             {/* Tabs avec animations optimisées */}
//             <motion.div variants={itemVariants}>
//               <AboutTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              
//               <motion.div 
//                 className="mt-8"
//                 key={activeTab}
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{
//                   type: "spring",
//                   damping: 20,
//                   stiffness: 100,
//                   duration: 0.5
//                 }}
//               >
//                 {activeTab === 'education' && <AboutEducation />}
//                 {activeTab === 'certifications' && <AboutCertifications />}
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
      
//       {/* Effets décoratifs simplifiés mais efficaces */}
//       {!isReducedMotion && (
//         <>
//           <div className="absolute bottom-10 right-10 w-24 h-24 pointer-events-none">
//             <motion.div
//               className="w-full h-full rounded-full bg-gradient-radial from-[#4ADE80]/15 to-transparent blur-xl"
//               animate={{
//                 scale: [1, 1.3, 1],
//                 opacity: [0.3, 0.6, 0.3]
//               }}
//               transition={{
//                 duration: 6,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }}
//             />
//           </div>
          
//           <div className="absolute top-20 left-10 w-32 h-32 pointer-events-none">
//             <motion.div
//               className="w-full h-full rounded-full bg-gradient-radial from-[#22D3EE]/10 to-transparent blur-2xl"
//               animate={{
//                 scale: [1, 1.2, 1],
//                 opacity: [0.2, 0.5, 0.2]
//               }}
//               transition={{
//                 duration: 8,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//                 delay: 2
//               }}
//             />
//           </div>
          
//           {/* Particules réduites mais visibles */}
//           <div className="absolute inset-0 pointer-events-none overflow-hidden">
//             {[...Array(6)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="absolute w-1.5 h-1.5 bg-[#4ADE80] rounded-full opacity-30"
//                 style={{
//                   left: Math.random() * 100 + '%',
//                   top: Math.random() * 100 + '%',
//                 }}
//                 animate={{
//                   y: [0, -40, 0],
//                   opacity: [0.3, 0.7, 0.3]
//                 }}
//                 transition={{
//                   duration: 4 + Math.random() * 2,
//                   repeat: Infinity,
//                   delay: Math.random() * 2,
//                   ease: "easeInOut"
//                 }}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </section>
//   );
// });

// export default About;






















// src/components/sections/About/index.tsx - VERSION PRO PERFORMANCE
import { useRef, useState, useEffect, lazy, Suspense, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import AboutImage from './components/AboutImage';
import AboutTabs from './components/AboutTabs';
import { AboutEducation } from './components/AboutEducation';
import { AboutCertifications } from './components/AboutCertifications';
import { Sparkles, Code, Heart } from 'lucide-react';

const AboutBackground = lazy(() => import('./components/AboutBackground'));

// ⚡ Fallback professionnel et léger
const BackgroundFallback = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-black via-[#4ADE80]/5 to-black opacity-60" />
);

type TabType = 'education' | 'certifications';

const About = memo(() => {
  const [activeTab, setActiveTab] = useState<TabType>('education');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const isContentInView = useInView(contentRef, { once: true, amount: 0.3 });

  // Détection des préférences d'animation
  useEffect(() => {
    const checkSettings = () => {
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };
    
    checkSettings();
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionMedia.addEventListener('change', checkSettings);
    
    return () => motionMedia.removeEventListener('change', checkSettings);
  }, []);

  // ⚡ Track mouse optimisé avec throttling
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }, 16); // 60fps max
    };
    
    if (!isReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isReducedMotion]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.12, 
        delayChildren: 0.2,
        duration: 0.5 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring",
        damping: 18,
        stiffness: 120,
        duration: 0.6 // ⚡ Plus rapide
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        damping: 15,
        stiffness: 120,
        duration: 0.8 // ⚡ Plus rapide
      }
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black flex items-center mt-32"
      style={!isReducedMotion ? {
        background: `
          radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(74, 222, 128, 0.06) 0%, 
            transparent 50%),
          linear-gradient(135deg, #000000 0%, #0a0f0a 50%, #000000 100%)
        `
      } : undefined}
    >
      {/* 🎨 Curseur lumineux interactif OPTIMISÉ */}
      {!isReducedMotion && (
        <motion.div
          className="fixed pointer-events-none z-30 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(74, 222, 128, 0.04) 0%, transparent 70%)',
            filter: 'blur(30px)',
            x: mousePosition.x - 160,
            y: mousePosition.y - 160,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 3, // ⚡ Plus rapide
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      <Suspense fallback={<BackgroundFallback />}>
        <AboutBackground />
      </Suspense>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        {/* 🎨 Heading PROFESSIONNEL */}
        <motion.div 
          ref={headingRef}
          variants={titleVariants}
          initial="hidden"
          animate={isHeadingInView ? "visible" : "hidden"}
          className="text-center mb-16 relative"
        >
          {/* Effet de halo derrière le titre */}
          <motion.div
            className="absolute inset-0 blur-3xl opacity-20"
            animate={!isReducedMotion ? {
              scale: [1, 1.03, 1],
              opacity: [0.2, 0.3, 0.2]
            } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-[#4ADE80]">
              À propos de Moi
            </h2>
          </motion.div>
          
          {/* 🎨 Icônes flottantes OPTIMISÉES */}
          <motion.div
            className="absolute -top-6 left-1/2 transform -translate-x-1/2"
            animate={!isReducedMotion ? {
              y: [-8, -15, -8],
              rotate: [0, 8, 0],
              scale: [1, 1.1, 1]
            } : {}}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-8 h-8 text-[#4ADE80]/60" />
          </motion.div>
          
          <motion.div
            className="absolute -top-4 -left-16"
            animate={!isReducedMotion ? {
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <Code className="w-6 h-6 text-[#22D3EE]/50" />
          </motion.div>
          
          <motion.div
            className="absolute -top-4 -right-16"
            animate={!isReducedMotion ? {
              y: [-3, -12, -3],
              rotate: [0, -8, 0]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2
            }}
          >
            <Heart className="w-6 h-6 text-pink-400/50" />
          </motion.div>
          
          {/* 🎨 Titre principal avec gradient animé PROFESSIONNEL */}
          <h2 className="relative text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
            <motion.span 
              className="bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] bg-clip-text text-transparent"
              animate={!isReducedMotion ? {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              } : {}}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              À propos de
            </motion.span>{' '}
            <span className="text-white">Moi</span>
          </h2>
          
          {/* 🎨 Ligne décorative PROFESSIONNELLE */}
          <motion.div 
            className="relative h-2 w-32 mx-auto rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={isHeadingInView ? { width: 128 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] rounded-full" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
              animate={!isReducedMotion ? {
                x: ['-100%', '200%']
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
        
        {/* Image mobile avec performance optimisée */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isHeadingInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 md:hidden"
        >
          <AboutImage />
        </motion.div>
        
        {/* 🎨 Content grid optimisé */}
        <div 
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Image desktop avec effets simplifiés */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isContentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="order-2 lg:order-1 hidden md:block"
            whileHover={!isReducedMotion ? {
              scale: 1.02,
              transition: { duration: 0.3 }
            } : {}}
          >
            <AboutImage />
          </motion.div>
          
          {/* Content avec animations performantes */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isContentInView ? "visible" : "hidden"}
            className="order-1 lg:order-2 space-y-8"
          >
            {/* Bio section optimisée */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Bio text avec typewriter effect optimisé */}
              <motion.div 
                className="relative"
                animate={!isReducedMotion ? {
                  boxShadow: [
                    '0 0 0 rgba(74, 222, 128, 0)',
                    '0 0 20px rgba(74, 222, 128, 0.08)',
                    '0 0 0 rgba(74, 222, 128, 0)'
                  ]
                } : {}}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
              </motion.div>
            </motion.div>
            
            {/* Tabs avec animations optimisées */}
            <motion.div variants={itemVariants}>
              <AboutTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              
              <motion.div 
                className="mt-8"
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 100,
                  duration: 0.5
                }}
              >
                {activeTab === 'education' && <AboutEducation />}
                {activeTab === 'certifications' && <AboutCertifications />}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Effets décoratifs simplifiés mais efficaces */}
      {!isReducedMotion && (
        <>
          <div className="absolute bottom-10 right-10 w-24 h-24 pointer-events-none">
            <motion.div
              className="w-full h-full rounded-full bg-gradient-radial from-[#4ADE80]/15 to-transparent blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          <div className="absolute top-20 left-10 w-32 h-32 pointer-events-none">
            <motion.div
              className="w-full h-full rounded-full bg-gradient-radial from-[#22D3EE]/10 to-transparent blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>
          
          {/* Particules réduites mais visibles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-[#4ADE80] rounded-full opacity-30"
                style={{
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
});

export default About;