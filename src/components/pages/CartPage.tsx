import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingBag, 
  Trash2, 
  ExternalLink, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Plus,
  Minus,
  Info
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PageRoute, Supplier, Product } from '../../types';
import { getSuppliers } from '../../lib/api';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface CartPageProps {
  onNavigate: (route: PageRoute) => void;
  onSelectProduct: (product: Product) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate, onSelectProduct }) => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalCount,
    totalAmount,
    itemsBySupplier,
    openSupplierRedirectModal,
  } = useCart();

  const [suppliersMap, setSuppliersMap] = useState<Record<string, Supplier>>({});

  useEffect(() => {
    getSuppliers().then((sups) => {
      const map: Record<string, Supplier> = {};
      sups.forEach((s) => {
        map[s.id] = s;
      });
      setSuppliersMap(map);
    });
  }, []);

  const handleOrderSupplierGroup = (supplierId: string) => {
    const supplier = suppliersMap[supplierId];
    const groupItems = itemsBySupplier[supplierId]?.items;
    const firstProduct = groupItems?.[0]?.product;

    if (supplier) {
      openSupplierRedirectModal(supplier, firstProduct);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
        <div className="w-16 h-16 rounded-3xl bg-[#DBEAFE] text-[#1E3A8A] flex items-center justify-center mx-auto mb-6 shadow-soft">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
          Votre sélection est vide
        </h1>
        <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base leading-relaxed mb-8">
          Vous n&apos;avez pas encore choisi de créations d&apos;ateliers. Parcourez notre catalogue pour découvrir des pièces uniques fabriquées en Europe.
        </p>
        <button
          onClick={() => onNavigate({ name: 'catalog' })}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#F97316] text-slate-950 font-bold rounded-2xl shadow-soft hover:bg-[#EA580C] transition-all cursor-pointer"
        >
          <span>Découvrir la sélection</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const supplierEntries = Object.entries(itemsBySupplier);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      
      <Breadcrumbs
        items={[
          { label: 'Accueil', onClick: () => onNavigate({ name: 'home' }) },
          { label: 'Ma sélection', active: true },
        ]}
      />

      <div className="my-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
            Commande directe
          </span>
          <h1 className="font-heading text-3xl font-bold text-slate-900 mt-1">
            Ma Sélection ({totalCount} {totalCount > 1 ? 'pièces' : 'pièce'})
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-slate-500 hover:text-red-600 transition-colors cursor-pointer self-start sm:self-auto"
        >
          Vider toute ma sélection
        </button>
      </div>

      {/* Explanatory note on multi-supplier cart */}
      <div className="bg-[#DBEAFE]/40 border border-[#1E3A8A]/20 rounded-2xl p-4 mb-8 flex items-start gap-3 text-xs sm:text-sm text-slate-700">
        <Info className="w-5 h-5 text-[#1E3A8A] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Principe du circuit direct :</strong> Vos objets proviennent directement d&apos;ateliers indépendants en Europe. Pour vous garantir le prix fabricant sans intermédiaire, chaque atelier dispose de son propre bouton de commande sécurisé ci-dessous.
        </div>
      </div>

      {/* Grouped by Supplier list */}
      <div className="space-y-8">
        {supplierEntries.map(([supplierId, group]) => {
          const supplier = suppliersMap[supplierId];

          return (
            <div
              key={supplierId}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft"
            >
              {/* Supplier Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#DBEAFE] text-[#1E3A8A] flex items-center justify-center font-bold text-xs">
                    {supplier?.countryCode || 'UE'}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {group.supplierName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Expédition depuis {supplier?.city || group.supplierCountry} · {supplier?.averageShippingDays || '3-5 jours'}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-500">Sous-total atelier : </span>
                  <span className="font-mono font-bold text-base text-slate-950 tabular-nums">
                    {group.subtotal.toFixed(2).replace('.', ',')} €
                  </span>
                </div>
              </div>

              {/* Items in this group */}
              <div className="divide-y divide-slate-100 my-4">
                {group.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div
                      onClick={() => onSelectProduct(item.product)}
                      className="flex items-center gap-4 cursor-pointer group min-w-0"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-100"
                      />
                      <div className="min-w-0">
                        <h4 className="font-semibold text-slate-900 text-sm group-hover:text-[#1E3A8A] transition-colors truncate">
                          {item.product.title}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {item.product.price.toFixed(2).replace('.', ',')} € l&apos;unité
                        </p>
                      </div>
                    </div>

                    {/* Quantity controls & Remove */}
                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-2 py-1 bg-slate-50">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-slate-600 hover:text-slate-900 transition-colors"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-xs font-semibold px-2 text-slate-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-slate-600 hover:text-slate-900 transition-colors"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-mono font-bold text-sm text-slate-950 tabular-nums w-20 text-right">
                        {(item.product.price * item.quantity).toFixed(2).replace('.', ',')} €
                      </span>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        aria-label={`Supprimer ${item.product.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order at this supplier button */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-500 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#1E3A8A]" />
                    <span>Frais de port : {supplier?.shippingCost || 'Calculé à l\'étape suivante'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>Retours acceptés sous {supplier?.returnPolicyDays || 30} jours</span>
                  </div>
                </div>

                <button
                  onClick={() => handleOrderSupplierGroup(supplierId)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-slate-950 bg-[#F97316] hover:bg-[#EA580C] rounded-xl shadow-soft transition-all duration-150 active:scale-95 cursor-pointer"
                >
                  <span>Commander chez {group.supplierName}</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Global summary card */}
      <div className="mt-8 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-soft-lg">
        <div>
          <span className="text-xs uppercase tracking-wider text-slate-400">
            Total indicatif de l&apos;ensemble de vos pièces
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-mono text-3xl font-extrabold text-white tabular-nums">
              {totalAmount.toFixed(2).replace('.', ',')} €
            </span>
            <span className="text-xs text-slate-400">TTC</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Les paiements s&apos;effectuent de façon indépendante et sécurisée auprès de chaque atelier.
          </p>
        </div>

        <button
          onClick={() => onNavigate({ name: 'catalog' })}
          className="px-6 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-white transition-colors cursor-pointer"
        >
          Continuer mes découvertes
        </button>
      </div>

    </div>
  );
};
