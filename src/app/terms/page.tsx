import { Metadata } from 'next';
import { catalog } from '@/lib/catalog';
import { sanitizeTrustedHtml } from '@/lib/sanitize';
import ThemeMarker from '@/components/ThemeMarker';

export const metadata: Metadata = {
  title: 'Terms of Use | Kiran Slido Craft',
  description: 'Terms of Use for Kiran Slido Craft. Read our terms and conditions governing the use of our website, engineering services, and intellectual property.',
  alternates: {
    canonical: 'https://doorwindowcraft.com/terms',
  },
  openGraph: {
    title: 'Terms of Use | Kiran Slido Craft',
    description: 'Terms and conditions for using Kiran Slido Craft services and website.',
    url: 'https://doorwindowcraft.com/terms',
    type: 'website',
  },
};

export default function TermsOfUsePage() {
  const { company } = catalog;

  return (
    <article className="bg-white min-h-screen">
      <header className="hero-light border-b border-slate-100">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container pt-32 pb-20">
          <p className="text-eyebrow mb-6">Legal</p>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            {company.legal.terms.title}
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto mt-8">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </header>

      <div className="section-standard">
        <div className="max-container max-w-3xl">
          <div className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-blue-600">
            <p>
              {company.legal.terms.description.replace(/{companyName}/g, company.name)}
            </p>
            <div dangerouslySetInnerHTML={{ 
              __html: sanitizeTrustedHtml(company.legal.terms.contentHtml
                .replace(/{companyName}/g, company.name)
                .replace(/{email}/g, company.email))
            }} />
          </div>
        </div>
      </div>
    </article>
  );
}
