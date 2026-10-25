import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, ArrowRight, Mail } from 'lucide-react';
import { PageRoute } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface FAQPageProps {
  onNavigate: (route: PageRoute) => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Pourquoi le paiement s'effectue-t-il chez le fournisseur et non sur Maison Terroir ?",
    answer: "Parce que nous avons choisi le modèle le plus direct et respectueux possible : nous ne stockons pas la marchandise dans un entrepôt géant et nous ne prenons pas de marge occulte. En payant directement chez l'artisan via notre lien partenaire de confiance, vous bénéficiez du prix officiel, de la facture originale de l'atelier et d'un lien direct avec les créateurs.",
  },
  {
    question: "Est-ce que je paie plus cher à cause de l'affiliation ?",
    answer: "Absolument pas ! C'est notre engagement fondamental. Vous payez exactement le même tarif que si vous arriviez par vous-même sur la boutique en ligne de l'atelier. C'est le fournisseur qui nous rétrocède un petit pourcentage de commission (entre 6% et 8%) pour le travail de photographie, d'éditorial et de mise en valeur que nous réalisons.",
  },
  {
    question: "Comment faire si j'ai sélectionné des objets de deux ateliers différents ?",
    answer: "Dans votre panier « Ma sélection », vos objets sont automatiquement regroupés par atelier. Vous trouverez un bouton « Commander chez [Atelier] » pour chaque fabricant. Il vous suffit de finaliser vos achats successivement chez chacun d'entre eux. Vos colis arriveront ainsi directement de leurs lieux de fabrication respectifs !",
  },
  {
    question: "Qu'en est-il des retours et du droit de rétractation ?",
    answer: "La législation européenne vous protège pleinement avec un droit de rétractation de minimum 14 jours, que nos ateliers étendent à 30 jours complets. Si un produit ne convient pas, vous le renvoyez simplement dans son emballage d'origine pour obtenir un remboursement intégral.",
  },
  {
    question: "D'où proviennent exactement les matières premières ?",
    answer: "Nous exigeons une traçabilité totale : bois de chêne du Jura certifié PEFC, laines mérinos respectueuses RWS, cuirs toscans au tannage végétal sans métaux lourds, grès et argiles extraits localement. Toutes ces mentions sont précisées en toute transparence sur chaque fiche produit.",
  },
  {
    question: "Puis-je vous recommander un atelier ou un artisan indépendant ?",
    answer: "Avec grand plaisir ! Maison Terroir grandit grâce aux recommandations de passionnés. Écrivez-nous via notre page Contact en nous parlant du savoir-faire de l'artisan, de son pays et de ses valeurs.",
  },
];

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      
      <Breadcrumbs
        items={[
          { label: 'Accueil', onClick: () => onNavigate({ name: 'home' }) },
          { label: 'Foire aux Questions', active: true },
        ]}
      />

      <div className="my-8 text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
          Transparence Totale
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
          Questions Fréquentes
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Tout ce que vous avez toujours voulu savoir sur notre fonctionnement en affiliation éthique.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-[#1E3A8A] transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="text-base sm:text-lg">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#1E3A8A]' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Still need help callout */}
      <div className="mt-12 bg-[#DBEAFE]/40 border border-[#1E3A8A]/20 rounded-3xl p-6 sm:p-8 text-center">
        <h3 className="font-bold text-slate-900 text-lg mb-2">
          Une question spécifique sur une pièce ou un atelier ?
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto mb-5">
          Notre petite équipe humaine vous répond toujours avec le sourire et sans réponse automatisée.
        </p>
        <button
          onClick={() => onNavigate({ name: 'contact' })}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E3A8A] hover:bg-[#172554] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
        >
          <Mail className="w-4 h-4" />
          <span>Écrire à notre équipe</span>
        </button>
      </div>

    </div>
  );
};
