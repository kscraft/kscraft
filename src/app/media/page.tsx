const galleryItems = [
  ['Crew Entry Mechanism for Gaganyaan', 'https://kiranslidocraft.com/clients/1-sm.jpeg'],
  ['Hilton Hotel Bengaluru', 'https://kiranslidocraft.com/clients/2-sm.jpg'],
  ['VJ Villa Pune', 'https://kiranslidocraft.com/clients/3-sm.jpg'],
  ['Motorized Sound Proof Window', 'https://2.wlimg.com/product_images/bc-full/dir_2/30319/motorized-soundproof-sliding-windows-2361568.jpeg'],
  ['Motorized Vertical Sliding Window', 'https://2.wlimg.com/product_images/bc-full/2022/5/30319/motorized-vertical-sliding-window-1652348868-6325095.jpeg'],
  ['Movable Acoustic Sliding Folding Partition', 'https://2.wlimg.com/product_images/bc-500/2022/5/30319/sound-proof-acoustic-movable-partition-1651817003-6325134.jpeg'],
  ['Motorized Telescopic Gate', 'https://2.wlimg.com/product_images/bc-full/dir_2/30319/motorized-telescopic-gates-2375019.jpeg'],
  ['Motorized Roof Sliding System', 'https://2.wlimg.com/product_images/bc-full/dir_2/30319/motorized-roof-sliding-system-2375020.jpeg'],
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
    <div className="pb-16">
      <header className="border-b border-slate-200 bg-white px-6 pb-14 pt-24 lg:px-12 lg:pt-28">
        <p className="text-xs font-black uppercase tracking-widest text-blue-700">/ Media</p>
        <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          Media gallery, product videos and testimonials
        </h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-600">
          Coverage for the source media gallery, `.co.in` product videos and testimonials sections.
        </p>
      </header>

      <section className="px-6 py-16 lg:px-12">
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Gallery</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Project and product visuals</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {galleryItems.map(([title, image]) => (
            <article key={title} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <img src={image} alt={title} className="aspect-[4/3] w-full object-cover" />
              <div className="p-5">
                <h3 className="break-words text-lg font-black tracking-tight text-slate-950 [overflow-wrap:anywhere]">{title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-16 text-white lg:px-12">
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-widest text-blue-300">Product Videos</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Source video catalog</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {videos.map(([title, id]) => (
            <a key={id} href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-lg border border-slate-800 bg-white/5 transition hover:border-blue-400 hover:bg-white/10">
              <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt={title} className="aspect-video w-full object-cover" />
              <div className="p-5">
                <h3 className="font-black text-white">{title}</h3>
                <p className="mt-2 text-sm font-semibold text-blue-300">Open video /</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 lg:px-12">
        <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Testimonials</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Ratings & Reviews</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            The `.co.in` site includes testimonials and ratings pages. This section preserves that surface and keeps the call-to-action close to the modern enquiry flow.
          </p>
        </div>
      </section>
    </div>
  );
}
