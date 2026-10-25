import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, ShoppingBag, Eye, Star, MapPin } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickView,
}) => {
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    addToast(
      'Ajouté à votre sélection',
      `${product.title} a été ajouté à votre panier partagé.`
    );
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(product)}
      className="group bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-soft hover:shadow-soft-hover transition-shadow flex flex-col justify-between cursor-pointer focus-within:ring-2 focus-within:ring-[#1E3A8A]"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(product);
        }
      }}
      aria-label={`${product.title}, ${product.price} euros, vendu par ${product.supplierName}`}
    >
      <div>
        {/* Image Container (65-70% visual weight) */}
        <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-100 mb-4">
          {!imageError ? (
            <img
              src={product.images[0]}
              alt={product.title}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-blue-50 text-[#1E3A8A] p-4 text-center">
              <ShoppingBag className="w-8 h-8 opacity-60 mb-2" />
              <span className="text-xs font-medium text-slate-700">{product.title}</span>
            </div>
          )}

          {/* Discreet Single Status Kicker (NO candy pill clusters) */}
          {product.bestSeller && (
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#1E3A8A] text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-xs">
              Coup de cœur
            </div>
          )}

          {/* Quick view on hover (desktop) */}
          {onQuickView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="absolute bottom-3 right-3 hidden sm:flex items-center gap-1.5 bg-white/90 hover:bg-white text-slate-800 text-xs font-medium px-3 py-1.5 rounded-xl shadow-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              aria-label={`Aperçu rapide de ${product.title}`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Aperçu</span>
            </button>
          )}
        </div>

        {/* Clean Metadata with Typographic Separators (Zero-Pill Rule) */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
          <span className="font-medium text-[#1E3A8A] flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            {product.supplierCountry}
          </span>
          <span aria-hidden="true">·</span>
          <span className="truncate">{product.categoryName}</span>
        </div>

        {/* Product Title */}
        <h3 className="text-base font-semibold text-slate-900 group-hover:text-[#1E3A8A] transition-colors line-clamp-2 leading-snug mb-2">
          {product.title}
        </h3>

        {/* Honest Supplier Attribution */}
        <p className="text-xs text-slate-600 line-clamp-1 mb-3">
          Vendu et expédié par{' '}
          <strong className="text-slate-800 font-medium">{product.supplierName}</strong>
        </p>
      </div>

      {/* Bottom Bar: Price & Action */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-slate-950 font-mono tabular-nums">
              {product.price.toFixed(2).replace('.', ',')} €
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                {product.originalPrice.toFixed(2).replace('.', ',')} €
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-amber-700 mt-0.5">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="font-semibold">{product.rating}</span>
            <span className="text-slate-400">({product.reviewCount})</span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-[#FFEDD5] hover:bg-[#F97316] hover:text-white rounded-xl transition-all duration-150 cursor-pointer shadow-2xs shrink-0 active:scale-95"
          aria-label={`Ajouter ${product.title} au panier`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Sélectionner</span>
        </button>
      </div>
    </motion.article>
  );
};
