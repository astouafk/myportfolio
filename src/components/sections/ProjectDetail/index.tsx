// // // src/components/sections/ProjectDetail/index.tsx - avec navigation améliorée
// // import { useState, useEffect, useCallback, memo } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
// // import { getProjectDetailById, ProjectDetail } from './types';
// // import ScreenshotCarousel from './components/ScreenshotCarousel';
// // import TechShowcase from './components/TechShowcase';
// // import VideoPlayer from './components/VideoPlayer';

// // const ProjectDetailPage = memo(() => {
// //   const { id } = useParams<{ id: string }>();
// //   const navigate = useNavigate();
// //   const [project, setProject] = useState<ProjectDetail | null>(null);
// //   const [loading, setLoading] = useState(true);
  
// //   // Fonction de navigation améliorée pour retourner à la section des projets
// //   const navigateToProjects = useCallback(() => {
// //     // Naviguer vers la page d'accueil sans modifier l'URL
// //     sessionStorage.setItem('scrollToProjects', 'true');
// //     navigate('/');
    
// //     // Attendre que la page soit chargée, puis faire défiler vers la section des projets
// //     setTimeout(() => {
// //       const projectsSection = document.getElementById('projects');
// //       if (projectsSection) {
// //         const yOffset = -80; // Tenir compte de la hauteur de la barre de navigation
// //         const y = projectsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
// //         window.scrollTo({
// //           top: y,
// //           behavior: 'smooth'
// //         });
// //       }
// //     }, 100);
// //   }, [navigate]);
  
// //   // Récupérer les détails du projet
// //   useEffect(() => {
// //     const fetchProjectDetails = async () => {
// //       try {
// //         if (!id) {
// //           navigateToProjects();
// //           return;
// //         }
        
// //         // Dans un cas réel, cela pourrait être un appel API
// //         const projectData = getProjectDetailById(id);
// //         setProject(projectData);
// //         setLoading(false);
        
// //         // Scroll au début de la page
// //         window.scrollTo(0, 0);
// //       } catch (error) {
// //         console.error('Erreur lors du chargement des détails du projet:', error);
// //         setLoading(false);
// //         navigateToProjects();
// //       }
// //     };
    
// //     fetchProjectDetails();
// //   }, [id, navigate, navigateToProjects]);
  
// //   // Animation d'entrée
// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: { 
// //       opacity: 1,
// //       transition: { 
// //         duration: 0.5,
// //         when: "beforeChildren",
// //         staggerChildren: 0.2
// //       }
// //     }
// //   };
  
// //   const itemVariants = {
// //     hidden: { y: 20, opacity: 0 },
// //     visible: { 
// //       y: 0, 
// //       opacity: 1,
// //       transition: { duration: 0.7 }
// //     }
// //   };
  
// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-black">
// //         <div className="w-16 h-16 border-4 border-[#4ADE80]/30 border-t-[#4ADE80] rounded-full animate-spin"></div>
// //       </div>
// //     );
// //   }
  
// //   if (!project) {
// //     return (
// //       <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
// //         <h2 className="text-2xl mb-4">Projet non trouvé</h2>
// //         <button 
// //           onClick={navigateToProjects}
// //           className="px-4 py-2 bg-[#4ADE80]/10 border border-[#4ADE80]/50 text-[#4ADE80] rounded-lg"
// //         >
// //           Retour aux projets
// //         </button>
// //       </div>
// //     );
// //   }
  
// //   return (
// //     <motion.div 
// //       className="min-h-screen bg-black text-white"
// //       variants={containerVariants}
// //       initial="hidden"
// //       animate="visible"
// //     >
// //       {/* Image de bannière */}
// //       <div className="relative w-full h-[30vh] md:h-[40vh] lg:h-[50vh] overflow-hidden">
// //         <div 
// //           className="absolute inset-0 bg-cover bg-center"
// //           style={{
// //             backgroundImage: `url(${project.imageUrl})`,
// //             filter: 'brightness(0.7)'
// //           }}
// //         />
        
