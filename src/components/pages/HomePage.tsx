import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  HeartHandshake, 
  ExternalLink,
  Sparkles,
  MapPin,
  CheckCircle2,
  Package,
  Layers,
  Star
} from 'lucide-react';
import { Product, Supplier, Category, Review, PageRoute } from '../../types';
import { getFeaturedProducts, getCategories, getSuppliers, getReviews } from '../../lib/api';
import { ProductCard } from '../common/ProductCard';
import { CatalogSkeletonGrid } from '../common/SkeletonLoader';
import { useCart } from '../../context/CartContext';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onSelectProduct: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProduct }) => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { openSupplierRedirectModal } = useCart();

  useEffect(() => {
    let active = true;
    Promise.all([
      getFeaturedProducts(),
      getCategories(),
      getSuppliers(),
      getReviews(),
    ]).then(([fProds, cats, sups, revs]) => {
      if (active) {
        setFeaturedProducts(fProds);
        setCategories(cats.filter((c) => c.id !== 'cat-all'));
        setSuppliers(sups);
        setReviews(revs);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      
      {/* 1. HERO SECTION : Humanist, airy, authentic with 2-column split */}
      <section className="relative pt-6 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Honest, calm kicker */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1E3A8A] bg-[#DBEAFE]/60 px-3.5 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                <span>Choisi avec soin pour vous · Fabrication Européenne</span>
              </div>

              <h1 className="font-heading text-fluid-hero font-bold text-slate-900 tracking-tight text-balance">
                Des objets durables et chaleureux, direct de l&apos;atelier chez vous.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Maison Terroir sélectionne avec patience des pièces façonnées par des artisans européens passionnés. Pas d&apos;intermédiaire opaque ni de fausse promo : vous commandez directement sur leur boutique officielle.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate({ name: 'catalog' })}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-slate-950 bg-[#F97316] hover:bg-[#EA580C] rounded-2xl shadow-soft hover:shadow-soft-hover transition-all duration-200 active:scale-[0.98] cursor-pointer"
                >
                  <span>Explorer le catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#comment-ca-marche"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-[#1E3A8A] hover:bg-[#DBEAFE]/40 border border-[#1E3A8A]/20 rounded-2xl transition-colors cursor-pointer"
                >
                  Comment ça marche ?
                </a>
              </div>

              {/* Quick trust metrics */}
              <div className="pt-4 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-xs sm:text-sm text-slate-600">
                <div>
                  <strong className="block text-slate-900 font-bold font-mono text-base sm:text-lg">100 %</strong>
                  <span>Ateliers européens</span>
                </div>
                <div>
                  <strong className="block text-slate-900 font-bold font-mono text-base sm:text-lg">0 €</strong>
                  <span>Surcoût affilié</span>
                </div>
                <div>
                  <strong className="block text-slate-900 font-bold font-mono text-base sm:text-lg">30 j.</strong>
                  <span>Garantie de retour</span>
                </div>
              </div>
            </motion.div>

            {/* Right Visual Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-soft-lg bg-slate-100 border border-slate-200/60 aspect-4/3 lg:aspect-5/4">
                <img
                  src="/src/assets/images/hero_humanist_lifestyle_1792958391447.jpg"
                  alt="Deux artisanes souriantes dans leur atelier ensoleillé"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {/* Floating caption card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-soft border border-slate-200/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFEDD5] text-[#F97316] flex items-center justify-center font-bold text-sm shrink-0">
                      PT
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">
                        Atelier Barro & Sol · Caldas da Rainha
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Céramistes partenaires depuis 2024 · Grès cuit au four écologique
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. CATEGORIES PREVIEW (Horizontal clean cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
              Les Univers de l&apos;artisanat
            </span>
            <h2 className="text-fluid-section font-bold text-slate-900 mt-1">
              Des créations faites pour durer
            </h2>
          </div>
          <button
            onClick={() => onNavigate({ name: 'catalog' })}
            className="text-sm font-semibold text-[#1E3A8A] hover:text-[#172554] flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <span>Voir tout le catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigate({ name: 'catalog', categoryId: cat.id })}
              className="group bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft hover:shadow-soft-hover hover:border-[#1E3A8A]/30 text-left transition-all duration-200 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-[#DBEAFE]/50 text-[#1E3A8A] flex items-center justify-center mb-3 group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm sm:text-base group-hover:text-[#1E3A8A] transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {cat.description}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS COLLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
              Notre sélection du moment
            </span>
            <h2 className="text-fluid-section font-bold text-slate-900 mt-1">
              Coups de cœur de nos ateliers
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Chaque objet est commandé en direct auprès de son créateur, sans passer par un entrepôt centralisé.
          </p>
        </div>

        {loading ? (
          <CatalogSkeletonGrid count={3} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        )}
      </section>

      {/* 4. "COMMENT ÇA MARCHE" : 3 Clear, reassuring steps */}
      <section id="comment-ca-marche" className="bg-[#DBEAFE]/30 py-16 sm:py-20 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
              Simple & Transparent
            </span>
            <h2 className="text-fluid-section font-bold text-slate-900 mt-1 text-balance">
              Comment fonctionne Maison Terroir ?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Notre rôle est de dénicher des merveilles artisanales. Vous achetez toujours en direct chez l&apos;artisan officiel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200/70 text-left relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#DBEAFE] text-[#1E3A8A] font-bold text-lg flex items-center justify-center mb-5">
                  1
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Je choisis sur notre sélection
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Nous testons et documentons chaque pièce : provenance des matières premières, méthodes de fabrication et conditions de travail des artisans.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 text-xs text-slate-500 font-medium">
                Critères : 100% fabriqué en Europe & matériaux nobles.
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200/70 text-left relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFEDD5] text-[#EA580C] font-bold text-lg flex items-center justify-center mb-5">
                  2
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Je commande chez l&apos;artisan
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  En cliquant sur &laquo; Commander &raquo;, vous êtes redirigé sur le site officiel de l&apos;atelier partenaire. Vous payez directement chez lui, en toute sécurité.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 text-xs text-slate-500 font-medium">
                Zéro frais supplémentaires, prix fabricant garanti.
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200/70 text-left relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#16A34A] font-bold text-lg flex items-center justify-center mb-5">
                  3
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Je reçois mon colis chez moi
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  L&apos;artisan prépare votre colis avec soin et vous l&apos;expédie avec un numéro de suivi européen. Vous disposez de 30 jours pour changer d&apos;avis.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 text-xs text-slate-500 font-medium">
                Emballage sans plastique & retours sereins.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ARTISAN SPOTLIGHT : Human touch with craftsman image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1E3A8A] text-white rounded-3xl overflow-hidden shadow-soft-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[460px]">
              <img
                src="/src/assets/images/artisan_leather_craft_1792958395418.jpg"
                alt="Mains d'un artisan maroquinier cousant le cuir toscan"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/80 via-transparent to-transparent lg:hidden" />
            </div>

            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-wider text-[#FFEDD5] font-semibold">
                  Rencontre d&apos;artisan
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Marco & Lorenzo · Cuir & Héritage Toscan (Florence)
                </h2>
                <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                  &laquo; Nous tannons encore nos cuirs avec des écorces de châtaignier et de mimosa, comme le faisaient nos aïeuls en 1920. Rien ne remplace le temps et le geste de la main. Maison Terroir nous permet de toucher directement des passionnés de toute l&apos;Europe sans être étouffés par les géants du web. &raquo;
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-blue-800/80 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-blue-200">
                  <span className="font-semibold text-white">Spécialité :</span> Carnets & accessoires au tannage végétal certifié
                </div>
                <button
                  onClick={() => onNavigate({ name: 'catalog', supplierId: 'sup-4' })}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#F97316] text-slate-950 hover:bg-[#EA580C] transition-colors cursor-pointer"
                >
                  <span>Découvrir l&apos;atelier toscan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. TRUST PILLARS : Reassurance without aggressive sales copy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">Ateliers audités</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nous vérifions l&apos;existence physique de chaque atelier et la réalité de la fabrication européenne.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center mb-4">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">Prix fabricant exact</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Vous ne payez pas un euro de plus qu&apos;en commandant en direct : notre commission est déduite de la marge de l&apos;artisan.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center mb-4">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">Circuits courts UE</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Colis acheminés en transport terrestre depuis les ateliers (France, Suède, Portugal, Italie, Belgique).
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center mb-4">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">30 jours d&apos;essai</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Si l&apos;objet ne vous convient pas, vous pouvez le retourner simplement auprès de son fabricant.
            </p>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
            Témoignages sincères
          </span>
          <h2 className="text-fluid-section font-bold text-slate-900 mt-1">
            Ceux qui ont franchi le pas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic mb-4">
                  &laquo; {rev.comment} &raquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div>
                  <p className="font-semibold text-slate-900">{rev.authorName}</p>
                  <p>{rev.authorCity}</p>
                </div>
                <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                  Achat vérifié
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
