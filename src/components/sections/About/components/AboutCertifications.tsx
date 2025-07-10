// src/components/sections/About/components/AboutCertifications.tsx - VERSION PRO PERFORMANCE
import { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, ExternalLink, ArrowLeft, ArrowRight, Trophy, Medal } from 'lucide-react';

const certificationsData = [
  {
    name: 'Certificat de Spécialisation en Développement Web et Mobile',
    issuer: 'Sonatel Academy',
    date: 'Mai 2025',
    url: 'https://sonatelacademy.com/',
    level: 'Expert',
    color: '#FFD700'
  },
  {
    name: 'React - State management in functional components (HOOKS)',
    issuer: 'Coursera',
    date: 'December 2024',
    url: 'https://www.coursera.org/account/accomplishments/verify/S4REWFDBAHAY',
    level: 'Advanced',
    color: '#4ADE80'
  },
  {
    name: 'Firebase Authentication: Build Secure Angular Apps',
    issuer: 'Coursera',
    date: 'Janvier 2025',
    url: 'https://www.coursera.org/account/accomplishments/verify/XZHYI4XJM9XO',
    level: 'Intermediate',
    color: '#22D3EE'
  },
  {
    name: 'Fundamentals of digital marketing',
    issuer: 'Google',
    date: 'Aout 2023',
    url: 'https://skillshop.exceedlms.com/student/award/U6ReKFZ29ym8rwfNJF9A7jdb',
    level: 'Beginner',
    color: '#F59E0B'
  },
  {
    name: 'Les Fondamentaux de la Gestion de Projet Agile',
    issuer: 'Linkedin Learning',
    date: 'Février 2025',
    url: 'https://www.linkedin.com/learning/certificates/3e137c9e57bf1d10cc0459765555bcf10b85b998c76885265b567cab52637ddc',
    level: 'Intermediate',
    color: '#8B5CF6'
  },
  {
    name: 'Anglais des Affaires',
    issuer: 'Linkedin Learning',
    date: 'Février 2025',
    url: 'https://www.linkedin.com/learning/certificates/6dac59afdcee3ec1047299c312acb7c9f5dc2752fd8b4457cdc76f8450793608',
    level: 'Advanced',
    color: '#EF4444'
  }
];

const ITEMS_PER_PAGE = 4;

