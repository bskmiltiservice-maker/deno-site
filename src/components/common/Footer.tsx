import React, { useState } from 'react';
import { HeartHandshake, ShieldCheck, Mail, ArrowRight, ExternalLink, Database } from 'lucide-react';
import { PageRoute } from '../../types';
import { useToast } from '../../context/ToastContext';
import { subscribeNewsletter } from '../../lib/api';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onOpenSupabaseStatus?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSupabaseStatus }) => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { addToast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Adresse email incomplète', 'Merci d\'indiquer une adresse email valide.', 'warning');
      return;
    }
    setIsSubscribing(true);
    await subscribeNewsletter(email);
    setIsSubscribing(false);
    addToast('Bienvenue parmi nous !', 'Votre inscription à notre lettre mensuelle est confirmée.');
    setEmail('');
  };

  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Affiliate & Humanist Manifesto Banner */}
        <div className="bg-[#1E293B] border border-slate-700/80 rounded-3xl p-6 sm:p-8 mb-16 shadow-soft">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 max-w-2xl">
              <div className="w-12 h-12 rounded-2xl bg-[#DBEAFE]/10 text-[#DBEAFE] flex items-center justify-center shrink-0 mt-0.5">
                <HeartHandshake className="w-6 h-6 text-[#F97316]" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">
                  Notre pacte de transparence & d&apos;affiliation honnête
                </h3>
                <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                  Maison Terroir ne possède aucun entrepôt et ne vend pas en marque blanche. Vous commandez directement auprès de créateurs et ateliers situés en Europe. Nous percevons une commission affiliée équitable sans jamais faire grimper votre prix d&apos;un seul centime.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate({ name: 'legal', subpage: 'affiliation' })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
            >
              <span>Lire notre charte</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4-column rich links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800 text-sm">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-sm">
                MT
              </div>
              <span className="font-heading font-bold text-xl text-white">
                Maison Terroir
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Sélection européenne éthique et durable. Créé pour reconnecter les acheteurs exigeants aux ateliers d&apos;excellence du continent européen.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#16A34A]" />
              <span>5 ateliers vérifiés en France, Portugal, Suède, Italie et Belgique</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-white mb-4">Explorer</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate({ name: 'catalog' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tous les produits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'catalog', categoryId: 'cat-ceramique' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Céramiques & Table
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'catalog', categoryId: 'cat-textile' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Textiles en mérinos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'catalog', categoryId: 'cat-bois' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bois & Décoration
                </button>
              </li>
            </ul>
          </div>

          {/* Maison & Confiance */}
          <div>
            <h4 className="font-semibold text-white mb-4">Confiance</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate({ name: 'about' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Notre démarche humaine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'delivery' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Livraison & Retours
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'faq' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Foire aux questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'contact' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Nous écrire
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Sincère */}
          <div>
            <h4 className="font-semibold text-white mb-4">La Lettre des Ateliers</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Une fois par mois : l&apos;histoire d&apos;un savoir-faire, les nouveautés sans promotion artificielle.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@exemple.fr"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F97316]"
                  aria-label="Votre adresse email pour la lettre d'atelier"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-3 text-xs font-semibold text-slate-950 bg-[#F97316] hover:bg-[#EA580C] rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>S&apos;inscrire sans engagement</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Maison Terroir. Conception artisanale & humaniste.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={() => onNavigate({ name: 'legal', subpage: 'mentions' })}
              className="hover:text-slate-300 transition-colors"
            >
              Mentions légales
            </button>
            <button
              onClick={() => onNavigate({ name: 'legal', subpage: 'cgu' })}
              className="hover:text-slate-300 transition-colors"
            >
              CGU
            </button>
            <button
              onClick={() => onNavigate({ name: 'legal', subpage: 'confidentialite' })}
              className="hover:text-slate-300 transition-colors"
            >
              Confidentialité
            </button>
            <button
              onClick={() => onNavigate({ name: 'legal', subpage: 'affiliation' })}
              className="hover:text-slate-300 transition-colors text-[#F97316] font-medium"
            >
              Divulgation d&apos;affiliation
            </button>
            {onOpenSupabaseStatus && (
              <button
                onClick={onOpenSupabaseStatus}
                className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300 bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700/80 cursor-pointer"
                aria-label="Statut de la base Supabase"
              >
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono text-[11px]">Supabase : site beno</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
