import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ThemeMarker from '@/components/ThemeMarker';
import blogsData from '@/data/blogs.json';
import { industries, guides } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Insights & Engineering Blog | Kiran Slido Craft',
  description: 'Technical insights, case studies, and engineering guides on soundproofing, architectural acoustics, and motorized automation systems.',
  alternates: {
    canonical: 'https://soundproofindia.com/blog',
  },
  openGraph: {
    title: 'Insights & Engineering Blog | Kiran Slido Craft',
    description: 'Technical insights, case studies, and engineering guides on soundproofing, and automation.',
    url: 'https://soundproofindia.com/blog',
    type: 'website',
  },
};

export default function BlogIndexPage() {
  const blogs = blogsData.blogs;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="hero-light relative">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container relative z-10 px-6 text-center">
          <span className="text-eyebrow mx-auto">Engineering Insights</span>
          <h1 className="heading-page text-slate-900 mb-8 mx-auto">
            Technical <span className="text-blue-600">Journal</span>
          </h1>
          <p className="max-w-2xl text-xl text-slate-500 font-medium mx-auto">
            Deep dives, case studies, and guides on architectural acoustics, automation, and precision engineering.
          </p>
        </div>
      </header>

      {/* Featured Technical Guides (Knowledge Hub) */}
      <section className="py-20 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="max-container relative z-10 px-6">
          <div className="mb-16">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">Knowledge Hub</span>
            <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter mt-4">Authority <br />Technical Guides.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {guides.map((guide) => (
              <Link 
                key={guide.slug} 
                href={`/guides/${guide.slug}`}
                className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all shadow-2xl"
              >
                <div className="flex justify-between items-start mb-10">
                  <span className="px-4 py-1.5 rounded-full bg-blue-600/20 text-xs font-black uppercase tracking-widest text-blue-400 border border-blue-500/30">
                    {guide.category}
                  </span>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-500">
                    {guide.readTime}
                  </span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-blue-400 transition-colors">{guide.title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed mb-8">
                  {guide.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-blue-400 group-hover:gap-4 transition-all">
                  Read Full Guide <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions Portfolio */}
      <section className="section-standard border-b border-slate-100">
        <div className="max-container px-6">
          <div className="mb-16">
            <span className="text-eyebrow text-blue-600">Vertical Solutions</span>
            <h2 className="heading-section">Industry-Specific <br />Expertise.</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {industries.map((industry) => (
              <Link 
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-100 border border-slate-200"
              >
                <Image 
                  src={industry.heroImage}
                  alt={industry.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-2">{industry.eyebrow}</p>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight leading-tight">{industry.title}</h3>
                  <div className="mt-4 h-0.5 w-0 bg-blue-500 group-hover:w-full transition-all duration-500"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-standard">
        <div className="max-container px-6">
          <div className="mb-16">
            <span className="text-eyebrow">Technical Journal</span>
            <h2 className="heading-section">Latest <br />Articles.</h2>
          </div>
          <div className="grid min-w-0 gap-x-10 gap-y-16 md:grid-cols-2">
            {blogs.map((blog) => (
              <article key={blog.id} className="group flex min-w-0 flex-col">
                <Link href={`/blog/${blog.slug}`} aria-label={`Read ${blog.title}`} className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-[2rem] bg-slate-100">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
                </Link>
                <div className="mb-4 flex flex-wrap gap-4">
                  {blog.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="mb-4 break-words text-3xl font-black leading-tight text-slate-900 transition-colors group-hover:text-blue-600 [overflow-wrap:anywhere]">
                  <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                </h2>
                <p className="text-slate-500 font-medium leading-relaxed mb-6 line-clamp-3">
                  {blog.excerpt}
                </p>
                <div className="mt-auto flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <Link href={`/blog/${blog.slug}`} className="apple-link text-sm uppercase tracking-widest">
                    Read Article <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