export const AboutCertifications = memo(() => {
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  const totalPages = Math.ceil(certificationsData.length / ITEMS_PER_PAGE);
  
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
  
  const currentCertifications = certificationsData.slice(
    currentPage * ITEMS_PER_PAGE, 
    (currentPage + 1) * ITEMS_PER_PAGE
  );
  
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };
  
  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // ⚡ Stagger plus rapide
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        damping: 18,
        stiffness: 120,
        duration: 0.5 // ⚡ Plus rapide
      }
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Expert':
        return <Trophy className="w-5 h-5" />;
      case 'Advanced':
        return <Medal className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }} // ⚡ Exit plus rapide
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {currentCertifications.map((cert, index) => (
            <motion.div 
              key={`${currentPage}-${index}`}
              variants={itemVariants}
              className="relative bg-black/30 backdrop-blur-sm border border-[#4ADE80]/20 
                         rounded-xl p-6 hover:border-[#4ADE80]/40 hover:bg-[#4ADE80]/5
                         transition-all duration-300 group overflow-hidden"
              whileHover={{ 
                scale: 1.02, // ⚡ Scale plus subtil
                rotateY: 1, // ⚡ Rotation plus douce
                boxShadow: "0 15px 30px -10px rgba(74, 222, 128, 0.2)" // ⚡ Ombre plus douce
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* 🎨 Effet de brillance OPTIMISÉ */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={hoveredIndex === index && !isReducedMotion ? {
                  x: ['-100%', '200%']
                } : {}}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* 🎨 Badge de niveau PROFESSIONNEL */}
              <motion.div
                className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold"
                style={{ 
                  backgroundColor: `${cert.color}20`,
                  color: cert.color,
                  border: `1px solid ${cert.color}40`
                }}
                animate={{
                  scale: hoveredIndex === index ? 1.05 : 1
                }}
                transition={{ duration: 0.2 }}
              >
                {cert.level}
              </motion.div>

              <div className="flex items-start gap-4 relative z-10">
                {/* 🎨 Icône avec animation PROFESSIONNELLE */}
                <motion.div
                  className="mt-1 p-2 rounded-lg"
                  style={{ backgroundColor: `${cert.color}20` }}
                  animate={hoveredIndex === index && !isReducedMotion ? {
                    rotate: [0, 8, -8, 0],
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div style={{ color: cert.color }}>
                    {getLevelIcon(cert.level)}
                  </div>
                </motion.div>
                
                <div className="flex-1 space-y-3">
                  {/* 🎨 Nom de la certification OPTIMISÉ */}
                  <motion.h4 
                    className="text-lg font-semibold text-white leading-tight"
                    animate={hoveredIndex === index && !isReducedMotion ? {
                      textShadow: `0 0 8px ${cert.color}60` 
                    } : {
                      textShadow: '0 0 0 transparent'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {cert.name}
                  </motion.h4>
                  
                  {/* Émetteur */}
                  <motion.p 
                    className="font-medium"
                    style={{ color: cert.color }}
                    animate={{
                      scale: hoveredIndex === index ? 1.02 : 1
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {cert.issuer}
                  </motion.p>
                  
                  {/* 🎨 Date avec icône OPTIMISÉE */}
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <motion.div
                      animate={hoveredIndex === index && !isReducedMotion ? {
                        rotate: [0, 360]
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <Calendar className="w-4 h-4" />
                    </motion.div>
                    <span>{cert.date}</span>
                  </div>
                  
                  {/* 🎨 Lien avec animation PROFESSIONNELLE */}
                  <motion.a 
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/70 
                               hover:text-[#4ADE80] transition-colors duration-300 group"
                    whileHover={{ scale: 1.03, x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>View Certificate</span>
                    <motion.div
                      animate={hoveredIndex === index && !isReducedMotion ? {
                        x: [0, 3, 0]
                      } : {}}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.div>
                  </motion.a>
                </div>
              </div>

              {/* 🎨 Particules de certification OPTIMISÉES */}
              {hoveredIndex === index && !isReducedMotion && (
                <>
                  {[...Array(3)].map((_, i) => ( // ⚡ Réduit de 5 à 3
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full"
                      style={{ backgroundColor: cert.color }}
                      initial={{
                        x: Math.random() * 100 + '%',
                        y: Math.random() * 100 + '%',
                        opacity: 0
                      }}
                      animate={{
                        y: [null, '-15px'], // ⚡ Amplitude réduite
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 1.5, // ⚡ Plus rapide
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      
      {/* 🎨 Pagination PROFESSIONNELLE */}
      {totalPages > 1 && (
        <motion.div 
          className="flex items-center justify-center gap-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.button
            onClick={prevPage}
            className="w-12 h-12 rounded-full flex items-center justify-center
              bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] text-black font-bold
              shadow-lg shadow-[#4ADE80]/20 border-2 border-white/10"
            whileHover={{ 
              scale: 1.05,
              rotate: -3,
              boxShadow: "0 0 25px rgba(74, 222, 128, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          
          <motion.div 
            className="px-4 py-2 bg-black/30 backdrop-blur-sm border border-[#4ADE80]/30 
                       rounded-full text-sm text-[#4ADE80] font-medium"
            animate={!isReducedMotion ? {
              boxShadow: [
                '0 0 0 rgba(74, 222, 128, 0)',
                '0 0 15px rgba(74, 222, 128, 0.2)',
                '0 0 0 rgba(74, 222, 128, 0)'
              ]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Page {currentPage + 1} / {totalPages}
          </motion.div>
          
          <motion.button
            onClick={nextPage}
            className="w-12 h-12 rounded-full flex items-center justify-center
              bg-gradient-to-r from-[#22D3EE] to-[#4ADE80] text-black font-bold
              shadow-lg shadow-[#22D3EE]/20 border-2 border-white/10"
            whileHover={{ 
              scale: 1.05,
              rotate: 3,
              boxShadow: "0 0 25px rgba(34, 211, 238, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
});

export default AboutCertifications;