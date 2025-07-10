// src/components/sections/About/components/AboutSkills.tsx
import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Wrench, ChevronRight, X, Monitor } from 'lucide-react';

// Skills data - organisées par catégories
const skillsData = {
  frontend: {
    icon: <Monitor className="w-6 h-6 text-[#4ADE80]" />,
    title: "Frontend Development",
    description: "Création d'interfaces utilisateur interactives et responsives",
    skills: [
      { name: 'JavaScript', level: 90 },
      { name: 'React', level: 85 },
      { name: 'TypeScript', level: 75 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'Tailwind CSS', level: 80 },
      { name: 'GSAP', level: 70 },
      { name: 'Responsive Design', level: 85 },
      { name: 'Framer Motion', level: 75 },
    ]
  },
  backend: {
    icon: <Database className="w-6 h-6 text-[#4ADE80]" />,
    title: "Backend Development",
    description: "Développement de serveurs et APIs performants",
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 80 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'Sequelize', level: 70 },
      { name: 'MongoDB', level: 75 },
      { name: 'REST API', level: 85 },
      { name: 'GraphQL', level: 65 },
      { name: 'Firebase', level: 70 },
    ]
  },
  tools: {
    icon: <Wrench className="w-6 h-6 text-[#4ADE80]" />,
    title: "Outils & DevOps",
    description: "Outils et pratiques de développement professionnel",
    skills: [
      { name: 'Git & GitHub', level: 85 },
      { name: 'VSCode', level: 90 },
      { name: 'Figma', level: 70 },
      { name: 'Docker', level: 65 },
      { name: 'AWS', level: 60 },
      { name: 'CI/CD', level: 65 },
      { name: 'Jest', level: 75 },
      { name: 'Webpack', level: 70 },
    ]
  },
  languages: {
    icon: <Code className="w-6 h-6 text-[#4ADE80]" />,
    title: "Langages de Programmation",
    description: "Langages que j'utilise régulièrement",
    skills: [
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 75 },
      { name: 'Python', level: 70 },
      { name: 'Java', level: 65 },
      { name: 'SQL', level: 80 },
      { name: 'C#', level: 60 },
      { name: 'PHP', level: 55 },
      { name: 'Rust', level: 40 },
    ]
  }
};

export const AboutSkills = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
    hover: { 
      scale: 1.03,
      boxShadow: "0 10px 25px -5px rgba(74, 222, 128, 0.1), 0 8px 10px -5px rgba(74, 222, 128, 0.04)",
      transition: { duration: 0.2 }
    }
  };
  
  const detailsVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.05 
      }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.3 } 
    }
  };
  
  const skillItemVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  // Fonction pour ouvrir/fermer une catégorie
  const toggleCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Ferme si déjà sélectionné
    } else {
      setSelectedCategory(category); // Ouvre la nouvelle catégorie
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(skillsData).map(([key, category]) => (
          <motion.div
            key={key}
            className={`relative bg-black/30 backdrop-blur-sm border 
              rounded-xl overflow-hidden transform-gpu cursor-pointer
              ${selectedCategory === key 
                ? 'border-[#4ADE80]/50 bg-[#4ADE80]/5' 
                : 'border-white/10 hover:border-[#4ADE80]/30'}`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={selectedCategory !== key ? "hover" : undefined}
            onClick={() => toggleCategory(key)}
          >
            <div className="p-4 flex items-start gap-3">
              <div className="mt-1">
                {category.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-white">{category.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{category.description}</p>
              </div>
              <div className="text-[#4ADE80] mt-1 transition-transform duration-300">
                {selectedCategory === key ? 
                  <X className="w-5 h-5" /> : 
                  <ChevronRight className={`w-5 h-5 ${selectedCategory === key ? 'rotate-90' : ''}`} />
                }
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Détails des compétences (popup ou section déroulante) */}
      <AnimatePresence mode="wait">
        {selectedCategory && (
          <motion.div
            key={`details-${selectedCategory}`}
            variants={detailsVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-6 p-5 bg-black/30 backdrop-blur-sm border border-[#4ADE80]/20 rounded-xl"
          >
            <div className="mb-4 border-b border-[#4ADE80]/20 pb-3">
              <h3 className="text-xl font-medium text-white flex items-center gap-2">
                {skillsData[selectedCategory as keyof typeof skillsData].icon}
                <span>{skillsData[selectedCategory as keyof typeof skillsData].title}</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skillsData[selectedCategory as keyof typeof skillsData].skills.map((skill, index) => (
                <motion.div
                  key={`${selectedCategory}-${skill.name}`}
                  variants={skillItemVariants}
                  className="space-y-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-white">{skill.name}</span>
                    <span className="text-sm text-[#4ADE80]">{skill.level}%</span>
                  </div>
                  
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#4ADE80]/70 to-[#4ADE80]"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Badge "toujours en apprentissage" */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-[#4ADE80]/10 border border-[#4ADE80]/30 rounded-lg p-3 text-center mt-6"
      >
        <p className="text-sm text-white/90">
          <span className="text-[#4ADE80] font-medium">{"</>"}</span> Toujours en train d'apprendre et d'explorer de nouvelles technologies !
        </p>
      </motion.div>
    </div>
  );
});

export default AboutSkills;