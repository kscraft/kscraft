import { Play, Image as ImageIcon, ArrowRight, Video } from 'lucide-react';

const galleryItems = [
  ['Crew Entry Mechanism for Gaganyaan', '/images/media/project-1.jpg'],
  ['Hilton Hotel Bengaluru', '/images/media/project-2.jpg'],
  ['VJ Villa Pune', '/images/media/project-3.jpg'],
  ['Motorized Sound Proof Window', '/images/media/soundproof-sliding-windows.jpg'],
  ['Motorized Vertical Sliding Window', '/images/media/vertical-sliding-window.jpg'],
  ['Movable Acoustic Sliding Folding Partition', '/images/media/movable-partition.jpg'],
  ['Motorized Telescopic Gate', '/images/media/telescopic-gate.jpg'],
  ['Motorized Roof Sliding System', '/images/media/roof-sliding-system.jpg'],
];

const videos = [
  ['Sound Proof Sliding Windows', 'fACitrJPPb4'],
  ['Motorized Soundproof Sliding Windows', 'pIHa0Cm172A'],
  ['Sound Proof Vertical Sliding Windows', 'hS9RaVKUhvw'],
  ['Motorized Sliding Roof', '-M1OiThaWV4'],
  ['Motorized Telescopic Gates', 'Aw0sS_uNyzU'],
];

export default function MediaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Header */}
      <header className="relative py-24 lg:py-48 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero/modern-architecture.jpg" 
            alt="Media" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-950/60 to-slate-950"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 text-center lg:text-left">
          <h1 className="text-5xl lg:text-[7rem] font-black text-white tracking-tighter leading-[0.9] mb-8 uppercase">
            Media <span className="text-blue-500">Center.</span>
          </h1>
          <p className="max-w-2xl text-xl lg:text-2xl text-slate-400 leading-relaxed mx-auto lg:mx-0 font-medium">
            A visual documentation of our engineering projects, product capabilities, and technical demonstrations.
          </p>
        </div>
      </header>

      {/* Video Catalog */}
      <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-950/20 to-transparent"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="max-w-2xl">
              <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Visual Demonstrations</span>
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-none flex items-center gap-6">
                <div className="h-16 w-16 rounded-3xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <Play className="w-8 h-8 text-white fill-current" />
                </div>
                Systems in Motion
              </h2>
            </div>
            <p className="text-xl text-slate-400 max-w-md font-medium leading-relaxed">
              Experience our automated movement and acoustic isolation systems in action through our technical video catalog.
            </p>
          </div>
          
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {videos.map(([title, id]) => (
              <a 
                key={id} 
                href={`https://www.youtube.com/watch?v=${id}`} 
                target="_blank" 
                rel="noreferrer" 
                className="group block relative overflow-hidden rounded-[3.5rem] bg-white/5 border border-white/10 transition-all hover:border-blue-500/50 hover:bg-white/10"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} 
                    alt={title} 
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 group-hover:bg-transparent transition-all">
                    <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 border-4 border-white/20">
                      <Play className="w-8 h-8 text-white fill-current" />
                    </div>
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-black mb-6 tracking-tighter group-hover:text-blue-400 transition-colors uppercase leading-none">{title}</h3>
                  <div className="flex items-center gap-3 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">
                    Play on YouTube <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-32 mx-auto max-w-7xl px-6 lg:px-12 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent opacity-50"></div>
        
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Installation Gallery</span>
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none flex items-center gap-6">
              <div className="h-16 w-16 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm">
                <ImageIcon className="w-8 h-8" />
              </div>
              Project Visuals
            </h2>
          </div>
          <p className="text-xl text-slate-500 max-w-md font-medium leading-relaxed">
            High-resolution documentation of our installations across diverse industrial and architectural sectors.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {galleryItems.map(([title, image]) => (
            <article key={title} className="group overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 hover:border-blue-100">
              <div className="aspect-[4/3] overflow-hidden bg-slate-50">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="p-8">
                <h3 className="text-sm font-black text-slate-900 tracking-tighter uppercase leading-tight group-hover:text-blue-600 transition-colors">{title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
