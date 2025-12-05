'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Empty component - we only use the header button now
export function InstallPrompt() {
  return null;
}

// Modal component that renders via portal
function InstallModal({ isOpen, onClose, isIOS }: { isOpen: boolean; onClose: () => void; isIOS: boolean }) {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalContainer(document.body);
  }, []);

  if (!portalContainer || !isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '380px',
            backgroundColor: '#1A1A2E',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              padding: '0.5rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(55, 65, 81, 0.5)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <X style={{ width: '1.25rem', height: '1.25rem', color: '#9CA3AF' }} />
          </button>

          {/* Icon */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              background: 'linear-gradient(to top right, #8B5CF6, #EC4899, #F97316)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ fontSize: '2rem' }}>⚡</span>
            </div>
          </div>

          {/* Title */}
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: '0.5rem' }}>
            Install Price Clash
          </h2>
          <p style={{ color: '#9CA3AF', textAlign: 'center', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Add to your home screen for quick access!
          </p>

          {/* Instructions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {isIOS ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'rgba(55, 65, 81, 0.5)', borderRadius: '0.75rem', padding: '0.75rem' }}>
                  <div style={{ width: '2rem', height: '2rem', backgroundColor: 'rgba(59, 130, 246, 0.2)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA', fontWeight: 'bold' }}>1</div>
                  <p style={{ fontSize: '0.875rem', color: '#D1D5DB' }}>
                    Tap the <strong style={{ color: 'white' }}>Share</strong> button in Safari
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'rgba(55, 65, 81, 0.5)', borderRadius: '0.75rem', padding: '0.75rem' }}>
                  <div style={{ width: '2rem', height: '2rem', backgroundColor: 'rgba(34, 197, 94, 0.2)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ADE80', fontWeight: 'bold' }}>2</div>
                  <p style={{ fontSize: '0.875rem', color: '#D1D5DB' }}>
                    Select <strong style={{ color: 'white' }}>"Add to Home Screen"</strong>
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'rgba(55, 65, 81, 0.5)', borderRadius: '0.75rem', padding: '0.75rem' }}>
                  <div style={{ width: '2rem', height: '2rem', backgroundColor: 'rgba(139, 92, 246, 0.2)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A78BFA', fontWeight: 'bold' }}>3</div>
                  <p style={{ fontSize: '0.875rem', color: '#D1D5DB' }}>
                    Tap <strong style={{ color: 'white' }}>"Add"</strong> to install
                  </p>
                </div>
              </>
            ) : (
              <>
                <div style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: '0.75rem', padding: '0.75rem' }}>
                  <p style={{ fontSize: '0.75rem', color: '#FACC15' }}>
                    ⚠️ Install requires HTTPS. Deploy to Vercel first, then the install option will appear automatically!
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'rgba(55, 65, 81, 0.5)', borderRadius: '0.75rem', padding: '0.75rem' }}>
                  <div style={{ width: '2rem', height: '2rem', backgroundColor: 'rgba(59, 130, 246, 0.2)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA', fontWeight: 'bold' }}>1</div>
                  <p style={{ fontSize: '0.875rem', color: '#D1D5DB' }}>
                    <strong style={{ color: 'white' }}>Chrome:</strong> Look for install icon ⊕ in address bar
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'rgba(55, 65, 81, 0.5)', borderRadius: '0.75rem', padding: '0.75rem' }}>
                  <div style={{ width: '2rem', height: '2rem', backgroundColor: 'rgba(34, 197, 94, 0.2)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ADE80', fontWeight: 'bold' }}>2</div>
                  <p style={{ fontSize: '0.875rem', color: '#D1D5DB' }}>
                    <strong style={{ color: 'white' }}>Safari Mac:</strong> File → Add to Dock
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              width: '100%',
              marginTop: '1.5rem',
              padding: '0.75rem',
              background: 'linear-gradient(to right, #9333EA, #EC4899)',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Got it!
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    portalContainer
  );
}

// Compact install button for header - always visible until installed
export function InstallButton() {
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if already installed
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleInstalled = () => {
      setIsInstalled(true);
      setShowModal(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, [mounted]);

  const handleClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setIsInstalled(true);
        }
      } catch (err) {
        console.error('Install error:', err);
      }
      setDeferredPrompt(null);
    } else {
      setShowModal(true);
    }
  };

  if (!mounted) {
    return (
      <div className="flex items-center gap-1.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-2.5 py-1.5 rounded-full border border-green-500/30">
        <Download className="w-3.5 h-3.5 text-green-400" />
        <span className="text-xs font-semibold text-green-400">Install</span>
      </div>
    );
  }

  if (isInstalled) return null;

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="flex items-center gap-1.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 px-2.5 py-1.5 rounded-full border border-green-500/30 transition-all"
      >
        <Download className="w-3.5 h-3.5 text-green-400" />
        <span className="text-xs font-semibold text-green-400">Install</span>
      </motion.button>

      <InstallModal isOpen={showModal} onClose={() => setShowModal(false)} isIOS={isIOS} />
    </>
  );
}
