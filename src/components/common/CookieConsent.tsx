import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, ShieldCheck } from 'lucide-react';

interface CookieConsentProps {
  onOpenPrivacy?: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onOpenPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('maison_terroir_cookie_consent');
      if (!consent) {
        // Small delay so user isn't immediately bombarded upon page opening
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('maison_terroir_cookie_consent', 'accepted_all');
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem('maison_terroir_cookie_consent', 'essential_only');
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-40 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-5 shadow-soft-lg text-slate-800"
        aria-label="Consentement aux traceurs"
      >
        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-9 h-9 rounded-xl bg-[#DBEAFE] text-[#1E3A8A] flex items-center justify-center shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              Respect de votre vie privée
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Nous utilisons uniquement des cookies nécessaires au bon fonctionnement de votre panier et à la traçabilité éthique de l&apos;affiliation vers nos artisans partenaires. Aucun pistage publicitaire invasif.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={handleEssentialOnly}
            className="flex-1 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors text-center cursor-pointer"
          >
            Essentiels uniquement
          </button>
          <button
            onClick={handleAcceptAll}
            className="flex-1 px-3 py-2 text-xs font-semibold text-slate-950 bg-[#F97316] hover:bg-[#EA580C] rounded-xl transition-colors text-center shadow-xs cursor-pointer"
          >
            Accepter & continuer
          </button>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
};
