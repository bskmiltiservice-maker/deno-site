import React from 'react';
import { Compass, ArrowRight, Home } from 'lucide-react';
import { PageRoute } from '../../types';

interface NotFoundPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 rounded-3xl bg-[#FFEDD5] text-[#F97316] flex items-center justify-center mx-auto mb-6 shadow-soft">
        <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '20s' }} />
      </div>

      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E3A8A] bg-blue-50 px-3 py-1 rounded-full">
        Erreur 404 · Objet introuvable
      </span>

      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mt-4 mb-3">
        On dirait que cette pièce s&apos;est égarée dans l&apos;atelier !
      </h1>

      <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8">
        La page ou la création que vous cherchez a peut-être changé de nom, ou l&apos;artisan a terminé sa série limitée. Pas d&apos;inquiétude, le chemin du retour est tout proche.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => onNavigate({ name: 'home' })}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E3A8A] hover:bg-[#172554] text-white text-sm font-semibold rounded-2xl shadow-soft transition-colors cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Revenir à l&apos;accueil</span>
        </button>

        <button
          onClick={() => onNavigate({ name: 'catalog' })}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold border border-slate-200 rounded-2xl transition-colors cursor-pointer"
        >
          <span>Parcourir le catalogue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
