import type { DownloadItem } from '@/lib/catalog';

export type DownloadDocument = {
  slug: string;
  title: string;
  subtitle: string;
  filename: string;
  sections: { heading: string; lines: string[] }[];
};

const pdfEscape = (value: string) =>
  value
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');

const wrapText = (value: string, width = 86) => {
  const words = value.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > width && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines;
};

export const downloadDocuments: DownloadDocument[] = [
  {
    slug: 'soundproof-windows-one-pager',
    title: 'Soundproof Windows One-Page Brief',
    subtitle: 'STC-rated acoustic window systems for hospitality, residential, industrial, and transit-adjacent projects.',
    filename: 'ksc-soundproof-windows-one-pager.pdf',
    sections: [
      {
        heading: 'Use Cases',
        lines: ['Airport approach homes, hotels, studios, offices, hospitals, schools, and industrial control rooms.'],
      },
      {
        heading: 'Specification Focus',
        lines: ['Laminated acoustic glass, precision seals, reinforced frames, and installation detailing designed around target STC and site noise data.'],
      },
      {
        heading: 'Commercial Notes',
        lines: ['Kiran Slido Craft supports supply, installation coordination, export documentation, and tender-stage technical responses.'],
      },
    ],
  },
  {
    slug: 'acoustic-doors-one-pager',
    title: 'Acoustic Doors One-Page Brief',
    subtitle: 'Door assemblies for studios, plant rooms, healthcare zones, hospitality suites, and secure acoustic separations.',
    filename: 'ksc-acoustic-doors-one-pager.pdf',
    sections: [
      {
        heading: 'Use Cases',
        lines: ['Boardrooms, cinemas, generator rooms, plant rooms, hospitals, recording rooms, and high-privacy office spaces.'],
      },
      {
        heading: 'Specification Focus',
        lines: ['Leaf mass, perimeter seals, drop seals, frame anchoring, hardware compatibility, and continuity with wall acoustic ratings.'],
      },
      {
        heading: 'Commercial Notes',
        lines: ['Available for India projects and export packages requiring ISO-backed fabrication and documented installation guidance.'],
      },
    ],
  },
  {
    slug: 'movable-partitions-one-pager',
    title: 'Movable Partitions One-Page Brief',
    subtitle: 'Operable acoustic partitions for flexible venues, banquet halls, conference centers, and multi-use interiors.',
    filename: 'ksc-movable-partitions-one-pager.pdf',
    sections: [
      {
        heading: 'Use Cases',
        lines: ['Hotels, community halls, education campuses, event spaces, coworking floors, and training centers.'],
      },
      {
        heading: 'Specification Focus',
        lines: ['Track alignment, panel core build-up, edge seals, parking layout, finish coordination, and acoustic separation targets.'],
      },
      {
        heading: 'Commercial Notes',
        lines: ['Briefing support covers layout review, technical drawings, installation sequencing, and maintenance planning.'],
      },
    ],
  },
  {
    slug: 'motorized-roof-sliding-systems-one-pager',
    title: 'Motorized Roof & Sliding Systems One-Page Brief',
    subtitle: 'Automation systems for retractable roofs, vertical sliding windows, telescopic gates, and architectural movement.',
    filename: 'ksc-motorized-roof-sliding-systems-one-pager.pdf',
    sections: [
      {
        heading: 'Use Cases',
        lines: ['Restaurants, terraces, atriums, retail fronts, villa openings, industrial access, and hospitality outdoor zones.'],
      },
      {
        heading: 'Specification Focus',
        lines: ['Motor load, guide systems, wind exposure, drainage, limit controls, safety interlocks, and service access.'],
      },
      {
        heading: 'Commercial Notes',
        lines: ['Kiran Slido Craft can support engineered packages from concept through fabrication, commissioning, and lifecycle service.'],
      },
    ],
  },
  {
    slug: 'gaganyaan-manufacturing-proof',
    title: 'Gaganyaan Manufacturing Proof Brief',
    subtitle: 'Mission-critical capsule entry mechanism manufacturing proof point from Kiran Slido Craft.',
    filename: 'ksc-gaganyaan-manufacturing-proof.pdf',
    sections: [
      {
        heading: 'Proof Point',
        lines: ['Kiran Slido Craft manufactured the capsule entry mechanism associated with ISRO Gaganyaan requirements.'],
      },
      {
        heading: 'Capability Signal',
        lines: ['The project validates precision moving mechanisms, controlled fabrication, sealing discipline, and high-accountability manufacturing workflows.'],
      },
      {
        heading: 'Buyer Relevance',
        lines: ['For acoustic and automation buyers, the same engineering discipline supports tight tolerances, repeatable operation, and documented quality processes.'],
      },
    ],
  },
];

export const defaultDownloadItems: DownloadItem[] = downloadDocuments.map((document) => ({
  title: document.title.replace(' One-Page Brief', '').replace(' Brief', ' Brief'),
  type: 'PDF',
  size: '1 page',
  href: `/downloads/${document.slug}`,
}));

export function getDownloadDocument(slug: string) {
  return downloadDocuments.find((document) => document.slug === slug);
}

export function createOnePagePdf(document: DownloadDocument) {
  const streamLines: string[] = ['BT', '/F2 20 Tf', '50 790 Td', `(${pdfEscape(document.title)}) Tj`];
  let yOffset = -26;

  streamLines.push('/F1 10 Tf', `0 ${yOffset} Td`, `(${pdfEscape(document.subtitle)}) Tj`);
  yOffset = -32;

  for (const section of document.sections) {
    streamLines.push('/F2 13 Tf', `0 ${yOffset} Td`, `(${pdfEscape(section.heading)}) Tj`);
    yOffset = -18;

    for (const line of section.lines.flatMap((entry) => wrapText(entry))) {
      streamLines.push('/F1 10 Tf', `0 ${yOffset} Td`, `(${pdfEscape(line)}) Tj`);
      yOffset = -14;
    }

    yOffset = -22;
  }

  streamLines.push('/F1 9 Tf', `0 ${yOffset} Td`, '(Kiran Slido Craft | soundproofindia.com | info@kiranslidocraft.com) Tj', 'ET');
  const stream = streamLines.join('\n');

  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  pdf += offsets.slice(1).map((offset) => `${String(offset).padStart(10, '0')} 00000 n \n`).join('');
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

  return new TextEncoder().encode(pdf);
}
