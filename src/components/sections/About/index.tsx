// // src/components/sections/About/index.tsx - VERSION SIMPLIFIÉE
// import { useState, useRef, memo, lazy, Suspense } from 'react';
// import { motion, useInView } from 'framer-motion';
// import { Calendar, MapPin, Award, GraduationCap, User, Code, Heart } from 'lucide-react';
// import profileImage from '../../../assets/about.png'; // Image optimisée

// // Lazy loading du background
// const AboutBackground = lazy(() => import('./components/AboutBackground'));

// const BackgroundFallback = () => (
//   <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/30 to-black" />
// );

// // 🎯 DONNÉES SIMPLIFIÉES (tu enlèves 'level' toi-même)
// const educationData = [
//   {
//     id: 1,
//     title: "Master en Informatique",
//     institution: "Université Cheikh Anta Diop",
//     location: "Dakar, Sénégal",
//     period: "2022-2024",
//     description: "Spécialisation en développement logiciel et systèmes d'information"
//   },
//   {
//     id: 2,
//     title: "Licence en Informatique",
//     institution: "Université Cheikh Anta Diop", 
//     location: "Dakar, Sénégal",
//     period: "2019-2022",
//     description: "Formation fondamentale en informatique et programmation"
//   }
// ];

// const certificationsData = [
//   {
//     id: 1,
//     title: "React Developer Certification",
//     issuer: "Meta",
//     date: "2024",
//     description: "Certification avancée en développement React et écosystème moderne"
//   },
//   {
//     id: 2,
//     title: "AWS Cloud Practitioner",
//     issuer: "Amazon Web Services",
//     date: "2023",
//     description: "Fondamentaux du cloud computing et services AWS"
//   },
//   {
//     id: 3,
//     title: "Flutter Development",
//     issuer: "Google",
//     date: "2023",
//     description: "Développement d'applications mobiles multiplateformes"
//   }
// ];

// // 🎯 COMPOSANT CARTE SIMPLIFIÉ
// const Card = memo(({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//     transition={{ duration: 0.5 }}
//     className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 
//       hover:bg-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 ${className}`}
//   >
//     {children}
//   </motion.div>
// ));

// const About = memo(() => {
//   const [activeTab, setActiveTab] = useState<'education' | 'certifications'>('education');
//   const sectionRef = useRef<HTMLElement>(null);
//   const headingRef = useRef<HTMLDivElement>(null);
  
//   const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
//   const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });
  
//   // 🎯 ANIMATIONS SIMPLIFIÉES
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         duration: 0.6,
//         when: "beforeChildren",
//         staggerChildren: 0.1
//       }
//     }
//   };
  
//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.5 }
//     }
//   };

//   return (
//     <section
//       id="about"
//       ref={sectionRef}
//       className="relative min-h-screen overflow-hidden bg-black py-20"
//     >
//       <Suspense fallback={<BackgroundFallback />}>
//         <AboutBackground />
//       </Suspense>
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* 🎯 EN-TÊTE SIMPLIFIÉ */}
//         <motion.div
//           ref={headingRef}
//           variants={containerVariants}
//           initial="hidden"
//           animate={isHeadingInView ? "visible" : "hidden"}
//           className="text-center mb-16"
//         >
//           <motion.h2 
//             variants={itemVariants}
//             className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
//           >
//             <span className="text-[#4ADE80]">À</span> propos
//           </motion.h2>
          
//           <motion.p 
//             variants={itemVariants}
//             className="text-gray-300 max-w-2xl mx-auto text-lg"
//           >
//             Découvrez mon parcours, mes formations et mes certifications professionnelles.
//           </motion.p>
          
//           <motion.div 
//             variants={itemVariants}
//             className="h-1 w-24 bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] mx-auto rounded-full mt-6"
//           />
//         </motion.div>

//         {/* 🎯 CONTENU PRINCIPAL */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
//           {/* 🎯 IMAGE ET PRÉSENTATION */}
//           <motion.div
//             variants={itemVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="relative"
//           >
//             {/* Image de profil */}
//             <div className="relative w-80 h-80 mx-auto lg:w-96 lg:h-96 rounded-2xl overflow-hidden">
//               <img
//                 src={profileImage}
//                 alt="Astou Fall KANE"
//                 className="w-full h-full object-cover"
//               />
              
