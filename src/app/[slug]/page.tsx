import { catalogStore } from "@/store/CatalogStore";
import { ProductPageClient } from "./ProductPageClient";

export function generateStaticParams() {
  return catalogStore.productPages.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = catalogStore.getProductBySlug(slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductPageClient product={product} />;
}
