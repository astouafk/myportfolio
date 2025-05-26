// src/components/sections/Testimonials/components/TestimonialCard.tsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

const TestimonialCard = memo(({ testimonial, isActive }: TestimonialCardProps) => {
  // Animation de la carte
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4
      }
    }
  };
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      exit="exit"
      className="bg-gray-900/60 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10
        shadow-lg mx-auto max-w-4xl p-6 sm:p-8 md:p-10"
    >
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Image de profil */}
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#4ADE80]/30 mx-auto md:mx-0">
          {testimonial.personImage ? (
            <img 
              src={testimonial.personImage} 
              alt={testimonial.personName} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-2xl font-bold text-[#4ADE80]">
              {testimonial.personName.charAt(0)}
            </div>
          )}
        </div>
        
        {/* Contenu du témoignage */}
        <div className="flex-1">
          {/* Icône de guillemet */}
          <div className="mb-4 text-[#4ADE80] text-5xl font-serif leading-none opacity-50">
            "
          </div>
          
          {/* Texte du témoignage */}
          <blockquote className="text-gray-300 text-lg mb-6 italic">
            {testimonial.text}
          </blockquote>
          
          {/* Informations de l'auteur */}
          <div>
            <div className="font-bold text-xl text-[#4ADE80]">{testimonial.personName}</div>
            <div className="text-gray-400">
              {testimonial.personTitle}, <span className="text-gray-500">{testimonial.company}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default TestimonialCard;