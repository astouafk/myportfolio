// src/components/sections/ProjectsPage/index.tsx
import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Tag, Grid, List } from 'lucide-react';
import { projectsData, Project } from '../Projects/types';
import ProjectCard from './components/ProjectCard';

// Types pour les catégories
type CategoryType = 'web' | 'mobile' | 'all';

// Fonctions utilitaires pour catégoriser les projets
const isWebProject = (project: Project) => 
  project.tags.some(tag => ['React', 'TypeScript', 'Vue', 'Angular', 'Node.js', 'Next.js', 'Tailwind CSS'].includes(tag.name));

const isMobileProject = (project: Project) => 
  project.tags.some(tag => ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Android', 'iOS'].includes(tag.name));

// Composant principal
const ProjectsPage = memo(() => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });
  
  // Filtrer les projets selon la catégorie et la recherche
  const filteredProjects = projectsData.filter(project => {
    // Filtrer par catégorie
    if (selectedCategory === 'web' && !isWebProject(project)) return false;
    if (selectedCategory === 'mobile' && !isMobileProject(project)) return false;
    
    // Filtrer par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.name.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
  
  // Naviguer vers la page d'accueil, section projets
  const navigateToHomeProjects = useCallback(() => {
    localStorage.setItem('scrollToProjects', 'true');
    navigate('/');
    
    const checkAndScrollToProjects = () => {
      console.log("Recherche de la section projets...");
      const projectsSection = document.getElementById('projects');
      
      if (projectsSection) {
        console.log("Section projets trouvée, défilement en cours...");
        const yOffset = -80; // Tenir compte de la hauteur de la barre de navigation
        const y = projectsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
        
        localStorage.removeItem('scrollToProjects');
      } else {
        console.log("Section projets non trouvée, nouvelle tentative dans 200ms...");
        setTimeout(checkAndScrollToProjects, 200);
      }
    };
    
    setTimeout(checkAndScrollToProjects, 300);
  }, [navigate]);
  
  // Naviguer vers la page de détail d'un projet
  const navigateToProjectDetail = useCallback((projectId: string) => {
    navigate(`/projects/${projectId}`);
    window.scrollTo(0, 0);
  }, [navigate]);
  
  // Obtenir les stats de projets par catégorie
  const webProjectsCount = projectsData.filter(isWebProject).length;
  const mobileProjectsCount = projectsData.filter(isMobileProject).length;
  
  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  // Scroll vers le haut lors du chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black pt-24 pb-16"
    >
      {/* Arrière-plan - style similaire à ProjectDetail */}
      <div className="absolute inset-0 bg-black z-0" />
      
      {/* Particules/étoiles décoratives */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
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
      
      {/* Éléments décoratifs - similaires à ProjectDetail */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gradient-radial from-[#4ADE80]/10 to-transparent opacity-30 blur-3xl animate-pulse-slow" />
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-radial from-[#4ADE80]/10 to-transparent opacity-30 blur-3xl animate-float" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* En-tête */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: -20 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12"
        >
          {/* Navigation */}
          <div className="flex items-center mb-8">
            <button
              onClick={navigateToHomeProjects}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10
                rounded-lg text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </button>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="text-[#4ADE80]">Tous mes</span> Projets
          </h1>
          <p className="text-gray-300 max-w-2xl mb-6">
            Découvrez l'ensemble de mes projets classés par catégorie. Explorez mes réalisations
            dans le développement web et mobile, et cliquez sur un projet pour en savoir plus.
          </p>
          <div className="h-1 w-20 bg-[#4ADE80] mt-6 mb-10 rounded-full"></div>
          
          {/* Filtres et recherche */}
          <div className="flex flex-col md:flex-row items-stretch gap-4 mb-8">
            {/* Barre de recherche */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un projet ou une technologie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/50
                  transition-all"
              />
            </div>
            
            {/* Sélecteurs de catégorie */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[#4ADE80]/20 border-[#4ADE80] text-[#4ADE80]'
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                }`}
              >
                <Tag className="w-4 h-4" />
                Tous ({projectsData.length})
              </button>
              
              <button
                onClick={() => setSelectedCategory('web')}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                  selectedCategory === 'web'
                    ? 'bg-[#4ADE80]/20 border-[#4ADE80] text-[#4ADE80]'
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                }`}
              >
                <Tag className="w-4 h-4" />
                Web ({webProjectsCount})
              </button>
              
              <button
                onClick={() => setSelectedCategory('mobile')}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                  selectedCategory === 'mobile'
                    ? 'bg-[#4ADE80]/20 border-[#4ADE80] text-[#4ADE80]'
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                }`}
              >
                <Tag className="w-4 h-4" />
                Mobile ({mobileProjectsCount})
              </button>
              
              {/* Commutateur de vue */}
              <div className="hidden md:flex ml-auto">
                <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-l-lg border-y border-l transition-colors ${
                    viewMode === 'grid'
                        ? 'bg-[#4ADE80]/20 border-[#4ADE80] text-[#4ADE80]'
                        : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                    }`}
                    aria-label="Vue grille"
                >
                    <Grid className="w-4 h-4" />
                </button>
                <button 
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-r-lg border-y border-r transition-colors ${
                    viewMode === 'list'
                        ? 'bg-[#4ADE80]/20 border-[#4ADE80] text-[#4ADE80]'
                        : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                    }`}
                    aria-label="Vue liste"
                >
                    <List className="w-4 h-4" />
                </button>
                </div>
            </div>
          </div>
        </motion.div>
        
        {/* Contenu - Projets */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                viewMode={viewMode}
                onClick={() => navigateToProjectDetail(project.id)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <h3 className="text-xl text-white mb-2">Aucun projet trouvé</h3>
              <p className="text-gray-400">
                Essayez de modifier vos critères de recherche ou de sélectionner une autre catégorie.
              </p>
            </div>
          )}
        </motion.div>
        
        {/* Appel à l'action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-16 md:mt-24"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-4">Vous avez un projet en tête ?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            N'hésitez pas à me contacter pour discuter de vos idées ou pour collaborer sur des projets similaires.
          </p>
          <button className="px-6 py-3 bg-[#4ADE80]/10 border border-[#4ADE80]/50 
            text-[#4ADE80] rounded-full hover:bg-[#4ADE80]/20 transition-colors 
            inline-block font-medium">
            Contactez-moi
          </button>
        </motion.div>
      </div>
    </section>
  );
});

export default ProjectsPage;