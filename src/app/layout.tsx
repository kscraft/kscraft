import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kiran Slido Craft | Industrial Acoustic & Automation Excellence',
  description: 'Premium soundproofing and automation systems matching European standards with indigenous Indian engineering.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-50 antialiased`}>
        <div className="flex min-h-screen min-w-0 flex-col overflow-x-hidden lg:flex-row">
          <Sidebar />
          <MobileNav />
          <main className="relative min-h-screen min-w-0 flex-1 overflow-x-hidden lg:ml-72">
            <div className="absolute inset-0 z-[-1] opacity-[0.03] pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            </div>
            
            <div className="mx-auto w-full max-w-6xl min-w-0">
              {children}
              <Footer />
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
