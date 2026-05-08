import Image from 'next/image';
import { Play } from 'lucide-react';
import { media } from '@/lib/catalog';

export default function MediaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="pt-40 pb-20 px-6 text-center bg-[#fafafa]">
        <div className="mx-auto max-w-4xl">
          <p className="text-[12px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-6">
            Gallery
          </p>
          <h1 className="text-6xl md:text-[6rem] font-bold tracking-tighter text-black uppercase mb-10 leading-none">
            Systems <br /> in Focus.
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            A visual documentation of precision engineering and automated movement.
          </p>
        </div>
      </header>

      {/* Video Catalog */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold tracking-tight text-black mb-20 uppercase">Video Demonstrations.</h2>
          <div className="grid gap-10 md:grid-cols-2">
            {media.videos.map((video) => (
              <a 
                key={video.id} 
                href={`https://www.youtube.com/watch?v=${video.id}`} 
                target="_blank" 
                rel="noreferrer" 
                className="group relative block overflow-hidden rounded-[2.5rem] bg-black aspect-video shadow-2xl"
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
                  <h3 className="text-3xl font-bold text-white uppercase tracking-tight">{video.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-32 px-6 bg-[#fafafa]">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold tracking-tight text-black mb-20 uppercase">Project Visuals.</h2>
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
