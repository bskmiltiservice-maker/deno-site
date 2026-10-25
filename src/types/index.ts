export interface Supplier {
  id: string;
  name: string;
  slug: string;
  country: string;
  countryCode: string; // 'FR' | 'PT' | 'ES' | 'IT' | 'DE' | 'BE' | 'SE'
  city: string;
  foundingYear: number;
  bio: string;
  specialty: string;
  averageShippingDays: string;
  shippingCost: string;
  freeShippingThreshold?: number;
  returnPolicyDays: number;
  returnPolicyDetails: string;
  verifiedArtisan: boolean;
  websiteUrl: string;
  affiliateCommissionRate: string; // Transparency: e.g. "8% per purchase"
  avatarUrl?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  supplierId: string;
  supplierName: string;
  supplierCountry: string;
  categoryId: string;
  categoryName: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  stockNote?: string;
  images: string[];
  shortDescription: string;
  fullDescription: string;
  materials: string[];
  dimensions?: string;
  weight?: string;
  ecoLabels: string[];
  rating: number;
  reviewCount: number;
  featured?: boolean;
  bestSeller?: boolean;
  directSupplierUrl: string;
  shippingEstimate: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconName: string;
  productCount: number;
}

export interface Review {
  id: string;
  productId?: string;
  authorName: string;
  authorCity: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  productTitle?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface FilterState {
  categoryId: string;
  supplierId: string;
  minPrice: number;
  maxPrice: number;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  ecoOnly: boolean;
}

export type PageRoute = 
  | { name: 'home' }
  | { name: 'catalog'; categoryId?: string; supplierId?: string; search?: string }
  | { name: 'product'; slug: string }
  | { name: 'cart' }
  | { name: 'about' }
  | { name: 'contact' }
  | { name: 'delivery' }
  | { name: 'faq' }
  | { name: 'legal'; subpage?: 'mentions' | 'cgu' | 'confidentialite' | 'cookies' | 'affiliation' }
  | { name: 'not-found' };
