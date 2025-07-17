// src/components/sections/About/components/AboutEducation.tsx - VERSION PRO PERFORMANCE
import { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, GraduationCap, Star, BookOpen } from 'lucide-react';

const educationData = [
  {
    degree: 'Master 1 en Développement d\'applications Web et Mobiles',
    institution: 'ESSEN Dakar',
    location: 'Dakar, Senegal',
    period: '2024',
    description: 'Specialisé dans le développement Web et Mobile.',
    highlights: ['React & Node.js', 'Mobile Development', 'UX/UI Design']
  },
  {
    degree: 'Licence Professionnelle en Génie Logiciel',
    institution: 'ESTM Dakar',
    location: 'Dakar, Senegal',
    period: '',
    description: 'Développement de logiciels et applications web.',
    highlights: ['Programmation', 'Base de données', 'Gestion de projet']
  }
];

export const AboutEducation = memo(() => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Détection des préférences d'animation
  useEffect(() => {
    const checkSettings = () => {
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };
    
    checkSettings();
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionMedia.addEventListener('change', checkSettings);
    
    return () => motionMedia.removeEventListener('change', checkSettings);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // ⚡ Stagger plus rapide
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { 
        type: "spring",
        damping: 20,
        stiffness: 120,
        duration: 0.6 // ⚡ Plus rapide
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6" // ⚡ Espacement réduit
    >
      {educationData.map((edu, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="relative"
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
        >
          {/* 🎨 Ligne connectrice OPTIMISÉE */}
          <motion.div 
            className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-[#4ADE80] to-transparent"
            animate={{
              height: hoveredIndex === index ? '100%' : '70%',
              opacity: hoveredIndex === index ? 0.8 : 0.4
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          
          {/* 🎨 Card principale PROFESSIONNELLE */}
          <motion.div
            className="relative bg-black/30 backdrop-blur-sm border border-[#4ADE80]/20 
                       rounded-xl p-6 ml-12 hover:border-[#4ADE80]/40 transition-all duration-300"
            whileHover={{
              scale: 1.01, // ⚡ Scale plus subtil
              boxShadow: "0 15px 30px -10px rgba(74, 222, 128, 0.15)" // ⚡ Ombre plus douce
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* 🎨 Dot indicator PROFESSIONNEL */}
            <motion.div 
              className="absolute -left-[57px] top-6 w-6 h-6 rounded-full 
                         bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] 
                         border-4 border-black flex items-center justify-center"
              animate={{
                scale: hoveredIndex === index ? 1.2 : 1,
                boxShadow: hoveredIndex === index 
                  ? '0 0 15px rgba(74, 222, 128, 0.6)' 
                  : '0 0 8px rgba(74, 222, 128, 0.3)'
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.div
                animate={!isReducedMotion ? {
                  rotate: [0, 360]
                } : {}}
                transition={{
                  duration: 4, // ⚡ Plus lent et professionnel
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <BookOpen className="w-3 h-3 text-black" />
              </motion.div>
            </motion.div>

            {/* 🎨 Effet de brillance OPTIMISÉ */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl"
              animate={hoveredIndex === index && !isReducedMotion ? {
                x: ['-100%', '200%']
              } : {}}
              transition={{
                duration: 1.2, // ⚡ Plus lent et professionnel
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="space-y-4">
              {/* 🎨 Titre avec icône PROFESSIONNEL */}
              <motion.h4 
                className="text-xl font-bold text-white flex items-center gap-3"
                animate={{
                  color: hoveredIndex === index ? '#4ADE80' : '#ffffff'
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  animate={hoveredIndex === index && !isReducedMotion ? {
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <GraduationCap className="w-6 h-6 text-[#4ADE80]" />
                </motion.div>
                {edu.degree}
              </motion.h4>

              {/* 🎨 Institution avec lueur OPTIMISÉE */}
              <motion.h5 
                className="text-lg font-semibold"
                animate={{
                  color: hoveredIndex === index ? '#22D3EE' : '#4ADE80',
                  textShadow: hoveredIndex === index 
                    ? '0 0 8px rgba(34, 211, 238, 0.5)' 
                    : '0 0 4px rgba(74, 222, 128, 0.2)'
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {edu.institution}
              </motion.h5>

              {/* 🎨 Informations avec icônes OPTIMISÉES */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05, color: '#4ADE80' }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    animate={!isReducedMotion ? {
                      rotate: [0, 8, 0]
                    } : {}}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <MapPin className="w-4 h-4" />
                  </motion.div>
                  <span>{edu.location}</span>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05, color: '#4ADE80' }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    animate={!isReducedMotion ? {
                      rotate: [0, 360]
                    } : {}}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Clock className="w-4 h-4" />
                  </motion.div>
                  <span>{edu.period}</span>
                </motion.div>
              </div>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed">{edu.description}</p>

              {/* 🎨 Highlights avec animation PROFESSIONNELLE */}
              <div className="flex flex-wrap gap-2">
                {edu.highlights.map((highlight, hIndex) => (
                  <motion.span
                    key={hIndex}
                    className="px-3 py-1 bg-[#4ADE80]/10 border border-[#4ADE80]/30 
                               rounded-full text-xs text-[#4ADE80] font-medium"
                    initial={{ opacity: 0, scale: 0, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      delay: hIndex * 0.1,
                      type: "spring",
                      damping: 15,
                      stiffness: 200,
                      duration: 0.4
                    }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: 'rgba(74, 222, 128, 0.15)',
                      borderColor: 'rgba(74, 222, 128, 0.5)',
                      y: -2
                    }}
                  >
                    {highlight}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
});

export default AboutEducation;