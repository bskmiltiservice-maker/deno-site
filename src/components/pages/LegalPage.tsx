import React, { useState } from 'react';
import { ShieldCheck, HeartHandshake, FileText, Lock, Cookie } from 'lucide-react';
import { PageRoute } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface LegalPageProps {
  initialSubpage?: 'mentions' | 'cgu' | 'confidentialite' | 'cookies' | 'affiliation';
  onNavigate: (route: PageRoute) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialSubpage = 'mentions', onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'mentions' | 'cgu' | 'confidentialite' | 'cookies' | 'affiliation'>(
    initialSubpage
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      
      <Breadcrumbs
        items={[
          { label: 'Accueil', onClick: () => onNavigate({ name: 'home' }) },
          { label: 'Informations Légales', active: true },
        ]}
      />

      <div className="my-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
          Cadre légal européen & Transparence
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
          Mentions Légales & Divulgation d&apos;Affiliation
        </h1>
      </div>

      {/* Segmented Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('affiliation')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'affiliation'
              ? 'bg-[#F97316] text-slate-950 shadow-soft'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Divulgation d&apos;affiliation (Recommandé)
        </button>
        <button
          onClick={() => setActiveTab('mentions')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'mentions'
              ? 'bg-[#1E3A8A] text-white shadow-soft'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Mentions légales
        </button>
        <button
          onClick={() => setActiveTab('cgu')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'cgu'
              ? 'bg-[#1E3A8A] text-white shadow-soft'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          CGU du service
        </button>
        <button
          onClick={() => setActiveTab('confidentialite')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'confidentialite'
              ? 'bg-[#1E3A8A] text-white shadow-soft'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Confidentialité & RGPD
        </button>
        <button
          onClick={() => setActiveTab('cookies')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'cookies'
              ? 'bg-[#1E3A8A] text-white shadow-soft'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Traceurs & Cookies
        </button>
      </div>

      {/* Tab Contents */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-soft text-slate-700 text-sm sm:text-base leading-relaxed space-y-6">
        
        {/* AFFILIATION DISCLOSURE */}
        {activeTab === 'affiliation' && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 text-[#F97316]">
              <HeartHandshake className="w-7 h-7" />
              <h2 className="font-heading text-2xl font-bold text-slate-900">
                Divulgation intégrale sur l&apos;affiliation commerciale
              </h2>
            </div>

            <p className="font-medium text-slate-900 bg-orange-50/70 p-4 rounded-2xl border border-orange-200/60">
              Conformément à la directive européenne 2005/29/CE sur les pratiques commerciales loyales et aux recommandations de la DGCCRF, nous portons à votre connaissance en toute clarté notre modèle économique.
            </p>

            <h3 className="font-bold text-slate-900 text-lg">1. Rôle de Maison Terroir</h3>
            <p>
              Maison Terroir agit en qualité de média éditorial et de sélectionneur indépendant. Nous ne détenons aucun stock physique et n&apos;encaissons aucun règlement financier pour les objets présentés. La transaction s&apos;opère exclusivement entre vous (l&apos;acheteur) et la boutique officielle du fournisseur européen sélectionné.
            </p>

            <h3 className="font-bold text-slate-900 text-lg">2. Liens d&apos;affiliation et commissions</h3>
            <p>
              Les boutons d&apos;action &laquo; Commander &raquo; ou &laquo; Commander chez [Artisan] &raquo; contiennent des liens de redirection avec un identifiant partenaire sécurisé. Lorsque vous finalisez un achat après avoir cliqué sur l&apos;un de ces liens, le fournisseur nous reverse une commission d&apos;apporteur d&apos;affaires (généralement entre 6% et 8% du montant HT de l&apos;article).
            </p>

            <h3 className="font-bold text-slate-900 text-lg">3. Impact sur votre prix d&apos;achat</h3>
            <p>
              <strong>Aucun surcoût pour vous :</strong> le prix que vous réglez est rigoureusement identique au centime près à celui proposé en direct sur le site du fournisseur. La commission est imputée sur le budget promotionnel ou de commercialisation de l&apos;artisan, jamais répercutée sur votre panier.
            </p>

            <h3 className="font-bold text-slate-900 text-lg">4. Indépendance de notre charte</h3>
            <p>
              Aucun fabricant ne peut acheter sa place dans notre sélection. Nous refusons régulièrement les marques ne respectant pas nos critères stricts : fabrication 100% européenne, matières nobles sans polluants et pérennité des objets.
            </p>
          </div>
        )}

        {/* MENTIONS LEGALES */}
        {activeTab === 'mentions' && (
          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-slate-900">
              Mentions Légales
            </h2>
            <p>
              <strong>Éditeur du site :</strong> Maison Terroir SAS au capital de 10 000 €<br />
              <strong>Siège social :</strong> 14 rue de la Poterie, 69002 Lyon, France<br />
              <strong>RCS :</strong> Lyon B 912 345 678 · <strong>TVA Intracommunautaire :</strong> FR 89 912345678<br />
              <strong>Directeurs de la publication :</strong> Alice & Marc Dubois<br />
              <strong>Contact :</strong> bonjour@maison-terroir.eu · +33 (0)4 78 00 00 00
            </p>
            <p>
              <strong>Hébergement :</strong> Plateforme Cloud Run sur infrastructure Google Cloud Platform (région Europe de l&apos;Ouest - europe-west1, Francfort / Belgique).
            </p>
          </div>
        )}

        {/* CGU */}
        {activeTab === 'cgu' && (
          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-slate-900">
              Conditions Générales d&apos;Utilisation (CGU)
            </h2>
            <p>
              Le site Maison Terroir a pour objet de présenter une sélection d&apos;objets artisanaux fabriqués en Europe. L&apos;utilisation du site implique l&apos;acceptation pleine et entière des présentes CGU.
            </p>
            <p>
              <strong>Responsabilité :</strong> Les informations relatives aux caractéristiques techniques, dimensions et délais sont fournies par les artisans partenaires. Les commandes étant passées directement sur les sites des fournisseurs, les conditions de vente, garanties légales (conformité et vices cachés) et politiques d&apos;expédition applicables sont celles desdits fournisseurs.
            </p>
          </div>
        )}

        {/* CONFIDENTIALITE */}
        {activeTab === 'confidentialite' && (
          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-slate-900">
              Politique de Confidentialité & RGPD
            </h2>
            <p>
              Maison Terroir s&apos;engage à protéger votre vie privée conformément au Règlement Général sur la Protection des Données (RGPD - Règlement UE 2016/679).
            </p>
            <p>
              Nous ne collectons aucune coordonnée bancaire. Les seules données collectées sont celles que vous nous transmettez volontairement (formulaire de contact ou inscription à la lettre d&apos;information). Vous disposez d&apos;un droit d&apos;accès, de rectification et d&apos;effacement sur simple demande à <code>privacy@maison-terroir.eu</code>.
            </p>
          </div>
        )}

        {/* COOKIES */}
        {activeTab === 'cookies' && (
          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-slate-900">
              Traceurs & Cookies
            </h2>
            <p>
              Nous n&apos;utilisons aucun traceur publicitaire intrusif. Les cookies déposés sont strictement nécessaires à la conservation de votre sélection d&apos;objets locale (localStorage) et à la mémorisation de votre affiliation auprès des partenaires afin de garantir l&apos;attribution honnête de notre recommandation.
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
