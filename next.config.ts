import type { NextConfig } from "next";
import { readFileSync } from "node:fs";

type RedirectCatalog = {
  products: Array<{
    legacyRoutes: string[];
    slug: string;
  }>;
};

const catalog = JSON.parse(
  readFileSync(new URL("./src/data/catalog.json", import.meta.url), "utf8")
) as RedirectCatalog;

const CANONICAL_SITE_URL = "https://soundproofindia.com";

const AGENT_LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
  '</docs/api>; rel="service-doc"; type="text/html"',
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
].join(', ');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value: AGENT_LINK_HEADER,
          },
          {
            key: "Vary",
            value: "Accept",
          },
        ],
      },
    ];
  },
  async redirects() {
    const productRedirects = catalog.products.flatMap((product) =>
      product.legacyRoutes.map((route) => ({
        source: `/${route}`,
        destination: `/product/${product.slug}`,
        permanent: true,
      }))
    );

    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "doorwindowcraft.com" }],
        destination: `${CANONICAL_SITE_URL}/:path*`,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.doorwindowcraft.com" }],
        destination: `${CANONICAL_SITE_URL}/:path*`,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.soundproofindia.com" }],
        destination: `${CANONICAL_SITE_URL}/:path*`,
        permanent: true,
      },
      { source: "/company.php", destination: "/about", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/company-profile.htm", destination: "/about", permanent: true },
      { source: "/contact.php", destination: "/contact", permanent: true },
      { source: "/contact-us.htm", destination: "/contact", permanent: true },
      { source: "/services.php", destination: "/services", permanent: true },
      { source: "/clients.php", destination: "/clients", permanent: true },
      { source: "/clientele.htm", destination: "/clients", permanent: true },
      { source: "/certifications.php", destination: "/clients", permanent: true },
      { source: "/media-gallery.php", destination: "/media", permanent: true },
      { source: "/product_videos.htm", destination: "/media", permanent: true },
      { source: "/our-videos.htm", destination: "/media", permanent: true },
      { source: "/testimonials.htm", destination: "/media", permanent: true },
      { source: "/testimonials-inner-2.htm", destination: "/media", permanent: true },
      { source: "/testimonials-inner-3.htm", destination: "/media", permanent: true },
      { source: "/products.htm", destination: "/", permanent: true },
      { source: "/products.rss", destination: "/", permanent: true },
      { source: "/sitemap.htm", destination: "/", permanent: true },
      { source: "/current-jobs.htm", destination: "/contact", permanent: true },
      { source: "/motorized-system.htm", destination: "/category/motorized-systems", permanent: true },
      { source: "/sound-proof-system.htm", destination: "/category/sound-proof-windows", permanent: true },
      ...productRedirects,
    ];
  },
};

export default nextConfig;
