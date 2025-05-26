// // src/components/sections/About/components/AboutCertifications.tsx
// import { memo } from 'react';
// import { motion } from 'framer-motion';
// import { Award, Calendar, ExternalLink } from 'lucide-react';

// // Certifications data - peut être déplacé dans un fichier data séparé plus tard
// const certificationsData = [
//   {
//     name: 'Full Stack Web Development',
//     issuer: 'Codecademy',
//     date: 'January 2022',
//     url: 'https://www.codecademy.com'
//   },
//   {
//     name: 'Advanced React & Redux',
//     issuer: 'Udemy',
//     date: 'June 2022',
//     url: 'https://www.udemy.com'
//   },
//   {
//     name: 'Node.js Developer',
//     issuer: 'FreeCodeCamp',
//     date: 'October 2021',
//     url: 'https://www.freecodecamp.org'
//   }
// ];

// export const AboutCertifications = memo(() => {
//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, scale: 0.95 },
//     visible: { 
//       opacity: 1, 
//       scale: 1,
//       transition: { duration: 0.5, ease: "easeOut" }
//     }
//   };

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="grid grid-cols-1 sm:grid-cols-2 gap-4"
//     >
//       {certificationsData.map((cert, index) => (
//         <motion.div 
//           key={index}
//           variants={itemVariants}
//           whileHover={{ scale: 1.03 }}
//           className="bg-black/20 backdrop-blur-sm border border-[#4ADE80]/20 rounded-lg p-4
//             transition-all duration-300 hover:border-[#4ADE80]/40 hover:bg-[#4ADE80]/5"
//         >
//           <div className="flex items-start gap-3">
//             <Award className="w-6 h-6 text-[#4ADE80] mt-0.5 flex-shrink-0" />
            
//             <div className="space-y-2">
//               <h4 className="text-lg font-medium text-white">{cert.name}</h4>
              
//               <p className="text-[#4ADE80] text-sm font-medium">{cert.issuer}</p>
              
//               <div className="flex items-center gap-1 text-sm text-gray-400">
//                 <Calendar className="w-4 h-4" />
//                 <span>{cert.date}</span>
//               </div>
              
//               <a 
//                 href={cert.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-[#4ADE80]
//                   transition-colors duration-300 mt-1 group"
//               >
//                 <span>View Certificate</span>
//                 <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
//               </a>
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// });

// export default AboutCertifications;









// src/components/sections/About/components/AboutCertifications.tsx
import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';

// Certifications data - augmentée à plus de 5
const certificationsData = [
  {
    name: 'Certificat de Spécialisation en Développement Web et Mobile',
    issuer: 'Sonatel Academy',
    date: 'Mai 2025',
    url: 'https://sonatelacademy.com/'
  },
  {
    name: 'React - State management in functional components (HOOKS)',
    issuer: 'Coursera',
    date: 'December 2024',
    url: 'https://www.coursera.org/account/accomplishments/verify/S4REWFDBAHAY'
  },
  {
    name: 'Firebase Authentication: Build Secure Angular Apps',
    issuer: 'Coursera',
    date: 'Janvier 2025',
    url: 'https://www.coursera.org/account/accomplishments/verify/XZHYI4XJM9XO'
  },
  {
    name: 'Fundamentals of digital marketing',
    issuer: 'Google',
    date: 'Aout 2023',
    url: 'https://skillshop.exceedlms.com/student/award/U6ReKFZ29ym8rwfNJF9A7jdb'
  },
  {
    name: 'Les Fondamentaux de la Gestion de Projet Agile',
    issuer: 'Linkedin Learning',
    date: 'Février 2025',
    url: 'https://www.linkedin.com/learning/certificates/3e137c9e57bf1d10cc0459765555bcf10b85b998c76885265b567cab52637ddc?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BW%2FQZlosRTWOtLNn1iiWYfg%3D%3D'
  },
  {
    name: 'Anglais des Affaires',
    issuer: 'Linkedin Learning',
    date: 'Février 2025',
    url: 'https://www.linkedin.com/learning/certificates/6dac59afdcee3ec1047299c312acb7c9f5dc2752fd8b4457cdc76f8450793608'
  },
  // {
  //   name: 'MongoDB for JavaScript Developers',
  //   issuer: 'MongoDB University',
  //   date: 'September 2022',
  //   url: 'https://university.mongodb.com'
  // },
  // {
  //   name: 'UI/UX Design Fundamentals',
  //   issuer: 'Dribbble',
  //   date: 'December 2021',
  //   url: 'https://dribbble.com'
  // }
];

// Nombre d'éléments à afficher par page
const ITEMS_PER_PAGE = 4;

export const AboutCertifications = memo(() => {
  const [currentPage, setCurrentPage] = useState(0);
  
  // Calculer le nombre total de pages
  const totalPages = Math.ceil(certificationsData.length / ITEMS_PER_PAGE);
  
  // Obtenir les certifications de la page actuelle
  const currentCertifications = certificationsData.slice(
    currentPage * ITEMS_PER_PAGE, 
    (currentPage + 1) * ITEMS_PER_PAGE
  );
  
  // Fonctions pour la pagination
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };
  
  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {currentCertifications.map((cert, index) => (
            <motion.div 
              key={`${currentPage}-${index}`}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="bg-black/20 backdrop-blur-sm border border-[#4ADE80]/20 rounded-lg p-4
                transition-all duration-300 hover:border-[#4ADE80]/40 hover:bg-[#4ADE80]/5"
            >
              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-[#4ADE80] mt-0.5 flex-shrink-0" />
                
                <div className="space-y-2">
                  <h4 className="text-lg font-medium text-white">{cert.name}</h4>
                  
                  <p className="text-[#4ADE80] text-sm font-medium">{cert.issuer}</p>
                  
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{cert.date}</span>
                  </div>
                  
                  <a 
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-[#4ADE80]
                      transition-colors duration-300 mt-1 group"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={prevPage}
            className="w-9 h-9 rounded-full flex items-center justify-center
              bg-black/30 border border-[#4ADE80]/20 text-[#4ADE80]
              hover:bg-[#4ADE80]/10 hover:border-[#4ADE80]/40 transition-all duration-300"
            aria-label="Page précédente"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="text-sm text-gray-400">
            Page {currentPage + 1} / {totalPages}
          </div>
          
          <button
            onClick={nextPage}
            className="w-9 h-9 rounded-full flex items-center justify-center
              bg-black/30 border border-[#4ADE80]/20 text-[#4ADE80]
              hover:bg-[#4ADE80]/10 hover:border-[#4ADE80]/40 transition-all duration-300"
            aria-label="Page suivante"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
});

export default AboutCertifications;