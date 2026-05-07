"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
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
                  <span className="text-slate-900">Contact</span>
                </nav>
                <h1 className="mb-6 text-5xl font-black leading-tight text-slate-900 md:text-7xl">
                  Get in <span className="text-blue-600">Touch</span>
                </h1>
                <p className="mb-8 text-lg leading-relaxed text-slate-600">
                  Speak with Kiran Slido Craft for product consultation, site visits, technical drawings, and quote requests. Our team is ready to assist you with your soundproofing and automation needs.
                </p>
              </div>
              <div>
                <Card className="overflow-hidden border-none shadow-2xl">
                  <div className="h-2 bg-orange-500" />
                  <CardContent className="grid gap-8 p-10 bg-white">
                    <div className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Phone Numbers</span>
                      <div className="flex flex-col gap-2">
                        <a href="tel:+919324084590" className="text-2xl font-black text-slate-900 hover:text-blue-600 transition-colors">+91 93240 84590</a>
                        <a href="tel:+919769371856" className="text-2xl font-black text-slate-900 hover:text-blue-600 transition-colors">+91 97693 71856</a>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Email Address</span>
                      <a href="mailto:info@kiranslidocraft.com" className="block text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors">info@kiranslidocraft.com</a>
                    </div>
                    <div className="pt-4">
                      <Button asChild size="lg" className="w-full h-14 text-sm font-black uppercase tracking-widest bg-green-600 hover:bg-green-700">
                        <a href="https://wa.me/919324084590">WhatsApp Us</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
