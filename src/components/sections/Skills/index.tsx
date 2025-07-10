// src/components/sections/Skills/index.tsx - VERSION PRO PERFORMANCE
import { useState, useRef, useEffect, lazy, Suspense, memo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import SkillsTabs from './components/SkillsTabs';
import { SkillsCategory } from './types';
import SkillsCards from './components/SkillsCards';

// 🎨 Lazy load background avec priorité performance
const SkillsBackground = lazy(() => import('./components/SkillsBackground'));

// ⚡ Fallback professionnel et léger
const BackgroundFallback = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-black via-[#4ADE80]/5 to-black opacity-60" />
);

const Skills = memo(() => {
  const [activeCategory, setActiveCategory] = useState<SkillsCategory>('frontend');
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

  // 🎨 Animation variants professionnelles
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.12,
        delayChildren: 0.2,
        duration: 0.6,
        ease: "easeOut"
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
        duration: 0.8, 
        ease: "easeOut",
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -40, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        damping: 15,
        stiffness: 120,
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black flex items-center mt-32"
    >
      {/* 🎨 Background effect professionnel */}
      <Suspense fallback={<BackgroundFallback />}>
        <SkillsBackground />
      </Suspense>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 w-full">
        {/* 🎨 Heading ultra-professionnel */}
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
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.4, 0.2]
            } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#4ADE80]">
              Mes Compétences
            </h2>
          </motion.div>
          
          {/* Titre principal avec gradient animé professionnel */}
          <motion.h2 
            className="relative text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6"
            animate={!isReducedMotion ? {
              textShadow: [
                '0 0 0 transparent',
                '0 0 30px rgba(74, 222, 128, 0.3)',
                '0 0 0 transparent'
              ]
            } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-white">Mes</span>{' '}
            <motion.span 
              className="bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] bg-clip-text text-transparent"
              animate={!isReducedMotion ? {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              } : {}}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              Compétences
            </motion.span>
          </motion.h2>
          
          {/* Sous-titre professionnel */}
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto text-lg mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          >
            Technologies et outils que je maîtrise pour créer des expériences digitales exceptionnelles.
          </motion.p>
          
          {/* Ligne décorative professionnelle avec animation */}
          <motion.div 
            className="relative h-1 w-24 mx-auto rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={isHeadingInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] rounded-full" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"
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
        
        {/* 🎨 Content avec animations professionnelles */}
        <div 
          ref={contentRef}
          className="w-full max-w-6xl mx-auto"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isContentInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* 🎨 Tabs avec animation */}
            <motion.div variants={itemVariants}>
              <SkillsTabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
              
              <div className="mt-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 25, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -25, scale: 0.98 }}
                    transition={{ 
                      duration: 0.6,
                      ease: "easeOut",
                      type: "spring",
                      damping: 20,
                      stiffness: 100
                    }}
                  >
                    <SkillsCards category={activeCategory} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* 🎨 Éléments décoratifs professionnels et optimisés */}
      <motion.div 
        className="absolute bottom-10 right-10 w-24 h-24 rounded-full 
          bg-gradient-radial from-[#4ADE80]/20 to-transparent blur-2xl"
        animate={!isReducedMotion ? {
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        } : {}}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 rounded-full 
          bg-gradient-radial from-[#22D3EE]/15 to-transparent blur-3xl"
        animate={!isReducedMotion ? {
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
          x: [0, 15, 0],
          y: [0, -20, 0]
        } : {}}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </section>
  );
});

export default Skills;