//               {/* Overlay décoratif */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
//               {/* Badge */}
//               <div className="absolute bottom-4 left-4 right-4">
//                 <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-white/10">
//                   <div className="flex items-center gap-3">
//                     <div className="w-3 h-3 bg-[#4ADE80] rounded-full animate-pulse" />
//                     <span className="text-white font-medium">Disponible pour nouveaux projets</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* 🎯 PRÉSENTATION PERSONNELLE SIMPLIFIÉE */}
//             <Card className="mt-8">
//               <div className="flex items-start gap-4">
//                 <div className="p-3 bg-[#4ADE80]/10 rounded-lg">
//                   <User className="w-6 h-6 text-[#4ADE80]" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-white mb-2">Développeuse Fullstack</h3>
//                   <p className="text-gray-300 leading-relaxed">
//                     Passionnée par la création d'expériences numériques innovantes, 
//                     je combine créativité et expertise technique pour donner vie à vos projets 
//                     avec des technologies modernes.
//                   </p>
//                 </div>
//               </div>
//             </Card>

//             {/* Stats rapides */}
//             {/* <div className="grid grid-cols-3 gap-4 mt-6">
//               <Card className="text-center">
//                 <div className="text-2xl font-bold text-[#4ADE80] mb-1">15+</div>
//                 <div className="text-sm text-gray-400">Projets</div>
//               </Card>
//               <Card className="text-center">
//                 <div className="text-2xl font-bold text-[#4ADE80] mb-1">3+</div>
//                 <div className="text-sm text-gray-400">Années</div>
//               </Card>
//               <Card className="text-center">
//                 <div className="text-2xl font-bold text-[#4ADE80] mb-1">5+</div>
//                 <div className="text-sm text-gray-400">Clients</div>
//               </Card>
//             </div> */}
//           </motion.div>

//           {/* 🎯 FORMATIONS ET CERTIFICATIONS */}
//           <motion.div
//             variants={itemVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="space-y-8"
//           >
//             {/* 🎯 TABS CÔTE À CÔTE */}
//             <div className="flex space-x-1 bg-white/5 backdrop-blur-sm rounded-lg p-1 border border-white/10">
//               <button
//                 onClick={() => setActiveTab('education')}
//                 className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
//                   activeTab === 'education'
//                     ? 'bg-[#4ADE80]/20 text-[#4ADE80] border border-[#4ADE80]/30'
//                     : 'text-gray-400 hover:text-white hover:bg-white/5'
//                 }`}
//               >
//                 <GraduationCap className="w-4 h-4" />
//                 Formations
//               </button>
//               <button
//                 onClick={() => setActiveTab('certifications')}
//                 className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
//                   activeTab === 'certifications'
//                     ? 'bg-[#4ADE80]/20 text-[#4ADE80] border border-[#4ADE80]/30'
//                     : 'text-gray-400 hover:text-white hover:bg-white/5'
//                 }`}
//               >
//                 <Award className="w-4 h-4" />
//                 Certifications
//               </button>
//             </div>

//             {/* 🎯 CONTENU DES TABS */}
//             <div className="space-y-4">
//               {activeTab === 'education' ? (
//                 <>
//                   <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
//                     <GraduationCap className="w-6 h-6 text-[#4ADE80]" />
//                     Formations
//                   </h3>
//                   {educationData.map((item) => (
//                     <Card key={item.id}>
//                       <div className="space-y-3">
//                         <div>
//                           <h4 className="text-lg font-semibold text-white">{item.title}</h4>
//                           <p className="text-[#4ADE80] font-medium">{item.institution}</p>
//                         </div>
                        
//                         <div className="flex flex-wrap gap-4 text-sm text-gray-400">
//                           <div className="flex items-center gap-2">
//                             <Calendar className="w-4 h-4" />
//                             {item.period}
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <MapPin className="w-4 h-4" />
//                             {item.location}
//                           </div>
//                         </div>
                        
//                         <p className="text-gray-300">{item.description}</p>
//                       </div>
//                     </Card>
//                   ))}
//                 </>
//               ) : (
//                 <>
//                   <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
//                     <Award className="w-6 h-6 text-[#4ADE80]" />
//                     Certifications
//                   </h3>
//                   {certificationsData.map((item) => (
//                     <Card key={item.id}>
//                       <div className="space-y-3">
//                         <div>
//                           <h4 className="text-lg font-semibold text-white">{item.title}</h4>
//                           <p className="text-[#4ADE80] font-medium">{item.issuer}</p>
//                         </div>
                        
//                         <div className="flex items-center gap-2 text-sm text-gray-400">
//                           <Calendar className="w-4 h-4" />
//                           {item.date}
//                         </div>
                        
//                         <p className="text-gray-300">{item.description}</p>
//                       </div>
//                     </Card>
//                   ))}
//                 </>
//               )}
//             </div>

