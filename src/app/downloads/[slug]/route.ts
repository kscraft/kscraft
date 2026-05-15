import { notFound } from 'next/navigation';
import { createOnePagePdf, getDownloadDocument } from '@/lib/downloads';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const document = getDownloadDocument(slug);

  if (!document) {
    notFound();
  }

  const pdf = createOnePagePdf(document);

  return new Response(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${document.filename}"`,
      'Cache-Control': 'public, max-age=86400, s-maxage=604800',
    },
  });
}
