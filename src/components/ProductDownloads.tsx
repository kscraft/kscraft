'use client';

import { FileDown, FileText } from 'lucide-react';
import { trackClientEvent } from '@/lib/analytics-client';

type DownloadItem = {
  title: string;
  type: string;
  size: string;
  href: string;
};

type ProductDownloadsProps = {
  productTitle: string;
};

export default function ProductDownloads({ productTitle }: ProductDownloadsProps) {
  const downloads: DownloadItem[] = [
    {
      title: 'Technical Data Sheet',
      type: 'PDF',
      size: '1.2 MB',
      href: '#',
    },
    {
      title: 'Acoustic Test Report',
      type: 'PDF',
      size: '2.4 MB',
      href: '#',
    },
    {
      title: 'Installation Guide',
      type: 'PDF',
      size: '3.1 MB',
      href: '#',
    },
  ];

  return (
    <div className="mt-24 rounded-[2.5rem] bg-slate-950 p-8 text-white sm:p-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
            <FileText className="h-5 w-5" />
          </div>
          <h3 className="text-2xl font-black uppercase tracking-tight">Technical Documentation</h3>
          <p className="mt-4 text-slate-400">
            Download certified specifications, performance data, and engineering guides for {productTitle}.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:w-3/5">
          {downloads.map((item) => (
            <button
              key={item.title}
              onClick={() => {
                trackClientEvent('file_download', {
                  file_name: item.title,
                  file_extension: 'pdf',
                  product: productTitle,
                });
                // In a real app, this would be a link or trigger an actual download
                alert(`${item.title} download started (placeholder)`);
              }}
              className="group flex flex-col justify-between rounded-2xl bg-white/5 p-6 transition-all hover:bg-white/10 hover:shadow-xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="rounded-lg bg-blue-600/20 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-blue-400">
                  {item.type}
                </span>
                <FileDown className="h-4 w-4 text-slate-500 transition-colors group-hover:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-bold leading-tight">{item.title}</p>
                <p className="mt-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.size}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
