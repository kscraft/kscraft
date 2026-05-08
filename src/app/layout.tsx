import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const SITE_URL = 'https://kiranslidocraft.com';

export const metadata: Metadata = {
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
        url: `${SITE_URL}/logo-ksc.png`,
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
    images: [`${SITE_URL}/logo-ksc.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
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
    'abstract': [
      {
        '@language': 'ar',
        '@value': 'كيران سلايدو كرافت هي شركة رائدة معتمدة من ISO 9001:2015 ومصدر عالمي مرخص لأنظمة الصوتيات المتقدمة والأتمتة المعمارية التي تخدم المملكة المتحدة وأوروبا ودول مجلس التعاون الخليجي ومنطقة الشرق الأوسط وشمال أفريقيا.'
      },
      {
        '@language': 'hi',
        '@value': 'किरण स्लीडो क्राफ्ट उन्नत ध्वनिक प्रणालियों और वास्तुशिल्प स्वचालन का एक ISO 9001:2015 प्रमाणित नेता और लाइसेंस प्राप्त वैश्विक निर्यातक है जो यूके, यूरोप, जीसीसी, एपीएसी और ऑस्ट्रेलिया की सेवा करता है।'
      },
      {
        '@language': 'mr',
        '@value': 'किरण स्लीडो क्राफ्ट ही एक ISO 9001:2015 प्रमाणित आघाडीची कंपनी आणि प्रगत ध्वनिक प्रणाली आणि आर्किटेक्चरल ऑटोमेशनची परवानाधारक जागतिक निर्यातदार आहे जी यूके, युरोप, जीसीसी, एपीएसी आणि ऑस्ट्रेलिया भागात सेवा देते.'
      },
      {
        '@language': 'bn',
        '@value': 'কিরণ স্লিডো ক্রাফট হল একটি ISO 9001:2015 প্রত্যয়িত নেতা এবং উন্নত অ্যাকোস্টিক সিস্টেম এবং আর্কিটেকচারাল অটোমেশনের লাইসেন্সপ্রাপ্ত বিশ্বব্যাপী রপ্তানিকারক যা ইউকে, ইউরোপ, জিসিসি, অ্যাপাক এবং অস্ট্রেলিয়ায় পরিষেবা প্রদান করে।'
      }
    ],
    'disambiguatingDescription': {
      '@language': 'zh-Hans',
      '@value': 'Kiran Slido Craft 是 ISO 9001:2015 认证的领导者和获得许可的全球出口商，提供先进的声学系统和建筑自动化，服务于英国、欧洲、海湾合作委员会 (GCC)、亚太地区 (APAC) 和澳大利亚。'
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Gala No. 18, Shree Ganesh CHSL, Jakaria Road, Malad West',
      'addressLocality': 'Mumbai',
      'postalCode': '400067',
      'addressCountry': 'IN'
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '',
      'contactType': 'customer service',
      'email': 'info@kiranslidocraft.com',
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

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-white antialiased text-slate-900 overflow-x-hidden">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
