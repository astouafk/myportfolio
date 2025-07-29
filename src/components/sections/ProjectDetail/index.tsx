// src/components/sections/ProjectDetail/index.tsx - VERSION AVEC LAYOUT ADAPTATIF
import { useState, useEffect, useCallback, memo } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { getProjectDetailById, ProjectDetail } from './types';
import ScreenshotCarousel from './components/ScreenshotCarousel';
import TechShowcase from './components/TechShowcase';
import VideoPlayer from './components/VideoPlayer';
import { useNavigation } from '../../../hooks/useNavigation';
import { useActiveSection } from '../../../hooks/useActiveSection';

const ProjectDetailPage = memo(() => {
  const { id } = useParams<{ id: string }>();
  const { navigateToSection, navigateToHome } = useNavigation();
  const { setActiveSectionManually } = useActiveSection();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  
  // DÉTECTION DU CONTENU DISPONIBLE
  const hasVideo = !!(project?.videoUrl);
  const hasScreenshots = !!(project?.screenshots && project.screenshots.length > 0);
  const hasAnyMedia = hasVideo || hasScreenshots;
  
  // FONCTIONS DE LAYOUT ADAPTATIF
  const getLayoutClasses = useCallback(() => {
    if (hasVideo && hasScreenshots) {
      return "grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10";
    }
    return "flex justify-center"; 
  }, [hasVideo, hasScreenshots]);
  
  const getVideoClasses = useCallback(() => {
    if (hasVideo && hasScreenshots) {
      return "lg:col-span-2"; // 2/5 de la largeur quand les deux sont présents
    }
    return "w-full max-w-4xl"; // Pleine largeur mais limitée quand seule
  }, [hasVideo, hasScreenshots]);
  
  const getScreenshotsClasses = useCallback(() => {
    if (hasVideo && hasScreenshots) {
      return "lg:col-span-3"; // 3/5 de la largeur quand les deux sont présents
    }
    return "w-full max-w-6xl"; // Pleine largeur optimale quand seules
  }, [hasVideo, hasScreenshots]);
  
  const getSectionTitle = useCallback(() => {
    if (hasVideo && hasScreenshots) return "Aperçu";
    if (hasVideo && !hasScreenshots) return "Démonstration Vidéo";
    if (!hasVideo && hasScreenshots) return "Captures d'Écran";
    return null; // Pas de titre si aucun contenu
  }, [hasVideo, hasScreenshots]);
  
  const getSectionDescription = useCallback(() => {
    if (hasVideo && hasScreenshots) {
      return "Découvrez le projet en action et explorez son interface à travers ces captures d'écran.";
    }
    if (hasVideo && !hasScreenshots) {
      return "Découvrez le projet en action dans cette démonstration vidéo.";
    }
    if (!hasVideo && hasScreenshots) {
      return "Explorez l'interface et les fonctionnalités du projet à travers ces captures d'écran.";
    }
    return null;
  }, [hasVideo, hasScreenshots]);
  
  // Navigation
  const handleBackToProjects = useCallback(() => {
    navigateToSection('projects', { page: 'projects' });
  }, [navigateToSection]);
  
  const handleBackToTimeline = useCallback(() => {
    setActiveSectionManually('projects'); 
    navigateToHome('projects');
  }, [navigateToHome, setActiveSectionManually]); 
  
  // Récupération des détails du projet
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        if (!id) {
          handleBackToProjects();
          return;
        }
        
        const projectData = getProjectDetailById(id);
        setProject(projectData);
        setLoading(false);
        
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Erreur lors du chargement des détails du projet:', error);
        setLoading(false);
        handleBackToProjects();
      }
    };
    
    fetchProjectDetails();
  }, [id, handleBackToProjects]);
  
  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.7 }
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-16 h-16 border-4 border-[#4ADE80]/30 border-t-[#4ADE80] rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h2 className="text-2xl mb-4">Projet non trouvé</h2>
        <button 
          onClick={handleBackToProjects}
          className="px-4 py-2 bg-[#4ADE80]/10 border border-[#4ADE80]/50 text-[#4ADE80] rounded-lg"
        >
          Liste des projets
        </button>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="min-h-screen bg-black text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Image de bannière */}
      <div className="relative w-full h-[30vh] md:h-[40vh] lg:h-[50vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${project.imageUrl})`,
            filter: 'brightness(0.7)'
          }}
        />
        
        {/* Particules décoratives */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#4ADE80]/80 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Navigation */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-between mb-8 gap-4"
        >
          <button
            onClick={handleBackToProjects}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10
              rounded-lg text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Liste des projets
          </button>
          
          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-1 px-3 py-2 bg-[#4ADE80]/10 border border-[#4ADE80]/30
                text-[#4ADE80] rounded-lg hover:bg-[#4ADE80]/20 transition-colors"
              onClick={handleBackToTimeline}
            >
              Retour à la timeline
            </button>
          </div>
        </motion.div>
        
        {/* En-tête du projet */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              {/* Date et badges */}
              <div className="flex flex-wrap items-center gap-2 mb-2 text-sm text-gray-300">
                <span className="px-3 py-1 bg-[#4ADE80]/10 text-[#4ADE80] rounded-full border border-[#4ADE80]/30">
                  {project.date}
                </span>
                {project.featured && (
                  <span className="px-2 py-0.5 bg-[#4ADE80]/20 text-[#4ADE80] rounded-full">
                    Featured
                  </span>
                )}
                {project.inProgress && (
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-full">
                    En cours
                  </span>
                )}
              </div>
              
              {/* Titre */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {project.title}
              </h1>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span 
                    key={tag.name}
                    className="px-2 py-1 text-xs font-medium rounded-full" 
                    style={{ 
                      backgroundColor: `${tag.color}20`,
                      color: tag.color,
                      border: `1px solid ${tag.color}40`
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Liens d'action */}
            <div className="flex flex-wrap gap-3">
            </div>
          </div>
        </motion.div>
        
        {/* Description */}
        <motion.section 
          variants={itemVariants}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#4ADE80]">Description</h2>
          <div className="prose prose-lg prose-invert max-w-none">
            {project.longDescription.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.section>
        
        {/* Technologies */}
        <motion.section 
          variants={itemVariants}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#4ADE80]">Technologies</h2>
          <TechShowcase technologies={project.technologies} />
        </motion.section>
        
        {/* 🎯 SECTION APERÇU ADAPTATIVE */}
        {hasAnyMedia && (
          <motion.section 
            variants={itemVariants}
            className="mb-20"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#4ADE80]">
              {getSectionTitle()}
            </h2>
            
            {/* Description adaptative */}
            {getSectionDescription() && (
              <p className="text-gray-300 mb-8 max-w-3xl">
                {getSectionDescription()}
              </p>
            )}
            
            <div className={getLayoutClasses()}>
              {/* Vidéo (si présente) */}
              {hasVideo && (
                <div className={getVideoClasses()}>
                  <div className="lg:sticky lg:top-24">
                    {hasScreenshots && (
                      <h3 className="text-xl font-medium mb-5">Démonstration</h3>
                    )}
                    <div className="rounded-xl overflow-hidden shadow-lg shadow-black/20">
                      <div style={{ minHeight: '300px' }}>
                        <VideoPlayer 
                          videoUrl={project.videoUrl!} 
                          posterUrl={project.imageUrl} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Captures d'écran (si présentes) */}
              {hasScreenshots && (
                <div className={getScreenshotsClasses()}>
                  {hasVideo && (
                    <h3 className="text-xl font-medium mb-5">Captures d'écran</h3>
                  )}
                  <div className="bg-black/20 p-1 rounded-xl shadow-lg shadow-black/20">
                    <ScreenshotCarousel screenshots={project.screenshots} />
                  </div>
                  
                  <div className="mt-6 text-gray-300 text-sm">
                    <p>
                      {hasVideo 
                        ? "Ces captures d'écran complètent la démonstration vidéo en montrant les détails de l'interface."
                        : "Ces captures d'écran illustrent les principales fonctionnalités et l'interface du projet."
                      } Naviguez entre elles en utilisant les flèches ou les indicateurs.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.section>
        )}
        
        {/* Caractéristiques, défis et solutions */}
        {(project.keyFeatures || project.challenges) && (
          <motion.section 
            variants={itemVariants}
            className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Caractéristiques clés */}
            {project.keyFeatures && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4 text-[#4ADE80]">Caractéristiques</h3>
                <ul className="space-y-2">
                  {project.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#4ADE80] mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Défis */}
            {project.challenges && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4 text-[#4ADE80]">Défis</h3>
                <ul className="space-y-2">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#4ADE80] mt-1">•</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Solutions */}
            {project.solutions && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4 text-[#4ADE80]">Solutions</h3>
                <ul className="space-y-2">
                  {project.solutions.map((solution, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#4ADE80] mt-1">•</span>
                      <span>{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.section>
        )}
      </div>
    </motion.div>
  );
});

export default ProjectDetailPage;