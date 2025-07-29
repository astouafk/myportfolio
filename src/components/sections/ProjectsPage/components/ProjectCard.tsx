// src/components/sections/ProjectsPage/components/ProjectCard.tsx - AVEC AFFICHAGE TYPE
import { memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Github, ExternalLink, Briefcase, User, GraduationCap } from 'lucide-react';
import { Project } from '../../Projects/types';

interface ProjectCardProps {
  project: Project;
  viewMode: 'grid' | 'list';
  onClick: () => void;
}

const ProjectCard = memo(({ project, viewMode, onClick }: ProjectCardProps) => {
  const isGridMode = viewMode === 'grid';
  
  // FONCTION POUR OBTENIR L'ICÔNE DU TYPE
  const getTypeIcon = (type: Project['type']) => {
    switch (type) {
      case 'Professionnel':
        return <Briefcase className="w-4 h-4" />;
      case 'Personnel':
        return <User className="w-4 h-4" />;
      case 'Académique':
        return <GraduationCap className="w-4 h-4" />;
      default:
        return <Briefcase className="w-4 h-4" />;
    }
  };
  
  // FONCTION POUR OBTENIR LA COULEUR DU TYPE
  const getTypeColor = (type: Project['type']) => {
    switch (type) {
      case 'Professionnel':
        return {
          bg: 'bg-blue-500/20',
          border: 'border-blue-500/50',
          text: 'text-blue-400'
        };
      case 'Personnel':
        return {
          bg: 'bg-purple-500/20',
          border: 'border-purple-500/50',
          text: 'text-purple-400'
        };
      case 'Académique':
        return {
          bg: 'bg-orange-500/20',
          border: 'border-orange-500/50',
          text: 'text-orange-400'
        };
      default:
        return {
          bg: 'bg-gray-500/20',
          border: 'border-gray-500/50',
          text: 'text-gray-400'
        };
    }
  };
  
  const typeStyle = getTypeColor(project.type);
  
  // Animation de la carte
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0]
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
        
        {/* BADGE TYPE DE PROJET - NOUVEAU */}
        <div className="absolute top-3 left-3">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
            ${typeStyle.bg} ${typeStyle.border} ${typeStyle.text} border backdrop-blur-sm`}>
            {getTypeIcon(project.type)}
            <span>{project.type}</span>
          </div>
        </div>
        
        {/* Date et badges de statut */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <span className="px-3 py-1 text-sm font-medium bg-black/60 backdrop-blur-sm text-white rounded-full">
            {project.date}
          </span>
          
          {/* Badges de statut */}
          <div className="flex flex-col gap-1">
            {project.featured && (
              <span className="px-2 py-0.5 text-xs bg-[#4ADE80]/40 backdrop-blur-sm text-white rounded-full text-center">
                Featured
              </span>
            )}
            {project.inProgress && (
              <span className="px-2 py-0.5 text-xs bg-amber-500/40 backdrop-blur-sm text-white rounded-full text-center">
                En cours
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Contenu */}
      <div className={`p-5 flex flex-col ${
        isGridMode ? 'flex-1' : 'flex-1 md:w-2/3'
      }`}>
        {/* En-tête avec type */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            {/* 🎯 AFFICHAGE DU TYPE DANS LE CONTENU AUSSI */}
            <div className="flex items-center gap-2 mb-2">
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium
                ${typeStyle.bg} ${typeStyle.text}`}>
                {getTypeIcon(project.type)}
                <span>{project.type}</span>
              </div>
            </div>
            
            {/* Titre */}
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#4ADE80] transition-colors">
              {project.title}
            </h3>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-300 mb-4 line-clamp-3 flex-1">{project.description}</p>
        
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
        
        {/* Footer avec liens */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-3">
            {/* {project.githubUrl && (
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
            )} */}
            
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