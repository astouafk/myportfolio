// src/components/layout/AppLayout.tsx
import { useEffect, useState, lazy, Suspense, memo } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

// Import dynamique des composants lourds
const Constellation = lazy(() => import('../effects/Constellation'))
const CustomCursor = lazy(() => import('../effects/CustomCursor'))
const Navigation = lazy(() => import('./Navigation'))
const Hero = lazy(() => import('../sections/Hero'))
const About = lazy(() => import('../sections/About'))
const Skills = lazy(() => import('../sections/Skills'))
const Projects = lazy(() => import('../sections/Projects'))
const Testimonials = lazy(() => import('../sections/Testimonials'))
const ProjectDetailPage = lazy(() => import('../sections/ProjectDetail'))
const ProjectsPage = lazy(() => import('../sections/ProjectsPage'));
const Contact = lazy(() => import('../sections/Contact'));


// Import direct du composant utilisé pour le fallback
import LoadingSpinner from '../ui/LoadingSpinner'

// Définir un composant de fallback léger
const FallbackLoader = () => (
  <div className="w-full h-screen flex items-center justify-center bg-black">
    <LoadingSpinner />
  </div>
)

// Préchargement des ressources pour améliorer la performance perçue
const preloadComponents = () => {
  // Préchargement des composants qui seront nécessaires plus tard
  const componentsToPreload = [
    import('../sections/Projects/index'),
    import('../sections/Testimonials/index'),
    import('../sections/ProjectDetail/index'),
    import('../sections/Contact/index')
  ]
  
  // Exécuter le préchargement après le premier rendu
  setTimeout(() => {
    componentsToPreload.forEach(component => {
      component.catch(err => console.warn('Erreur de préchargement:', err))
    })
  }, 2000)
}

// Composant pour la page d'accueil
const HomePage = memo(() => {
  // Gestion du défilement vers les sections après navigation
  useEffect(() => {
    // Vérifier si on doit défiler vers la section projets
    const shouldScrollToProjects = sessionStorage.getItem('scrollToProjects') === 'true';
    const shouldScrollToRecommendations = sessionStorage.getItem('scrollToRecommendations') === 'true';
    
    if (shouldScrollToProjects) {
      // Réinitialiser le marqueur
      sessionStorage.removeItem('scrollToProjects');
      
      // Permettre un temps suffisant pour que tous les composants soient rendus
      const timer = setTimeout(() => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          const yOffset = -80; // Tenir compte de la hauteur de la barre de navigation
          const y = projectsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }
      }, 500); // Un délai plus long pour s'assurer que tout est rendu
      
      return () => clearTimeout(timer);
    }
    
    if (shouldScrollToRecommendations) {
      // Réinitialiser le marqueur
      sessionStorage.removeItem('scrollToRecommendations');
      
      // Permettre un temps suffisant pour que tous les composants soient rendus
      const timer = setTimeout(() => {
        const recommendationsSection = document.getElementById('recommendations');
        if (recommendationsSection) {
          const yOffset = -80; // Tenir compte de la hauteur de la barre de navigation
          const y = recommendationsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }
      }, 500); // Un délai plus long pour s'assurer que tout est rendu
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main className="relative z-10">
      {/* Contenu principal */}
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
   
    {/* <Suspense fallback={<FallbackLoader />}>
      <ProjectsPage />
    </Suspense> */}
    </main>
  )
});

const AppLayout = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [hasCursorSupport, setHasCursorSupport] = useState(true)
  const location = useLocation()
  
  // Vérifier si l'appareil supporte un curseur personnalisé
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window ||
                          navigator.maxTouchPoints > 0 ||
                          window.matchMedia('(pointer: coarse)').matches
    
    setHasCursorSupport(!isTouchDevice)
    
    if (!isTouchDevice) {
      document.body.style.cursor = 'none'
    }
    
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [])
  
  // Préchargement des composants après le premier rendu
  useEffect(() => {
    preloadComponents()
    
    // Marquer la fin du chargement initial
    const timer = setTimeout(() => {
      setIsInitialLoad(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  // Déterminer si nous sommes sur la page de détails d'un projet
  // const isProjectDetailPage = location.pathname.startsWith('/projects/');
  const shouldHideNavigation = location.pathname.startsWith('/projects/') || location.pathname === '/projects';

  
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
      
      {/* Navigation (affichée seulement sur la page d'accueil) */}
      {/* {!isProjectDetailPage && (
        <Suspense fallback={<div className="h-16 bg-black" />}>
          <Navigation />
        </Suspense>
      )} */}
      {!shouldHideNavigation && (
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

         {/* Nouvelle route pour la page de tous les projets */}
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
  )
}

export default memo(AppLayout)