//             {/* 🎯 SECTION VALEURS/PASSION */}
//             {/* <Card className="mt-8">
//               <div className="flex items-start gap-4">
//                 <div className="p-3 bg-red-500/10 rounded-lg">
//                   <Heart className="w-6 h-6 text-red-400" />
//                 </div>
//                 <div>
//                   <h4 className="text-lg font-semibold text-white mb-2">Ma Passion</h4>
//                   <p className="text-gray-300">
//                     Transformer des idées en solutions digitales performantes et accessibles. 
//                     J'aime relever des défis techniques et créer des expériences utilisateur 
//                     qui font la différence.
//                   </p>
//                 </div>
//               </div>
//             </Card> */}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// });

// export default About;






// src/components/sections/About/index.tsx - VERSION INTÉGRÉE FINALE
import { useState, useRef, memo, lazy, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Award, User, Heart } from 'lucide-react';
import profileImage from '../../../assets/about.png';

// 🎯 IMPORT DES VRAIS COMPOSANTS
import { AboutEducation } from './components/AboutEducation';
import { AboutCertifications } from './components/AboutCertifications';

// Lazy loading du background
const AboutBackground = lazy(() => import('./components/AboutBackground'));

const BackgroundFallback = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/30 to-black" />
);

// 🎯 COMPOSANT CARTE SIMPLIFIÉ
const Card = memo(({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 
      hover:bg-white/10 hover:border-[#4ADE80]/30 transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
));

const About = memo(() => {
  const [activeTab, setActiveTab] = useState<'education' | 'certifications'>('education');
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });
  
  // 🎯 ANIMATIONS SIMPLIFIÉES
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black py-20"
    >
      <Suspense fallback={<BackgroundFallback />}>
        <AboutBackground />
      </Suspense>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 🎯 EN-TÊTE SIMPLIFIÉ */}
        <motion.div
          ref={headingRef}
          variants={containerVariants}
          initial="hidden"
          animate={isHeadingInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            <span className="text-[#4ADE80]">À</span> propos
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-300 max-w-2xl mx-auto text-lg"
          >
            Découvrez mon parcours, mes formations et mes certifications professionnelles.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="h-1 w-24 bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] mx-auto rounded-full mt-6"
          />
        </motion.div>

        {/* 🎯 CONTENU PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* 🎯 IMAGE ET PRÉSENTATION */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Image de profil */}
            <div className="relative w-80 h-80 mx-auto lg:w-96 lg:h-96 rounded-2xl overflow-hidden">
              <img
                src={profileImage}
                alt="Astou Fall KANE"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay décoratif */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#4ADE80] rounded-full animate-pulse" />
                    <span className="text-white font-medium">Disponible pour nouveaux projets</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 🎯 PRÉSENTATION PERSONNELLE SIMPLIFIÉE */}
            <Card className="mt-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#4ADE80]/10 rounded-lg">
                  <User className="w-6 h-6 text-[#4ADE80]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Développeuse Fullstack</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Passionnée par la création d'expériences numériques innovantes, 
                    je combine créativité et expertise technique pour donner vie à vos projets 
                    avec des technologies modernes comme React, Flutter et Node.js.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* 🎯 FORMATIONS ET CERTIFICATIONS AVEC VRAIES DONNÉES */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* 🎯 TABS CÔTE À CÔTE - LES 2 TITRES VISIBLES */}
            <div className="flex space-x-1 bg-white/5 backdrop-blur-sm rounded-lg p-1 border border-white/10">
              <button
                onClick={() => setActiveTab('education')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === 'education'
                    ? 'bg-[#4ADE80]/20 text-[#4ADE80] border border-[#4ADE80]/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                Formations
              </button>
              <button
                onClick={() => setActiveTab('certifications')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === 'certifications'
                    ? 'bg-[#4ADE80]/20 text-[#4ADE80] border border-[#4ADE80]/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Award className="w-4 h-4" />
                Certifications
              </button>
            </div>

            {/* 🎯 CONTENU DES TABS AVEC VRAIES DONNÉES ET PAGINATION */}
            <div className="space-y-6">
              {activeTab === 'education' ? (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <GraduationCap className="w-6 h-6 text-[#4ADE80]" />
                    Formations
                  </h3>
                  
                  {/* 🎯 COMPOSANT ABOUTEDUCATION AVEC PAGINATION */}
                  <AboutEducation />
                </motion.div>
              ) : (
                <motion.div
                  key="certifications"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Award className="w-6 h-6 text-[#4ADE80]" />
                    Certifications
                  </h3>
                  
                  {/* 🎯 COMPOSANT ABOUTCERTIFICATIONS AVEC PAGINATION */}
                  <AboutCertifications />
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default About;