import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, ExternalLink, MapPin } from 'lucide-react';
import { Product, PageRoute } from '../../types';
import { searchInstantSuggestions } from '../../lib/api';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onNavigateToCatalog: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onNavigateToCatalog,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    let active = true;
    if (query.trim().length >= 2) {
      searchInstantSuggestions(query).then((items) => {
        if (active) setResults(items);
      });
    } else {
      setResults([]);
    }
    return () => {
      active = false;
    };
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onNavigateToCatalog(query.trim());
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl p-5 sm:p-6 shadow-soft-lg z-10 border border-slate-200 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Recherche instantanée"
        >
          {/* Search bar input */}
          <form onSubmit={handleSubmit} className="relative flex items-center mb-4">
            <Search className="absolute left-4 w-5 h-5 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher par objet, matière (chêne, lin...), atelier..."
              className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl pl-12 pr-12 py-3.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:bg-white transition-all"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-4 text-slate-400 hover:text-slate-700"
                aria-label="Effacer"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <span className="absolute right-4 text-xs text-slate-400 hidden sm:inline">ESC pour fermer</span>
            )}
          </form>

          {/* Instant results preview */}
          <div className="max-h-[60vh] overflow-y-auto divide-y divide-slate-100">
            {query.trim().length >= 2 && results.length === 0 && (
              <div className="py-8 text-center text-slate-500 text-sm">
                Aucun objet ne correspond à votre recherche pour le moment.
                <div className="mt-2 text-xs text-slate-400">
                  Essayez avec &laquo; théière &raquo;, &laquo; plaid &raquo;, &laquo; chêne &raquo; ou &laquo; céramique &raquo;.
                </div>
              </div>
            )}

            {results.map((product) => (
              <button
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-12 h-12 rounded-xl object-cover shrink-0 bg-slate-100"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 text-sm group-hover:text-[#1E3A8A] transition-colors truncate">
                      {product.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="text-[#1E3A8A] font-medium flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5" />
                        {product.supplierCountry}
                      </span>
                      <span>·</span>
                      <span className="truncate">{product.supplierName}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-3">
                  <span className="font-mono tabular-nums font-bold text-sm text-slate-900">
                    {product.price.toFixed(2).replace('.', ',')} €
                  </span>
                </div>
              </button>
            ))}

            {query.trim().length >= 2 && results.length > 0 && (
              <div className="pt-3">
                <button
                  onClick={handleSubmit}
                  className="w-full py-2.5 text-center text-xs font-semibold text-[#1E3A8A] hover:bg-blue-50 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Voir tous les résultats pour &laquo; {query} &raquo;</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Popular quick topics when query is empty */}
            {!query && (
              <div className="py-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Recherches inspirantes
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Théière portugaise', 'Plaid laine mérinos', 'Horloge en chêne', 'Carnet en cuir toscan'].map(
                    (tag, i) => (
                      <button
                        key={i}
                        onClick={() => setQuery(tag)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-xs text-slate-700 rounded-xl transition-colors cursor-pointer"
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