// //         {/* Particules/étoiles décoratives sur l'image */}
// //         <div className="absolute inset-0 pointer-events-none">
// //           {[...Array(20)].map((_, i) => (
// //             <div
// //               key={i}
// //               className="absolute w-1 h-1 rounded-full bg-[#4ADE80]/80 animate-pulse"
// //               style={{
// //                 left: `${Math.random() * 100}%`,
// //                 top: `${Math.random() * 100}%`,
// //                 opacity: Math.random() * 0.5 + 0.2,
// //                 animationDelay: `${Math.random() * 5}s`,
// //                 animationDuration: `${3 + Math.random() * 3}s`,
// //               }}
// //             />
// //           ))}
// //         </div>
// //       </div>
      
// //       {/* Contenu principal */}
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
// //         {/* Navigation améliorée */}
// //         <motion.div
// //           variants={itemVariants}
// //           className="flex flex-wrap items-center justify-between mb-8 gap-4"
// //         >
// //           {/* Bouton de retour vers la section Projects */}
// //           <button
// //             onClick={navigateToProjects}
// //             className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10
// //               rounded-lg text-white transition-colors"
// //           >
// //             <ArrowLeft className="w-4 h-4" />
// //             Retour aux projets
// //           </button>
          
// //           {/* Navigation entre projets */}
// //           <div className="flex items-center gap-4">
// //             <button
// //               className="flex items-center gap-1 px-3 py-2 bg-[#4ADE80]/10 border border-[#4ADE80]/30
// //                 text-[#4ADE80] rounded-lg hover:bg-[#4ADE80]/20 transition-colors"
// //               onClick={navigateToProjects}
// //             >
// //               Tous les projets
// //             </button>
// //           </div>
// //         </motion.div>
        
// //         {/* En-tête du projet (maintenant sous l'image) */}
// //         <motion.div
// //           variants={itemVariants}
// //           className="mb-8"
// //         >
// //           <div className="flex flex-wrap items-start justify-between gap-4">
// //             <div>
// //               {/* Date et badges */}
// //               <div className="flex flex-wrap items-center gap-2 mb-2 text-sm text-gray-300">
// //                 <span className="px-3 py-1 bg-[#4ADE80]/10 text-[#4ADE80] rounded-full border border-[#4ADE80]/30">
// //                   {project.date}
// //                 </span>
// //                 {project.featured && (
// //                   <span className="px-2 py-0.5 bg-[#4ADE80]/20 text-[#4ADE80] rounded-full">
// //                     Featured
// //                   </span>
// //                 )}
// //                 {project.inProgress && (
// //                   <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-full">
// //                     En cours
// //                   </span>
// //                 )}
// //               </div>
              
// //               {/* Titre */}
// //               <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
// //                 {project.title}
// //               </h1>
              
// //               {/* Tags */}
// //               <div className="flex flex-wrap gap-2 mb-4">
// //                 {project.tags.map(tag => (
// //                   <span 
// //                     key={tag.name}
// //                     className="px-2 py-1 text-xs font-medium rounded-full" 
// //                     style={{ 
// //                       backgroundColor: `${tag.color}20`,
// //                       color: tag.color,
// //                       border: `1px solid ${tag.color}40`
// //                     }}
// //                   >
// //                     {tag.name}
// //                   </span>
// //                 ))}
// //               </div>
// //             </div>
            
// //             {/* Liens d'action */}
// //             <div className="flex flex-wrap gap-3">
// //               {project.githubUrl && (
// //                 <a
// //                   href={project.githubUrl}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="flex items-center gap-2 px-4 py-2 bg-[#4ADE80]/10 border border-[#4ADE80]/30
// //                     text-[#4ADE80] rounded-lg hover:bg-[#4ADE80]/20 transition-colors"
// //                 >
// //                   <Github className="w-4 h-4" />
// //                   Code source
// //                 </a>
// //               )}
              
// //               {project.demoUrl && (
// //                 <a
// //                   href={project.demoUrl}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30
// //                     text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors"
// //                 >
// //                   <ExternalLink className="w-4 h-4" />
// //                   Démo en ligne
// //                 </a>
// //               )}
// //             </div>
// //           </div>
// //         </motion.div>
        
// //         {/* Description */}
// //         <motion.section 
// //           variants={itemVariants}
// //           className="mb-12"
// //         >
// //           <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#4ADE80]">Description</h2>
// //           <div className="prose prose-lg prose-invert max-w-none">
// //             {project.longDescription.split('\n\n').map((paragraph, index) => (
// //               <p key={index} className="mb-4 text-gray-300">
// //                 {paragraph}
// //               </p>
// //             ))}
// //           </div>
// //         </motion.section>
        
