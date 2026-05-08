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

export type NavItem = {
  label: string;
  href: string;
};

export type ProjectHighlight = {
  title: string;
  subtitle: string;
  detail: string;
};

export type MediaGalleryItem = {
  title: string;
  image: string;
};

export type MediaVideo = {
  title: string;
  id: string;
};

export type ServiceItem = {
  title: string;
  icon: string;
  description: string;
};

export type ClientLogo = {
  name: string;
  image: string;
};

export const catalog = catalogData as {
  company: {
    name: string;
    founded: number;
    tagline: string;
    description: string;
    mission: string;
    vision: string;
    email: string;
    locations: { city: string; address: string }[];
    certifications: string[];
    clients: string[];
    clientLogos: ClientLogo[];
    social: { youtube: string; linkedin: string };
  };
};

export const categories = catalogData.categories as unknown as Category[];
export const products = catalogData.products as unknown as Product[];

export const navigation = catalogData.navigation as {
  header: NavItem[];
  footer: NavItem[];
};

export const home = catalogData.home as {
  hero: {
    title: string;
    highlight: string;
    subhighlight: string;
    description: string;
    image: string;
    cta: NavItem;
    secondaryCta: NavItem;
  };
  showcase: {
    title: string;
    description: string;
    image: string;
    theme: 'light' | 'dark';
    cta: NavItem;
    shopCta: NavItem;
  }[];
};

export const media = catalogData.media as {
  gallery: MediaGalleryItem[];
  videos: MediaVideo[];
};

export const projects = catalogData.projects as {
  highlights: ProjectHighlight[];
};

export const services = catalogData.services as ServiceItem[];

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
    'motorized-sliding-roof',
    'sound-proof-sliding-windows',
    'sound-proof-acoustic-movable-partition',
    'motorized-soundproof-sliding-windows',
    'motorized-sliding-gates',
    'motorized-vertical-sliding-window',
    'motorized-barrier-system',
    'sound-proof-tilt-turn-windows'
  ];

  return preferred
    .map((slug) => getProduct(slug))
    .filter((product): product is Product => Boolean(product))
    .slice(0, limit);
}
