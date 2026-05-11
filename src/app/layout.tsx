import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import CompareEngine from '@/components/CompareEngine';
import { HeaderThemeProvider } from '@/lib/HeaderThemeContext';
import { products } from '@/lib/catalog';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const SITE_URL = 'https://doorwindowcraft.com';
const isVercelRuntime = process.env.VERCEL === '1' || Boolean(process.env.VERCEL_ENV);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Kiran Slido Craft | Global Exporter of Acoustic & Automation Systems',
  description: 'Licensed global exporter of premium soundproofing and architectural automation. Serving UK, Europe, GCC/MENA, APAC, Australia, and the Americas with ISO 9001 certified engineering.',
  keywords: [
    'Acoustic Windows Exporter',
    'Soundproof Doors Middle East',
    'Motorized Sliding Roof UK Europe',
    'Industrial Automation APAC',
    'Architectural Acoustics GCC MENA',
    'Retractable Roofing Australia',
    'STC Rated Systems Global Export',
    'Kiran Slido Craft'
  ],
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-US': SITE_URL,
      'en-IN': SITE_URL,
      'en-AE': SITE_URL,
      'zh-CN': SITE_URL,
      'ar-AE': SITE_URL,
      'hi-IN': SITE_URL,
      'mr-IN': SITE_URL,
      'bn-IN': SITE_URL,
    },
  },
  openGraph: {
    title: 'Kiran Slido Craft | Global Acoustic & Automation Excellence',
    description: 'Precision engineering for silence and movement. Exporting to UK, Europe, GCC/MENA, APAC, and Australia.',
    url: SITE_URL,
    siteName: 'Kiran Slido Craft',
    images: [
      {
        url: '/logo-ksc.png',
        width: 1200,
        height: 630,
        alt: 'Kiran Slido Craft Logo',
      },
    ],
    locale: 'en_US',
    alternateLocale: ['en_IN', 'en_AE', 'zh_CN', 'ar_AE', 'hi_IN', 'mr_IN', 'bn_IN'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kiran Slido Craft | Engineering Silence Worldwide',
    description: 'Licensed exporter of acoustic and automation systems to UK, Europe, GCC/MENA, and APAC regions.',
    images: ['/logo-ksc.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Kiran Slido Craft',
    'url': SITE_URL,
    'logo': `${SITE_URL}/logo-ksc.png`,
    'description': 'ISO 9001:2015 certified leader and licensed global exporter of advanced acoustic systems and architectural automation serving the UK, Europe, GCC/MENA, APAC, and Australia.',
    'alternateName': [
      'كيران سلايدو كرافت',
      'Kiran Slido Craft 建筑自动化',
      'किरण स्लीडो क्राफ्ट',
      'किरण स्लीडो क्राफ्ट',
      'কিরণ স্লিডো ক্রাফট'
    ],
    'sameAs': [
      'https://www.youtube.com/kiranslidocraft',
      'https://www.linkedin.com/company/kiranslidocraft/'
    ],
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Gala No. 18, Shree Ganesh CHSL, Jakaria Road, Malad West',
      'addressLocality': 'Mumbai',
      'postalCode': '400067',
      'addressCountry': 'IN'
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+91-9324084590',
      'contactType': 'customer service',
      'email': 'info@doorwindowcraft.com',
      'availableLanguage': ['English', 'Hindi', 'Marathi', 'Bengali']
    },
    'areaServed': [
      'United Kingdom',
      'Europe',
      'GCC',
      'MENA',
      'APAC',
      'Australia',
      'India',
      'North America',
      'South America',
      'Africa'
    ],
    'hasCredential': 'ISO 9001:2015 Certified'
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Kiran Slido Craft',
    'url': SITE_URL,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${SITE_URL}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };

  const localBusinessJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Kiran Slido Craft Mumbai',
      'image': `${SITE_URL}/logo-ksc.png`,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Gala No. 18, Shree Ganesh CHSL, Jakaria Road, Malad West',
        'addressLocality': 'Mumbai',
        'postalCode': '400067',
        'addressCountry': 'IN'
      },
      'telephone': '+91-9324084590',
      'url': SITE_URL
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Kiran Slido Craft Kolkata',
      'image': `${SITE_URL}/logo-ksc.png`,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '42 RBC Road, Dumdum Cantonment',
        'addressLocality': 'Kolkata',
        'addressCountry': 'IN'
      },
      'url': SITE_URL
    }
  ];

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Site Map" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HS8VPLD95B"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-HS8VPLD95B');
          `}
        </Script>
      </head>
      <body className="font-sans bg-white antialiased text-slate-900 overflow-x-hidden">
        <HeaderThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <CompareEngine products={products} />
            <Footer />
          </div>
        </HeaderThemeProvider>
        {isVercelRuntime && (
          <>
            <SpeedInsights />
            <Analytics />
          </>
        )}
      </body>
    </html>
  );
}
