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