// // // src/components/layout/CardSlider.tsx
// // import { useState, useRef } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import Hero from '../sections/Hero';
// // import Skills from '../sections/Skills';
// // import Projects from '../sections/Projects';
// // import Contact from '../sections/Contact';

// // interface Section {
// //   id: string;
// //   component: React.ComponentType;
// //   title: string;
// //   color: string;
// // }

// // const sections: Section[] = [
// //   { id: 'hero', component: Hero, title: 'Accueil', color: '#4ADE80' },
// //   { id: 'skills', component: Skills, title: 'Compétences', color: '#4ADE80' },
// //   { id: 'projects', component: Projects, title: 'Projets', color: '#4ADE80' },
// //   { id: 'contact', component: Contact, title: 'Contact', color: '#4ADE80' }
// // ];

// // const CardSlider = () => {
// //   const [activeSection, setActiveSection] = useState<string | null>(null);
// //   const sliderRef = useRef<HTMLDivElement>(null);

// //   const handleCardClick = (sectionId: string) => {
// //     setActiveSection(activeSection === sectionId ? null : sectionId);
// //   };

// //   return (
// //     <div className="h-screen w-full bg-black overflow-hidden">
// //       <AnimatePresence mode="wait">
// //         {activeSection ? (
// //           <motion.div
// //             key="fullscreen"
// //             initial={{ opacity: 0, scale: 0.8 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             exit={{ opacity: 0, scale: 0.8 }}
// //             className="fixed inset-0 z-50"
// //           >
// //             {/* Section en plein écran */}
// //             <div className="h-full w-full relative">
// //               {sections.map(section => (
// //                 section.id === activeSection && (
// //                   <section.component key={section.id} />
// //                 )
// //               ))}
// //               <button
// //                 onClick={() => setActiveSection(null)}
// //                 className="absolute top-4 right-4 z-50 p-2 bg-white/10 rounded-full"
// //               >
// //                 Fermer
// //               </button>
// //             </div>
// //           </motion.div>
// //         ) : (
// //           <motion.div
// //             ref={sliderRef}
// //             className="flex items-center h-full px-4 space-x-8 overflow-x-auto snap-x snap-mandatory"
// //           >
// //             {sections.map((section) => (
// //               <motion.div
// //                 key={section.id}
// //                 className="snap-center shrink-0 w-[80vw] h-[80vh] cursor-pointer"
// //                 onClick={() => handleCardClick(section.id)}
// //               >
// //                 <div className="w-full h-full rounded-2xl bg-white/5 backdrop-blur-sm
// //                   overflow-hidden border border-white/10 relative">
// //                   <section.component />
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // };

// // export default CardSlider;




// // src/components/layout/CardSlider.tsx
// import { useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
// import Hero from '../sections/Hero';
// import Skills from '../sections/Skills';
// import Projects from '../sections/Projects';
// import Contact from '../sections/Contact';

// interface Section {
//   id: string;
//   component: React.ComponentType;
//   title: string;
//   headerColor: string;
// }

// const sections: Section[] = [
//   { 
//     id: 'projects',
//     component: Projects,
//     title: 'PROJECTS',
//     headerColor: '#0066FF'
//   },
//   { 
//     id: 'services',
//     component: Skills,
//     title: 'SERVICES',
//     headerColor: '#0066FF'
//   },
//   { 
//     id: 'about',
//     component: Hero,
//     title: 'ABOUT US',
//     headerColor: '#0066FF'
//   },
//   { 
//     id: 'blog',
//     component: Contact,
//     title: 'BLOG',
//     headerColor: '#0066FF'
//   }
// ];

// const CardSlider = () => {
//   const carouselRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     let currentIndex = 0;

//     const autoplay = () => {
//       if (!carouselRef.current) return;
//       currentIndex = (currentIndex + 1) % sections.length;
//       const offset = currentIndex * 400; // Largeur de la carte
//       carouselRef.current.style.transform = `translateX(-${offset}px)`;
//     };

//     interval = setInterval(autoplay, 4500);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="h-screen w-full bg-black overflow-hidden">
//       <div className="h-[600px] w-full mt-[5%] relative 
//         [perspective:400px] overflow-visible">
//         <div 
//           ref={carouselRef}
//           className="flex gap-8 transition-transform duration-500 ease-out"
//           style={{ padding: "0 200px" }} // Similaire au padding: 200 de Materialize
//         >
//           {sections.map((section) => (
//             <motion.div
//               key={section.id}
//               className="w-[400px] h-[500px] shrink-0 rounded-[15px] overflow-hidden
//                 shadow-[0_0_40px_#0066FF] animate-glow"
//               whileHover={{ scale: 1.05 }}
//             >
//               {/* Header */}
//               <div 
//                 className="h-20"
//                 style={{ backgroundColor: section.headerColor }}
//               >
//                 <h2 className="text-xl font-bold text-white p-4">{section.title}</h2>
//               </div>

//               {/* Content */}
//               <div className="h-[calc(100%-5rem)] bg-black/90">
//                 <section.component />
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CardSlider;