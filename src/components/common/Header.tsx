import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, Menu, X, HeartHandshake, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PageRoute } from '../../types';

interface HeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate, onOpenSearch }) => {
  const { totalCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Catalogue', route: { name: 'catalog' } as PageRoute },
    { label: 'Comment ça marche', route: { name: 'home' } as PageRoute, anchor: '#comment-ca-marche' },
    { label: 'Notre Histoire', route: { name: 'about' } as PageRoute },
    { label: 'Livraison & Retours', route: { name: 'delivery' } as PageRoute },
    { label: 'FAQ', route: { name: 'faq' } as PageRoute },
  ];

  const handleLinkClick = (item: typeof navLinks[0]) => {
    onNavigate(item.route);
    setMobileMenuOpen(false);
    if (item.anchor && item.route.name === 'home') {
      setTimeout(() => {
        const el = document.querySelector(item.anchor!);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      {/* Discreet top reassurance banner (<= 36px) */}
      <div className="bg-[#1E3A8A] text-white text-[12px] py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <HeartHandshake className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
        <span className="truncate">
          Sélection éthique européenne · Expédition directe d&apos;ateliers · Zéro marge intermédiaire cachée
        </span>
      </div>

      {/* Main Sticky Header: STRICT 3-ZONE CONTRACT */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single Wordmark Brand Text */}
          <button
            onClick={() => onNavigate({ name: 'home' })}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] rounded-lg p-1 -ml-1"
            aria-label="Maison Terroir - Page d'accueil"
          >
            <div className="w-8 h-8 rounded-xl bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-sm tracking-tighter shadow-2xs group-hover:bg-[#172554] transition-colors">
              MT
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-[#1E3A8A] whitespace-nowrap shrink-0">
              Maison Terroir
            </span>
          </button>

          {/* Zone 2: 4-5 Concise Single-line Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600" aria-label="Navigation principale">
            {navLinks.map((item, idx) => {
              const isActive = currentRoute.name === item.route.name && !item.anchor;
              return (
                <button
                  key={idx}
                  onClick={() => handleLinkClick(item)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive ? 'text-[#1E3A8A] font-semibold' : 'hover:text-[#1E3A8A]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E3A8A] rounded-full"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Interactive Affordances (Search, Cart & Mobile Trigger) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick search button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors cursor-pointer"
              aria-label="Rechercher un produit ou un atelier"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Rechercher...</span>
              <kbd className="hidden lg:inline-block text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Cart trigger button */}
            <button
              onClick={() => onNavigate({ name: 'cart' })}
              className="relative p-2.5 rounded-xl text-slate-700 hover:text-[#1E3A8A] hover:bg-slate-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]"
              aria-label={`Panier, ${totalCount} articles sélectionnés`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[#F97316] text-slate-950 font-bold text-xs rounded-full flex items-center justify-center shadow-xs"
                >
                  {totalCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 md:hidden transition-colors cursor-pointer"
              aria-label="Ouvrir le menu de navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col justify-between z-10"
              aria-label="Menu mobile"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs">
                      MT
                    </div>
                    <span className="font-heading font-bold text-lg text-[#1E3A8A]">
                      Maison Terroir
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                    aria-label="Fermer le menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col gap-2 mt-6">
                  {navLinks.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleLinkClick(item)}
                      className="text-left px-4 py-3 rounded-xl text-slate-800 hover:bg-slate-50 font-medium text-base transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      onNavigate({ name: 'cart' });
                      setMobileMenuOpen(false);
                    }}
                    className="text-left px-4 py-3 rounded-xl text-slate-800 hover:bg-slate-50 font-medium text-base transition-colors flex items-center justify-between"
                  >
                    <span>Mon Panier</span>
                    {totalCount > 0 && (
                      <span className="text-xs bg-[#FFEDD5] text-[#EA580C] font-bold px-2 py-0.5 rounded-full">
                        {totalCount}
                      </span>
                    )}
                  </button>
                </nav>
              </div>

              {/* Drawer footer trust */}
              <div className="pt-6 border-t border-slate-100 text-xs text-slate-500 space-y-2">
                <div className="flex items-center gap-2 text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-[#1E3A8A]" />
                  <span>Artisans & ateliers européens vérifiés</span>
                </div>
                <p>
                  Paiement sécurisé directement chez l&apos;artisan fournisseur.
                </p>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
