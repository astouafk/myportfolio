// src/components/sections/ProjectDetail/components/TechShowcase.tsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Technology } from '../types/index';

interface TechShowcaseProps {
  technologies: Technology[];
}

const TechShowcase = memo(({ technologies }: TechShowcaseProps) => {
  if (technologies.length === 0) {
    return <div className="text-gray-400 italic">Aucune technologie spécifiée</div>;
  }
  
  // Animation des logos
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };
  
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 items-start"
    >
      {technologies.map((tech) => (
        <motion.div
          key={tech.name}
          variants={item}
          className="flex flex-col items-center p-3 rounded-lg bg-white/5 backdrop-blur-sm 
            border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-300
            hover:shadow-md hover:shadow-[#4ADE80]/10 hover:-translate-y-1"
          style={{ borderColor: `${tech.color}30` }}
        >
          <div 
            className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-2 rounded-lg 
              bg-white/5 p-2"
          >
            <img 
              src={tech.logo} 
              alt={`Logo ${tech.name}`} 
              className="w-full h-full object-contain filter drop-shadow-lg"
            />
          </div>
          <span className="text-sm font-medium text-center" style={{ color: tech.color }}>
            {tech.name}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
});

export default TechShowcase;