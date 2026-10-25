import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-all',
    slug: 'tous-les-produits',
    name: 'Toute la sélection',
    description: 'L\'ensemble de nos objets éthiques fabriqués en Europe.',
    iconName: 'Sparkles',
    productCount: 8,
  },
  {
    id: 'cat-ceramique',
    slug: 'ceramique-arts-table',
    name: 'Céramique & Table',
    description: 'Théières, tasses, bols et pichets façonnés à la main au Portugal et en France.',
    iconName: 'UtensilsCrossed',
    productCount: 3,
  },
  {
    id: 'cat-textile',
    slug: 'textiles-confort',
    name: 'Textiles & Laine',
    description: 'Plaids moelleux en mérinos, coussins en lin lavé et couvertures douillettes.',
    iconName: 'Shirt',
    productCount: 2,
  },
  {
    id: 'cat-bois',
    slug: 'bois-decoration',
    name: 'Bois & Décoration',
    description: 'Horloges murales épurées, planches en chêne et petits objets chaleureux.',
    iconName: 'TreePine',
    productCount: 2,
  },
  {
    id: 'cat-papeterie',
    slug: 'papeterie-maroquinerie',
    name: 'Papeterie & Cuir',
    description: 'Carnets de voyage cousus main et étuis en cuir au tannage végétal toscan.',
    iconName: 'BookOpen',
    productCount: 1,
  },
];
