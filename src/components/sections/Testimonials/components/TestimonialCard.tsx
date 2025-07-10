// src/components/sections/Testimonials/components/TestimonialCard.tsx - TIMING AMÉLIORÉ
import { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Testimonial } from '../types';
import { Quote, Star, Sparkles } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

const TestimonialCard = memo(({ testimonial, isActive }: TestimonialCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  // Animation de typewriter plus lente et plus naturelle
  useEffect(() => {
    if (!isActive) {
      setDisplayedText('');
      setIsTypingComplete(false);
      return;
    }
    
    const text = testimonial.text;
    let index = 0;
    setIsTypingComplete(false);
    
    // Délai avant de commencer à taper
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
          index++;
          
          // Pause plus longue aux signes de ponctuation
          if (text[index - 1] === '.' || text[index - 1] === ',' || text[index - 1] === '!') {
            clearInterval(interval);
            setTimeout(() => {
              if (index <= text.length) {
                const newInterval = setInterval(() => {
                  if (index <= text.length) {
                    setDisplayedText(text.slice(0, index));
                    index++;
                  } else {
                    setIsTypingComplete(true);
                    clearInterval(newInterval);
                  }
                }, 40 + Math.random() * 20); // Vitesse variable plus naturelle
              }
            }, 200); // Pause aux ponctuations
          }
        } else {
          setIsTypingComplete(true);
          clearInterval(interval);
        }
      }, 40 + Math.random() * 20); // Vitesse de base plus lente
      
      return () => clearInterval(interval);
    }, 800); // Délai initial plus long
    
    return () => {
      clearTimeout(startDelay);
    };
  }, [isActive, testimonial.text]);
  
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 80,
      scale: 0.7,
      rotateX: -30
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 80,
        duration: 1.2 // Plus lent
      }
    },
    exit: {
      opacity: 0,
      y: -80,
      scale: 0.7,
      rotateX: 30,
      transition: {
        duration: 0.8 // Plus lent
      }
    }
  };
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      exit="exit"
      className="relative mx-auto max-w-5xl perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Effets de fond lumineux */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-[#4ADE80]/20 via-transparent to-[#22D3EE]/20 rounded-3xl blur-xl"
        animate={{
          opacity: isHovered ? 0.6 : 0.3,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Halo pulsant plus lent */}
      <motion.div
        className="absolute -inset-8 bg-gradient-radial from-[#4ADE80]/10 to-transparent rounded-full blur-2xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 6, // Plus lent
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Carte principale */}
      <motion.div
        className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 
                   backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20
                   shadow-2xl p-8 md:p-12"
        style={{
          transformStyle: 'preserve-3d'
        }}
        animate={isHovered ? {
          rotateY: [0, 2, 0],
          scale: 1.02,
          boxShadow: [
            '0 20px 40px -10px rgba(0, 0, 0, 0.5)',
            '0 30px 60px -10px rgba(74, 222, 128, 0.3)',
            '0 20px 40px -10px rgba(0, 0, 0, 0.5)'
          ]
        } : {}}
        transition={{
          duration: 3, // Plus lent
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Bordure lumineuse animée plus lente */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-[#4ADE80]/30"
          animate={{
            borderColor: [
              'rgba(74, 222, 128, 0.3)',
              'rgba(34, 211, 238, 0.5)',
              'rgba(74, 222, 128, 0.3)'
            ]
          }}
          transition={{
            duration: 5, // Plus lent
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="flex flex-col lg:flex-row gap-8 items-start relative z-10">
          {/* Section profil */}
          <div className="flex flex-col items-center lg:items-start gap-6">
            {/* Image de profil avec animation d'entrée retardée */}
            <motion.div 
              className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden
                         border-4 border-gradient-to-r from-[#4ADE80] to-[#22D3EE] mx-auto lg:mx-0"
              initial={{ scale: 0, rotate: -180 }}
              animate={isActive ? { 
                scale: 1, 
                rotate: 0,
                transition: { 
                  delay: 0.5, 
                  type: "spring", 
                  damping: 12,
                  duration: 1 
                }
              } : {}}
              whileHover={{
                scale: 1.1,
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 0.5 }}
            >
              {/* Aura lumineuse plus lente */}
              <motion.div
                className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#4ADE80]/50 to-[#22D3EE]/50 blur-lg"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 4, // Plus lent
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {testimonial.personImage ? (
                <motion.img
                  src={testimonial.personImage}
                  alt={testimonial.personName}
                  className="w-full h-full object-cover relative z-10"
                  whileHover={{ scale: 1.05 }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#4ADE80] to-[#22D3EE] text-2xl font-bold text-black relative z-10">
                  {testimonial.personName.charAt(0)}
                </div>
              )}
            </motion.div>
            
            {/* Étoiles de notation avec animation retardée */}
            <motion.div 
              className="flex gap-1"
              initial={{ opacity: 0, scale: 0 }}
              animate={isActive ? { 
                opacity: 1, 
                scale: 1,
                transition: { delay: 1.6, duration: 0.8 }
              } : {}}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={isActive ? { 
                    opacity: 1, 
                    scale: 1, 
                    rotate: 0 
                  } : {}}
                  transition={{ 
                    delay: 1.4 + i * 0.15, // Plus espacé
                    type: "spring",
                    damping: 10,
                    stiffness: 200
                  }}
                >
                  <Star className="w-5 h-5 text-[#4ADE80] fill-current" />
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Contenu du témoignage */}
          <div className="flex-1 relative">
            {/* Icône de guillemet avec animation retardée */}
            <motion.div 
              className="relative mb-6"
              initial={{ opacity: 0, scale: 0, rotate: -90 }}
              animate={isActive ? { 
                opacity: 1, 
                scale: 1, 
                rotate: 0,
                transition: { delay: 0.6, type: "spring", damping: 10, duration: 0.8 }
              } : {}}
            >
              <Quote className="w-12 h-12 text-[#4ADE80] opacity-80" />
              
              {/* Effet scintillant plus lent */}
              <motion.div
                className="absolute top-0 right-0"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2, // Plus lent
                  repeat: Infinity,
                  repeatDelay: 4 // Plus d'espace entre répétitions
                }}
              >
                <Sparkles className="w-4 h-4 text-[#22D3EE]" />
              </motion.div>
            </motion.div>
            
            {/* Texte avec effet typewriter amélioré */}
            <motion.blockquote 
              className="text-gray-300 text-lg lg:text-xl mb-8 italic leading-relaxed font-light min-h-[120px]"
              style={{
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}
            >
              <motion.span
                animate={{
                  textShadow: [
                    '0 2px 10px rgba(0,0,0,0.5)',
                    '0 2px 15px rgba(74, 222, 128, 0.2)',
                    '0 2px 10px rgba(0,0,0,0.5)'
                  ]
                }}
                transition={{
                  duration: 4, // Plus lent
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {displayedText}
              </motion.span>
              
              {/* Curseur clignotant */}
              {!isTypingComplete && (
                <motion.span
                  className="text-[#4ADE80] text-2xl"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1, // Plus lent
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  |
                </motion.span>
              )}
            </motion.blockquote>
            
            {/* Informations de l'auteur avec animation retardée */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isTypingComplete ? { 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.5, duration: 0.8 }
              } : {}}
              className="space-y-2"
            >
              <motion.div 
                className="font-bold text-xl lg:text-2xl bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] bg-clip-text text-transparent"
                animate={isTypingComplete ? {
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                } : {}}
                transition={{
                  duration: 6, // Plus lent
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                {testimonial.personName}
              </motion.div>
              
              <motion.div 
                className="text-gray-400 text-lg"
                animate={isTypingComplete ? {
                  color: ['#9CA3AF', '#6EE7B7', '#9CA3AF']
                } : {}}
                transition={{
                  duration: 4, // Plus lent
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {testimonial.personTitle}
              </motion.div>
              
              <motion.div 
                className="text-gray-500 font-medium"
                whileHover={{
                  color: '#4ADE80',
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                {testimonial.company}
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Particules flottantes dans la carte - plus lentes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#4ADE80] rounded-full opacity-40"
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 6 + Math.random() * 4, // Plus lent
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Effet de brillance qui traverse - plus lent */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl"
          animate={{
            x: ['-100%', '200%']
          }}
          transition={{
            duration: 8, // Plus lent
            repeat: Infinity,
            repeatDelay: 6, // Plus d'espace entre répétitions
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
});

export default TestimonialCard;