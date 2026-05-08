import { describe, it, expect } from 'vitest';
import { 
  getCategory, 
  getProduct, 
  getProductsByCategory, 
  getFeaturedProducts,
  catalog,
  categories,
  products
} from './catalog';

describe('Catalog Library', () => {
  it('should have a valid company name', () => {
    expect(catalog.company.name).toBe('Kiran Slido Craft');
  });

  it('should return a category by id', () => {
    const category = getCategory('sound-proof-windows');
    expect(category).toBeDefined();
    expect(category?.id).toBe('sound-proof-windows');
  });

  it('should return undefined for non-existent category', () => {
    const category = getCategory('non-existent');
    expect(category).toBeUndefined();
  });

  it('should return a product by slug', () => {
    const product = getProduct('motorized-sliding-roof');
    expect(product).toBeDefined();
    expect(product?.slug).toBe('motorized-sliding-roof');
  });

  it('should return undefined for non-existent product', () => {
    const product = getProduct('non-existent');
    expect(product).toBeUndefined();
  });

  it('should return products by category', () => {
    const categoryProducts = getProductsByCategory('sound-proof-windows');
    expect(categoryProducts.length).toBeGreaterThan(0);
    categoryProducts.forEach(product => {
      expect(product.category).toBe('sound-proof-windows');
    });
  });

  it('should return an empty array for non-existent category products', () => {
    const categoryProducts = getProductsByCategory('non-existent');
    expect(categoryProducts).toEqual([]);
  });

  it('should return featured products', () => {
    const featured = getFeaturedProducts(4);
    expect(featured.length).toBe(4);
  });

  it('should have categories and products', () => {
    expect(categories.length).toBeGreaterThan(0);
    expect(products.length).toBeGreaterThan(0);
  });
});
