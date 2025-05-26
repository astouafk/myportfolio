// src/components/sections/Projects/components/Timeline.tsx - Ajustements de style
import { memo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TimelineCard from './TimelineCard';
import { Project } from '../types';

interface TimelineProps {
  projects: Project[];
}

const Timeline = memo(({ projects }: TimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: false, amount: 0.1 });
  
  // Animation de la ligne centrale
  const lineVariants = {
    hidden: { height: 0 },
    visible: { 
      height: '100%', 
      transition: { 
        duration: 1.5,
        ease: 'easeInOut'
      } 
    }
  };
  
  // Animation des points (cercles) sur la timeline
  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({ 
      scale: 1,
      opacity: 1,
      transition: { 
        delay: 0.2 + i * 0.2,
        duration: 0.5,
        ease: 'backOut'
      }
    })
  };

  return (
    <div ref={timelineRef} className="relative">
      {/* Ligne verticale centrale (visible uniquement sur desktop) */}
      <motion.div 
        className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-white hidden lg:block"
        variants={lineVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{ top: '40px', bottom: '40px' }}
      />
      
      {/* Timeline mobile (visible uniquement sur mobile/tablette) */}
      <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-white lg:hidden" />
      
      {/* Conteneur des projets */}
      <div className="relative pt-8 pb-16">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div key={project.id} className="relative">
              {/* Point sur la timeline (desktop) */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#4ADE80] border-2 border-white z-10 hidden lg:block"
                style={{ top: isEven ? '30px' : '30px' }}
                variants={dotVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
              />
              
              {/* Point sur la timeline (mobile) */}
              <motion.div
                className="absolute left-4 transform -translate-x-1/2 w-3 h-3 rounded-full bg-[#4ADE80] border-2 border-white z-10 lg:hidden"
                style={{ top: '30px' }}
                variants={dotVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
              />

              {/* Carte du projet (positionnée alternativement à gauche/droite sur desktop) */}
              <div className="lg:flex lg:items-center mb-16 lg:mb-24">
                <TimelineCard project={project} index={index} isEven={isEven} />
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Point final de la timeline */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[#4ADE80] border-2 border-white hidden lg:block"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <span className="absolute inset-0 rounded-full bg-[#4ADE80] animate-ping opacity-75" />
      </motion.div>
      
      {/* Point final de la timeline (mobile) */}
      <motion.div
        className="absolute bottom-0 left-4 transform -translate-x-1/2 w-5 h-5 rounded-full bg-[#4ADE80] border-2 border-white lg:hidden"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <span className="absolute inset-0 rounded-full bg-[#4ADE80] animate-ping opacity-75" />
      </motion.div>
    </div>
  );
});

export default Timeline;