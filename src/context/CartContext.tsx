import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Supplier } from '../types';
import { getSupplierById } from '../lib/api';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalAmount: number;
  // Grouped items by supplier for multi-supplier affiliate checkout
  itemsBySupplier: Record<string, { supplierId: string; supplierName: string; supplierCountry: string; items: CartItem[]; subtotal: number }>;
  // Supplier redirect modal trigger
  pendingRedirectSupplier: Supplier | null;
  pendingRedirectProduct: Product | null;
  openSupplierRedirectModal: (supplier: Supplier, product?: Product) => void;
  closeSupplierRedirectModal: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('maison_terroir_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [pendingRedirectSupplier, setPendingRedirectSupplier] = useState<Supplier | null>(null);
  const [pendingRedirectProduct, setPendingRedirectProduct] = useState<Product | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('maison_terroir_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Group items by supplier
  const itemsBySupplier = items.reduce((acc, item) => {
    const sId = item.product.supplierId;
    if (!acc[sId]) {
      acc[sId] = {
        supplierId: sId,
        supplierName: item.product.supplierName,
        supplierCountry: item.product.supplierCountry,
        items: [],
        subtotal: 0,
      };
    }
    acc[sId].items.push(item);
    acc[sId].subtotal += item.product.price * item.quantity;
    return acc;
  }, {} as CartContextType['itemsBySupplier']);

  const openSupplierRedirectModal = (supplier: Supplier, product?: Product) => {
    setPendingRedirectSupplier(supplier);
    setPendingRedirectProduct(product || null);
  };

  const closeSupplierRedirectModal = () => {
    setPendingRedirectSupplier(null);
    setPendingRedirectProduct(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        totalAmount,
        itemsBySupplier,
        pendingRedirectSupplier,
        pendingRedirectProduct,
        openSupplierRedirectModal,
        closeSupplierRedirectModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
