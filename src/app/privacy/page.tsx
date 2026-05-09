import { Metadata } from 'next';
import { catalog } from '@/lib/catalog';
import ThemeMarker from '@/components/ThemeMarker';

export const metadata: Metadata = {
  title: 'Privacy Policy | Kiran Slido Craft',
  description: 'Privacy Policy for Kiran Slido Craft. Learn how we handle and protect your data.',
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
            Privacy Policy.
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
              At {company.name}, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our website or engage with our services.
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              We may collect the following types of information when you interact with us:
            </p>
            <ul>
              <li><strong>Personal Data:</strong> Name, email address, phone number, and company details when you submit a contact form or request a quote.</li>
              <li><strong>Usage Data:</strong> Information about how you navigate our website, including IP address, browser type, and operating system, collected via cookies and analytics tools.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the collected information for the following purposes:
            </p>
            <ul>
              <li>To provide and maintain our engineering and export services.</li>
              <li>To communicate with you regarding quotes, projects, and support.</li>
              <li>To improve our website functionality and user experience.</li>
              <li>To comply with legal and regulatory requirements.</li>
            </ul>

            <h2>3. Data Protection and Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal data from unauthorized access, alteration, or disclosure. However, no internet transmission is entirely secure, and we cannot guarantee absolute security.
            </p>

            <h2>4. Third-Party Sharing</h2>
            <p>
              We do not sell your personal data. We may share necessary information with trusted third-party service providers (e.g., shipping partners, analytics providers) solely to facilitate our services. These partners are bound by strict confidentiality agreements.
            </p>

            <h2>5. Your Rights</h2>
            <p>
              Depending on your jurisdiction, you may have the right to access, update, or delete your personal data. To exercise these rights, please contact us at <a href={`mailto:${company.email}`}>{company.email}</a>.
            </p>

            <h2>6. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations. The "Last Updated" date will indicate the latest revision.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <address className="not-italic">
              <strong>{company.name}</strong><br />
              {company.locations[0].address}<br />
              {company.locations[0].city}<br />
              Email: <a href={`mailto:${company.email}`}>{company.email}</a><br />
              Phone: {company.phoneDisplay}
            </address>
          </div>
        </div>
      </div>
    </article>
  );
}
