import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  HeartHandshake, 
  ExternalLink, 
  ShoppingBag, 
  Star, 
  Check, 
  MapPin, 
  Info,
  Layers,
  Sparkles
} from 'lucide-react';
import { Product, Supplier, PageRoute } from '../../types';
import { getProductBySlug, getSupplierById, getSimilarProducts } from '../../lib/api';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { ProductCard } from '../common/ProductCard';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (route: PageRoute) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  onNavigate,
  onSelectProduct,
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [similar, setSimilar] = useState<Product[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const { addToCart, openSupplierRedirectModal } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    setLoading(true);
    let active = true;
    getProductBySlug(slug).then((prod) => {
      if (!active) return;
      if (prod) {
        setProduct(prod);
        setActiveImageIndex(0);
        getSupplierById(prod.supplierId).then((sup) => {
          if (active && sup) setSupplier(sup);
        });
        getSimilarProducts(prod.id, 3).then((sims) => {
          if (active) setSimilar(sims);
        });
      }
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-48 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 aspect-4/3 bg-slate-200 rounded-3xl" />
          <div className="lg:col-span-5 space-y-4">
            <div className="h-8 bg-slate-200 rounded w-3/4" />
            <div className="h-6 bg-slate-200 rounded w-1/4" />
            <div className="h-24 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Cet objet n&apos;est plus disponible</h2>
        <p className="text-slate-600 mb-6">L&apos;atelier partenaire a peut-être clos cette série.</p>
        <button
          onClick={() => onNavigate({ name: 'catalog' })}
          className="px-6 py-2.5 bg-[#1E3A8A] text-white rounded-xl text-sm font-semibold"
        >
          Retourner au catalogue
        </button>
      </div>
    );
  }

  const handleDirectOrder = () => {
    if (supplier) {
      openSupplierRedirectModal(supplier, product);
    } else {
      window.open(product.directSupplierUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    addToast(
      'Ajouté à votre sélection',
      `${product.title} est dans votre panier. Vous pourrez finaliser commande par commande.`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-16">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Accueil', onClick: () => onNavigate({ name: 'home' }) },
          { label: 'Catalogue', onClick: () => onNavigate({ name: 'catalog' }) },
          { label: product.categoryName, onClick: () => onNavigate({ name: 'catalog', categoryId: product.categoryId }) },
          { label: product.title, active: true },
        ]}
      />

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 mt-6">
        
        {/* Left Column: Photo Gallery with Thumbnails & Zoom */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/3 sm:aspect-5/4 w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-soft">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {product.bestSeller && (
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-[#1E3A8A] text-xs font-semibold px-3 py-1 rounded-xl shadow-xs">
                Coup de cœur sélection
              </div>
            )}
          </div>

          {/* Thumbnails if multiple images */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#1E3A8A] ring-2 ring-blue-100'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Detailed Materials & Dimensions Accordion / Tabs */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <h3 className="font-heading text-lg font-bold text-slate-900">
              Matières & fabrication responsable
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="bg-white p-4 rounded-2xl border border-slate-200/70">
                <span className="text-slate-500 font-semibold uppercase tracking-wider block mb-1">
                  Matières premières
                </span>
                <ul className="space-y-1 text-slate-800">
                  {product.materials.map((m, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/70">
                <span className="text-slate-500 font-semibold uppercase tracking-wider block mb-1">
                  Dimensions & Poids
                </span>
                <p className="text-slate-800">{product.dimensions || 'Non spécifié'}</p>
                {product.weight && (
                  <p className="text-slate-500 mt-1">Poids : {product.weight}</p>
                )}
              </div>
            </div>

            {/* Eco Labels list */}
            {product.ecoLabels.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs text-slate-500 font-medium mr-1">Engagements :</span>
                {product.ecoLabels.map((label, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 font-medium"
                  >
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>{label}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Info */}
          <div>
            {/* Origin & Category */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <span className="font-semibold text-[#1E3A8A] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {product.supplierCountry}
              </span>
              <span aria-hidden="true">·</span>
              <span>{product.categoryName}</span>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              {product.title}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-700">
                {product.rating} / 5
              </span>
              <span className="text-xs text-slate-400">
                ({product.reviewCount} avis vérifiés)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 my-4">
              <span className="font-mono text-3xl font-extrabold text-slate-950 tabular-nums">
                {product.price.toFixed(2).replace('.', ',')} €
              </span>
              {product.originalPrice && (
                <span className="font-mono text-base text-slate-400 line-through tabular-nums">
                  {product.originalPrice.toFixed(2).replace('.', ',')} €
                </span>
              )}
              <span className="text-xs text-slate-500">TTC · Livraison calculée chez l&apos;artisan</span>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              {product.fullDescription}
            </p>
          </div>

          {/* Supplier Identity Card (Mandatory Transparent Box) */}
          {supplier && (
            <div className="bg-[#DBEAFE]/40 border border-[#1E3A8A]/20 rounded-2xl p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1E3A8A]">
                    Vendu & Expédié en direct par
                  </span>
                  <h4 className="text-base font-bold text-slate-900">
                    {supplier.name}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {supplier.city}, {supplier.country} · Fondé en {supplier.foundingYear}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-white text-[#1E3A8A] flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                  {supplier.countryCode}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {supplier.bio}
              </p>

              <div className="pt-3 border-t border-[#1E3A8A]/10 grid grid-cols-2 gap-2 text-xs text-slate-700">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#1E3A8A] shrink-0" />
                  <span>{supplier.averageShippingDays}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-[#1E3A8A] shrink-0" />
                  <span>{supplier.returnPolicyDays} j. pour changer d&apos;avis</span>
                </div>
              </div>
            </div>
          )}

          {/* Direct Purchase Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleDirectOrder}
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-base font-bold text-slate-950 bg-[#F97316] hover:bg-[#EA580C] rounded-2xl shadow-soft hover:shadow-soft-hover transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <span>Commander chez {product.supplierName}</span>
              <ExternalLink className="w-4 h-4" />
            </button>

            <button
              onClick={handleAddToCart}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#1E3A8A] hover:bg-blue-50 border border-[#1E3A8A]/30 rounded-2xl transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Garder dans ma sélection</span>
            </button>
          </div>

          {/* Affiliation Disclosure Note */}
          <div className="p-3.5 bg-slate-100 rounded-xl text-[11px] text-slate-600 leading-relaxed flex items-start gap-2.5">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <span>
              <strong>Lien affilié transparent :</strong> Lorsque vous achetez via ce bouton, nous percevons une commission partenaire de la part de l&apos;artisan sans aucun supplément pour vous.
            </span>
          </div>

        </div>

      </div>

      {/* Sticky Bottom Action Bar for Mobile (Zones tactiles >= 44px) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 z-30 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="block text-[11px] text-slate-500 font-medium">Prix direct</span>
          <span className="font-mono font-bold text-lg text-slate-950 tabular-nums">
            {product.price.toFixed(2).replace('.', ',')} €
          </span>
        </div>
        <button
          onClick={handleDirectOrder}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 min-h-[44px] text-sm font-bold text-slate-950 bg-[#F97316] hover:bg-[#EA580C] rounded-xl shadow-xs"
        >
          <span>Commander</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Similar Products Section */}
      {similar.length > 0 && (
        <section className="mt-20 pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
                Découvertes complémentaires
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                Dans le même esprit artisanal
              </h3>
            </div>
            <button
              onClick={() => onNavigate({ name: 'catalog', categoryId: product.categoryId })}
              className="text-xs sm:text-sm font-semibold text-[#1E3A8A] hover:underline"
            >
              Voir la catégorie
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similar.map((sim) => (
              <ProductCard
                key={sim.id}
                product={sim}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
