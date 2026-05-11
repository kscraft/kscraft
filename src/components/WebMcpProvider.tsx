'use client';

import { useEffect } from 'react';
import { categories, products } from '@/lib/catalog';

type WebMcpTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, unknown>) => unknown;
};

type ModelContext = {
  registerTool?: (tool: WebMcpTool, options?: { signal?: AbortSignal }) => unknown;
  provideContext?: (context: { tools: WebMcpTool[] }, options?: { signal?: AbortSignal }) => unknown;
};

declare global {
  interface Navigator {
    modelContext?: ModelContext;
  }
}

export default function WebMcpProvider() {
  useEffect(() => {
    const modelContext = navigator.modelContext;
    if (!modelContext) return;

    const controller = new AbortController();
    const tools: WebMcpTool[] = [
      {
        name: 'search_ksco_catalog',
        description: 'Search Kiran Slido Craft products by keyword, category, feature, or application.',
        inputSchema: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'Search query for products or categories.' },
          },
          required: ['query'],
        },
        execute: (input) => {
          const query = String(input.query || '').toLowerCase();
          return products
            .filter((product) => {
              const haystack = [
                product.title,
                product.description,
                product.primaryCategory,
                ...product.categories,
                ...product.features,
                ...product.applications,
              ].join(' ').toLowerCase();

              return haystack.includes(query);
            })
            .slice(0, 10)
            .map((product) => ({
              title: product.title,
              url: `/product/${product.slug}`,
              description: product.description,
              specifications: product.specifications,
            }));
        },
      },
      {
        name: 'list_ksco_categories',
        description: 'List public Kiran Slido Craft product categories and category URLs.',
        inputSchema: {
          type: 'object',
          properties: {},
          additionalProperties: false,
        },
        execute: () => categories.map((category) => ({
          title: category.title,
          url: `/category/${category.id}`,
          description: category.description,
          highlights: category.highlights,
        })),
      },
      {
        name: 'get_ksco_product',
        description: 'Get public product details and technical specifications by product slug.',
        inputSchema: {
          type: 'object',
          properties: {
            slug: { type: 'string', description: 'Product slug from a Kiran Slido Craft product URL.' },
          },
          required: ['slug'],
        },
        execute: (input) => {
          const product = products.find((item) => item.slug === input.slug);
          if (!product) return { error: 'Product not found' };

          return {
            title: product.title,
            url: `/product/${product.slug}`,
            description: product.description,
            specifications: product.specifications,
            features: product.features,
            applications: product.applications,
          };
        },
      },
    ];

    if (typeof modelContext.registerTool === 'function') {
      tools.forEach((tool) => modelContext.registerTool?.(tool, { signal: controller.signal }));
    } else if (typeof modelContext.provideContext === 'function') {
      modelContext.provideContext({ tools }, { signal: controller.signal });
    }

    return () => controller.abort();
  }, []);

  return null;
}
