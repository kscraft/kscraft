"use client";

import React from "react";
import Image from "next/image";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store/StoreContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default observer(function ClientsPage() {
  const { catalogStore } = useStore();

  if (!catalogStore.isLoaded) {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-slate-50 py-24">
          <div className="container mx-auto px-4 md:px-8">
            <nav className="mb-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
              <a href="/" className="hover:text-blue-600">Home</a>
              <span>/</span>
              <span className="text-slate-900">Our Clients</span>
            </nav>
            <div className="mb-16 max-w-2xl">
              <h1 className="mb-6 text-5xl font-black leading-tight text-slate-900 md:text-7xl">
                Our <span className="text-blue-600">Clients</span>
              </h1>
              <p className="text-lg leading-relaxed text-slate-600">
                We are proud to have partnered with leading organizations across various industries, providing them with customized soundproofing and automation solutions.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {catalogStore.clients.map((src) => (
                <div key={src} className="flex aspect-[3/2] items-center justify-center rounded-2xl border border-slate-200 bg-white p-10 transition-all hover:shadow-xl">
                  <Image
                    src={`/assets/source/${src}`}
                    alt="Client logo"
                    width={200}
                    height={100}
                    className="h-auto w-auto max-h-full object-contain"
                  />
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
