import { MetadataRoute } from 'next';
import { products, categories } from '@/lib/catalog';

const SITE_URL = 'https://kiranslidocraft.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/clients',
    '/media',
    '/contact',
    '/search',
    '/showcase/isro-gaganyaan',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const categoryRoutes = categories.map((cat) => ({
    url: `${SITE_URL}/category/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const productRoutes = products.map((prod) => ({
    url: `${SITE_URL}/product/${prod.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
