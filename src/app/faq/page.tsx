import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BarChart3, Globe, MapPin, Ruler, ShieldCheck, Sparkles, Wrench, type LucideIcon } from 'lucide-react';
import ThemeMarker from '@/components/ThemeMarker';
import Breadcrumbs from '@/components/Breadcrumbs';
import { faqCategories, getAllFaqs } from '@/data/faqs';

const SITE_URL = 'https://soundproofindia.com';

const iconMap: Record<string, LucideIcon> = {
  MapPin,
  Ruler,
  BarChart3,
  Wrench,
  ShieldCheck,
  Globe,
};

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Kiran Slido Craft',
  description: 'Get answers to common questions about soundproof windows, acoustic doors, movable partitions, delivery, customization, STC ratings, installation, warranty, and international export.',
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    title: 'FAQ | Kiran Slido Craft',
    description: 'Answers to your questions about acoustic systems, customization, delivery, STC performance, and global export.',
    url: `${SITE_URL}/faq`,
    type: 'website',
  },
};

export default function FaqPage() {
  const allFaqs = getAllFaqs();

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE_URL}/faq` },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <header className="hero-dark">
        <ThemeMarker theme="dark" className="absolute top-0" />
        <div className="max-container px-6">
          <Breadcrumbs items={[{ label: 'FAQ' }]} />
          <p className="text-eyebrow text-blue-300">Common Questions</p>
          <h1 className="heading-hero text-white">
            Frequently Asked <span className="text-blue-500">Questions</span>
          </h1>
          <p className="mt-8 max-w-3xl text-xl font-medium leading-9 text-slate-300">
            Everything you need to know about specifying, ordering, and installing our acoustic and automation systems.
          </p>
        </div>
      </header>

      <section className="section-standard">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          {/* Category Quick Nav */}
          <div className="flex flex-wrap gap-3 mb-16">
            {faqCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
              >
                {cat.title}
              </a>
            ))}
          </div>

          {/* FAQ Categories */}
          <div className="space-y-20">
            {faqCategories.map((cat) => {
              const Icon = iconMap[cat.icon] || Sparkles;
              return (
                <div key={cat.id} id={cat.id} className="scroll-mt-32">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">{cat.title}</h2>
                  </div>
                  <div className="grid gap-6">
                    {cat.faqs.map((faq, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                      >
                        <h3 className="text-lg font-bold leading-tight text-slate-900">{faq.question}</h3>
                        <p className="mt-4 text-base font-medium leading-7 text-slate-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-standard text-center border-t border-slate-100">
        <div className="max-container max-w-4xl">
          <Sparkles className="mx-auto mb-6 h-9 w-9 text-blue-600" />
          <p className="text-eyebrow text-center">Still have questions?</p>
          <h2 className="heading-section text-center">Talk to our engineering team</h2>
          <Link href="/contact" className="apple-button inline-flex px-10 py-4 text-sm font-black uppercase tracking-widest">
            Contact Us <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
