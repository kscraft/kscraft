import { MetadataRoute } from 'next';
import { products, categories, projects, industries, guides } from '@/lib/catalog';
import { locationSeoPages } from '@/data/location-seo';
import { getServiceLocationPairs, serviceLocationSeoPages } from '@/data/service-location-seo';

const SITE_URL = 'https://soundproofindia.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
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
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/media`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
        url: `${SITE_URL}/solutions`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.9,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/category/${category.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/product/${product.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const locationRoutes: MetadataRoute.Sitemap = locationSeoPages.map((location) => ({
    url: `${SITE_URL}/locations/${location.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const solutionHubRoutes: MetadataRoute.Sitemap = serviceLocationSeoPages.map((service) => ({
    url: `${SITE_URL}/solutions/${service.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const serviceLocationPairs = getServiceLocationPairs();
  const solutionLocationRoutes: MetadataRoute.Sitemap = serviceLocationPairs.map((pair) => ({
    url: `${SITE_URL}/solutions/${pair.service.slug}/${pair.marketSlug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const industryRoutes: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${SITE_URL}/industries/${industry.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const showcaseRoutes: MetadataRoute.Sitemap = projects.highlights
    .filter(p => p.showcase)
    .map((project) => ({
        url: `${SITE_URL}/showcase/${project.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
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
    ...showcaseRoutes,
  ];
}
