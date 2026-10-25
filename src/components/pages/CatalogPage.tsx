import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  X,
  Filter
} from 'lucide-react';
import { Product, Supplier, Category, FilterState, PageRoute } from '../../types';
import { getFilteredProducts, getCategories, getSuppliers, FilteredProductsResult } from '../../lib/api';
import { ProductCard } from '../common/ProductCard';
import { CatalogSkeletonGrid } from '../common/SkeletonLoader';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface CatalogPageProps {
  initialCategoryId?: string;
  initialSupplierId?: string;
  initialSearch?: string;
  onNavigate: (route: PageRoute) => void;
  onSelectProduct: (product: Product) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  initialCategoryId,
  initialSupplierId,
  initialSearch,
  onNavigate,
  onSelectProduct,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    categoryId: initialCategoryId || 'cat-all',
    supplierId: initialSupplierId || 'all',
    minPrice: 0,
    maxPrice: 200,
    searchQuery: initialSearch || '',
    sortBy: 'featured',
    ecoOnly: false,
  });

  const [page, setPage] = useState(1);
  const [result, setResult] = useState<FilteredProductsResult>({
    products: [],
    total: 0,
    page: 1,
    totalPages: 1,
  });

  // Load categories & suppliers on mount
  useEffect(() => {
    Promise.all([getCategories(), getSuppliers()]).then(([cats, sups]) => {
      setCategories(cats);
      setSuppliers(sups);
    });
  }, []);

  // Update filters if initial props change
  useEffect(() => {
    if (initialCategoryId) {
      setFilters((f) => ({ ...f, categoryId: initialCategoryId }));
      setPage(1);
    }
  }, [initialCategoryId]);

  useEffect(() => {
    if (initialSupplierId) {
      setFilters((f) => ({ ...f, supplierId: initialSupplierId }));
      setPage(1);
    }
  }, [initialSupplierId]);

  useEffect(() => {
    if (initialSearch !== undefined) {
      setFilters((f) => ({ ...f, searchQuery: initialSearch }));
      setPage(1);
    }
  }, [initialSearch]);

  // Fetch filtered products
  useEffect(() => {
    setLoading(true);
    let active = true;
    getFilteredProducts(filters, page, 6).then((res) => {
      if (active) {
        setResult(res);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [filters, page]);

  const handleResetFilters = () => {
    setFilters({
      categoryId: 'cat-all',
      supplierId: 'all',
      minPrice: 0,
      maxPrice: 200,
      searchQuery: '',
      sortBy: 'featured',
      ecoOnly: false,
    });
    setPage(1);
  };

  const activeCategoryName =
    categories.find((c) => c.id === filters.categoryId)?.name || 'Tous les produits';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Accueil', onClick: () => onNavigate({ name: 'home' }) },
          { label: 'Catalogue', onClick: () => handleResetFilters() },
          { label: activeCategoryName, active: true },
        ]}
      />

      {/* Header Banner */}
      <div className="my-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
            Catalogue Européen
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
            {activeCategoryName}
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-xl">
            Toutes les créations sont façonnées sur le sol européen et expédiées directement depuis les ateliers sans stock intermédiaire.
          </p>
        </div>

        {/* Total count badge & Sort dropdown */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 whitespace-nowrap">
            {result.total} {result.total > 1 ? 'pièces trouvées' : 'pièce trouvée'}
          </span>

          <label className="sr-only" htmlFor="sort-select">Trier les produits</label>
          <select
            id="sort-select"
            value={filters.sortBy}
            onChange={(e) => {
              setFilters((f) => ({ ...f, sortBy: e.target.value as FilterState['sortBy'] }));
              setPage(1);
            }}
            className="text-xs sm:text-sm font-medium bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] cursor-pointer"
          >
            <option value="featured">Sélection recommandée</option>
            <option value="price-asc">Prix : croissant</option>
            <option value="price-desc">Prix : décroissant</option>
            <option value="rating">Mieux notés</option>
          </select>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
            aria-label="Ouvrir les filtres"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filtres</span>
          </button>
        </div>
      </div>

      {/* Interactive Category Segmented Tabs (Clean buttons, NOT static pills) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = filters.categoryId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setFilters((f) => ({ ...f, categoryId: cat.id }));
                setPage(1);
              }}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-all duration-150 cursor-pointer ${
                isSelected
                  ? 'bg-[#1E3A8A] text-white shadow-soft'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Main Grid + Sidebar Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className={`md:block ${mobileFilterOpen ? 'block' : 'hidden'} md:col-span-1 space-y-6 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft h-fit`}>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#1E3A8A]" />
              <span>Affiner la sélection</span>
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs text-slate-500 hover:text-[#F97316] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Réinitialiser</span>
            </button>
          </div>

          {/* Supplier Filter */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Atelier & Pays
            </label>
            <select
              value={filters.supplierId}
              onChange={(e) => {
                setFilters((f) => ({ ...f, supplierId: e.target.value }));
                setPage(1);
              }}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
            >
              <option value="all">Tous les ateliers européens</option>
              {suppliers.map((sup) => (
                <option key={sup.id} value={sup.id}>
                  {sup.name} ({sup.country})
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              <span>Prix maximum</span>
              <span className="font-mono text-slate-900">{filters.maxPrice} €</span>
            </div>
            <input
              type="range"
              min="20"
              max="200"
              step="5"
              value={filters.maxPrice}
              onChange={(e) => {
                setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }));
                setPage(1);
              }}
              className="w-full accent-[#1E3A8A] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
              <span>20 €</span>
              <span>100 €</span>
              <span>200 €</span>
            </div>
          </div>

          {/* Eco Commitment Checkbox */}
          <div className="pt-2">
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.ecoOnly}
                onChange={(e) => {
                  setFilters((f) => ({ ...f, ecoOnly: e.target.checked }));
                  setPage(1);
                }}
                className="w-4 h-4 text-[#1E3A8A] rounded border-slate-300 focus:ring-[#1E3A8A]"
              />
              <span className="font-medium">Certifications éco-responsables uniquement</span>
            </label>
          </div>

          {/* Search keyword inside catalog */}
          <div className="pt-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Mot-clé
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => {
                  setFilters((f) => ({ ...f, searchQuery: e.target.value }));
                  setPage(1);
                }}
                placeholder="Ex. laine, chêne..."
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              />
            </div>
          </div>

          {/* Supplier Transparency reminder */}
          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
            💡 Chaque achat profite directement à l&apos;artisan. Livraison assurée sans intermédiaires inutiles.
          </div>
        </aside>

        {/* Product Grid & Pagination Area */}
        <div className="md:col-span-3 space-y-8">
          {loading ? (
            <CatalogSkeletonGrid count={6} />
          ) : result.products.length === 0 ? (
            /* Friendly, warm empty state */
            <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-200/80 text-center shadow-soft">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#F97316] flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
                Aucun objet ne correspond exactement à ces critères
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                Nos artisans fabriquent en petites séries. Vous pouvez élargir votre filtre de prix ou explorer une autre catégorie.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1E3A8A] text-white text-xs font-semibold rounded-xl hover:bg-[#172554] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Réinitialiser les filtres</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {result.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {result.totalPages > 1 && (
            <div className="pt-6 border-t border-slate-200/80 flex items-center justify-between">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Précédent</span>
              </button>

              <span className="text-xs font-medium text-slate-600">
                Page <strong className="font-mono text-slate-900">{page}</strong> sur{' '}
                <span className="font-mono">{result.totalPages}</span>
              </span>

              <button
                disabled={page >= result.totalPages}
                onClick={() => setPage((p) => Math.min(result.totalPages, p + 1))}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <span>Suivant</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