// //         {/* Technologies */}
// //         <motion.section 
// //           variants={itemVariants}
// //           className="mb-12"
// //         >
// //           <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#4ADE80]">Technologies</h2>
// //           <TechShowcase technologies={project.technologies} />
// //         </motion.section>
        
// //         {/* Aperçu - Vidéo et captures d'écran */}
// //         <motion.section 
// //             variants={itemVariants}
// //             className="mb-16"  // Augmentation de la marge en bas
// //             >
// //             <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-[#4ADE80]">  {/* Augmentation de la marge en bas */}
// //                 Aperçu
// //             </h2>
            
// //             <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">  {/* Augmentation de l'espace entre les colonnes */}
// //                 {/* Vidéo - Réduite à 2/5 de la largeur et fixée lors du défilement */}
// //                 <div className="lg:col-span-2">
// //                 {/* Conteneur avec position fixe pour la vidéo */}
// //                 <div className="lg:sticky lg:top-24 lg:max-h-[85vh]">  {/* Augmentation de la hauteur maximale */}
// //                     <h3 className="text-xl font-medium mb-5">Démonstration</h3>  {/* Augmentation de la marge en bas */}
// //                     {project.videoUrl ? (
// //                     <div className="rounded-xl overflow-hidden video-container">
// //                         <VideoPlayer videoUrl={project.videoUrl} posterUrl={project.imageUrl} />
// //                     </div>
// //                     ) : (
// //                     <div className="w-full aspect-video bg-gray-800 rounded-xl flex items-center justify-center">
// //                         <p className="text-gray-400">Vidéo non disponible</p>
// //                     </div>
// //                     )}
// //                 </div>
// //                 </div>
                
// //                 {/* Captures d'écran - Augmentées à 3/5 de la largeur */}
// //                 <div className="lg:col-span-3">
// //                 <h3 className="text-xl font-medium mb-5">Captures d'écran</h3>  {/* Augmentation de la marge en bas */}
// //                 <div className="screenshots-container">
// //                     <ScreenshotCarousel screenshots={project.screenshots} />
// //                 </div>
// //                 </div>
// //             </div>
// //             </motion.section>
                    
// //         {/* Caractéristiques clés, défis et solutions (si disponibles) */}
// //         {(project.keyFeatures || project.challenges) && (
// //           <motion.section 
// //             variants={itemVariants}
// //             className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-6"
// //           >
// //             {/* Caractéristiques clés */}
// //             {project.keyFeatures && (
// //               <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
// //                 <h3 className="text-xl font-bold mb-4 text-[#4ADE80]">Caractéristiques</h3>
// //                 <ul className="space-y-2">
// //                   {project.keyFeatures.map((feature, index) => (
// //                     <li key={index} className="flex items-start gap-2">
// //                       <span className="text-[#4ADE80] mt-1">•</span>
// //                       <span>{feature}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             )}
            
// //             {/* Défis */}
// //             {project.challenges && (
// //               <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
// //                 <h3 className="text-xl font-bold mb-4 text-[#4ADE80]">Défis</h3>
// //                 <ul className="space-y-2">
// //                   {project.challenges.map((challenge, index) => (
// //                     <li key={index} className="flex items-start gap-2">
// //                       <span className="text-[#4ADE80] mt-1">•</span>
// //                       <span>{challenge}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             )}
            
// //             {/* Solutions */}
// //             {project.solutions && (
// //               <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
// //                 <h3 className="text-xl font-bold mb-4 text-[#4ADE80]">Solutions</h3>
// //                 <ul className="space-y-2">
// //                   {project.solutions.map((solution, index) => (
// //                     <li key={index} className="flex items-start gap-2">
// //                       <span className="text-[#4ADE80] mt-1">•</span>
// //                       <span>{solution}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             )}
// //           </motion.section>
// //         )}
        
// //         {/* Appel à l'action */}
// //         <motion.div 
// //           variants={itemVariants}
// //           className="text-center py-8 sm:py-12"
// //         >
// //           <h3 className="text-xl sm:text-2xl font-bold mb-4">Vous aimez ce projet ?</h3>
// //           <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
// //             N'hésitez pas à me contacter pour discuter de vos idées ou pour collaborer sur des projets similaires.
// //           </p>
// //           <button className="px-6 py-3 bg-[#4ADE80]/10 border border-[#4ADE80]/50 
// //             text-[#4ADE80] rounded-full hover:bg-[#4ADE80]/20 transition-colors 
// //             inline-block font-medium">
// //             Contactez-moi
// //           </button>
// //         </motion.div>
// //       </div>
// //     </motion.div>
// //   );
// // });

