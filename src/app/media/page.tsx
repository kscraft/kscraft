import Image from 'next/image';
import { Play } from 'lucide-react';
import { catalog, media } from '@/lib/catalog';
import ThemeMarker from '@/components/ThemeMarker';

export default function MediaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="hero-light">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container">
          <p className="text-eyebrow text-center mb-6">
            Gallery
          </p>
          <h1 className="heading-hero text-black">
            Systems <br /> in Focus.
          </h1>
          <p className="text-body-lg max-w-2xl mx-auto mt-10">
            A visual documentation of precision engineering and automated movement.
          </p>
        </div>
      </header>

      {/* Video Catalog */}
      <section className="section-standard">
        <div className="max-container">
          <h2 className="heading-section mb-20">Video Demonstrations.</h2>
          <div className="grid gap-10 md:grid-cols-2">
            {media.videos.map((video) => (
              <a 
                key={video.id} 
                href={`https://www.youtube.com/watch?v=${video.id}`} 
                target="_blank" 
                rel="noreferrer" 
                className="group relative block overflow-hidden rounded-[3rem] bg-black aspect-video shadow-2xl"
              >
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} 
                  alt={video.title} 
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 flex flex-col justify-between p-10 z-20">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-black fill-current" />
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{video.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="section-tint">
        <div className="max-container">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="heading-section mb-4">Project Visuals.</h2>
              <p className="text-slate-500 font-medium text-lg leading-relaxed">
                Documentation of live engineering deployments across residential and industrial sectors.
              </p>
            </div>
            <div className="bg-blue-600/5 border border-blue-600/10 rounded-[2rem] p-8 md:max-w-xs backdrop-blur-sm">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span> {catalog.company.authenticity.title}
              </p>
              <p className="text-xs text-blue-900 font-bold leading-relaxed">
                {catalog.company.authenticity.description}
              </p>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {media.gallery.map((item) => (
              <div key={item.title} className="group relative aspect-square overflow-hidden rounded-[2.5rem] bg-white shadow-xl hover:shadow-2xl transition-all">
                <Image
                  src={item.image} 
                  alt={item.title} 
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                  <h3 className="text-xl font-bold text-white uppercase leading-tight">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
