import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { PageRoute, Product } from './types';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CookieConsent } from './components/common/CookieConsent';
import { ToastContainer } from './components/common/ToastContainer';
import { SupplierRedirectModal } from './components/common/SupplierRedirectModal';
import { SearchModal } from './components/pages/SearchModal';
import { HomePage } from './components/pages/HomePage';
import { CatalogPage } from './components/pages/CatalogPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { CartPage } from './components/pages/CartPage';
import { AboutPage } from './components/pages/AboutPage';
import { DeliveryReturnsPage } from './components/pages/DeliveryReturnsPage';
import { FAQPage } from './components/pages/FAQPage';
import { ContactPage } from './components/pages/ContactPage';
import { LegalPage } from './components/pages/LegalPage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { SupabaseStatusModal } from './components/common/SupabaseStatusModal';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>({ name: 'home' });
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false);

  // Global keyboard shortcut for search (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (route: PageRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    handleNavigate({ name: 'product', slug: product.slug });
  };

  const renderCurrentPage = () => {
    switch (currentRoute.name) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        );
      case 'catalog':
        return (
          <CatalogPage
            initialCategoryId={currentRoute.categoryId}
            initialSupplierId={currentRoute.supplierId}
            initialSearch={currentRoute.search}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        );
      case 'product':
        return (
          <ProductDetailPage
            slug={currentRoute.slug}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        );
      case 'cart':
        return (
          <CartPage
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        );
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'delivery':
        return <DeliveryReturnsPage onNavigate={handleNavigate} />;
      case 'faq':
        return <FAQPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'legal':
        return <LegalPage initialSubpage={currentRoute.subpage} onNavigate={handleNavigate} />;
      default:
        return <NotFoundPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <ToastProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#111827] selection:bg-[#DBEAFE] selection:text-[#1E3A8A]">
          {/* Header */}
          <Header
            currentRoute={currentRoute}
            onNavigate={handleNavigate}
            onOpenSearch={() => setSearchModalOpen(true)}
          />

          {/* Main Content with soft page transition */}
          <main className="flex-1 w-full" id="main-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={
                  currentRoute.name === 'product'
                    ? `product-${currentRoute.slug}`
                    : currentRoute.name === 'catalog'
                    ? `catalog-${currentRoute.categoryId || 'all'}-${currentRoute.supplierId || 'all'}`
                    : currentRoute.name
                }
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                {renderCurrentPage()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Footer */}
          <Footer
            onNavigate={handleNavigate}
            onOpenSupabaseStatus={() => setSupabaseModalOpen(true)}
          />

          {/* Global Modals & Overlays */}
          <SupplierRedirectModal />
          <CookieConsent onOpenPrivacy={() => handleNavigate({ name: 'legal', subpage: 'confidentialite' })} />
          <ToastContainer />
          <SearchModal
            isOpen={searchModalOpen}
            onClose={() => setSearchModalOpen(false)}
            onSelectProduct={handleSelectProduct}
            onNavigateToCatalog={(q) => handleNavigate({ name: 'catalog', search: q })}
          />
          <SupabaseStatusModal
            isOpen={supabaseModalOpen}
            onClose={() => setSupabaseModalOpen(false)}
          />
        </div>
      </CartProvider>
    </ToastProvider>
  );
}
