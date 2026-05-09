import { Metadata } from 'next';
import { catalog } from '@/lib/catalog';
import ThemeMarker from '@/components/ThemeMarker';

export const metadata: Metadata = {
  title: 'Terms of Use | Kiran Slido Craft',
  description: 'Terms of Use for Kiran Slido Craft. Read our terms and conditions for using our services.',
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
            Terms of Use.
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mt-8">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </header>

      <div className="section-standard">
        <div className="max-container max-w-3xl">
          <div className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-blue-600">
            <p>
              Welcome to {company.name}. By accessing our website and using our engineering, manufacturing, and export services, you agree to comply with and be bound by the following Terms of Use.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing this website, you accept these Terms of Use in full. If you disagree with any part of these terms, please do not use our website or services.
            </p>

            <h2>2. Intellectual Property Rights</h2>
            <p>
              Unless otherwise stated, {company.name} owns the intellectual property rights for all material on this website, including but not limited to technical specifications, designs, text, and images. All intellectual property rights are reserved. You may view and print pages for your personal use subject to restrictions set in these terms.
            </p>

            <h2>3. Website Usage</h2>
            <p>
              You are specifically restricted from:
            </p>
            <ul>
              <li>Publishing any website material in any other media without prior consent.</li>
              <li>Selling, sublicensing, or commercializing any website material.</li>
              <li>Using this website in any way that is or may be damaging to this website or {company.name}.</li>
              <li>Engaging in any data mining, data harvesting, data extracting, or any other similar activity in relation to this website.</li>
            </ul>

            <h2>4. Technical Specifications and Accuracy</h2>
            <p>
              While we strive to provide accurate technical data, specifications for acoustic systems, automation systems, and other products are subject to change due to ongoing engineering improvements. We do not warrant the completeness or absolute accuracy of the information published on this website. Final product specifications should be confirmed during the quotation and contract phase.
            </p>

            <h2>5. Limitation of Liability</h2>
            <p>
              In no event shall {company.name}, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website. {company.name} shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.
            </p>

            <h2>6. Governing Law & Jurisdiction</h2>
            <p>
              These Terms will be governed by and interpreted in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Mumbai, India for the resolution of any disputes.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Use, please contact us at <a href={`mailto:${company.email}`}>{company.email}</a>.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
