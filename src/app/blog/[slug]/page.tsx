import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import ThemeMarker from '@/components/ThemeMarker';
import { sanitizeTrustedHtml } from '@/lib/sanitize';
import blogsData from '@/data/blogs.json';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogsData.blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogsData.blogs.find((b) => b.slug === slug);

  if (!blog) {
    return {};
  }

  return {
    title: `${blog.title} | Kiran Slido Craft Insights`,
    description: blog.excerpt,
    alternates: {
      canonical: `https://soundproofindia.com/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `https://soundproofindia.com/blog/${blog.slug}`,
      images: [{ url: blog.image }],
      type: 'article',
      publishedTime: blog.date,
      authors: [blog.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image],
    },
  };
}

// Very basic markdown parser for the constrained formatting in blogs.json
function renderMarkdown(content: string) {
  let html = content;
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Headers (H3)
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  
  // Lists (Bulleted)
  html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n*)+/g, '<ul>$&</ul>');
  
  // Paragraphs (split by double newlines)
  const paragraphs = html.split('\n\n').map(p => {
    // If it's already wrapped in a block tag (like <h3> or <ul>), don't wrap it in <p>
    if (p.startsWith('<h') || p.startsWith('<ul')) {
      return p;
    }
    return `<p>${p}</p>`;
  });
  
  return sanitizeTrustedHtml(paragraphs.join(''));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = blogsData.blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ThemeMarker theme="light" className="absolute top-0" />
      
      <article className="pt-32 pb-24">
        {/* Article Header */}
        <header className="max-container px-6 mb-16">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors mb-10">
            <ChevronLeft className="w-4 h-4" /> Back to Insights
          </Link>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {blog.tags.map(tag => (
              <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter mb-8 max-w-4xl">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>{blog.author}</span>
            <span>•</span>
            <time dateTime={blog.date}>
              {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
          </div>
        </header>

        {/* Hero Image */}
        <div className="max-container px-6 mb-20">
          <div className="relative aspect-[21/9] w-full rounded-[2rem] overflow-hidden bg-slate-100 shadow-2xl">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="max-container px-6 flex justify-center">
          <div 
            className="prose prose-slate prose-lg md:prose-xl max-w-3xl prose-headings:font-black prose-headings:tracking-tight prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-6 prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-8 prose-li:text-slate-600 prose-li:marker:text-blue-600"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(blog.content) }}
          />
        </div>
      </article>

      {/* Related Products Section */}
      {blog.relatedProducts && blog.relatedProducts.length > 0 && (
        <section className="section-tint">
          <div className="max-container">
            <h3 className="text-2xl font-black text-slate-900 mb-10 tracking-tight uppercase">Featured Systems</h3>
            <div className="flex flex-wrap gap-4">
              {blog.relatedProducts.map(productSlug => (
                <Link 
                  key={productSlug}
                  href={`/product/${productSlug}`}
                  className="apple-button-secondary bg-white shadow-sm border border-slate-200"
                >
                  View {productSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
