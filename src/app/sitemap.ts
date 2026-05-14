import { MetadataRoute } from 'next';
import { products, categories } from '@/lib/catalog';
import { locationSeoPages } from '@/data/location-seo';
import { getServiceLocationPairs, serviceLocationSeoPages } from '@/data/service-location-seo';
import { industries } from '@/data/industry-seo';
import { guides } from '@/data/guides';

const SITE_URL = 'https://soundproofindia.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/clients`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/media`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/showcase/isro-gaganyaan`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/locations`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/solutions`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/sitemap`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/category/${cat.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((prod) => ({
    url: `${SITE_URL}/product/${prod.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const locationRoutes: MetadataRoute.Sitemap = locationSeoPages.map((location) => ({
    url: `${SITE_URL}/locations/${location.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: location.priority === 'P0' ? 0.95 : location.priority === 'P1' ? 0.85 : 0.7,
  }));

  const solutionHubRoutes: MetadataRoute.Sitemap = serviceLocationSeoPages.map((service) => ({
    url: `${SITE_URL}/solutions/${service.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const solutionLocationRoutes: MetadataRoute.Sitemap = getServiceLocationPairs().map(({ service, location, marketSlug }) => ({
    url: `${SITE_URL}/solutions/${service.slug}/${marketSlug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: location.priority === 'P0' ? 0.9 : location.priority === 'P1' ? 0.8 : 0.65,
  }));

  const industryRoutes: MetadataRoute.Sitemap = industries.map((ind) => ({
    url: `${SITE_URL}/industries/${ind.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...locationRoutes,
    ...solutionHubRoutes,
    ...solutionLocationRoutes,
    ...industryRoutes,
    ...guideRoutes,
  ];
}