// // export default ProjectDetailPage;










// // src/components/sections/ProjectDetail/index.tsx
// import { useState, useEffect, useCallback, memo } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
// import { getProjectDetailById, ProjectDetail } from './types';
// import ScreenshotCarousel from './components/ScreenshotCarousel';
// import TechShowcase from './components/TechShowcase';
// import VideoPlayer from './components/VideoPlayer';

// const ProjectDetailPage = memo(() => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [project, setProject] = useState<ProjectDetail | null>(null);
//   const [loading, setLoading] = useState(true);
  
//   // Fonction de navigation améliorée pour retourner à la section des projets
//   // const navigateToProjects = useCallback(() => {
//   //   // Stocker un marqueur dans le localStorage (plus fiable que sessionStorage)
//   //   localStorage.setItem('scrollToProjects', 'true');
    
//   //   // Naviguer vers la page d'accueil
//   //   navigate('/');
    
//   //   // Utiliser une approche plus robuste pour le défilement
//   //   const checkAndScrollToProjects = () => {
//   //     console.log("Recherche de la section projets...");
//   //     const projectsSection = document.getElementById('projects');
      
//   //     if (projectsSection) {
//   //       console.log("Section projets trouvée, défilement en cours...");
//   //       const yOffset = -80; // Tenir compte de la hauteur de la barre de navigation
//   //       const y = projectsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
//   //       window.scrollTo({
//   //         top: y,
//   //         behavior: 'smooth'
//   //       });
        
//   //       // Une fois que nous avons défilé, supprimer le marqueur
//   //       localStorage.removeItem('scrollToProjects');
//   //     } else {
//   //       console.log("Section projets non trouvée, nouvelle tentative dans 200ms...");
//   //       // Si l'élément n'est pas encore chargé, réessayer après un délai plus long
//   //       setTimeout(checkAndScrollToProjects, 200);
//   //     }
//   //   };
    
//   //   // Commencer à vérifier après un délai initial plus long
//   //   setTimeout(checkAndScrollToProjects, 300);
//   // }, [navigate]);
//   const navigateToProjects = useCallback(() => {
//     // Naviguer directement vers la page des projets au lieu de la section sur la page d'accueil
//     navigate('/projects');
    
//     // Scroll au début de la page
//     window.scrollTo(0, 0);
//   }, [navigate]);
  
//   const navigateToTimeline = useCallback(() => {
//     // Stocker un marqueur dans le localStorage
//     localStorage.setItem('scrollToProjects', 'true');
    
//     // Naviguer vers la page d'accueil
//     navigate('/');
    
//     // Utiliser une approche robuste pour le défilement
//     const checkAndScrollToProjects = () => {
//       console.log("Recherche de la section projets...");
//       const projectsSection = document.getElementById('projects');
      
//       if (projectsSection) {
//         console.log("Section projets trouvée, défilement en cours...");
//         const yOffset = -80; // Tenir compte de la hauteur de la barre de navigation
//         const y = projectsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
//         window.scrollTo({
//           top: y,
//           behavior: 'smooth'
//         });
        
//         localStorage.removeItem('scrollToProjects');
//       } else {
//         console.log("Section projets non trouvée, nouvelle tentative dans 200ms...");
//         setTimeout(checkAndScrollToProjects, 200);
//       }
//     };
    
//     setTimeout(checkAndScrollToProjects, 300);
//   }, [navigate]);
  
//   // Récupérer les détails du projet
//   useEffect(() => {
//     const fetchProjectDetails = async () => {
//       try {
//         if (!id) {
//           navigateToProjects();
//           return;
//         }
        
//         // Dans un cas réel, cela pourrait être un appel API
//         const projectData = getProjectDetailById(id);
//         setProject(projectData);
//         setLoading(false);
        
//         // Scroll au début de la page
//         window.scrollTo(0, 0);
//       } catch (error) {
//         console.error('Erreur lors du chargement des détails du projet:', error);
//         setLoading(false);
//         navigateToProjects();
//       }
//     };
    
