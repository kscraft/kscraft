import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { catalog, media, home } from '@/lib/catalog';
import { Play, ChevronRight } from 'lucide-react';
import ThemeMarker from '@/components/ThemeMarker';

export const metadata: Metadata = {
  title: 'Media & Project Gallery | Kiran Slido Craft',
  description: 'View technical installations of soundproof windows, doors, partitions, and motorized systems. Watch architectural automation in action through our project videos.',
  alternates: {
    canonical: 'https://soundproofindia.com/media',
  },
  openGraph: {
    title: 'Project Gallery | Kiran Slido Craft in Motion',
    description: 'Explore our portfolio of acoustic and automation installations. Raw project footage and technical visuals.',
    url: 'https://soundproofindia.com/media',
    type: 'website',
  },
};

export default function MediaPage() {
  const { hero, gallery, videos, videoSectionTitle } = media;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Header */}
      <header className="hero-light">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container text-center">
          <p className="text-eyebrow mb-6">
            {hero.eyebrow}
          </p>
          <h1 className="heading-hero text-black mx-auto">
            {hero.title.split(' in ')[0]} <br /> in {hero.title.split(' in ')[1]}
          </h1>
          <p className="text-body-lg max-w-2xl mx-auto mt-10">
            {hero.description}
          </p>
        </div>
      </header>

      {/* Video Gallery */}
      <section className="section-dark bg-slate-950 text-white">
        <ThemeMarker theme="dark" className="absolute top-0" />
        <div className="max-container">
          <h2 className="heading-section mb-20">{videoSectionTitle}</h2>
          <div className="grid gap-10 md:grid-cols-2">
            {videos.map((video) => (
              <a 
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 bg-slate-900 shadow-2xl transition-all hover:scale-[1.02]"
              >
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  fill
                  className="object-cover opacity-60 transition-opacity group-hover:opacity-100"
                />
                <div className="absolute inset-0 flex flex-col justify-between p-10 z-20">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-black fill-current" />
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{video.title}</h3>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60"></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="section-standard">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <div className="mb-20 text-center lg:text-left">
            <span className="text-eyebrow">{home.mediaUI.galleryEyebrow}</span>
            <h2 className="heading-page text-slate-900">{home.mediaUI.galleryTitle}</h2>
          </div>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {gallery.map((item) => (
              <Link 
                key={item.title} 
                href={item.productSlug ? `/product/${item.productSlug}` : '/contact'}
                className="block relative break-inside-avoid rounded-[2.5rem] overflow-hidden group shadow-xl hover:shadow-2xl transition-all"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={800}
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-2">Technical Installation</p>
                  <p className="text-white font-black uppercase tracking-tight text-xl mb-4">{item.title}</p>
                  <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
                    View Product Details <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
