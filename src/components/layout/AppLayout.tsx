// 3️⃣ components/layout/AppLayout.tsx - VERSION SIMPLIFIÉE
import { useEffect, useState, lazy, Suspense, memo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useScrollHandler } from '../../hooks/useScrollHandler';

// Import dynamique des composants lourds
const Constellation = lazy(() => import('../effects/Constellation'));
const CustomCursor = lazy(() => import('../effects/CustomCursor'));
const Navigation = lazy(() => import('./Navigation'));
const Hero = lazy(() => import('../sections/Hero'));
const About = lazy(() => import('../sections/About'));
const Skills = lazy(() => import('../sections/Skills'));
const Projects = lazy(() => import('../sections/Projects'));
const Testimonials = lazy(() => import('../sections/Testimonials'));
const ProjectDetailPage = lazy(() => import('../sections/ProjectDetail'));
const ProjectsPage = lazy(() => import('../sections/ProjectsPage'));
const Contact = lazy(() => import('../sections/Contact'));

import LoadingSpinner from '../ui/LoadingSpinner';

const FallbackLoader = () => (
  <div className="w-full h-screen flex items-center justify-center bg-black">
    <LoadingSpinner />
  </div>
);

// Composant pour la page d'accueil
const HomePage = memo(() => {
  // 🎯 SIMPLIFICATION : Plus besoin de logique de scroll complexe
  useScrollHandler(); // Le hook s'occupe de tout !

  return (
    <main className="relative z-10">
      <Suspense fallback={<FallbackLoader />}>
        <Hero />
      </Suspense>
      
      <Suspense fallback={<FallbackLoader />}>
        <About />
      </Suspense>
      
      <Suspense fallback={<FallbackLoader />}>
        <Skills />
      </Suspense>
      
      <Suspense fallback={<FallbackLoader />}>
        <Projects />
      </Suspense>
      
      <Suspense fallback={<FallbackLoader />}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<FallbackLoader />}>
        <Contact />
      </Suspense>
    </main>
  );
});

const AppLayout = () => {
  const [hasCursorSupport, setHasCursorSupport] = useState(true);
  const location = useLocation();
  
  // Vérifier si l'appareil supporte un curseur personnalisé
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window ||
                          navigator.maxTouchPoints > 0 ||
                          window.matchMedia('(pointer: coarse)').matches;
    
    setHasCursorSupport(!isTouchDevice);
    
    if (!isTouchDevice) {
      document.body.style.cursor = 'none';
    }
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  // 🎯 SIMPLIFICATION : Logique plus claire pour la navigation
  const shouldShowNavigation = !location.pathname.startsWith('/projects/') && 
                              location.pathname !== '/projects';
  
  return (
    <div className="relative min-h-screen bg-black">
      {/* Composants lourds chargés de manière lazy */}
      <Suspense fallback={<div className="fixed inset-0 pointer-events-none" />}>
        <Constellation />
      </Suspense>
      
      {hasCursorSupport && (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      )}
      
      {/* Navigation simplifiée */}
      {shouldShowNavigation && (
        <Suspense fallback={<div className="h-16 bg-black" />}>
          <Navigation />
        </Suspense>
      )}
      
      {/* Router pour gérer les différentes pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/projects/:id" 
          element={
            <Suspense fallback={<FallbackLoader />}>
              <ProjectDetailPage />
            </Suspense>
          } 
        />
        <Route 
          path="/projects" 
          element={
            <Suspense fallback={<FallbackLoader />}>
              <ProjectsPage />
            </Suspense>
          } 
        />
      </Routes>
    </div>
  );
};

export default memo(AppLayout);