// src/components/sections/Hero/components/HeroStats.tsx - VERSION OPTIMISÉE
import { useRef, useEffect, useState, useCallback, memo } from 'react';
import { Download } from 'lucide-react';
import { gsap } from 'gsap';
import { stats } from '../data/statsData';
import { socialLinks } from '../data/socialData';
import cvFile from '../../../../assets/devAstouAFK.pdf';

interface HeroStatsProps {
  socialRef: React.RefObject<HTMLDivElement>; 
}

export const HeroStats = memo(({ socialRef }: HeroStatsProps) => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  
  // Détection optimisée
  useEffect(() => {
    const checkSettings = () => {
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      setIsMobile(window.innerWidth < 768);
    };
    
    checkSettings();
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkSettings);
    
    window.addEventListener('resize', checkSettings);
    
    return () => {
      mediaQuery.removeEventListener('change', checkSettings);
      window.removeEventListener('resize', checkSettings);
      
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);
  
  // Détection de visibilité optimisée
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // ⚡ Déconnecter après première apparition
          }
        });
      },
      { threshold: 0.2, rootMargin: '50px' } // ⚡ Marge plus grande
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // ⚡ ANIMATIONS ULTRA-SIMPLIFIÉES
  useEffect(() => {
    if (!isVisible || !statsRef.current) return;
    
    if (animationRef.current) {
      animationRef.current.kill();
    }
    
    if (isReducedMotion) {
      // Mode sans animation : apparition instantanée
      gsap.set(".stat-item", { opacity: 1, y: 0 });
      gsap.set(".social-item", { opacity: 1, scale: 1 });
    } else {
      // ⚡ Animation simplifiée et plus rapide
      const tl = gsap.timeline();
      animationRef.current = tl;
      
      tl.fromTo(".stat-item", 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: isMobile ? 0.4 : 0.6, // ⚡ Plus rapide
          ease: "power2.out" 
        }
      )
      .fromTo(".social-item", 
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          stagger: 0.05, 
          duration: 0.4, 
          ease: "back.out(1.2)" 
        },
        "-=0.2"
      );
    }
    
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [isVisible, isReducedMotion, isMobile]);

  // Gestion du téléchargement optimisée
  const handleDownloadCV = useCallback(() => {
    if (isDownloading) return;
    
    try {
      setIsDownloading(true);
      
      const link = document.createElement('a');
      link.href = cvFile;
      link.download = 'devAstouAFK.pdf';
      document.body.appendChild(link);
      link.click();
      
      // ⚡ Feedback visuel simplifié
      if (!isReducedMotion) {
        gsap.to("#download-btn", {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1
        });
      }
      
      setTimeout(() => {
        document.body.removeChild(link);
        setIsDownloading(false);
      }, 100);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      setIsDownloading(false);
    }
  }, [isDownloading, isReducedMotion]);

  return (
    <div ref={statsRef} className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Stats simplifiées */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="stat-item text-center p-2 sm:p-3 md:p-4 bg-white/5 rounded-lg md:rounded-xl
              backdrop-blur-sm border border-white/10 hover:border-[#4ADE80]/30 
              transition-all duration-300"
          >
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4ADE80]">{stat.value}</div>
            <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
      
      {/* Boutons sociaux simplifiés */}
      <div ref={socialRef} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <button
          id="download-btn"
          onClick={handleDownloadCV}
          className="social-item px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-[#4ADE80] text-black rounded-full font-semibold
            hover:bg-[#4ADE80]/90 transition-all duration-300
            shadow-lg shadow-[#4ADE80]/20 flex items-center justify-center sm:justify-start gap-2
            w-full sm:w-auto"
          disabled={isDownloading}
          aria-label="Télécharger mon CV"
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Download CV</span>
        </button>
        
        <div className="flex justify-center gap-3 sm:gap-4">
          {socialLinks.map(({ name, icon: Icon, url }) => (
            <a
              key={name}
              href={url.startsWith('http') ? url : `https://${url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-item w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 backdrop-blur-sm
                border border-white/10 flex items-center justify-center
                text-[#4ADE80] hover:bg-[#4ADE80]/10 hover:border-[#4ADE80]/30
                transition-all duration-300 group"
              aria-label={`Visitez mon profil ${name}`}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:scale-110 transition-transform" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});

export default HeroStats;