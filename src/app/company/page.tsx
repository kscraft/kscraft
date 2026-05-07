"use client";

import React from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CompanyPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-slate-50 py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <nav className="mb-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                  <a href="/" className="hover:text-blue-600">Home</a>
                  <span>/</span>
                  <span className="text-slate-900">Our Company</span>
                </nav>
                <h1 className="mb-6 text-5xl font-black leading-tight text-slate-900 md:text-7xl">
                  Our <span className="text-blue-600">Company</span>
                </h1>
                <p className="mb-6 text-lg leading-relaxed text-slate-600">
                  Kiran Slido Craft, a proprietary concern, was established in 1985. We manufacture automatic systems and sound reduction systems while keeping our promise of quality to clients.
                </p>
                <p className="text-lg leading-relaxed text-slate-600">
                  Our products are made in India with indigenous technology, ensuring robust performance and long-lasting durability tailored to local conditions and international standards.
                </p>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/assets/source/home/3.jpg"
                  alt="Kiran Slido Craft Workshop"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
