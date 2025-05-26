// // src/components/transitions/EpicPageTransition.tsx
// import { motion } from 'framer-motion'
// import { ReactNode, useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom'

// interface EpicPageTransitionProps {
//   children: ReactNode
// }

// const EpicPageTransition = ({ children }: EpicPageTransitionProps) => {
//   const location = useLocation()
//   const [particles, setParticles] = useState<Array<{ x: number; y: number; scale: number }>>([])
  
//   useEffect(() => {
//     // Créer des particules aléatoires
//     const newParticles = Array.from({ length: 50 }, () => ({
//       x: Math.random() * window.innerWidth,
//       y: Math.random() * window.innerHeight,
//       scale: Math.random() * 2 + 0.5,
//     }))
//     setParticles(newParticles)
//   }, [location])

//   const pageVariants = {
//     initial: {
//       scale: 0,
//       rotate: -720,
//       opacity: 0,
//       filter: 'blur(20px)',
//     },
//     animate: {
//       scale: 1,
//       rotate: 0,
//       opacity: 1,
//       filter: 'blur(0px)',
//       transition: {
//         duration: 1.2,
//         type: "spring",
//         stiffness: 100,
//         damping: 20,
//       }
//     },
//     exit: {
//       scale: 2,
//       rotate: 720,
//       opacity: 0,
//       filter: 'blur(50px)',
//       transition: {
//         duration: 0.8,
//       }
//     }
//   }

//   const particleVariants = {
//     initial: { scale: 0, opacity: 0 },
//     animate: (i: number) => ({
//       scale: [0, 1.5, 0],
//       opacity: [0, 1, 0],
//       x: [particles[i]?.x, particles[i]?.x + (Math.random() - 0.5) * 200],
//       y: [particles[i]?.y, particles[i]?.y + (Math.random() - 0.5) * 200],
//       transition: {
//         duration: 2,
//         delay: i * 0.02,
//         repeat: Infinity,
//         repeatType: "reverse"
//       }
//     })
//   }

//   return (
//     <div className="relative w-full overflow-hidden">
//       {/* Particules d'arrière-plan */}
//       {particles.map((_, i) => (
//         <motion.div
//           key={i}
//           custom={i}
//           initial="initial"
//           animate="animate"
//           className="absolute w-2 h-2 bg-purple-500 rounded-full"
//           style={{
//             left: particles[i]?.x,
//             top: particles[i]?.y,
//             boxShadow: '0 0 20px 2px rgba(168, 85, 247, 0.4)',
//           }}
//         />
//       ))}

//       {/* Effet de portail */}
//       <motion.div
//         className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"
//         initial={{ scale: 0, opacity: 0 }}
//         animate={{ 
//           scale: [1, 1.2, 1],
//           opacity: [0, 0.3, 0],
//           rotate: [0, 180, 360],
//         }}
//         transition={{
//           duration: 2,
//           repeat: Infinity,
//           repeatType: "reverse"
//         }}
//       />

//       {/* Contenu principal avec effet 3D */}
//       <motion.div
//         variants={pageVariants}
//         initial="initial"
//         animate="animate"
//         exit="exit"
//         className="relative"
//         style={{
//           perspective: '1000px',
//           transformStyle: 'preserve-3d',
//         }}
//       >
//         {/* Effet de brillance */}
//         <motion.div
//           className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-blue-500/20"
//           animate={{
//             background: [
//               'linear-gradient(to right top, rgba(168, 85, 247, 0.2), transparent, rgba(59, 130, 246, 0.2))',
//               'linear-gradient(to left bottom, rgba(168, 85, 247, 0.2), transparent, rgba(59, 130, 246, 0.2))',
//             ],
//           }}
//           transition={{
//             duration: 3,
//             repeat: Infinity,
//             repeatType: "reverse"
//           }}
//         />

//         {/* Contenu de la page */}
//         <div className="relative z-10">
//           {children}
//         </div>
//       </motion.div>
//     </div>
//   )
// }

// export default EpicPageTransition

// import React, { ReactNode, memo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface EpicPageTransitionProps {
//   children: ReactNode;
// }

// const EpicPageTransition = ({ children }: EpicPageTransitionProps) => {
//   const pageVariants = {
//     initial: {
//       scale: 0.9,
//       rotate: -30,
//       opacity: 0,
//       filter: 'blur(10px)',
//     },
//     animate: {
//       scale: 1,
//       rotate: 0,
//       opacity: 1,
//       filter: 'blur(0px)',
//       transition: {
//         duration: 0.6,
//         type: "spring",
//         stiffness: 100,
//         damping: 15,
//       }
//     },
//     exit: {
//       scale: 1.1,
//       rotate: 20,
//       opacity: 0,
//       filter: 'blur(10px)',
//       transition: {
//         duration: 0.4,
//       }
//     }
//   };