//     fetchProjectDetails();
//   }, [id, navigate, navigateToProjects]);
  
//   // Animation d'entrée
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         duration: 0.5,
//         when: "beforeChildren",
//         staggerChildren: 0.2
//       }
//     }
//   };
  
//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { 
//       y: 0, 
//       opacity: 1,
//       transition: { duration: 0.7 }
//     }
//   };
  
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black">
//         <div className="w-16 h-16 border-4 border-[#4ADE80]/30 border-t-[#4ADE80] rounded-full animate-spin"></div>
//       </div>
//     );
//   }
  
//   if (!project) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
//         <h2 className="text-2xl mb-4">Projet non trouvé</h2>
//         <button 
//           onClick={navigateToProjects}
//           className="px-4 py-2 bg-[#4ADE80]/10 border border-[#4ADE80]/50 text-[#4ADE80] rounded-lg"
//         >
//           Liste des projets
//         </button>
//       </div>
//     );
//   }
  
//   return (
//     <motion.div 
//       className="min-h-screen bg-black text-white"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {/* Image de bannière */}
//       <div className="relative w-full h-[30vh] md:h-[40vh] lg:h-[50vh] overflow-hidden">
//         <div 
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage: `url(${project.imageUrl})`,
//             filter: 'brightness(0.7)'
//           }}
//         />
        
//         {/* Particules/étoiles décoratives sur l'image */}
//         <div className="absolute inset-0 pointer-events-none">
//           {[...Array(20)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-1 h-1 rounded-full bg-[#4ADE80]/80 animate-pulse"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 opacity: Math.random() * 0.5 + 0.2,
//                 animationDelay: `${Math.random() * 5}s`,
//                 animationDuration: `${3 + Math.random() * 3}s`,
//               }}
//             />
//           ))}
//         </div>
//       </div>
      
//       {/* Contenu principal */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//         {/* Navigation améliorée */}
//         <motion.div
//           variants={itemVariants}
//           className="flex flex-wrap items-center justify-between mb-8 gap-4"
//         >
//           {/* Bouton de retour vers la section Projects */}
//           <button
//             onClick={navigateToProjects}
//             className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10
//               rounded-lg text-white transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Liste des projets
//           </button>
          
//           {/* Navigation entre projets */}
//           <div className="flex items-center gap-4">
//           <button
//               className="flex items-center gap-1 px-3 py-2 bg-[#4ADE80]/10 border border-[#4ADE80]/30
//                 text-[#4ADE80] rounded-lg hover:bg-[#4ADE80]/20 transition-colors"
//               onClick={navigateToTimeline}
//             >
//               Retour à la timeline
//             </button>
//           </div>
//         </motion.div>
        
//         {/* En-tête du projet (maintenant sous l'image) */}
//         <motion.div
//           variants={itemVariants}
//           className="mb-8"
//         >
//           <div className="flex flex-wrap items-start justify-between gap-4">
//             <div>
//               {/* Date et badges */}
//               <div className="flex flex-wrap items-center gap-2 mb-2 text-sm text-gray-300">
//                 <span className="px-3 py-1 bg-[#4ADE80]/10 text-[#4ADE80] rounded-full border border-[#4ADE80]/30">
//                   {project.date}
//                 </span>
//                 {project.featured && (
//                   <span className="px-2 py-0.5 bg-[#4ADE80]/20 text-[#4ADE80] rounded-full">
//                     Featured
//                   </span>
//                 )}
//                 {project.inProgress && (
//                   <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-full">
//                     En cours
//                   </span>
//                 )}
//               </div>
              
//               {/* Titre */}
//               <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
//                 {project.title}
//               </h1>
              
