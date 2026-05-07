import Link from 'next/link';

const services = [
  {
    title: 'Annual Maintenance',
    description: 'Maintenance support for automatic systems including motorized barriers, roof sliding systems, automatic sliding gates and telescopic gates.',
  },
  {
    title: 'Sound Proof Systems',
    description: 'Service support for sound proof windows, acoustic movable wall partitions and acoustic doors manufactured by Kiran Slido Craft.',
  },
  {
    title: 'Custom Engineering',
    description: 'Design, fabrication and installation support for site-specific acoustic and automation requirements.',
  },
  {
    title: 'Project Support',
    description: 'Technical guidance from specification through installation for residential, commercial and industrial projects.',
  },
];

export default function ServicesPage() {
  return (
    <div className="pb-16">
      <header className="border-b border-slate-200 bg-white px-6 pb-14 pt-24 lg:px-12 lg:pt-28">
        <p className="text-xs font-black uppercase tracking-widest text-blue-700">/ Services</p>
        <h1 className="mt-6 max-w-4xl break-words text-4xl font-black leading-tight tracking-tight text-slate-950 [overflow-wrap:anywhere] sm:text-5xl lg:text-6xl">
          Service support for acoustic and automatic systems
        </h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-600">
          The source site lists annual maintenance and service support for automatic systems, sound proof windows, acoustic movable wall partitions and doors.
        </p>
      </header>

      <section className="px-6 py-16 lg:px-12">
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.title} className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-black tracking-tight text-slate-950">{service.title}</h2>
              <p className="mt-4 leading-7 text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-lg bg-slate-950 p-8 text-white">
          <h2 className="text-3xl font-black tracking-tight">International quality made in India</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            Kiran Slido Craft positions its service model around faster response, practical maintenance and long-term support for its installed systems.
          </p>
          <Link href="/contact" className="mt-7 inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500">
            Request Service
          </Link>
        </div>
      </section>
    </div>
  );
}
