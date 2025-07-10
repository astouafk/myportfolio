//src/components/sections/ModalCarousel.tsx
import React, { useState, useCallback, useEffect, memo } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

interface ScreenshotType {
  image: string;
  caption: string;
}

interface ModalCarouselProps {
  isOpen: boolean;
  onClose: () => void;
  screenshots: ScreenshotType[];
  color: string;
  initialIndex?: number;
}

export const ModalCarousel = memo(({ 
  isOpen, 
  onClose, 
  screenshots, 
  color, 
  initialIndex = 0 
}: ModalCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAnimating, setIsAnimating] = useState(false);

  // Reset l'index quand le modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  // Navigation au clavier
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [isOpen, currentIndex, onClose]);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [screenshots.length, isAnimating]);

  const handlePrevious = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [screenshots.length, isAnimating]);

  // Préchargement des images optimisé
  useEffect(() => {
    if (!isOpen) return;
    
    // Précharger seulement l'image courante et les deux adjacentes
    const preloadIndexes = [
      currentIndex,
      (currentIndex + 1) % screenshots.length,
      (currentIndex - 1 + screenshots.length) % screenshots.length
    ];
    
    const imagePromises = preloadIndexes.map(index => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = screenshots[index].image;
      });
    });
    
    Promise.all(imagePromises).catch(err => console.warn('Image preloading error:', err));
    
    // Désactiver le scroll de la page quand le modal est ouvert
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, screenshots, currentIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" 
         role="dialog" 
         aria-modal="true"
         aria-labelledby="modal-title">
      {/* Overlay avec fond flouté */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xl transition-opacity duration-300"
        onClick={onClose}
      >
        {/* Motif de fond subtil - optimisé en utilisant CSS plus léger */}
        <div className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${color}20 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Container principal */}
      <div className="relative w-[95%] max-w-6xl mx-auto my-8 overflow-hidden rounded-2xl 
        bg-black/40 backdrop-blur-sm border border-white/10
        transform transition-all duration-500 scale-100">
        
        {/* Barre supérieure */}
        <div className="relative h-12 flex items-center justify-between px-4 
          border-b border-white/10 bg-black/40 backdrop-blur-sm z-[101]">
          {/* Indicateur de position */}
          <div className="text-sm text-gray-400" id="modal-title">
            {currentIndex + 1} / {screenshots.length}
          </div>

          {/* Bouton de fermeture */}
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Container du carousel */}
        <div className="relative aspect-video max-h-[70vh] overflow-hidden group">
          {/* Rendu conditionnel - ne rendre que l'image courante et celles adjacentes */}
          {screenshots.map((screenshot, index) => {
            // Ne rendre que l'image active et les images adjacentes (pour optimiser le rendu)
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + screenshots.length) % screenshots.length;
            const isNext = index === (currentIndex + 1) % screenshots.length;
            
            if (!isActive && !isPrev && !isNext) return null;
            
            return (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 ease-out ${
                  isActive 
                    ? 'opacity-100 transform-none' 
                    : isPrev
                      ? 'opacity-0 -translate-x-full'
                      : 'opacity-0 translate-x-full'
                }`}
              >
                <img
                  src={screenshot.image}
                  alt={screenshot.caption}
                  className="w-full h-full object-contain"
                  loading={isActive ? "eager" : "lazy"}
                />
                
                {/* Légende avec effet de verre */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <div className="p-6">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-black/20 backdrop-blur-sm rounded-lg -z-10" />
                      <p className="text-white text-center">{screenshot.caption}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Boutons de navigation */}
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button
              onClick={handlePrevious}
              className="transform -translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100
                transition-all duration-300 p-2 rounded-full bg-black/50 backdrop-blur-sm
                hover:bg-black/70 border border-white/10"
              aria-label="Image précédente"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            <button
              onClick={handleNext}
              className="transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100
                transition-all duration-300 p-2 rounded-full bg-black/50 backdrop-blur-sm
                hover:bg-black/70 border border-white/10"
              aria-label="Image suivante"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Barre de progression */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
            <div
              className="h-full transition-all duration-500 ease-out"
              style={{
                width: `${((currentIndex + 1) / screenshots.length) * 100}%`,
                backgroundColor: color
              }}
            />
          </div>
        </div>

        {/* Miniatures - optimisées pour ne charger que les miniatures visibles */}
        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {screenshots.map((screenshot, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative flex-shrink-0 w-20 aspect-video rounded-lg overflow-hidden
                  transition-all duration-300 ${
                    index === currentIndex 
                    ? 'ring-2 ring-offset-2 ring-offset-black/40 ring-[#4ADE80]' 
                    : 'opacity-50 hover:opacity-100'
                  }`}
                aria-label={`Voir l'image ${index + 1}`}
              >
                <img
                  src={screenshot.image}
                  alt={`Miniature ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="80"
                  height="45"
                />
             </button>
            ))}
          </div>
        </div>
      </div>

      {/* Style pour masquer la scrollbar des miniatures */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
});