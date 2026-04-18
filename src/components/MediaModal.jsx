import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useModalStore } from '../store/useModalStore';

const MediaModal = () => {
  const { isOpen, activeProject, closeModal } = useModalStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeModal]);

  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentIndex(0); // Reset on open
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen || !activeProject) return null;

  const mediaUrls = activeProject?.mediaList?.length > 0 
    ? activeProject.mediaList 
    : [activeProject.thumbnailUrl].filter(Boolean);

  const prevMedia = () => {
    setCurrentIndex(prev => (prev === 0 ? mediaUrls.length - 1 : prev - 1));
  };
  
  const nextMedia = () => {
    setCurrentIndex(prev => (prev === mediaUrls.length - 1 ? 0 : prev + 1));
  };

  const currentUrl = mediaUrls[currentIndex];
  const isVideo = currentUrl?.includes('.mp4') || currentUrl?.includes('.webm');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Dark overlay backdrop */}
      <div 
        className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md transition-opacity duration-300"
        onClick={closeModal}
      />
      
      {/* Modal content area */}
      <div 
        className="relative z-10 w-full max-w-5xl max-h-[90vh] mx-4 animate-in fade-in zoom-in duration-300 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.15)] bg-black"
        style={{ animationFillMode: 'forwards' }}
      >
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-red-500/80 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {mediaUrls.length > 1 && (
          <>
            <button onClick={prevMedia} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button onClick={nextMedia} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm">
              <ChevronRight className="w-8 h-8" />
            </button>
          </>
        )}

        <div className="w-full h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-black pb-16">
          {isVideo ? (
             <video 
              key={currentUrl} // forces re-render/reload on src change
              src={currentUrl} 
              autoPlay 
              controls 
              className="w-full h-full object-contain"
            />
          ) : (
            <img 
              src={currentUrl} 
              alt={`${activeProject.title} media`} 
              className="w-full h-full object-contain"
              loading="lazy"
            />
          )}
        </div>
        
        {/* Caption/Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 to-transparent flex justify-between items-end">
          <div>
             <p className="text-blue-400 text-sm font-bold uppercase tracking-widest mb-1">{activeProject.category}</p>
             <h3 className="text-2xl font-bold text-white font-heading">{activeProject.title} {activeProject.location && <span className="text-white/60 font-medium text-lg ml-2">| {activeProject.location}</span>}</h3>
          </div>
          {mediaUrls.length > 1 && (
            <div className="text-white/60 text-sm font-bold tracking-widest">
              {currentIndex + 1} / {mediaUrls.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaModal;
