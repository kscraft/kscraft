import fs from "node:fs/promises";
import path from "node:path";
import { certifications, clients, gallery, navGroups, productPages, sourceBase } from "./site-data.mjs";

const outRoot = process.cwd();
const sourceRoot = path.join(outRoot, "assets", "source");

const assetPath = (src) => `assets/source/${src}`;
const pageHref = (slug) => `${slug}.html`;
const productBySlug = new Map(productPages.map((p) => [p.slug, p]));

function escapeHtml(value = "") {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function localImage(src) {
  return assetPath(src);
}

function navHtml() {
  return navGroups
    .map((group) => `<div class="nav-group">
      <a href="${group.href}">${escapeHtml(group.title)}</a>
      <div class="nav-menu">
        ${group.items.map(([title, href]) => `<a href="${href}">${escapeHtml(title)}</a>`).join("")}
      </div>
    </div>`)
    .join("");
}

function pageShell({ title, description, body, canonical }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)} | Kiran Slido Craft</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="canonical" href="https://ksco.vercel.app/${canonical || ""}">
    <meta property="og:title" content="${escapeHtml(title)} | Kiran Slido Craft">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="${localImage("home/1.jpg")}">
    <link rel="icon" href="${localImage("img/logo.png")}" type="image/png">
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="index.html" aria-label="Kiran Slido Craft home">
        <img src="${localImage("img/logo.png")}" alt="Kiran Slido Craft logo">
      </a>
      <nav class="nav" aria-label="Product navigation">${navHtml()}</nav>
      <a class="header-call" href="tel:+919324084590">+91 93240 84590</a>
    </header>
    ${body}
    <footer class="footer">
      <div>
        <img src="${localImage("img/logo.png")}" alt="Kiran Slido Craft">
        <p>Sound Proof Windows, Sound Proof Partitions, Motorized Sliding Systems, Roof Sliding Systems, Barrier Systems and Vertical Sliding Windows.</p>
      </div>
      <div>
        <strong>Contact</strong>
        <a href="tel:+919324084590">+91 93240 84590</a>
        <a href="tel:+919769371856">+91 97693 71856</a>
        <a href="mailto:info@kiranslidocraft.com">info@kiranslidocraft.com</a>
      </div>
      <div>
        <strong>Follow</strong>
        <a href="https://www.youtube.com/kiranslidocraft">YouTube</a>
        <a href="https://www.linkedin.com/company/kiranslidocraft/">LinkedIn</a>
        <a href="https://www.facebook.com/kiranslidocraft/">Facebook</a>
      </div>
    </footer>
  </body>
