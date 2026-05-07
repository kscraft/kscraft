import Link from 'next/link';
import { categories, products } from '@/lib/catalog';

const Sidebar = () => {
  const navigationItems = [
    ['/', 'Overview'],
    ['/about', 'Our Legacy'],
    ['/services', 'Services'],
    ['/clients', 'Clients & Certifications'],
    ['/media', 'Media'],
    ['/contact', 'Contact Sales'],
  ];

  return (
    <div className="hidden lg:flex flex-col w-72 bg-slate-900 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-8">
        <Link href="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-3">
          <img src="/logo-ksc.svg" alt="Kiran Slido Craft" className="h-9 w-9 rounded-lg bg-white" />
          <span>KIRAN SLIDO CRAFT</span>
        </Link>
        <p className="text-[10px] text-blue-400 mt-2 uppercase tracking-[0.2em] font-bold leading-tight">
          Engineering Excellence Since 1985
        </p>
      </div>

      <nav className="flex-1 px-6 space-y-10 mt-4">
        <div>
          <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">
            Navigation
          </h3>
          <ul className="space-y-2">
            {navigationItems.map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-slate-800 hover:text-white group">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-500"></span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">
            Product Categories
          </h3>
          <ul className="space-y-1">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/category/${category.id}`}
                  className="block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-slate-800 transition-all text-slate-400 hover:text-blue-400 border-l-2 border-transparent hover:border-blue-500"
                >
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="p-8 border-t border-slate-800">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
          <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Technical Support</p>
          <p className="text-xs text-slate-300">{products.length} products across {categories.length} lines</p>
          <Link href="/contact" className="mt-3 block w-full rounded-md bg-blue-600/10 py-2 text-center text-[11px] font-bold text-blue-400 transition-all hover:bg-blue-600 hover:text-white">
            Get Specification
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