//               {/* Tags */}
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {project.tags.map(tag => (
//                   <span 
//                     key={tag.name}
//                     className="px-2 py-1 text-xs font-medium rounded-full" 
//                     style={{ 
//                       backgroundColor: `${tag.color}20`,
//                       color: tag.color,
//                       border: `1px solid ${tag.color}40`
//                     }}
//                   >
//                     {tag.name}
//                   </span>
//                 ))}
//               </div>
//             </div>
            
//             {/* Liens d'action */}
//             <div className="flex flex-wrap gap-3">
//               {project.githubUrl && (
//                 <a
//                   href={project.githubUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 px-4 py-2 bg-[#4ADE80]/10 border border-[#4ADE80]/30
//                     text-[#4ADE80] rounded-lg hover:bg-[#4ADE80]/20 transition-colors"
//                 >
//                   <Github className="w-4 h-4" />
//                   Code source
//                 </a>
//               )}
              
//               {project.demoUrl && (
//                 <a
//                   href={project.demoUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30
//                     text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors"
//                 >
//                   <ExternalLink className="w-4 h-4" />
//                   Démo en ligne
//                 </a>
//               )}
//             </div>
//           </div>
//         </motion.div>
        
//         {/* Description */}
//         <motion.section 
//           variants={itemVariants}
//           className="mb-12"
//         >
//           <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#4ADE80]">Description</h2>
//           <div className="prose prose-lg prose-invert max-w-none">
//             {project.longDescription.split('\n\n').map((paragraph, index) => (
//               <p key={index} className="mb-4 text-gray-300">
//                 {paragraph}
//               </p>
//             ))}
//           </div>
//         </motion.section>
        
//         {/* Technologies */}
//         <motion.section 
//           variants={itemVariants}
//           className="mb-12"
//         >
//           <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#4ADE80]">Technologies</h2>
//           <TechShowcase technologies={project.technologies} />
//         </motion.section>
        
//         {/* Section Aperçu - Vidéo et captures d'écran */}
//         <motion.section 
//           variants={itemVariants}
//           className="mb-20"  // Augmentation significative de la marge en bas
//         >
//           <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-[#4ADE80]">
//             Aperçu
//           </h2>
          
//           <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
//             {/* Vidéo - Réduite à 2/5 de la largeur et fixée lors du défilement */}
//             <div className="lg:col-span-2">
//               {/* Conteneur avec position fixe pour la vidéo */}
//               <div className="lg:sticky lg:top-24">
//                 <h3 className="text-xl font-medium mb-5">Démonstration</h3>
//                 {project.videoUrl ? (
//                   <div className="rounded-xl overflow-hidden shadow-lg shadow-black/20">
//                     <div style={{ minHeight: '300px' }}>
//                       <VideoPlayer videoUrl={project.videoUrl} posterUrl={project.imageUrl} />
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="w-full aspect-video bg-gray-800 rounded-xl flex items-center justify-center"
//                        style={{ minHeight: '300px' }}>
//                     <p className="text-gray-400">Vidéo non disponible</p>
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             {/* Captures d'écran - Augmentées à 3/5 de la largeur */}
//             <div className="lg:col-span-3">
//               <h3 className="text-xl font-medium mb-5">Captures d'écran</h3>
//               <div className="bg-black/20 p-1 rounded-xl shadow-lg shadow-black/20">
//                 <ScreenshotCarousel screenshots={project.screenshots} />
//               </div>
              
//               {/* Texte descriptif supplémentaire pour les captures d'écran */}
//               <div className="mt-6 text-gray-300 text-sm">
//                 <p>Ces captures d'écran illustrent les principales fonctionnalités et l'interface du projet. 
//                 Naviguez entre elles en utilisant les flèches ou les indicateurs ci-dessus.</p>
//               </div>
//             </div>
//           </div>
//         </motion.section>
        
//         {/* Caractéristiques clés, défis et solutions (si disponibles) */}
//         {(project.keyFeatures || project.challenges) && (
//           <motion.section 
//             variants={itemVariants}
//             className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-6"
//           >
//             {/* Caractéristiques clés */}
//             {project.keyFeatures && (
//               <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
//                 <h3 className="text-xl font-bold mb-4 text-[#4ADE80]">Caractéristiques</h3>
//                 <ul className="space-y-2">
//                   {project.keyFeatures.map((feature, index) => (
//                     <li key={index} className="flex items-start gap-2">
//                       <span className="text-[#4ADE80] mt-1">•</span>
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
            
//             {/* Défis */}
//             {project.challenges && (
//               <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
//                 <h3 className="text-xl font-bold mb-4 text-[#4ADE80]">Défis</h3>
//                 <ul className="space-y-2">
//                   {project.challenges.map((challenge, index) => (
//                     <li key={index} className="flex items-start gap-2">
//                       <span className="text-[#4ADE80] mt-1">•</span>
//                       <span>{challenge}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
            
//             {/* Solutions */}
//             {project.solutions && (
//               <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
//                 <h3 className="text-xl font-bold mb-4 text-[#4ADE80]">Solutions</h3>
//                 <ul className="space-y-2">
//                   {project.solutions.map((solution, index) => (
//                     <li key={index} className="flex items-start gap-2">
//                       <span className="text-[#4ADE80] mt-1">•</span>
//                       <span>{solution}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </motion.section>
//         )}
        
//         {/* Appel à l'action */}
//         <motion.div 
//           variants={itemVariants}
//           className="text-center py-8 sm:py-12"
//         >
//           <h3 className="text-xl sm:text-2xl font-bold mb-4">Vous aimez ce projet ?</h3>
//           <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
//             N'hésitez pas à me contacter pour discuter de vos idées ou pour collaborer sur des projets similaires.
//           </p>
//           <button className="px-6 py-3 bg-[#4ADE80]/10 border border-[#4ADE80]/50 
//             text-[#4ADE80] rounded-full hover:bg-[#4ADE80]/20 transition-colors 
//             inline-block font-medium">
//             Contactez-moi
//           </button>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// });

// export default ProjectDetailPage;








// 5️⃣ components/sections/ProjectDetail/index.tsx - VERSION COMPLÈTE SIMPLIFIÉE
import { useState, useEffect, useCallback, memo } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { getProjectDetailById, ProjectDetail } from './types';
import ScreenshotCarousel from './components/ScreenshotCarousel';
import TechShowcase from './components/TechShowcase';
import VideoPlayer from './components/VideoPlayer';
import { useNavigation } from '../../../hooks/useNavigation'; // 🎯 Hook centralisé
import { useActiveSection } from '../../../hooks/useActiveSection';


const ProjectDetailPage = memo(() => {
  const { id } = useParams<{ id: string }>();
  const { navigateToSection, navigateToHome } = useNavigation(); // 🎯 Hook centralisé
  const { setActiveSectionManually } = useActiveSection();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  
  // 🎯 SIMPLIFICATION : Navigation centralisée et claire
  const handleBackToProjects = useCallback(() => {
    navigateToSection('projects', { page: 'projects' });
  }, [navigateToSection]);
  
  const handleBackToTimeline = useCallback(() => {
    setActiveSectionManually('projects'); 
    navigateToHome('projects');           // 🎯 Puis naviguer vers home + scroll
  }, [navigateToHome, setActiveSectionManually]); 
  
  // Récupérer les détails du projet
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        if (!id) {
          handleBackToProjects();
          return;
        }
        
        const projectData = getProjectDetailById(id);
        setProject(projectData);
        setLoading(false);
        
        // Scroll au début de la page
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Erreur lors du chargement des détails du projet:', error);
        setLoading(false);
        handleBackToProjects();
      }
    };
    
    fetchProjectDetails();
  }, [id, handleBackToProjects]);
  
  // Animation d'entrée
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.7 }
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-16 h-16 border-4 border-[#4ADE80]/30 border-t-[#4ADE80] rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h2 className="text-2xl mb-4">Projet non trouvé</h2>
        <button 
          onClick={handleBackToProjects}
          className="px-4 py-2 bg-[#4ADE80]/10 border border-[#4ADE80]/50 text-[#4ADE80] rounded-lg"
        >
          Liste des projets
        </button>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="min-h-screen bg-black text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Image de bannière */}
      <div className="relative w-full h-[30vh] md:h-[40vh] lg:h-[50vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${project.imageUrl})`,
            filter: 'brightness(0.7)'
          }}
        />
        
        {/* Particules/étoiles décoratives sur l'image */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#4ADE80]/80 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Navigation simplifiée */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-between mb-8 gap-4"
        >
          {/* Bouton de retour vers la liste des projets */}
          <button
            onClick={handleBackToProjects}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10
              rounded-lg text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Liste des projets
          </button>
          
          {/* Navigation entre projets */}
          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-1 px-3 py-2 bg-[#4ADE80]/10 border border-[#4ADE80]/30
                text-[#4ADE80] rounded-lg hover:bg-[#4ADE80]/20 transition-colors"
              onClick={handleBackToTimeline}
            >
              Retour à la timeline
            </button>
          </div>
        </motion.div>
        
        {/* En-tête du projet */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              {/* Date et badges */}
              <div className="flex flex-wrap items-center gap-2 mb-2 text-sm text-gray-300">
                <span className="px-3 py-1 bg-[#4ADE80]/10 text-[#4ADE80] rounded-full border border-[#4ADE80]/30">
                  {project.date}
                </span>
                {project.featured && (
                  <span className="px-2 py-0.5 bg-[#4ADE80]/20 text-[#4ADE80] rounded-full">
                    Featured
                  </span>
                )}
                {project.inProgress && (
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-full">
                    En cours
                  </span>
                )}
              </div>
              
              {/* Titre */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {project.title}
              </h1>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span 
                    key={tag.name}
                    className="px-2 py-1 text-xs font-medium rounded-full" 
                    style={{ 
                      backgroundColor: `${tag.color}20`,
                      color: tag.color,
                      border: `1px solid ${tag.color}40`
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Liens d'action */}
            <div className="flex flex-wrap gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#4ADE80]/10 border border-[#4ADE80]/30
                    text-[#4ADE80] rounded-lg hover:bg-[#4ADE80]/20 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Code source
                </a>
              )}
              
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30
                    text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Démo en ligne
                </a>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Description */}
        <motion.section 
          variants={itemVariants}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#4ADE80]">Description</h2>
          <div className="prose prose-lg prose-invert max-w-none">
            {project.longDescription.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.section>
        
        {/* Technologies */}
        <motion.section 
          variants={itemVariants}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#4ADE80]">Technologies</h2>
          <TechShowcase technologies={project.technologies} />
        </motion.section>
        
        {/* Section Aperçu - Vidéo et captures d'écran */}
        <motion.section 
          variants={itemVariants}
          className="mb-20"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-[#4ADE80]">
            Aperçu
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Vidéo */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-24">
                <h3 className="text-xl font-medium mb-5">Démonstration</h3>
                {project.videoUrl ? (
                  <div className="rounded-xl overflow-hidden shadow-lg shadow-black/20">
                    <div style={{ minHeight: '300px' }}>
                      <VideoPlayer videoUrl={project.videoUrl} posterUrl={project.imageUrl} />
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-video bg-gray-800 rounded-xl flex items-center justify-center"
                       style={{ minHeight: '300px' }}>
                    <p className="text-gray-400">Vidéo non disponible</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Captures d'écran */}
            <div className="lg:col-span-3">
              <h3 className="text-xl font-medium mb-5">Captures d'écran</h3>
              <div className="bg-black/20 p-1 rounded-xl shadow-lg shadow-black/20">
                <ScreenshotCarousel screenshots={project.screenshots} />
              </div>
              
              <div className="mt-6 text-gray-300 text-sm">
                <p>Ces captures d'écran illustrent les principales fonctionnalités et l'interface du projet. 
                Naviguez entre elles en utilisant les flèches ou les indicateurs ci-dessus.</p>
              </div>
            </div>
          </div>
        </motion.section>
        
        {/* Caractéristiques clés, défis et solutions */}
        {(project.keyFeatures || project.challenges) && (
          <motion.section 
            variants={itemVariants}
            className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Caractéristiques clés */}
            {project.keyFeatures && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4 text-[#4ADE80]">Caractéristiques</h3>
                <ul className="space-y-2">
                  {project.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#4ADE80] mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Défis */}
            {project.challenges && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4 text-[#4ADE80]">Défis</h3>
                <ul className="space-y-2">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#4ADE80] mt-1">•</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Solutions */}
            {project.solutions && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4 text-[#4ADE80]">Solutions</h3>
                <ul className="space-y-2">
                  {project.solutions.map((solution, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#4ADE80] mt-1">•</span>
                      <span>{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.section>
        )}
        
        {/* Appel à l'action */}
        <motion.div 
          variants={itemVariants}
          className="text-center py-8 sm:py-12"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-4">Vous aimez ce projet ?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            N'hésitez pas à me contacter pour discuter de vos idées ou pour collaborer sur des projets similaires.
          </p>
          <button className="px-6 py-3 bg-[#4ADE80]/10 border border-[#4ADE80]/50 
            text-[#4ADE80] rounded-full hover:bg-[#4ADE80]/20 transition-colors 
            inline-block font-medium">
            Contactez-moi
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
});

export default ProjectDetailPage;