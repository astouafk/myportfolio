// // src/components/sections/About/index.tsx
// import { useRef, useState, useEffect, lazy, Suspense, memo } from 'react';
// import { motion, useInView } from 'framer-motion';
// import AboutImage from './components/AboutImage';
// import AboutTabs from './components/AboutTabs';
// import { AboutEducation } from './components/AboutEducation';
// import { AboutCertifications } from './components/AboutCertifications';

// // Lazy load background effect
// const AboutBackground = lazy(() => import('./components/AboutBackground'));

// // Loading fallback for background
// const BackgroundFallback = () => <div className="absolute inset-0 bg-black/50" />;

// // Type pour les onglets (Skills supprimé)
// type TabType = 'education' | 'certifications';

// const About = memo(() => {
//   const [activeTab, setActiveTab] = useState<TabType>('education');
//   const sectionRef = useRef<HTMLElement>(null);
//   const headingRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);
//   const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
//   const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });
//   const isContentInView = useInView(contentRef, { once: true, amount: 0.3 });

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//         duration: 0.5 
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { 
//       y: 0, 
//       opacity: 1,
//       transition: { duration: 0.7, ease: "easeOut" }
//     }
//   };

//   return (
//     <section 
//       id="about" 
//       ref={sectionRef}
//       className="relative min-h-screen py-20 md:py-28 overflow-hidden bg-black"
//     >
//       {/* Background effect */}
//       <Suspense fallback={<BackgroundFallback />}>
//         <AboutBackground />
//       </Suspense>
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Heading */}
//         <motion.div 
//           ref={headingRef}
//           initial={{ opacity: 0, y: -20 }}
//           animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//           className="text-center mb-12 md:mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
//             <span className="text-[#4ADE80]">About</span> Me
//           </h2>
//           <div className="h-1 w-20 bg-[#4ADE80] mx-auto rounded-full"></div>
//         </motion.div>
        
//         {/* Image - pour mobile, placée sous le titre */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={isHeadingInView ? { opacity: 1, scale: 1 } : {}}
//           transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
//           className="mb-10 md:hidden"
//         >
//           <AboutImage />
//         </motion.div>
        
//         {/* Content */}
//         <div 
//           ref={contentRef}
//           className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
//         >
//           {/* Left side - Image (visible seulement sur desktop) */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={isContentInView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             className="order-2 lg:order-1 hidden md:block"
//           >
//             <AboutImage />
//           </motion.div>
          
//           {/* Right side - Content */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate={isContentInView ? "visible" : "hidden"}
//             className="order-1 lg:order-2 space-y-6"
//           >
//             {/* Bio text */}
//             <motion.div variants={itemVariants} className="space-y-4">
//               <h3 className="text-2xl md:text-3xl font-semibold text-white">
//                 I am a full stack web developer
//               </h3>
//               <p className="text-gray-300">
//                 I have a passion for creating interactive and responsive web applications. 
//                 I have experience working with JavaScript, React, Redux, Node.js, Express, 
//                 PostgreSQL, Sequelize, HTML, CSS, and Git. I am a quick learner and I am 
//                 always looking to expand my knowledge and skill set. I am a team player 
//                 and I am excited to work with others to create amazing applications.
//               </p>
//             </motion.div>
            
//             {/* Tabs - Skills supprimé */}
//             <motion.div variants={itemVariants}>
//               <AboutTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              
//               <div className="mt-6">
//                 {activeTab === 'education' && <AboutEducation />}
//                 {activeTab === 'certifications' && <AboutCertifications />}
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
      
//       {/* Decorative elements */}
//       <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full 
//         bg-gradient-radial from-[#4ADE80]/20 to-transparent blur-xl animate-pulse-slow"></div>
//       <div className="absolute top-20 left-10 w-32 h-32 rounded-full 
//         bg-gradient-radial from-[#4ADE80]/10 to-transparent blur-xl animate-float"></div>
//     </section>
//   );
// });

// export default About;






// src/components/sections/About/index.tsx
import { useRef, useState, useEffect, lazy, Suspense, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import AboutImage from './components/AboutImage';
import AboutTabs from './components/AboutTabs';
import { AboutEducation } from './components/AboutEducation';
import { AboutCertifications } from './components/AboutCertifications';

// Lazy load background effect
const AboutBackground = lazy(() => import('./components/AboutBackground'));

// Loading fallback for background
const BackgroundFallback = () => <div className="absolute inset-0 bg-black/50" />;

// Type pour les onglets (Skills supprimé)
type TabType = 'education' | 'certifications';

const About = memo(() => {
  const [activeTab, setActiveTab] = useState<TabType>('education');
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
      id="about" 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black flex items-center"
    >
      {/* Background effect */}
      <Suspense fallback={<BackgroundFallback />}>
        <AboutBackground />
      </Suspense>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        {/* Heading */}
        <motion.div 
          ref={headingRef}
          initial={{ opacity: 0, y: -20 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="text-[#4ADE80]">À propos de</span> Moi
          </h2>
          <div className="h-1 w-20 bg-[#4ADE80] mx-auto rounded-full"></div>
        </motion.div>
        
        {/* Image - pour mobile, placée sous le titre */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isHeadingInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mb-10 md:hidden"
        >
          <AboutImage />
        </motion.div>
        
        {/* Content */}
        <div 
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* Left side - Image (visible seulement sur desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isContentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1 hidden md:block"
          >
            <AboutImage />
          </motion.div>
          
          {/* Right side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isContentInView ? "visible" : "hidden"}
            className="order-1 lg:order-2 space-y-6"
          >
            {/* Bio text */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-semibold text-white">
                Développeur Full Stack
              </h3>
              <p className="text-gray-300">
              Développeuse web passionnée, je me spécialise dans la création d’applications interactives, modernes et responsives. Curieuse et déterminée, j’apprends vite et je cherche toujours à enrichir mes compétences. J’aime travailler en équipe et je suis toujours partante pour collaborer sur des projets ambitieux qui ont du sens.


              </p>
            </motion.div>
            
            {/* Tabs - Skills supprimé */}
            <motion.div variants={itemVariants}>
              <AboutTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              
              <div className="mt-6">
                {activeTab === 'education' && <AboutEducation />}
                {activeTab === 'certifications' && <AboutCertifications />}
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

export default About;