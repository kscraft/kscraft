import catalogData from '@/data/catalog.json';

export type SpecificationMap = Record<string, string>;

export type Category = {
  id: string;
  title: string;
  description: string;
  summary: string;
  image: string;
  accent: string;
  bestFor: string;
  highlights: string[];
};

export type Product = {
  slug: string;
  title: string;
  primaryCategory: string;
  categories: string[];
  tags?: string[];
  description: string;
  image: string;
  images: string[];
  sourceUrls: string[];
  legacyRoutes: string[];
  specifications: SpecificationMap;
  features: string[];
  applications: string[];
  faqs?: { q: string; a: string }[];
};

export type NavItem = {
  label: string;
  href: string;
};

export type ProjectHighlight = {
  title: string;
  subtitle: string;
  detail: string;
  slug?: string;
  image?: string;
  showcase?: {
    heroTitle: string;
    heroDescription: string;
    challengeLabel: string;
    challengeTitle: string;
    challengeDescription: string;
    stats: { label: string; value: string; icon: string }[];
    uspLabel: string;
    uspTitle: string;
    uspDescription: string;
  };
  faqs?: { q: string; a: string }[];
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

export type LegalDocument = {
  title: string;
  description: string;
  contentHtml: string;
};

export type HomeContentBlock = {
  eyebrow: string;
  title: string;
};

export type HomePromiseItem = {
  id: string;
  title: string;
  description: string;
};

export type HomeMetric = {
  label: string;
  value: string;
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
    phone: string;
    phoneDisplay: string;
    locations: { city: string; address: string }[];
    certifications: string[];
    clients: string[];
    clientLogos: ClientLogo[];
    social: { youtube: string; linkedin: string; instagram: string; };
    areaServed: string[];
    authenticity: {
      title: string;
      badge: string;
      description: string;
    };
    legal: {
      privacy: LegalDocument;
      terms: LegalDocument;
    };
    ui: {
      viewCaseStudy: string;
      requestTechnicalDetails: string;
      getQuote: string;
      viewSourceDetails: string;
      learnMore: string;
      exploreAllSystems: string;
      certified: string;
      exporter: string;
      hq: string;
      searchPlaceholder: string;
      matchingSystems: string;
      noSystemsFound: string;
      viewFullCatalog: string;
      tryBroaderTerms: string;
      searchPageTitle: string;
      searchPageSubtitle: string;
      resultsCount: string;
      noResultsTitle: string;
      noResultsDescription: string;
      reachViaWhatsApp: string;
      reachViaCall: string;
      reachViaEmail: string;
      quoteTitle: string;
      quoteSubtitle: string;
      operationsLabel: string;
      solutions: string;
      corporate: string;
      inquiries: string;
      productsCount: string;
      company: string;
      copyright: string;
      privacyPolicy: string;
      termsOfUse: string;
      siteMap: string;
    };

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
    eyebrow: string;
    title: string;
    highlight: string;
    subhighlight: string;
    description: string;
    image: string;
    productTitle: string;
    productSubtitle: string;
    cta: NavItem;
    secondaryCta: NavItem;
    metrics: HomeMetric[];
  };
  promise: HomeContentBlock & {
    items: HomePromiseItem[];
  };
  catalogNav: HomeContentBlock & {
    cta: NavItem;
  };
  featured: HomeContentBlock & {
    badge: string;
    ctaLabel: string;
  };
  showcase: {
    title: string;
    description: string;
    image: string;
    theme: 'light' | 'dark';
    cta: NavItem;
    shopCta: NavItem;
  }[];
  lineup: HomeContentBlock & {
    description: string;
    cta: NavItem;
  };
  trust: HomeContentBlock & {
    description: string;
  };
  engineeringDNA: HomeContentBlock & {
    description: string;
    cta: NavItem;
    challengeTitle: string;
    challengeDescription: string;
  };
  about: {
    heroTitle: string;
    heroDescription: string;
    infrastructureLabel: string;
    infrastructureTitle: string;
    infrastructureDescription: string;
    missionTitle: string;
    visionTitle: string;
    ui: {
        experienceLabel: string;
        systemsLabel: string;
        certDetail: string;
    };
  };
  services: {
    heroTitle: string;
    heroDescription: string;
    assistLabel: string;
    assistTitle: string;
    assistDescription: string;
    ctaLabel: string;
    ui: Record<string, string>;
  };
  contact: {
    heroTitle: string;
    heroDescription: string;
    hubsLabel: string;
    digitalLabel: string;
    formTitle: string;
    formDescription: string;
    successTitle: string;
    anotherRequest: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    scopeLabel: string;
    requirementsLabel: string;
    placeholderName: string;
    placeholderEmail: string;
    placeholderPhone: string;
    placeholderRequirements: string;
    submitButton: string;
    processing: string;
    ui: Record<string, string>;
  };
  mediaUI: Record<string, string>;
  showcaseUI: Record<string, string>;
  sitemap: Record<string, string>;
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
  return products.filter((product) => getProductCategoryIds(product).includes(categoryId));
}

export function getProductCategoryIds(product: Product) {
  return product.categories?.length ? product.categories : [product.primaryCategory];
}

export function getProductPrimaryCategoryId(product: Product) {
  return product.primaryCategory || getProductCategoryIds(product)[0];
}

export function getProductPrimaryCategory(product: Product) {
  return getCategory(getProductPrimaryCategoryId(product));
}

export function getProductCategoryLabel(product: Product) {
  return getProductPrimaryCategory(product)?.title || getProductPrimaryCategoryId(product).replace(/-/g, ' ');
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
