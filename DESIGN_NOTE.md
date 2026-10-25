# Note de Design : Système Humaniste "Maison Terroir"

Cette note de design formalise les choix graphiques, ergonomiques et de motion design retenus pour la boutique en affiliation européenne **Maison Terroir**.

---

## 1. Philosophie & Direction Artistique

- **Humaniste, Chaleureuse & Sincère :** À l'opposé des marketplaces agressives aux comptes à rebours factices et bannières promotionnelles criardes, Maison Terroir propose un rythme posé, aéré et réconfortant.
- **Transparence d'Affiliation Radicale :** L'acheteur sait toujours précisément chez quel artisan il commande, d'où part son colis et pourquoi notre plateforme recommande cet atelier.
- **Formes douces & Matières :** Rayons d'arrondi généreux (16px à 24px - `rounded-2xl` / `rounded-3xl`), ombres diffuses colorées au bleu nuit (`rgba(30, 58, 138, 0.08)`), bordures capillaires nettes (`border-slate-200/80`).

---

## 2. Palette & Règle des 60 / 30 / 10

| Pourcentage | Couleur / Rôle | Valeur Hexadécimale | Usage dans l'interface |
| :--- | :--- | :--- | :--- |
| **60 % (Fond & Surfaces Neutres)** | Blanc pur & Gris très doux | `#FFFFFF` / `#F8FAFC` | Fonds de page, cartes produits, fonds de tiroirs |
| **30 % (Structure & Ancrage)** | Bleu nuit & Bleu glacier | `#1E3A8A` / `#DBEAFE` | En-tête, pied de page, titres H1/H2, liens primaires, aplats d'icônes |
| **10 % (Accent & Conversion)** | Orange vif & Orange crème | `#F97316` / `#FFEDD5` | Boutons d'action "Commander chez l'artisan", badges d'affiliation, sélecteurs |

- **Contrastes WCAG AA garantis :** Le texte sur bouton orange vif `#F97316` est calibré en anthracite profond `#0F172A` / `#020617` ou texte sombre pour satisfaire ou dépasser le ratio 4.5:1.
- **Sémantique :** Vert émeraude `#16A34A` pour les validations et garanties d'origine, Rouge `#DC2626` pour les erreurs ou alertes indispensables.

---

## 3. Typographie

- **Titres & Identité :** `Poppins` (graisses 600 et 700), apportant rondeur, modernité et bienveillance artisanale.
- **Corps de texte & Descriptions :** `Inter` (graisses 400 et 500) avec une taille minimale de 16px sur desktop (`leading-relaxed` / hauteur de ligne 1.6) pour un confort de lecture optimal.
- **Prix & Données chiffrées :** Police à espacement tabulaire (`tabular-nums font-mono`) pour un alignement irréprochable des tarifs en euros.
- **Échelle fluide (clamp) :** Titres hero redimensionnés dynamiquement de `clamp(2rem, 4vw + 1rem, 3.25rem)` sans rupture brutale d'écran.

---

## 4. Règle "Zero-Pill" & Discipline Visuelle

- **Pas d'empilement de pilules d'information :** Les métadonnées statiques (pays d'origine, nom de l'atelier, matière, délai) sont affichées sous forme de texte clair avec séparateurs typographiques discrets (`·` ou `/`), évitant l'effet "bonbons multicolores" des IA génériques.
- **Boutons vs Filtres :** Seuls les contrôles interactifs qui filtrent ou déclenchent une action au clic sont traités en onglets segmentés fonctionnels.
- **Top Bar Contract :** En-tête à exactement 3 zones horizontales équilibrées (1. Logo mot-texte, 2. Navigation à liens simples sans retour à la ligne, 3. Actions recherche/panier).

---

## 5. Règles d'Animation (Motion Design)

Toutes les animations sont gérées avec **Framer Motion** (`motion/react`) en respectant les principes suivants :

1. **Utiles et douces :** Micro-interactions rapides ($\le 200\text{ms}$) avec courbe d'amortissement naturelle `cubic-bezier(0.16, 1, 0.3, 1)`.
2. **Propriétés du compositeur GPU :** Seuls `transform` (léger décalage de -2 à -4px au survol des cartes, compression de 0.98 au clic bouton) et `opacity` sont animés. Jamais de déformation brutale de la grille ou du layout.
3. **Respect absolu de `prefers-reduced-motion` :** Défini au niveau global CSS dans `/src/index.css` pour désactiver instantanément les animations pour les personnes sujettes au mal des transports ou troubles vestibulaires.
4. **Pas d'apparition intempestive :** Aucun pop-up agressif au chargement. La modale de réassurance ne s'ouvre que suite à une action délibérée de l'utilisateur qui souhaite commander.
