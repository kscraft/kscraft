import { makeAutoObservable } from "mobx";
import { Product, NavItem, SiteData } from "@/models/Catalog";
import { catalogData } from "@/data/catalogData";

export class CatalogStore {
  navGroups: NavItem[] = [];
  productPages: Product[] = [];
  clients: string[] = [];
  certifications: string[] = [];
  gallery: string[] = [];

  constructor(data: SiteData) {
    this.navGroups = data.navGroups;
    this.productPages = data.productPages;
    this.clients = data.clients;
    this.certifications = data.certifications;
    this.gallery = data.gallery;
    makeAutoObservable(this);
  }

  get products() {
    return this.productPages;
  }

  getProductBySlug(slug: string) {
    return this.productPages.find((p) => p.slug === slug);
  }

  getRelatedProducts(product: Product) {
    if (!product.related) return [];
    return product.related
      .map((slug) => this.getProductBySlug(slug))
      .filter((p): p is Product => !!p);
  }

  getFeaturedProducts() {
    const featuredSlugs = [
      "soundproofwindow",
      "sound-proof-partitions",
      "motorized-sliding-system",
      "motorized-roof-sliding-system",
      "barrier-system",
      "vertical-sliding-windows",
    ];
    return this.productPages.filter((p) => featuredSlugs.includes(p.slug));
  }
}

export const catalogStore = new CatalogStore(catalogData);