//   return (
//     <div className="relative w-full min-h-screen overflow-hidden">
//       <AnimatePresence mode="wait">
//         <motion.div
//           variants={pageVariants}
//           initial="initial"
//           animate="animate"
//           exit="exit"
//           className="relative"
//         >
//           <motion.div
//             className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10"
//             animate={{
//               background: [
//                 'linear-gradient(to right top, rgba(168, 85, 247, 0.1), transparent, rgba(59, 130, 246, 0.1))',
//                 'linear-gradient(to left bottom, rgba(168, 85, 247, 0.1), transparent, rgba(59, 130, 246, 0.1))',
//               ],
//             }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               repeatType: "reverse"
//             }}
//           />
//           <div className="relative z-10">
//             {children}
//           </div>
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };

// export default memo(EpicPageTransition);


// //src/components/transitions/PageTransition.tsx
// import React, { ReactNode, memo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface EpicPageTransitionProps {
//   children: ReactNode;
//   isLoading?: boolean;
// }

// const LoadingSpinner = () => (
//   <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
//     <motion.div 
//       className="relative w-24 h-24"
//       animate={{ rotate: 360 }}
//       transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//     >
//       {[...Array(4)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-3 h-3 bg-purple-500 rounded-full"
//           initial={{ scale: 1 }}
//           animate={{
//             scale: [1, 1.5, 1],
//             opacity: [0.8, 1, 0.8],
//           }}
//           transition={{
//             duration: 1,
//             repeat: Infinity,
//             delay: i * 0.2,
//           }}
//           style={{
//             top: i === 0 ? 0 : i === 2 ? "100%" : "50%",
//             left: i === 3 ? 0 : i === 1 ? "100%" : "50%",
//             transform: "translate(-50%, -50%)",
//           }}
//         />
//       ))}
//     </motion.div>
//   </div>
// );

// const EpicPageTransition = ({ children, isLoading }: EpicPageTransitionProps) => {
//   const pageVariants = {
//     initial: {
//       scale: 0.9,
//       rotate: -30,
//       opacity: 0,
//       filter: 'blur(10px)',
//     },
//     animate: {
//       scale: 1,
//       rotate: 0,
//       opacity: 1,
//       filter: 'blur(0px)',
//       transition: {
//         duration: 1,
//         type: "spring",
//         stiffness: 100,
//         damping: 15,
//       }
//     },
//     exit: {
//       scale: 1.1,
//       rotate: 30,
//       opacity: 0,
//       filter: 'blur(10px)',
//       transition: {
//         duration: 0.8,
//       }
//     }
//   };

//   return (
//     <div className="relative w-full min-h-screen overflow-hidden">
//       {isLoading && <LoadingSpinner />}
//       <AnimatePresence mode="wait">
//         <motion.div
//           variants={pageVariants}
//           initial="initial"
//           animate="animate"
//           exit="exit"
//           className="relative"
//         >
//           <motion.div
//             className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10"
//             animate={{
//               background: [
//                 'linear-gradient(to right top, rgba(168, 85, 247, 0.1), transparent, rgba(59, 130, 246, 0.1))',
//                 'linear-gradient(to left bottom, rgba(168, 85, 247, 0.1), transparent, rgba(59, 130, 246, 0.1))',
//               ],
//             }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               repeatType: "reverse"
//             }}
//           />
//           <div className="relative z-10">
//             {children}
//           </div>
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };

// export default memo(EpicPageTransition);






//src/components/transitions/PageTransition.tsx
import React, { ReactNode, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EpicPageTransitionProps {
  children: ReactNode;
  isLoading?: boolean;
}

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
    <motion.div
      className="relative w-24 h-24"
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    >
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-purple-500 rounded-full"
          initial={{ scale: 1 }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          style={{
            top: i === 0 ? 0 : i === 2 ? "100%" : "50%",
            left: i === 3 ? 0 : i === 1 ? "100%" : "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </motion.div>
  </div>
);

const EpicPageTransition = ({ children, isLoading }: EpicPageTransitionProps) => {
  const pageVariants = {
    initial: {
      scale: 0.9,
      rotate: -30,
      opacity: 0,
      filter: 'blur(10px)',
    },
    animate: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }
    },
    exit: {
      scale: 1.1,
      rotate: 30,
      opacity: 0,
      filter: 'blur(10px)',
      transition: {
        duration: 0.8,
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {isLoading && <LoadingSpinner />}
      <AnimatePresence mode="wait">
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10"
            animate={{
              background: [
                'linear-gradient(to right top, rgba(168, 85, 247, 0.1), transparent, rgba(59, 130, 246, 0.1))',
                'linear-gradient(to left bottom, rgba(168, 85, 247, 0.1), transparent, rgba(59, 130, 246, 0.1))',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <div className="relative z-10">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default memo(EpicPageTransition);