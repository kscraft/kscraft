"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store/StoreContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";

export default observer(function ServicesPage() {
  const { catalogStore } = useStore();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-slate-50 py-24">
          <div className="container mx-auto px-4 md:px-8">
            <nav className="mb-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
              <a href="/" className="hover:text-blue-600">Home</a>
              <span>/</span>
              <span className="text-slate-900">Services & Products</span>
            </nav>
            <div className="mb-16 max-w-2xl">
              <h1 className="mb-6 text-5xl font-black leading-tight text-slate-900 md:text-7xl">
                Our <span className="text-blue-600">Services</span>
              </h1>
              <p className="text-lg leading-relaxed text-slate-600">
                Browse our full catalog of high-performance soundproofing and automation solutions. We provide end-to-end services from design and manufacturing to installation and maintenance.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {catalogStore.productPages.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
});
