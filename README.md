# Maison Terroir – E-Commerce en Affiliation Européenne & Éthique

Bienvenue sur le front-end complet de **Maison Terroir**, un site e-commerce en affiliation conçu selon une philosophie **humaniste** : chaleureuse, transparente, respectueuse de l'acheteur et centrée sur les savoir-faire d'ateliers et manufactures européennes (France, Portugal, Suède, Italie, Belgique).

---

## 1. Principes & Modèle Économique Transparent

- **Pas d'encaissement sur notre site :** Le visiteur commande directement sur la boutique officielle de l'artisan/fournisseur avec un lien de suivi d'affiliation unique.
- **Transparence totale :** Chaque produit affiche clairement *"Vendu et expédié par [Nom du fournisseur]"*, son pays de fabrication, les délais d'acheminement et sa politique de retour 30 jours.
- **Zéro surcoût client :** La commission partenaire (6 à 8%) est directement déduite de la marge du fabricant et ne renchérit jamais le prix pour l'acheteur.
- **Modale de réassurance pré-redirection :** Avant de quitter le site pour payer chez le fournisseur, une boîte de dialogue rassure le visiteur sur le déroulement du paiement, du suivi et du service après-vente.
- **Panier multi-fournisseurs :** Les articles sélectionnés sont regroupés par atelier avec un bouton de commande dédié pour chacun.

---

## 2. Commandes de Démarrage

```bash
# Installation des dépendances
npm install

# Lancement du serveur de développement (Port 3000)
npm run dev

# Vérification TypeScript
npm run lint

# Compilation de production
npm run build
```

---

## 3. Architecture du Projet

```text
/
├── index.html                  # Point d'entrée HTML avec polices (Poppins & Inter), SEO et Schema.org JSON-LD
├── metadata.json               # Métadonnées du projet
├── package.json                # Dépendances (React 19, Motion 12, Lucide, Tailwind v4, Vite 8)
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.tsx                # Racine React
│   ├── App.tsx                 # Routeur d'état, transitions AnimatePresence, modales globales
│   ├── index.css               # Design tokens Tailwind v4, échelle typographique fluide, reset reduced-motion
│   ├── types/
│   │   └── index.ts            # Interfaces TypeScript (Product, Supplier, Category, Review, CartItem...)
│   ├── data/                   # Données fictives réalistes (séparées pour futur branchement Supabase)
│   │   ├── suppliers.ts        # Ateliers européens (Portugal, Suède, France, Italie, Belgique)
│   │   ├── categories.ts       # Univers de produits
│   │   ├── products.ts         # Objets durables avec photos générées haute résolution
│   │   └── reviews.ts          # Avis clients authentiques avec ville et statut achat vérifié
│   ├── lib/
│   │   └── api.ts              # Couche d'accès aux données isolée (fonctions asynchrones simulant Supabase)
│   ├── context/
│   │   ├── CartContext.tsx     # Gestion du panier groupé par atelier et déclencheur de redirection
│   │   └── ToastContext.tsx    # Notifications accessibles sans interruption
│   ├── components/
│   │   ├── common/             # Composants réutilisables
│   │   │   ├── Header.tsx      # En-tête collant respectant le strict "Top Bar Contract" (3 zones)
│   │   │   ├── Footer.tsx      # Pied de page riche avec charte d'affiliation & liens légaux
│   │   │   ├── ProductCard.tsx # Carte produit respectant la règle Zero-Pill & micro-interactions
│   │   │   ├── SupplierRedirectModal.tsx # Modale rassurante avant redirection vers la boutique officielle
│   │   │   ├── CookieConsent.tsx         # Bandeau de consentement RGPD doux et transparent
│   │   │   ├── Breadcrumbs.tsx           # Fil d'Ariane sémantique
│   │   │   ├── SkeletonLoader.tsx        # Squelettes pendant le chargement
│   │   │   └── ToastContainer.tsx        # Toasts doux
│   │   └── pages/              # Pages complètes de l'application
│   │       ├── HomePage.tsx              # Accueil avec hero chaleureux, 3 étapes, ateliers, avis
│   │       ├── CatalogPage.tsx           # Grille avec filtres prix/fournisseur/éco, tri et pagination
│   │       ├── ProductDetailPage.tsx     # Galerie zoom, achat direct, bloc fournisseur, similaires
│   │       ├── CartPage.tsx              # Panier groupé par atelier avec bouton par artisan
│   │       ├── SearchModal.tsx           # Recherche instantanée avec raccourci ⌘K
│   │       ├── AboutPage.tsx             # Histoire humaine et manifeste
│   │       ├── DeliveryReturnsPage.tsx   # Expéditions depuis l'Europe et retours 30 jours
│   │       ├── FAQPage.tsx               # Accordéon interactif
│   │       ├── ContactPage.tsx           # Formulaire accessible avec engagement 24h
│   │       ├── LegalPage.tsx             # Mentions, CGU, Confidentialité, Divulgation d'affiliation
│   │       └── NotFoundPage.tsx          # 404 chaleureuse et bienveillante
└── DESIGN_NOTE.md              # Note détaillée de design (palette 60/30/10, typographie, motion)
```

---

## 4. Connexion Back-end Supabase (Projet : site beno)

Le projet est désormais connecté à votre instance Supabase :
- **Nom du projet :** `site beno`
- **Project ID :** `gnlewlhthhricqqfhbzs`
- **URL API :** `https://gnlewlhthhricqqfhbzs.supabase.co`
- **Clé publique :** `sb_publishable_y-vyVEAjFJALi6KZFIjbyA_Y4lu6LDZ`

### Initialisation de la base de données :
1. Dans votre tableau de bord Supabase, rendez-vous dans le **SQL Editor** et créez une nouvelle requête.
2. Copiez le script SQL fourni dans `/src/lib/supabase.ts` (ou cliquez sur le bouton *"Supabase : site beno"* dans le pied de page de l'application pour afficher et copier le script en un clic).
3. Exécutez le script pour créer les tables `suppliers`, `categories`, `products`, `reviews`, `contact_messages`, `newsletter_subscribers` avec les règles de sécurité Row Level Security (RLS).
4. Cliquez sur *"Synchroniser les données dans Supabase"* pour peupler instantanément la base avec les créations et ateliers de test.
5. Si les tables ne sont pas encore créées, l'application continue de fonctionner grâce à son mécanisme de secours transparent.