</html>`;
}

function productCard(product) {
  const image = product.images[0] || "home/1.jpg";
  return `<article class="product-card">
    <a href="${pageHref(product.slug)}"><img src="${localImage(image)}" alt="${escapeHtml(product.title)}"></a>
    <div>
      <span>${escapeHtml(product.category)}</span>
      <h3><a href="${pageHref(product.slug)}">${escapeHtml(product.title)}</a></h3>
      <p>${escapeHtml(product.summary)}</p>
      <a class="text-link" href="${pageHref(product.slug)}">View product</a>
    </div>
  </article>`;
}

function imageGrid(images, title) {
  return `<div class="image-grid">
    ${images.map((src) => `<img src="${localImage(src)}" alt="${escapeHtml(title)} product image">`).join("")}
  </div>`;
}

function listBlock(title, items = []) {
  if (!items.length) return "";
  return `<section class="detail-list">
    <h2>${escapeHtml(title)}</h2>
    <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
  </section>`;
}

function productPage(product) {
  const related = (product.related || []).map((slug) => productBySlug.get(slug)).filter(Boolean);
  return pageShell({
    title: product.title,
    description: product.summary,
    canonical: pageHref(product.slug),
    body: `<main>
      <section class="page-hero product-hero">
        <div>
          <p class="breadcrumb"><a href="index.html">Home</a> / ${escapeHtml(product.title)}</p>
          <h1>${escapeHtml(product.title)}</h1>
          <p>${escapeHtml(product.summary)}</p>
          <div class="hero-actions">
            <a class="button primary" href="contact.html">Request Quote</a>
            <a class="button secondary" href="https://wa.me/919324084590">WhatsApp Us</a>
          </div>
        </div>
        <img src="${localImage(product.images[0] || "home/1.jpg")}" alt="${escapeHtml(product.title)}">
      </section>
      <section class="content-split">
        <div>
          <h2>Product Gallery</h2>
          <p>Images on this page are retained from the original Kiran Slido Craft product pages so the new site preserves the actual product catalog.</p>
        </div>
        ${imageGrid(product.images, product.title)}
      </section>
      <section class="spec-grid">
        ${listBlock("Material / Construction", product.specs)}
        ${listBlock("Widely Used In Places Like", product.applications)}
        ${listBlock("Specialty", product.specialties)}
      </section>
      ${product.images.some((src) => src.includes("technical-details") || src.includes("btu-loss")) ? `<section class="technical-band">
        <h2>Technical Details</h2>
        <div class="technical-images">
          ${product.images.filter((src) => src.includes("technical-details") || src.includes("btu-loss")).map((src) => `<img src="${localImage(src)}" alt="${escapeHtml(product.title)} technical detail">`).join("")}
        </div>
      </section>` : ""}
      ${related.length ? `<section class="related-products">
        <h2>Related Products</h2>
        <div class="product-grid">${related.map(productCard).join("")}</div>
      </section>` : ""}
    </main>`,
  });
}

function homePage() {
  const featured = productPages.filter((p) => ["soundproofwindow", "sound-proof-partitions", "motorized-sliding-system", "motorized-roof-sliding-system", "barrier-system", "vertical-sliding-windows"].includes(p.slug));
  return pageShell({
    title: "Sound Proof Windows, Partitions & Automation Systems",
    description: "Kiran Slido Craft manufactures sound proof windows, sound proof partitions, motorized sliding systems, roof sliding systems, barrier systems and vertical sliding windows in Mumbai.",
    canonical: "",
    body: `<main>
      <section class="home-hero">
        <div class="hero-copy">
          <h1>Quality Sound Proofing & Automation Solutions</h1>
          <p>Kiran Slido Craft manufactures sound proof windows, sound proof partitions, motorized sliding systems, roof sliding systems, barrier systems and vertical sliding windows from Mumbai.</p>
          <div class="hero-actions">
            <a class="button primary" href="soundproofwindow.html">View Products</a>
            <a class="button secondary" href="contact.html">Contact Us</a>
          </div>
        </div>
        <div class="home-tiles">
          <a href="soundproofwindow.html"><img src="${localImage("home/1.jpg")}" alt="Sound proofing solutions"><strong>Sound Proof Windows</strong></a>
          <a href="company.html"><img src="${localImage("home/3.jpg")}" alt="Our company"><strong>Our Company</strong></a>
          <a href="services.html"><img src="${localImage("home/5.jpg")}" alt="Our services"><strong>Our Services</strong></a>
          <a href="contact.html"><img src="${localImage("home/7.jpg")}" alt="Contact Kiran Slido Craft"><strong>Contact Us</strong></a>
        </div>
      </section>
      <section class="proof-strip">
        <div><strong>Since 1985</strong><span>Established Mumbai manufacturer</span></div>
        <div><strong>Made in India</strong><span>Indigenous engineering and fabrication</span></div>
        <div><strong>STC 30-52db</strong><span>Sound reduction window systems</span></div>
        <div><strong>Custom Built</strong><span>Made as per client requirement</span></div>
      </section>
      <section class="catalog-section">
        <div class="section-title">
          <h2>Product Catalog</h2>
          <p>The new site now mirrors the original product taxonomy and keeps the missing product routes available as static pages.</p>
        </div>
        <div class="product-grid">${featured.map(productCard).join("")}</div>
      </section>
      <section class="category-index">
        ${navGroups.map((group) => `<div>
          <h2><a href="${group.href}">${escapeHtml(group.title)}</a></h2>
          ${group.items.map(([title, href]) => `<a href="${href}">${escapeHtml(title)}</a>`).join("")}
        </div>`).join("")}
      </section>
      <section class="media-section">
        <div>
          <h2>Clients & Certifications</h2>
          <p>Original client logos, certification images, product diagrams and gallery images are now carried into the replacement site instead of being dropped.</p>
          <a class="text-link" href="clients.html">View clients</a>
        </div>
        <div class="logo-wall">${clients.slice(0, 6).map((src) => `<img src="${localImage(src)}" alt="Kiran Slido Craft client">`).join("")}</div>
      </section>
    </main>`,
  });
}

function simplePage({ file, title, description, body }) {
  return pageShell({ title, description, canonical: file, body });
}

async function downloadAsset(src) {
  const dest = path.join(sourceRoot, src);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  try {
    await fs.access(dest);
    return;
  } catch {}
  const response = await fetch(new URL(src, sourceBase));
  if (!response.ok) throw new Error(`Failed ${response.status} ${src}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(dest, buffer);
}

