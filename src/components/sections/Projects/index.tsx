// 8️⃣ components/sections/Projects/index.tsx - AJUSTEMENT
import { useRef, lazy, Suspense, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import Timeline from './components/Timeline';
import { projectsData } from './types';
import { useNavigation } from '../../../hooks/useNavigation'; // 🎯 Hook centralisé

// Import dynamique du fond pour optimiser le chargement
const ProjectsBackground = lazy(() => import('./components/ProjectsBackground'));

// Fallback pour le chargement du fond
const BackgroundFallback = () => <div className="absolute inset-0 bg-black" />;

const Projects = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { navigateToSection } = useNavigation(); // 🎯 Hook centralisé
  
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const isContentInView = useInView(contentRef, { once: true, amount: 0.1 });
  
  // Limiter à 4 projets pour l'affichage principal
  const featuredProjects = projectsData.slice(0, 4);
  const hasMoreProjects = projectsData.length > 4;
  
  // 🎯 SIMPLIFICATION : Navigation centralisée vers la page projets
  const handleViewAllProjects = () => {
    navigateToSection('projects', { page: 'projects' });
  };
  
  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black pt-24 pb-16 mt-32"
    >
      {/* Arrière-plan */}
      <Suspense fallback={<BackgroundFallback />}>
        <ProjectsBackground />
      </Suspense>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* En-tête */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: -20 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="text-[#4ADE80]">Mes</span> Projets
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Découvrez une sélection de mes projets les plus récents et significatifs.
            De la conception à la réalisation, chaque projet reflète mon parcours et mes compétences.
          </p>
          <div className="h-1 w-20 bg-[#4ADE80] mx-auto mt-6 rounded-full"></div>
        </motion.div>
          
        {/* Contenu - Timeline */}
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0 }}
          animate={isContentInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="pt-8 lg:pt-16"
        >
          <Timeline projects={featuredProjects} />
        </motion.div>
        
        {/* Section finale avec CTA */}
        {hasMoreProjects && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-center mt-16 md:mt-24"
          >
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-[#4ADE80]/20 blur-xl rounded-full animate-pulse"></div>
              <button 
                onClick={handleViewAllProjects}
                className="relative px-6 py-3 bg-[#4ADE80]/10 border border-[#4ADE80]/50 
                  text-[#4ADE80] rounded-full hover:bg-[#4ADE80]/20 transition-colors 
                  inline-block font-medium"
              >
                Voir tous les projets
              </button>
            </div>
            <p className="text-gray-400 mt-4">
              Vous souhaitez collaborer sur un projet ? <button className="text-[#4ADE80] hover:underline">Contactez-moi !</button>
            </p>
          </motion.div>
        )}
      </div>
      
      {/* Éléments décoratifs */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gradient-radial from-[#4ADE80]/10 to-transparent opacity-30 blur-3xl animate-pulse-slow" />
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-radial from-[#4ADE80]/10 to-transparent opacity-30 blur-3xl animate-float" />
      
      {/* Particules d'ambiance */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#4ADE80] rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </section>
  );
});

export default Projects;