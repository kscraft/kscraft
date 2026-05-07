import catalogData from '@/data/catalog.json';

export type SpecificationMap = Record<string, string>;

export type Category = {
  id: string;
  title: string;
  description: string;
  summary: string;
};

export type Product = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  sourceUrls: string[];
  legacyRoutes: string[];
  specifications: SpecificationMap;
  features: string[];
  applications: string[];
};

export const catalog = catalogData;

export const categories = catalogData.categories as unknown as Category[];
export const products = catalogData.products as unknown as Product[];

export function getCategory(categoryId: string) {
  return categories.find((category) => category.id === categoryId);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(categoryId: string) {
  return products.filter((product) => product.category === categoryId);
}

export function getFeaturedProducts(limit = 8) {
  const preferred = [
    'sound-proof-sliding-windows',
    'sound-proof-casement-windows',
    'sound-proof-acoustic-movable-partition',
    'sound-proof-sliding-doors',
    'motorized-soundproof-sliding-windows',
    'motorized-sliding-gates',
    'motorized-roof-sliding-system',
    'motorized-vertical-sliding-window'
  ];

  return preferred
    .map((slug) => getProduct(slug))
    .filter((product): product is Product => Boolean(product))
    .slice(0, limit);
}
