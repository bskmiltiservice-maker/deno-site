import React from 'react';
import { motion } from 'motion/react';
import { Heart, Compass, ShieldCheck, Award, ArrowRight, Users } from 'lucide-react';
import { PageRoute } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      
      <Breadcrumbs
        items={[
          { label: 'Accueil', onClick: () => onNavigate({ name: 'home' }) },
          { label: 'Notre Histoire & Valeurs', active: true },
        ]}
      />

      {/* Header */}
      <div className="my-8 text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
          Manifeste Humaniste
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 mt-2 text-balance">
          Redonner du sens et de la chaleur à nos objets du quotidien.
        </h1>
        <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
          Maison Terroir est née d&apos;un constat simple : le web est saturé de plateformes impersonnelles vendant des copies éphémères expédiées du bout du monde. Nous avons choisi un autre chemin.
        </p>
      </div>

      {/* Hero photo */}
      <div className="rounded-3xl overflow-hidden shadow-soft-lg mb-14 aspect-16/9 bg-slate-100">
        <img
          src="/src/assets/images/hero_humanist_lifestyle_1792958391447.jpg"
          alt="Les fondateurs et artisans partenaires en atelier"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Story Sections */}
      <div className="space-y-12 text-slate-700 leading-relaxed text-base sm:text-lg">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-soft space-y-4">
          <h2 className="font-heading text-2xl font-bold text-slate-900">
            Une sélection guidée par l&apos;humain, pas par des algorithmes
          </h2>
          <p>
            Derrière chaque théière en grès, chaque jeté de lit en mérinos ou chaque carnet en cuir cousu main que vous voyez ici, il y a des visages, des ateliers familiaux, des savoir-faire transmis de génération en génération à travers l&apos;Europe.
          </p>
          <p>
            Nous visitons personnellement les manufactures et petits ateliers indépendants. Nous vérifions leurs conditions de travail, la pureté de leurs matières premières (bois PEFC, laines RWS, terres sans plomb) et leur passion du travail bien fait.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50/60 rounded-3xl p-6 border border-blue-100">
            <div className="w-10 h-10 rounded-xl bg-[#1E3A8A] text-white flex items-center justify-center mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">100 % Européen</h3>
            <p className="text-sm text-slate-600">
              Des circuits courts et terrestres. Aucun objet n&apos;est importé par avion d&apos;un continent lointain.
            </p>
          </div>

          <div className="bg-orange-50/60 rounded-3xl p-6 border border-orange-100">
            <div className="w-10 h-10 rounded-xl bg-[#F97316] text-white flex items-center justify-center mb-4">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Honnêteté Radicale</h3>
            <p className="text-sm text-slate-600">
              Pas de faux comptes à rebours, pas de fausse pénurie. Nous vous disons exactement qui fabrique et d&apos;où ça part.
            </p>
          </div>

          <div className="bg-emerald-50/60 rounded-3xl p-6 border border-emerald-100">
            <div className="w-10 h-10 rounded-xl bg-[#16A34A] text-white flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Prix Fabricant Juste</h3>
            <p className="text-sm text-slate-600">
              Notre commission d&apos;apporteur d&apos;affaires est prise sur la marge fournisseur, sans aucun coût additionnel pour vous.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center pt-8">
          <button
            onClick={() => onNavigate({ name: 'catalog' })}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1E3A8A] hover:bg-[#172554] text-white font-semibold rounded-2xl shadow-soft transition-colors cursor-pointer"
          >
            <span>Découvrir les ateliers et leurs créations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
