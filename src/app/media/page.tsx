import { Play, Image as ImageIcon, ArrowRight } from 'lucide-react';

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
      <header className="relative py-24 lg:py-40 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero/modern-architecture.jpg" 
            alt="Media" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-950/40"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 text-center lg:text-left">
          <h1 className="text-5xl lg:text-8xl font-black text-white tracking-tight leading-none mb-8 uppercase">
            Media <span className="text-blue-500">Center.</span>
          </h1>
          <p className="max-w-2xl text-xl lg:text-2xl text-slate-300 leading-relaxed mx-auto lg:mx-0">
            A visual documentation of our engineering projects, product capabilities, and technical demonstrations.
          </p>
        </div>
      </header>

      {/* Video Catalog */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-16">
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight uppercase mb-4 flex items-center gap-4">
              <Play className="w-10 h-10 text-blue-500" /> System Demonstrations
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
              Experience our automated movement and acoustic isolation systems in action through our curated video catalog.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {videos.map(([title, id]) => (
              <a 
                key={id} 
                href={`https://www.youtube.com/watch?v=${id}`} 
                target="_blank" 
                rel="noreferrer" 
                className="group block relative overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 transition-all hover:border-blue-500/50 hover:bg-white/10"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} 
                    alt={title} 
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                      <Play className="w-6 h-6 text-white fill-current" />
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-black mb-4 tracking-tight group-hover:text-blue-400 transition-colors uppercase">{title}</h3>
                  <div className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest">
                    Watch on YouTube <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-24 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16">
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase mb-4 flex items-center gap-4">
            <ImageIcon className="w-10 h-10 text-blue-600" /> Project Visuals
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            High-resolution documentation of our installations across diverse industrial and architectural sectors.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {galleryItems.map(([title, image]) => (
            <article key={title} className="group overflow-hidden rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-sm font-black text-slate-900 tracking-tight uppercase">{title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
