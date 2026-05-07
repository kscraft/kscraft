import { makeAutoObservable, runInAction } from "mobx";
import { Product, NavItem, SiteData } from "@/models/Catalog";

const CACHE_KEY = "ksco_catalog_cache";

export class CatalogStore {
  navGroups: NavItem[] = [];
  productPages: Product[] = [];
  clients: string[] = [];
  certifications: string[] = [];
  gallery: string[] = [];
  isLoaded: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== "undefined") {
      this.init();
    } else {
      // Server-side initialization (e.g., during build)
      try {
        const data = require("../../public/data/catalog.json");
        this.setData(data);
        this.isLoaded = true;
      } catch (e) {
        // Fallback or silent fail during SSR
      }
    }
  }

  private async init() {
    // 1. Try to load from cache
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const data: SiteData = JSON.parse(cached);
        this.setData(data);
        this.isLoaded = true;
      } catch (e) {
        console.error("Failed to parse cached data", e);
      }
    }

    // 2. Fetch fresh data
    try {
      const response = await fetch("/data/catalog.json");
      if (!response.ok) throw new Error("Failed to fetch catalog data");
      const data: SiteData = await response.json();
      
      runInAction(() => {
        this.setData(data);
        this.isLoaded = true;
        this.error = null;
      });

      // 3. Update cache
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (e: any) {
      runInAction(() => {
        this.error = e.message;
        // If we didn't have cache, this is a hard error
        if (!this.isLoaded) {
          this.isLoaded = false;
        }
      });
    }
  }

  private setData(data: SiteData) {
    this.navGroups = data.navGroups;
    this.productPages = data.productPages;
    this.clients = data.clients;
    this.certifications = data.certifications;
    this.gallery = data.gallery;
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

export const catalogStore = new CatalogStore();
