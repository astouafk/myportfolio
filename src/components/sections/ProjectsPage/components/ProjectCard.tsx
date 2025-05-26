// src/components/sections/ProjectsPage/components/ProjectCard.tsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Github, ExternalLink } from 'lucide-react';
import { Project } from '../../Projects/types';

interface ProjectCardProps {
  project: Project;
  viewMode: 'grid' | 'list';
  onClick: () => void;
}

const ProjectCard = memo(({ project, viewMode, onClick }: ProjectCardProps) => {
  const isGridMode = viewMode === 'grid';
  
  // Animation de la carte
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0] // Courbe d'animation fluide
      }
    },
    hover: { 
      y: -5, 
      boxShadow: '0 10px 25px -5px rgba(74, 222, 128, 0.1)',
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`relative overflow-hidden rounded-xl backdrop-blur-sm
        border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300
        shadow-lg hover:shadow-[#4ADE80]/10 group cursor-pointer
        ${isGridMode ? 'flex flex-col' : 'flex flex-col md:flex-row'}`}
      onClick={onClick}
    >
      {/* Image */}
      <div 
        className={`relative overflow-hidden ${
          isGridMode ? 'h-48' : 'h-48 md:h-auto md:w-1/3'
        }`}
      >
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="w-full h-full bg-gray-800 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${project.imageUrl})` }}
          />
        </motion.div>
        
        {/* Date et badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="px-3 py-1 text-sm font-medium bg-black/60 backdrop-blur-sm text-white rounded-full">
            {project.date}
          </span>
        </div>
        
        {/* Badges de statut sur l'image */}
        <div className="absolute top-3 right-3 flex flex-wrap gap-2">
          {project.featured && (
            <span className="px-2 py-0.5 text-xs bg-[#4ADE80]/40 backdrop-blur-sm text-white rounded-full">
              Featured
            </span>
          )}
          {project.inProgress && (
            <span className="px-2 py-0.5 text-xs bg-amber-500/40 backdrop-blur-sm text-white rounded-full">
              En cours
            </span>
          )}
        </div>
      </div>
      
      {/* Contenu */}
      <div className={`p-5 flex flex-col ${
        isGridMode ? 'flex-1' : 'flex-1 md:w-2/3'
      }`}>
        {/* Titre */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#4ADE80] transition-colors">
          {project.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
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
        
        {/* Footer avec liens */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-[#4ADE80] rounded-full transition-colors"
                onClick={(e) => e.stopPropagation()}
                aria-label="Code source"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-purple-400 rounded-full transition-colors"
                onClick={(e) => e.stopPropagation()}
                aria-label="Démo en ligne"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
          
          {/* Bouton Voir détails */}
          <div className="flex items-center gap-1 text-sm text-[#4ADE80] group-hover:opacity-100 opacity-75">
            Voir détails
            <ChevronRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default ProjectCard;