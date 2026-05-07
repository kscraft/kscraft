import Link from 'next/link';
import { catalog } from '@/lib/catalog';

const projectHighlights = [
  {
    title: 'Crew Entry Mechanism for Gaganyaan',
    detail: 'Design and build of astronaut entry mechanism for ISRO mission Gaganyaan at SHAR Sriharikota, completed in 2024.',
  },
  {
    title: 'VJ Villa Pune',
    detail: 'Premium villa work covering motorized sliding windows, railings and facade scope across windows and terrace railings.',
  },
  {
    title: 'Hilton Hotel Bengaluru',
    detail: 'Motorized vertical sliding windows project delivered for Hilton Hotel Bengaluru through ARC LUX.',
  },
];

const clientLogos = [
  ['Tata Power', 'https://kiranslidocraft.com/clients/tatapower.jpg'],
  ['Sahara Star', 'https://kiranslidocraft.com/clients/saharastar.jpg'],
  ['Mahindra', 'https://kiranslidocraft.com/clients/mahindra4.jpg'],
  ['Indian Oil', 'https://kiranslidocraft.com/clients/indianoil.jpg'],
  ['Cadbury', 'https://kiranslidocraft.com/clients/cadbury.jpg'],
  ['BPCL', 'https://kiranslidocraft.com/clients/bpcl.jpg'],
  ['Billimoria', 'https://kiranslidocraft.com/clients/billimoria.jpg'],
];

function getInitials(name: string) {
  return name
    .replace(/&/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');
}

export default function ClientsPage() {
  return (
    <div className="pb-16">
      <header className="border-b border-slate-200 bg-white px-6 pb-14 pt-24 lg:px-12 lg:pt-28">
        <p className="text-xs font-black uppercase tracking-widest text-blue-700">/ Clients & Certifications</p>
        <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          Clientele, project references and certifications
        </h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-600">
          Consolidated from the clients, clientele and certifications sections of the source websites.
        </p>
      </header>

      <section className="px-6 py-16 lg:px-12">
        <div className="grid gap-5 md:grid-cols-3">
          {projectHighlights.map((project) => (
            <article key={project.title} className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-xs font-black uppercase tracking-widest text-blue-700">Project</p>
              <h2 className="mt-3 text-xl font-black tracking-tight text-slate-950">{project.title}</h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">{project.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-16 lg:px-12">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Certifications</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Quality registrations</h2>
          </div>
          <Link href="/contact" className="text-sm font-black uppercase tracking-widest text-blue-700">
            Request documents /
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {catalog.company.certifications.map((certification) => (
            <div key={certification} className="flex min-h-28 items-center gap-4 rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">
                {getInitials(certification)}
              </div>
              <p className="text-lg font-black text-slate-950">{certification}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-16 lg:px-12">
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Partial Clientele</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Logo references</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-7">
          {clientLogos.map(([name, src]) => (
            <div key={name} className="flex min-h-28 items-center justify-center rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <img src={src} alt={name} className="max-h-14 w-full object-contain" />
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-16 lg:px-12">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7">
          {catalog.company.clients.map((client) => (
            <div key={client} className="flex min-h-32 flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">
                {getInitials(client)}
              </div>
              <p className="mt-4 min-h-10 text-sm font-black leading-5 text-slate-800">{client}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
