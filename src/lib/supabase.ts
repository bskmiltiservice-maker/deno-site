import { createClient } from '@supabase/supabase-js';

// Supabase credentials for project "site beno" (ID: gnlewlhthhricqqfhbzs)
const env = typeof import.meta !== 'undefined' ? (import.meta as unknown as { env?: Record<string, string> }).env : undefined;

export const SUPABASE_URL =
  env?.VITE_SUPABASE_URL || 'https://gnlewlhthhricqqfhbzs.supabase.co';

export const SUPABASE_ANON_KEY =
  env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_y-vyVEAjFJALi6KZFIjbyA_Y4lu6LDZ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/**
 * Checks connection to the Supabase REST API endpoint.
 */
export async function checkSupabaseConnection(): Promise<{
  connected: boolean;
  message: string;
  hasTables?: boolean;
}> {
  try {
    const { data, error } = await supabase.from('products').select('count', { count: 'exact', head: true });
    
    if (error) {
      // 404, PGRST205 or relation does not exist means Supabase connection works, but tables are pending migration
      if (
        error.code === '42P01' ||
        error.code === 'PGRST205' ||
        error.message.includes('relation') ||
        error.message.includes('does not exist') ||
        error.message.includes('schema cache')
      ) {
        return {
          connected: true,
          hasTables: false,
          message: 'Connecté avec succès à Supabase (Tables SQL à initialiser).',
        };
      }
      return {
        connected: false,
        message: error.message,
      };
    }

    return {
      connected: true,
      hasTables: true,
      message: 'Connecté avec succès à Supabase (Tables prêtes).',
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur de connexion inconnue';
    return {
      connected: false,
      message,
    };
  }
}

/**
 * SQL Schema migration statement for Supabase SQL Editor
 */
export const SUPABASE_SQL_SCHEMA = `-- Script de création des tables Maison Terroir dans Supabase (site beno)
-- Copiez et exécutez ce script dans : Dashboard Supabase > SQL Editor > New Query

-- 1. Table Fournisseurs / Ateliers
CREATE TABLE IF NOT EXISTS public.suppliers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  country TEXT NOT NULL,
  country_code TEXT NOT NULL,
  city TEXT NOT NULL,
  founding_year INT,
  bio TEXT,
  specialty TEXT,
  average_shipping_days TEXT,
  shipping_cost TEXT,
  free_shipping_threshold NUMERIC,
  return_policy_days INT DEFAULT 30,
  return_policy_details TEXT,
  verified_artisan BOOLEAN DEFAULT true,
  website_url TEXT,
  affiliate_commission_rate TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Table Catégories
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  product_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Table Produits
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  supplier_id TEXT REFERENCES public.suppliers(id) ON DELETE SET NULL,
  supplier_name TEXT,
  supplier_country TEXT,
  category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
  category_name TEXT,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  in_stock BOOLEAN DEFAULT true,
  stock_note TEXT,
  images TEXT[] DEFAULT '{}',
  short_description TEXT,
  full_description TEXT,
  materials TEXT[] DEFAULT '{}',
  dimensions TEXT,
  weight TEXT,
  eco_labels TEXT[] DEFAULT '{}',
  rating NUMERIC DEFAULT 5.0,
  review_count INT DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  best_seller BOOLEAN DEFAULT false,
  direct_supplier_url TEXT NOT NULL,
  shipping_estimate TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Table Avis Clients
CREATE TABLE IF NOT EXISTS public.reviews (
  id TEXT PRIMARY KEY,
  product_id TEXT REFERENCES public.products(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_city TEXT,
  rating INT NOT NULL,
  date TEXT NOT NULL,
  comment TEXT NOT NULL,
  verified_purchase BOOLEAN DEFAULT true,
  product_title TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Table Messages Contact
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Table Inscriptions Newsletter
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Activation de Row Level Security (RLS) avec lecture publique
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture publique pour le catalogue e-commerce
CREATE POLICY "Lecture publique des fournisseurs" ON public.suppliers FOR SELECT USING (true);
CREATE POLICY "Lecture publique des catégories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Lecture publique des produits" ON public.products FOR SELECT USING (true);
CREATE POLICY "Lecture publique des avis" ON public.reviews FOR SELECT USING (true);

-- Politiques d'insertion publique pour le formulaire de contact et la newsletter
CREATE POLICY "Envoi de message de contact" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Inscription newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
`;
