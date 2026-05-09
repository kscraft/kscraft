import { Metadata } from 'next';
import { catalog } from '@/lib/catalog';
import ThemeMarker from '@/components/ThemeMarker';

export const metadata: Metadata = {
  title: 'Privacy Policy | Kiran Slido Craft',
  description: 'Privacy Policy for Kiran Slido Craft. Learn how we collect, use, and protect your personal data when using our acoustic engineering services and website.',
  alternates: {
    canonical: 'https://kiranslidocraft.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Kiran Slido Craft',
    description: 'How we handle and protect your data. Read our full privacy policy.',
    url: 'https://kiranslidocraft.com/privacy',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  const { company } = catalog;

  return (
    <article className="bg-white min-h-screen">
      <header className="hero-light border-b border-slate-100">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container pt-32 pb-20">
          <p className="text-eyebrow mb-6">Legal</p>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            {company.legal.privacy.title}
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
              {company.legal.privacy.description.replace(/{companyName}/g, company.name)}
            </p>
            <div dangerouslySetInnerHTML={{ 
              __html: company.legal.privacy.contentHtml
                .replace(/{companyName}/g, company.name)
                .replace(/{email}/g, company.email)
                .replace(/{address}/g, company.locations[0].address)
                .replace(/{city}/g, company.locations[0].city)
                .replace(/{phone}/g, company.phoneDisplay)
            }} />
          </div>
        </div>
      </div>
    </article>
  );
}
