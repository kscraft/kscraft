"use client";

import React from "react";
import Image from "next/image";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store/StoreContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default observer(function MediaGalleryPage() {
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
              <span className="text-slate-900">Media Gallery</span>
            </nav>
            <div className="mb-16 max-w-2xl">
              <h1 className="mb-6 text-5xl font-black leading-tight text-slate-900 md:text-7xl">
                Media <span className="text-blue-600">Gallery</span>
              </h1>
              <p className="text-lg leading-relaxed text-slate-600">
                Explore videos and images demonstrating our products in action.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {catalogStore.gallery.map((src, i) => (
                <div key={src} className="group relative aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl">
                  <Image
                    src={`/assets/source/${src}`}
                    alt={`Media item ${i + 1}`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {src.includes("video") && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-2xl transition-transform group-hover:scale-110">
                        <svg className="ml-1 h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
});
