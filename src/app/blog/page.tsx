import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ThemeMarker from '@/components/ThemeMarker';
import blogsData from '@/data/blogs.json';

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
      <header className="hero-light relative pt-48 pb-32">
        <ThemeMarker theme="light" className="absolute top-0" />
        <div className="max-container relative z-10">
          <span className="text-eyebrow">Engineering Insights</span>
          <h1 className="heading-page text-slate-900 mb-8">
            Technical <span className="text-blue-600">Journal</span>
          </h1>
          <p className="max-w-2xl text-xl text-slate-500 font-medium mx-auto">
            Deep dives, case studies, and guides on architectural acoustics, automation, and precision engineering.
          </p>
        </div>
      </header>

      <section className="section-standard">
        <div className="max-container">
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-16">
            {blogs.map((blog) => (
              <article key={blog.id} className="group flex flex-col">
                <Link href={`/blog/${blog.slug}`} className="relative aspect-[16/9] w-full rounded-[2rem] overflow-hidden bg-slate-100 mb-8">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
                </Link>
                <div className="flex gap-4 mb-4">
                  {blog.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                </h2>
                <p className="text-slate-500 font-medium leading-relaxed mb-6 line-clamp-3">
                  {blog.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between">
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
