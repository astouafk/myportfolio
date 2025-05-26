// src/components/sections/About/components/AboutEducation.tsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, GraduationCap } from 'lucide-react';

// Education data - peut être déplacé dans un fichier data séparé plus tard
const educationData = [
  {
    degree: 'Master en Développement d\'applications Web et Mobiles',
    institution: 'ESSEN Dakar',
    location: 'Dakar, Senegal',
    period: '2024',
    description: 'Specialisé dans le développement Web et Mobile.'
  },
  {
    degree: 'Licence Professionnelle en Génie Logiciel',
    institution: 'ESTM Dakar',
    location: 'Dakar, Senegal',
    period: '2017',
    description: 'Développement de logiciels et applications web.'
  }
];

export const AboutEducation = memo(() => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {educationData.map((edu, index) => (
        <motion.div 
          key={index}
          variants={itemVariants}
          className="relative pl-6 border-l-2 border-[#4ADE80]/30 pb-6 last:pb-0"
        >
          {/* Dot indicator */}
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#4ADE80]/20 border-2 border-[#4ADE80]" />
          
          <div className="space-y-2">
            <h4 className="text-xl font-semibold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#4ADE80]" />
              {edu.degree}
            </h4>
            
            <h5 className="text-[#4ADE80] font-medium">{edu.institution}</h5>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{edu.location}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{edu.period}</span>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm pt-1">{edu.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
});

export default AboutEducation;