async function write(file, content) {
  await fs.writeFile(path.join(outRoot, file), content);
}

async function main() {
  const requiredAssets = new Set([
    "img/logo.png",
    "home/1.jpg",
    "home/3.jpg",
    "home/5.jpg",
    "home/7.jpg",
    ...productPages.flatMap((p) => p.images),
    ...clients,
    ...certifications,
    ...gallery,
  ]);
  for (const src of requiredAssets) await downloadAsset(src);

  await write("index.html", homePage());
  for (const product of productPages) await write(pageHref(product.slug), productPage(product));
  await write("company.html", simplePage({
    file: "company.html",
    title: "Our Company",
    description: "Kiran Slido Craft was established in 1985 and manufactures automatic systems and sound reduction systems in Mumbai.",
    body: `<main><section class="page-hero"><div><p class="breadcrumb"><a href="index.html">Home</a> / Our Company</p><h1>Our Company</h1><p>Kiran Slido Craft a proprietary concern was established in 1985. We manufacture automatic system and sound reduction system while keeping our promise of quality to clients. Our products are made in India with indigenous technology.</p></div><img src="${localImage("home/3.jpg")}" alt="Kiran Slido Craft company"></section></main>`,
  }));
  await write("services.html", simplePage({
    file: "services.html",
    title: "Our Services",
    description: "Kiran Slido Craft services for sound proofing, sliding systems, roof systems, barriers and installation.",
    body: `<main><section class="catalog-section"><div class="section-title"><p class="breadcrumb"><a href="index.html">Home</a> / Services</p><h1>Our Services</h1><p>Browse the full product and service catalog.</p></div><div class="product-grid">${productPages.map(productCard).join("")}</div></section></main>`,
  }));
  await write("clients.html", simplePage({
    file: "clients.html",
    title: "Our Clients",
    description: "Client logos from Kiran Slido Craft's original site.",
    body: `<main><section class="catalog-section"><div class="section-title"><p class="breadcrumb"><a href="index.html">Home</a> / Clients</p><h1>Our Clients</h1></div><div class="logo-wall large">${clients.map((src) => `<img src="${localImage(src)}" alt="Kiran Slido Craft client">`).join("")}</div></section></main>`,
  }));
  await write("certifications.html", simplePage({
    file: "certifications.html",
    title: "Certifications",
    description: "Certification images from Kiran Slido Craft.",
    body: `<main><section class="catalog-section"><div class="section-title"><p class="breadcrumb"><a href="index.html">Home</a> / Certifications</p><h1>Certifications</h1></div><div class="image-grid certs">${certifications.map((src) => `<img src="${localImage(src)}" alt="Kiran Slido Craft certification">`).join("")}</div></section></main>`,
  }));
  await write("media-gallery.html", simplePage({
    file: "media-gallery.html",
    title: "Media Gallery",
    description: "Media gallery from Kiran Slido Craft.",
    body: `<main><section class="catalog-section"><div class="section-title"><p class="breadcrumb"><a href="index.html">Home</a> / Media Gallery</p><h1>Media Gallery</h1></div><div class="image-grid">${gallery.map((src) => `<img src="${localImage(src)}" alt="Kiran Slido Craft media">`).join("")}</div></section></main>`,
  }));
  await write("contact.html", simplePage({
    file: "contact.html",
    title: "Contact",
    description: "Contact Kiran Slido Craft for sound proof windows, partitions and motorized systems.",
    body: `<main><section class="contact-page"><div><p class="breadcrumb"><a href="index.html">Home</a> / Contact</p><h1>Contact</h1><p>Speak with Kiran Slido Craft for product consultation, site visits, drawings and quote requests.</p></div><div class="contact-card"><a href="tel:+919324084590">+91 93240 84590</a><a href="tel:+919769371856">+91 97693 71856</a><a href="mailto:info@kiranslidocraft.com">info@kiranslidocraft.com</a><a href="https://wa.me/919324084590" class="button primary">WhatsApp Us</a></div></section></main>`,
  }));
  await write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${["index.html", "company.html", "services.html", "clients.html", "certifications.html", "media-gallery.html", "contact.html", ...productPages.map((p) => pageHref(p.slug))].map((file) => `  <url><loc>https://ksco.vercel.app/${file === "index.html" ? "" : file}</loc></url>`).join("\n")}\n</urlset>\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
