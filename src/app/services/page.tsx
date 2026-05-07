import Link from 'next/link';
import { ArrowRight, Settings, Wrench, ShieldCheck, ClipboardCheck } from 'lucide-react';

const services = [
  {
    title: 'Annual Maintenance',
    icon: Settings,
    description: 'Scheduled maintenance support for automatic systems including motorized barriers, roof sliding systems, and telescopic gates to ensure long-term operational integrity.',
  },
  {
    title: 'Acoustic Support',
    icon: Wrench,
    description: 'Post-installation service support for sound proof windows, acoustic movable wall partitions, and specialized acoustic door systems.',
  },
  {
    title: 'Technical Consultation',
    icon: ShieldCheck,
    description: 'Direct engineering support for architectural projects, from initial acoustic specification to final on-site installation and calibration.',
  },
  {
    title: 'System Upgrades',
    icon: ClipboardCheck,
    description: 'Modernization of legacy manual systems to automated movement, including integration of modern drive systems and sensor controls.',
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Header */}
      <header className="relative py-24 lg:py-40 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            alt="Services" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-950/40"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 text-center">
          <h1 className="text-5xl lg:text-8xl font-black text-white tracking-tight leading-none mb-8 uppercase">
            Service <span className="text-blue-500">Support.</span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl lg:text-2xl text-slate-300 leading-relaxed">
            Comprehensive maintenance and technical lifecycle support for our range of premium acoustic and automatic systems.
          </p>
        </div>
      </header>

      {/* Services Grid */}
      <section className="py-24 mx-auto max-w-7xl px-6 lg:px-12 w-full">
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.title} className="group p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm transition-all hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-600/5">
              <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <service.icon className="w-7 h-7" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight uppercase">{service.title}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-20 relative overflow-hidden rounded-[3rem] bg-slate-900 p-12 lg:p-20 text-white text-center">
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-5xl font-black mb-6 tracking-tight">International Standards, <br />Indigenous Support.</h2>
            <p className="mx-auto max-w-3xl text-lg lg:text-xl text-slate-400 leading-relaxed mb-10">
              Kiran Slido Craft provides technical response times and support availability that matches our high engineering quality.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
            >
              Request Service Support <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
        </div>
      </section>
    </div>
  );
}
