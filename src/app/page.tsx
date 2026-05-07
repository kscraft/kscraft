"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store/StoreContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

// Fresh build for production verification
export default observer(function Home() {
  const { catalogStore } = useStore();
  const featured = catalogStore.getFeaturedProducts();

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-32">
          <div className="container mx-auto grid gap-12 px-4 md:px-8 lg:grid-cols-2 lg:items-center">
            <div className="max-w-2xl">
              <h1 className="mb-6 text-5xl font-black leading-[1.1] tracking-tight text-slate-900 md:text-7xl">
                Quality Sound Proofing & <span className="text-blue-600">Automation</span> Solutions
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-slate-600">
                Kiran Slido Craft manufactures premium sound proof windows, partitions, and motorized systems in Mumbai since 1985. Engineering excellence for acoustic privacy and seamless automation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="h-14 px-8 text-sm font-black uppercase tracking-widest bg-blue-600 hover:bg-blue-700">
                  <Link href="/soundproofwindow">View Products</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-sm font-black uppercase tracking-widest border-slate-200 hover:bg-slate-100">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl transition-transform hover:-translate-y-2">
                  <Image
                    src="/assets/photos/hero-soundproof.jpg"
                    alt="Sound proofing solutions"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                    <strong className="text-xl font-bold text-white">Sound Proofing</strong>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="group relative aspect-square overflow-hidden rounded-2xl shadow-xl transition-transform hover:-translate-y-2">
                    <Image
                      src="/assets/photos/hero-window.jpg"
                      alt="Soundproof Windows"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                      <strong className="text-lg font-bold text-white">Windows</strong>
                    </div>
                  </div>
                  <div className="group relative aspect-square overflow-hidden rounded-2xl shadow-xl transition-transform hover:-translate-y-2">
                    <Image
                      src="/assets/photos/company-workshop.jpg"
                      alt="Our workshop"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                      <strong className="text-lg font-bold text-white">Workshop</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Proof Strip */}
        <section className="border-y border-slate-100 bg-white py-12">
          <div className="container mx-auto grid grid-cols-2 gap-8 px-4 md:px-8 lg:grid-cols-4">
            <div className="text-center lg:text-left">
              <strong className="block text-3xl font-black text-slate-900">Since 1985</strong>
              <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Established Manufacturer</span>
            </div>
            <div className="text-center lg:text-left">
              <strong className="block text-3xl font-black text-slate-900">Made in India</strong>
              <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Indigenous Engineering</span>
            </div>
            <div className="text-center lg:text-left">
              <strong className="block text-3xl font-black text-slate-900">STC 30-52db</strong>
              <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Sound Reduction Rating</span>
            </div>
            <div className="text-center lg:text-left">
              <strong className="block text-3xl font-black text-slate-900">Custom Built</strong>
              <span className="text-sm font-bold uppercase tracking-widest text-slate-400">As per requirement</span>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="mb-16 max-w-2xl">
              <h2 className="mb-4 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
                Product Catalog
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Explore our specialized range of acoustic and automated solutions designed for modern architecture.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-slate-50 py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
              {catalogStore.navGroups.map((group) => (
                <div key={group.title} className="bg-white p-10 flex flex-col h-full transition-colors hover:bg-slate-50/50">
                  <h3 className="mb-6 text-2xl font-black leading-tight text-slate-900">
                    {group.title}
                  </h3>
                  <ul className="mb-8 space-y-3 flex-1">
                    {group.items.map(([title, href]) => (
                      <li key={title}>
                        <Link href={`/${href.replace(".html", "")}`} className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
                          {title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="link" className="h-auto p-0 justify-start text-xs font-black uppercase tracking-widest text-blue-600">
                    <Link href={`/${group.href.replace(".html", "")}`}>View All</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Logos */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
              <div className="max-w-md">
                <h2 className="mb-4 text-4xl font-black tracking-tight text-slate-900">
                  Trusted by Industry Leaders
                </h2>
                <p className="text-slate-500 mb-6">
                  We have served premium clients across industrial, commercial, and residential sectors.
                </p>
                <Button asChild variant="outline" className="font-bold tracking-widest uppercase text-xs h-12">
                  <Link href="/clients">View All Clients</Link>
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6 flex-1 max-w-2xl">
                {catalogStore.clients.slice(0, 6).map((src) => (
                  <div key={src} className="flex aspect-[3/2] items-center justify-center rounded-xl border border-slate-100 bg-slate-50/50 p-6 grayscale transition-all hover:grayscale-0 hover:bg-white hover:shadow-lg">
                    <Image
                      src={`/assets/source/${src}`}
                      alt="Client logo"
                      width={120}
                      height={60}
                      className="h-auto w-auto max-h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
});
