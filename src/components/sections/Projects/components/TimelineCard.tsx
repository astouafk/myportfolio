// src/components/sections/Projects/components/TimelineCard.tsx
import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types';

interface TimelineCardProps {
  project: Project;
  index: number;
  isEven: boolean;
}

const TimelineCard = memo(({ project, index, isEven }: TimelineCardProps) => {
  const navigate = useNavigate();
  
  // Calculer le délai d'apparition basé sur l'index
  const delay = index * 0.2;
  
  // Animation différente selon que le projet est à gauche ou à droite
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: isEven ? 50 : -50,
      y: 20
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { 
        duration: 0.7,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0] // Courbe d'animation fluide
      }
    }
  };
  
  // Navigation directe vers la page de détail du projet
  const goToProjectDetail = useCallback(() => {
    console.log('Navigating to project:', project.id, project.title);

    // Naviguer vers la page de détail du projet
    navigate(`/projects/${project.id}`);
    
    // Scroller vers le haut de la page
    window.scrollTo(0, 0);
  }, [navigate, project.id]);
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`relative mb-12 lg:mb-0 lg:w-5/12 ${isEven ? 'lg:ml-auto' : 'lg:mr-auto'}`}
    >
      {/* Badge de date */}
      <div 
        className={`absolute top-0 lg:top-6 w-auto px-3 py-1 rounded-full text-sm font-medium
          backdrop-blur-sm border border-white/10 z-10
          ${isEven ? 'lg:-left-16 -left-2' : 'lg:-right-16 -right-2'}
          ${project.inProgress ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-[#4ADE80]/10 text-[#4ADE80] border-[#4ADE80]/30'}`}
      >
        {project.date}
      </div>

      {/* Connexion à la timeline (visible uniquement sur desktop) */}
      <div className={`absolute top-6 h-0.5 w-8 bg-white hidden lg:block
        ${isEven ? '-left-8' : '-right-8'}`}
      />
      
      {/* Carte du projet */}
      <div className="relative overflow-hidden rounded-xl backdrop-blur-sm
        border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300
        shadow-lg hover:shadow-[#4ADE80]/10 group">
        
        {/* Image sans le titre superposé */}
        <div className="relative h-48 overflow-hidden">
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
        </div>
        
        {/* Contenu - Titre maintenant sous l'image */}
        <div className="p-4">
          {/* Badges de statut */}
          <div className="flex items-center gap-2 mb-2">
            {project.featured && (
              <span className="text-xs px-2 py-0.5 bg-[#4ADE80]/20 text-[#4ADE80] rounded-full">
                Featured
              </span>
            )}
            {project.inProgress && (
              <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-full">
                En cours
              </span>
            )}
          </div>
          
          {/* Titre du projet */}
          <h3 className="text-xl font-bold text-white mb-2">
            {project.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-300 mb-4">{project.description}</p>
          
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
          
          {/* Bouton Voir détails */}
          <div className="flex justify-end pt-2">
            <button 
              onClick={goToProjectDetail}
              className="flex items-center gap-1 px-3 py-1 text-sm text-[#4ADE80]
                bg-[#4ADE80]/10 hover:bg-[#4ADE80]/20 rounded-full transition-colors border border-[#4ADE80]/30"
            >
              Voir détails
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default TimelineCard;