import { Review } from '../types';

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    authorName: 'Camille & Julien V.',
    authorCity: 'Lyon, France',
    rating: 5,
    date: '14 octobre 2026',
    comment: 'Nous avons commandé la théière portugaise directement chez l\'Atelier Barro & Sol via Maison Terroir. Le paquet est arrivé emballé dans du papier kraft épais avec un petit mot manuscrit de Maria. L\'objet est magnifique, lourd et le thé reste chaud pendant des heures. La transparence sur l\'affiliation est tellement appréciable !',
    verifiedPurchase: true,
    productTitle: 'Théière Artisanale en Grès Moucheté & 2 Tasses',
  },
  {
    id: 'rev-2',
    authorName: 'Sébastien L.',
    authorCity: 'Bruxelles, Belgique',
    rating: 5,
    date: '28 septembre 2026',
    comment: 'Le plaid en mérinos suédois est un vrai nuage de douceur. J\'avais peur que la laine gratte : pas du tout, c\'est d\'une souplesse absolue. Redirection fluide vers le site suédois, suivi de colis clair et zéro mauvaise surprise de douane.',
    verifiedPurchase: true,
    productTitle: 'Plaid Épais en Pure Laine Mérinos Vierge',
  },
  {
    id: 'rev-3',
    authorName: 'Éléonore M.',
    authorCity: 'Genève, Suisse',
    rating: 5,
    date: '3 septembre 2026',
    comment: 'L\'horloge en chêne massif de Besançon est une merveille de sobriété. Le mécanisme est rigoureusement silencieux, elle a trouvé sa place dans notre chambre. On sent que derrière chaque produit, il y a de vrais humains passionnés.',
    verifiedPurchase: true,
    productTitle: 'Horloge Murale Épure en Chêne Massif du Jura',
  },
  {
    id: 'rev-4',
    authorName: 'Antoine D.',
    authorCity: 'Nantes, France',
    rating: 5,
    date: '19 août 2026',
    comment: 'J\'utilise le carnet toscan pour mon journal de bord quotidien. Le cuir sent bon l\'écorce végétale naturelle et le papier ne traverse pas même avec mon stylo plume à encre noire intense. Bravo pour cette démarche honnête et sans faux sentiment d\'urgence.',
    verifiedPurchase: true,
    productTitle: 'Carnet de Notes en Cuir Toscane au Tannage Végétal',
  }
];
