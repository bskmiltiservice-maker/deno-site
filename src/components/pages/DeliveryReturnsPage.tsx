import React from 'react';
import { Truck, RotateCcw, ShieldCheck, HelpCircle, MapPin } from 'lucide-react';
import { PageRoute } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface DeliveryReturnsPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const DeliveryReturnsPage: React.FC<DeliveryReturnsPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      
      <Breadcrumbs
        items={[
          { label: 'Accueil', onClick: () => onNavigate({ name: 'home' }) },
          { label: 'Livraison & Retours', active: true },
        ]}
      />

      <div className="my-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
          Informations pratiques & sereines
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
          Expédition directe d&apos;Europe & Retours faciles
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Chez Maison Terroir, nous croyons à la clarté. Voici comment voyagent vos pièces de l&apos;atelier jusqu&apos;à votre porte.
        </p>
      </div>

      <div className="space-y-8">
        {/* Delivery section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h2 className="font-heading text-xl font-bold text-slate-900">
              Comment se déroule la livraison ?
            </h2>
          </div>

          <div className="space-y-3 text-slate-700 text-sm leading-relaxed">
            <p>
              Chaque commande est directement préparée et emballée par l&apos;artisan ou la manufacture choisie (au Portugal, en Suède, en France, en Italie ou en Belgique).
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>Délais moyens :</strong> entre 2 et 5 jours ouvrés selon la localisation de l&apos;atelier et votre pays de résidence en Europe.
              </li>
              <li>
                <strong>Numéro de suivi :</strong> dès l&apos;expédition, vous recevez un lien de suivi en direct (Colissimo, DHL Express, PostNord, CTT ou DPD).
              </li>
              <li>
                <strong>Zéro frais de douane :</strong> tous les fournisseurs sont situés au sein de l&apos;Union Européenne, les prix affichés sont nets et toutes taxes comprises.
              </li>
              <li>
                <strong>Emballages protecteurs & responsables :</strong> nos partenaires privilégient le carton recyclé, le calage en papier kraft ou en copeaux de bois naturel.
              </li>
            </ul>
          </div>
        </div>

        {/* Returns section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h2 className="font-heading text-xl font-bold text-slate-900">
              Et si je change d&apos;avis ?
            </h2>
          </div>

          <div className="space-y-3 text-slate-700 text-sm leading-relaxed">
            <p>
              Vous bénéficiez d&apos;un délai légal européen de <strong>30 jours</strong> (étendu par la majorité de nos ateliers) à compter de la réception de votre colis pour demander un retour ou un échange.
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-600">
              <li>Contactez le service client de l&apos;artisan ou contactez notre équipe Maison Terroir pour vous accompagner.</li>
              <li>Repliez l&apos;objet dans son emballage d&apos;origine en toute sécurité.</li>
              <li>Déposez votre colis en point relais avec l&apos;étiquette de retour fournie par l&apos;atelier.</li>
              <li>Votre remboursement intégral intervient sous 3 à 5 jours après réception de la pièce.</li>
            </ol>
          </div>
        </div>

        {/* Protection guarantee */}
        <div className="bg-[#DBEAFE]/40 border border-[#1E3A8A]/20 rounded-2xl p-5 flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-[#1E3A8A] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            <strong className="text-slate-900 block font-semibold mb-1">
              Garantie anti-casse sur la céramique et le verre soufflé
            </strong>
            Nos potiers et verriers emballent chaque pièce comme pour leurs proches. En cas de dommage exceptionnel pendant l&apos;acheminement, un remplacement gratuit immédiat ou un remboursement complet est opéré sur simple photo.
          </div>
        </div>

      </div>

    </div>
  );
};
