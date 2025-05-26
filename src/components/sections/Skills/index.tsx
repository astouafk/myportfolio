// src/components/sections/Skills/index.tsx
import { useState, useRef, useEffect, lazy, Suspense, memo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import SkillsTabs from './components/SkillsTabs';
import { SkillsCategory } from './types';
// import SkillsBubbles from './components/SkillsBubbles';
import SkillsCards from './components/SkillsCards';

// Lazy load background effect
const SkillsBackground = lazy(() => import('./components/SkillsBackground'));

// Loading fallback for background
const BackgroundFallback = () => <div className="absolute inset-0 bg-black/50" />;

const Skills = memo(() => {
  const [activeCategory, setActiveCategory] = useState<SkillsCategory>('frontend');
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const isContentInView = useInView(contentRef, { once: true, amount: 0.3 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black flex items-center"
    >
      {/* Background effect */}
      <Suspense fallback={<BackgroundFallback />}>
        <SkillsBackground />
      </Suspense>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 w-full">
        {/* Heading */}
        <motion.div 
          ref={headingRef}
          initial={{ opacity: 0, y: -20 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="text-[#4ADE80]">Mes</span> Compétences
          </h2>
          <div className="h-1 w-20 bg-[#4ADE80] mx-auto rounded-full"></div>
        </motion.div>
        
        {/* Content */}
        <div 
          ref={contentRef}
          className="w-full max-w-5xl mx-auto"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isContentInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Tabs */}
            <motion.div variants={itemVariants}>
              <SkillsTabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
              
              <div className="mt-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* <SkillsBubbles category={activeCategory} /> */}
                    <SkillsCards category={activeCategory} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full 
        bg-gradient-radial from-[#4ADE80]/20 to-transparent blur-xl animate-pulse-slow"></div>
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full 
        bg-gradient-radial from-[#4ADE80]/10 to-transparent blur-xl animate-float"></div>
    </section>
  );
});

export default Skills;