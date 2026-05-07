"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store/StoreContext";
import { Product } from "@/models/Catalog";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductPageClientProps {
  product: Product;
}

export const ProductPageClient = observer(({ product }: ProductPageClientProps) => {
  const { catalogStore } = useStore();
  
  if (!catalogStore.isLoaded) {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Loading Product...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const related = catalogStore.getRelatedProducts(product);

  const technicalImages = product.images.filter(
    (src) => src.includes("technical-details") || src.includes("btu-loss")
  );
  const galleryImages = product.images.filter(
    (src) => !src.includes("technical-details") && !src.includes("btu-loss")
  );

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-slate-50 py-12 border-b border-slate-200">
          <div className="container mx-auto px-4 md:px-8">
            <nav className="mb-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span>/</span>
              <span className="text-slate-900">{product.title}</span>
            </nav>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <Badge className="mb-4 bg-blue-600 font-black uppercase tracking-widest px-3 py-1 text-[10px]">
                  {product.category}
                </Badge>
                <h1 className="mb-6 text-4xl font-black leading-tight text-slate-900 md:text-6xl">
                  {product.title}
                </h1>
                <p className="mb-8 text-lg leading-relaxed text-slate-600">
                  {product.summary}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="h-14 px-8 text-sm font-black uppercase tracking-widest bg-blue-600 hover:bg-blue-700">
                    <Link href="/contact">Request Quote</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-14 px-8 text-sm font-black uppercase tracking-widest border-slate-200 hover:bg-slate-100">
                    <a href="https://wa.me/919324084590">WhatsApp Us</a>
                  </Button>
                </div>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-white p-4 shadow-2xl">
                <Image
                  src={`/assets/source/${product.images[0] || "home/1.jpg"}`}
                  alt={product.title}
                  fill
                  className="object-contain p-8"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid gap-16 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="mb-8 text-3xl font-black tracking-tight text-slate-900">
                  Product Gallery
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {galleryImages.map((src, i) => (
                    <div key={src} className="group relative aspect-square overflow-hidden rounded-xl border border-slate-100 bg-slate-50 shadow-sm transition-all hover:shadow-md">
                      <Image
                        src={`/assets/source/${src}`}
                        alt={`${product.title} gallery ${i + 1}`}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>

                {technicalImages.length > 0 && (
                  <div className="mt-24">
                    <h2 className="mb-8 text-3xl font-black tracking-tight text-slate-900">
                      Technical Specifications
                    </h2>
                    <div className="space-y-8">
                      {technicalImages.map((src) => (
                        <div key={src} className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                          <Image
                            src={`/assets/source/${src}`}
                            alt={`${product.title} technical detail`}
                            width={1200}
                            height={800}
                            className="h-auto w-full object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-12">
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="mb-6 text-xl font-black tracking-tight text-slate-900">
                    Material / Construction
                  </h3>
                  <ul className="space-y-4">
                    {product.specs.map((spec) => (
                      <li key={spec} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="mb-6 text-xl font-black tracking-tight text-slate-900">
                    Applications
                  </h3>
                  <ul className="space-y-4">
                    {product.applications.map((app) => (
                      <li key={app} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>

                {product.specialties && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                    <h3 className="mb-6 text-xl font-black tracking-tight text-slate-900">
                      Key Specialties
                    </h3>
                    <ul className="space-y-4">
                      {product.specialties.map((specialty) => (
                        <li key={specialty} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                          {specialty}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="bg-slate-50 py-24 border-t border-slate-200">
            <div className="container mx-auto px-4 md:px-8">
              <h2 className="mb-12 text-3xl font-black tracking-tight text-slate-900">
                Related Products
              </h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
});
