import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, ShieldCheck, HeartHandshake, Truck, RotateCcw, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const SupplierRedirectModal: React.FC = () => {
  const { pendingRedirectSupplier, pendingRedirectProduct, closeSupplierRedirectModal } = useCart();

  if (!pendingRedirectSupplier) return null;

  const supplier = pendingRedirectSupplier;
  const targetUrl = pendingRedirectProduct?.directSupplierUrl || supplier.websiteUrl;

  const handleProceed = () => {
    // Open in new tab or direct window
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    closeSupplierRedirectModal();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeSupplierRedirectModal}
          className="fixed inset-0 bg-[#111827]/40 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-soft-lg z-10 border border-slate-100 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="redirect-modal-title"
        >
          {/* Close button */}
          <button
            onClick={closeSupplierRedirectModal}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header icon */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-[#DBEAFE] text-[#1E3A8A] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#1E3A8A] font-semibold">
                Commande directe & sécurisée
              </span>
              <h3 id="redirect-modal-title" className="text-xl font-bold text-slate-900 leading-snug">
                Finalisation chez {supplier.name}
              </h3>
            </div>
          </div>

          {/* Honest Explanation */}
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5">
            Vous allez finaliser votre commande directement sur la boutique officielle de{' '}
            <strong className="text-slate-900 font-semibold">{supplier.name}</strong> ({supplier.country}).
            Le paiement, la préparation soignée de votre colis et le service après-vente sont gérés directement par leur atelier.
          </p>

          {/* Reassurance Checklist */}
          <div className="bg-[#F8FAFC] border border-slate-200/70 rounded-2xl p-4 mb-6 space-y-3">
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
              <Truck className="w-4 h-4 text-[#1E3A8A] shrink-0 mt-0.5" />
              <span>
                <strong>Expédition :</strong> {supplier.averageShippingDays} depuis {supplier.city} ({supplier.country}).
              </span>
            </div>
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
              <RotateCcw className="w-4 h-4 text-[#1E3A8A] shrink-0 mt-0.5" />
              <span>
                <strong>Retours sereins :</strong> {supplier.returnPolicyDays} jours pour changer d&apos;avis.
              </span>
            </div>
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
              <HeartHandshake className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
              <span>
                <strong>Affiliation transparente :</strong> Vous payez le prix fournisseur exact sans aucun surcoût. Maison Terroir perçoit une commission partenaire ({supplier.affiliateCommissionRate}) qui rémunère notre travail de sélection.
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center gap-3">
            <button
              onClick={closeSupplierRedirectModal}
              className="w-full sm:w-auto px-5 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer text-center"
            >
              Rester sur le catalogue
            </button>
            <button
              onClick={handleProceed}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-950 bg-[#F97316] hover:bg-[#EA580C] rounded-xl shadow-sm transition-all duration-150 active:scale-[0.98] cursor-pointer"
            >
              <span>Continuer chez {supplier.name}</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
