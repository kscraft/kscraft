import type { NextConfig } from "next";
import catalog from "./src/data/catalog.json";

const nextConfig: NextConfig = {
  async redirects() {
    const productRedirects = catalog.products.flatMap((product) =>
      product.legacyRoutes.map((route) => ({
        source: `/${route}`,
        destination: `/product/${product.slug}`,
        permanent: false,
      }))
    );

    return [
      { source: "/company.php", destination: "/about", permanent: false },
      { source: "/index.html", destination: "/", permanent: false },
      { source: "/company-profile.htm", destination: "/about", permanent: false },
      { source: "/contact.php", destination: "/contact", permanent: false },
      { source: "/contact-us.htm", destination: "/contact", permanent: false },
      { source: "/services.php", destination: "/services", permanent: false },
      { source: "/clients.php", destination: "/clients", permanent: false },
      { source: "/clientele.htm", destination: "/clients", permanent: false },
      { source: "/certifications.php", destination: "/clients", permanent: false },
      { source: "/media-gallery.php", destination: "/media", permanent: false },
      { source: "/product_videos.htm", destination: "/media", permanent: false },
      { source: "/our-videos.htm", destination: "/media", permanent: false },
      { source: "/testimonials.htm", destination: "/media", permanent: false },
      { source: "/testimonials-inner-2.htm", destination: "/media", permanent: false },
      { source: "/testimonials-inner-3.htm", destination: "/media", permanent: false },
      { source: "/products.htm", destination: "/", permanent: false },
      { source: "/products.rss", destination: "/", permanent: false },
      { source: "/sitemap.htm", destination: "/", permanent: false },
      { source: "/current-jobs.htm", destination: "/contact", permanent: false },
      { source: "/motorized-system.htm", destination: "/category/motorized-systems", permanent: false },
      { source: "/sound-proof-system.htm", destination: "/category/sound-proof-windows", permanent: false },
      ...productRedirects,
    ];
  },
};

export default nextConfig;
