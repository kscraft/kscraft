export interface Product {
  slug: string;
  source: string;
  title: string;
  category: string;
  summary: string;
  images: string[];
  specs: string[];
  applications: string[];
  specialties?: string[];
  related?: string[];
}

export interface NavItem {
  title: string;
  href: string;
  items: [string, string][];
}

export interface SiteData {
  navGroups: NavItem[];
  productPages: Product[];
  clients: string[];
  certifications: string[];
  gallery: string[];
}
