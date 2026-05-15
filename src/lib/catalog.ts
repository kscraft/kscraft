import catalogData from '@/data/catalog.json';
import servicesData from '@/data/services.json';
import faqsData from '@/data/faqs.json';
import aboutData from '@/data/about.json';
import mediaData from '@/data/media.json';
import industriesData from '@/data/industry-solutions.json';
import guidesData from '@/data/guides.json';
import emailData from '@/data/email.json';

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
  faqs?: { q: string; a: string }[];
  extendedContent?: string[];
};

export type Product = {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  primaryCategory: string;
  images: string[];
  specifications: SpecificationMap;
  features: string[];
  applications: string[];
  tags?: string[];
  sourceUrls: string[];
  legacyRoutes?: string[];
};

export type ServiceItem = {
  title: string;
  icon: string;
  description: string;
};

export type MediaItem = {
  id: string;
  type: 'image' | 'video';
  category: string;
  title: string;
  technicalNote: string;
  image?: string;
  youtubeId?: string;
  href?: string;
};

export type HomeMetric = {
  label: string;
  value: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type HomeContentBlock = {
  eyebrow: string;
  title: string;
  description: string;
};

export type HomePromiseItem = {
  id: string;
  title: string;
  description: string;
};

export const catalog = catalogData;

export const company = catalogData.company as unknown as {
  name: string;
  founded: number;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  locations: { city: string; address: string }[];
  certifications: string[];
  clients: string[];
  clientLogos: { name: string; image: string }[];
  social: {
    youtube: string;
    linkedin: string;
    instagram: string;
  };
  authenticity: {
    title: string;
    description: string;
    badge: string;
  };
  legal: {
    privacy: { title: string; description: string; contentHtml: string };
    terms: { title: string; description: string; contentHtml: string };
  };
  ui: {
    learnMore: string;
    getQuote: string;
    viewSourceDetails: string;
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
    copyright: string;
    privacyPolicy: string;
    termsOfUse: string;
    siteMap: string;
    solutions: string;
    company: string;
    inquiries: string;
    operationsLabel: string;
    corporate: string;
    productsCount: string;
    viewCaseStudy: string;
    requestTechnicalDetails: string;
  };
};

type CatalogProductSource = Omit<Product, 'images'> & {
  image?: string;
  images?: string[];
};

export const products = (catalogData.products as unknown as CatalogProductSource[]).map((product) => ({
  ...product,
  images: product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []),
})) as Product[];

export const categories = catalogData.categories as unknown as Category[];

export const navigation = catalogData.navigation as {
  header: NavItem[];
  footer: NavItem[];
};

export const home = catalogData.home as unknown as {
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
  caseStudiesTeaser: HomeContentBlock & {
    ctaLabel: string;
    highlights: { sector: string; title?: string; description: string; ctaLabel: string }[];
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
    cityLabel: string;
    scopeLabel: string;
    requirementsLabel: string;
    placeholderName: string;
    placeholderEmail: string;
    placeholderPhone: string;
    placeholderCity: string;
    placeholderRequirements: string;
    submitButton: string;
    processing: string;
    ui: Record<string, string>;
  };
  mediaUI: Record<string, string>;
  showcaseUI: Record<string, string>;
  sitemap: Record<string, string>;
};

export const services = servicesData as {
  hero: { title: string; description: string };
  items: ServiceItem[];
  talosProtocol: {
    eyebrow: string;
    title: string;
    description: string;
    features: { title: string; icon: string; description: string }[];
    footer: { icon: string; text: string; ctaLabel: string; ctaHref: string };
  };
  assist: {
    label: string;
    title: string;
    description: string;
    ctaLabel: string;
  };
};

export type FaqCategory = {
  id: string;
  title: string;
  icon: string;
  faqs: { question: string; answer: string }[];
};

export const faqs = faqsData as {
  hero: { title: string; description: string; eyebrow: string };
  cta: { eyebrow: string; title: string; label: string };
  categories: FaqCategory[];
};

export function getAllFaqs() {
  return faqs.categories.flatMap((cat) =>
    cat.faqs.map((faq) => ({ ...faq, category: cat.title }))
  );
}

export type IndustrySolution = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  heroImage: string;
  benefits: { title: string; description: string }[];
  productSlugs: string[];
  metaTitle: string;
  metaDescription: string;
};

export const industries = industriesData as unknown as IndustrySolution[];

export function getIndustry(slug: string): IndustrySolution | undefined {
  return industries.find(i => i.slug === slug);
}

export function getProductsForIndustry(industry: IndustrySolution): Product[] {
  return products.filter(p => industry.productSlugs.includes(p.slug));
}

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  excerpt?: string;
  content: { sectionTitle: string; text: string }[];
  category: string;
  readTime: string;
  date: string;
  relatedProducts: string[];
};

export const guides = guidesData as Guide[];

export function getGuide(slug: string): Guide | undefined {
  return guides.find(g => g.slug === slug);
}

export const about = aboutData as {
  hero: { title: string; description: string };
  infrastructure: { label: string; title: string; description: string };
  values: {
    mission: { title: string; description: string };
    vision: { title: string; description: string };
  };
  ui: {
    experienceLabel: string;
    systemsLabel: string;
    certDetail: string;
  };
};

export const media = mediaData as {
  hero: { eyebrow: string; title: string; description: string };
  categories: { id: string; label: string }[];
  items: MediaItem[];
};

export const emailStrings = emailData as {
  title: string;
  labels: Record<string, string>;
  subjects: Record<string, string>;
  messages: Record<string, string>;
};

export const projects = catalogData.projects as {
  highlights: ProjectHighlight[];
};

export type ProjectHighlight = {
  title: string;
  subtitle: string;
  detail: string;
  icon?: string;
  slug?: string;
  image?: string;
  faqs?: { q: string; a: string }[];
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
};

export function getCategory(categoryId: string) {
  return categories.find((category) => category.id === categoryId);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(categoryId: string) {
  return products.filter((product) => product.categories.includes(categoryId));
}

export function getProductCategoryIds(product: Product) {
  return product.categories;
}

export function getProductCategoryLabel(categoryId: string) {
  return getCategory(categoryId)?.title || categoryId;
}

export function getProductPrimaryCategory(product: Product) {
  return getCategory(product.primaryCategory);
}

export function getProductPrimaryCategoryId(product: Product) {
  return product.primaryCategory;
}

export function getFeaturedProducts(limit: number = 3) {
  const preferred = [
    'motorized-vertical-sliding-window',
    'motorized-barrier-system',
    'motorized-sliding-roof'
  ];

  return preferred
    .map((slug) => getProduct(slug))
    .filter((product): product is Product => Boolean(product))
    .slice(0, limit);
}
