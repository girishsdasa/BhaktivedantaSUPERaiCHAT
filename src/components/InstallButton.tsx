import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

export const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsStandalone(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else if (isIOS) {
      setShowIOSPrompt(true);
    }
  };

  if (isStandalone || (!deferredPrompt && !isIOS)) {
    return null; // Don't show if already installed or prompt unavailable (and not iOS)
  }

  return (
    <>
      <button 
        onClick={handleInstallClick}
        className="flex items-center gap-2 bg-brand-gold-bright/10 hover:bg-brand-gold-bright/20 border border-brand-gold-bright/50 text-brand-gold-bright px-3 py-1.5 rounded font-serif text-[0.65rem] tracking-[0.1em] uppercase transition-colors shadow-[0_0_10px_rgba(212,168,67,0.15)]"
      >
        <Download size={12} strokeWidth={2.5} />
        <span>Install App</span>
      </button>

      {showIOSPrompt && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-end pb-8 bg-brand-bg/80 backdrop-blur-sm" onClick={() => setShowIOSPrompt(false)}>
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-brand-bg-raised border border-brand-gold-bright/30 shadow-[0_0_50px_rgba(212,168,67,0.3)] max-w-[300px] w-full p-6 relative rounded translate-y-[-20px]"
          >
            <button onClick={() => setShowIOSPrompt(false)} className="absolute top-2 right-2 text-brand-gold hover:text-brand-gold-bright transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <h4 className="font-serif text-[0.8rem] tracking-[0.1em] uppercase text-brand-gold-bright mb-4 text-center">Install on iOS</h4>
            <ol className="list-decimal pl-4 font-sans text-[0.85rem] text-brand-parchment space-y-3 marker:text-brand-gold">
              <li>Tap the <span className="inline-flex items-center justify-center w-6 h-6 bg-brand-gold/10 rounded align-middle mx-1"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 15V3m0 0L8.5 6.5M12 3l3.5 3.5M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7"/></svg></span> <strong>Share</strong> icon below.</li>
              <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
            </ol>
          </div>
          <div className="flex flex-col items-center pointer-events-none drop-shadow-[0_0_15px_rgba(212,168,67,0.8)] translate-y-[-10px]">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-brand-gold-bright animate-bounce" strokeWidth="2.5">
               <path d="M12 4v16m0 0l-6-6m6 6l6-6"/>
            </svg>
          </div>
        </div>
      )}
    </>
  );
};
