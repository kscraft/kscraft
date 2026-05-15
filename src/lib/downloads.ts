import type { DownloadItem } from '@/lib/catalog';

export type DownloadDocument = {
  slug: string;
  title: string;
  subtitle: string;
  filename: string;
  sections: { heading: string; lines: string[] }[];
  sourceBasis: string[];
};

type PdfFont = 'F1' | 'F2';
type PdfTextLine = {
  text: string;
  font: PdfFont;
  size: number;
  gapBefore?: number;
};

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const PAGE_MARGIN_X = 50;
const PAGE_TOP = 790;
const PAGE_BOTTOM = 58;
const LINE_HEIGHT = 14;
const PRINTABLE_WIDTH = PAGE_WIDTH - PAGE_MARGIN_X * 2;

const pdfEscape = (value: string) =>
  value
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');

function estimateTextWidth(value: string, fontSize: number) {
  return value.split('').reduce((width, char) => {
    if (char === ' ') return width + fontSize * 0.28;
    if ('il.,:;!|'.includes(char)) return width + fontSize * 0.24;
    if ('mwMW@#%&'.includes(char)) return width + fontSize * 0.82;
    if (char === '-') return width + fontSize * 0.34;
    return width + fontSize * 0.52;
  }, 0);
}

const wrapText = (value: string, fontSize = 10, maxWidth = PRINTABLE_WIDTH) => {
  const words = value.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (estimateTextWidth(next, fontSize) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines;
};

const bullet = (value: string) => `- ${value}`;

function wrappedPdfLines(value: string, font: PdfFont, size: number, gapBefore?: number): PdfTextLine[] {
  return wrapText(value, size).map((text, index) => ({
    text,
    font,
    size,
    gapBefore: index === 0 ? gapBefore : undefined,
  }));
}

export const downloadDocuments: DownloadDocument[] = [
  {
    slug: 'soundproof-windows-one-pager',
    title: 'Soundproof Windows Technical Deep Dive',
    subtitle: 'Detailed specification guide for Kiran Slido Craft acoustic window packages.',
    filename: 'ksc-soundproof-windows-technical-deep-dive.pdf',
    sourceBasis: [
      'kiranslidocraft.com sound proof windows page: listed material of construction is aluminum extrusion, insulated glass, and insulation materials, with stated sound blocking up to STC 30 dB to 52 dB.',
      'kiranslidocraft.com window pages: sliding, openable, top-hung, and tilt-turn formats are listed, with heavy-duty construction, long life, customization, and high-decibel sound control as specialties.',
      'kiranslidocraft.co.in catalog: the range includes casement, sliding, tilt-turn, top-hung, vertical sliding, and motorized soundproof windows.',
      'Kiran Slido Craft video library: includes on-site testing and sound proof sliding window demonstrations.',
    ],
    sections: [
      {
        heading: '1. System Purpose',
        lines: [
          'The window package is intended to reduce traffic, railway, airport, industrial, music-room, conference-room, and hospitality noise while preserving usable glazing and day-to-day operation.',
          'The correct specification is a complete system decision: glass build-up, frame stiffness, perimeter seals, installation gap control, and surrounding wall conditions must work together.',
        ],
      },
      {
        heading: '2. Product Range',
        lines: [
          'Relevant Kiran Slido Craft families include sound proof windows, sound proof sliding windows, casement windows, tilt-turn windows, top-hung windows, vertical sliding windows, motorized sound proof windows, and motorized vertical sliding windows.',
          'For retrofit projects, the practical decision is usually between replacing the primary opening, adding secondary acoustic glazing, or using a motorized/sliding arrangement where access or ventilation remains important.',
        ],
      },
      {
        heading: '3. Acoustic Specification Inputs',
        lines: [
          bullet('Target sound reduction or STC expectation, with source noise context such as traffic, rail, aircraft, generator, music, or process noise.'),
          bullet('Opening size, wall thickness, sill condition, frame depth, drainage constraints, and any facade or heritage limitation.'),
          bullet('Operation type: fixed, sliding, casement, tilt-turn, top-hung, vertical sliding, or motorized movement.'),
          bullet('Glass build-up preference, safety glass requirements, thermal expectations, and visual/aesthetic constraints.'),
        ],
      },
      {
        heading: '4. Verified Product Facts To Carry Into Specs',
        lines: [
          bullet('Material basis from source pages: aluminum extrusion, insulated glass, and insulation materials.'),
          bullet('Published sound-control range: STC 30 dB to 52 dB, depending on system design and site conditions.'),
          bullet('Listed formats: sliding, openable, top-hung, tilt-turn, vertical sliding, and motorized soundproof window variants.'),
          bullet('Listed use areas: residential, commercial centers, industrial establishments, multiplexes, malls, theaters, and conference halls.'),
          bullet('Finish note from source pages: anodized and PP colour / pure polyester options, with colour as per client requirement.'),
        ],
      },
      {
        heading: '5. Construction Logic',
        lines: [
          'Acoustic window performance depends on mass, airtightness, damping, and isolation. A high-mass glazing build-up will underperform if the perimeter seal or installation gap leaks air.',
          'Frame design should resist deflection, preserve compression on seals, and avoid metal-to-structure shortcuts that bypass the acoustic assembly.',
          'Sliding systems need special attention because moving panels must seal consistently without making operation impractical.',
        ],
      },
      {
        heading: '6. Tender Checklist',
        lines: [
          bullet('Ask for product family, opening type, glass build-up, frame material, seal strategy, hardware, and finish.'),
          bullet('Ask whether performance is lab-rated, site-estimated, or based on comparable project conditions.'),
          bullet('Include shop drawings, fixing details, perimeter treatment, site measurement responsibility, and maintenance access.'),
          bullet('For motorized windows, add drive rating, controls, limit switches, safety controls, manual override, and service procedure.'),
        ],
      },
      {
        heading: '7. Site QA And Handover',
        lines: [
          'Before installation, verify plumb openings, clearances, finished floor/sill levels, and adjacent wall quality. After installation, verify seal compression, smooth operation, lock engagement, drainage, and visible gap closure.',
          'For high-noise sites, buyer-side acceptance should include subjective inspection plus agreed measurement method when a formal acoustic target is part of the contract.',
        ],
      },
    ],
  },
  {
    slug: 'acoustic-doors-one-pager',
    title: 'Acoustic Doors Technical Deep Dive',
    subtitle: 'Detailed specification guide for sound proof doors, sliding doors, swing doors, and folding doors.',
    filename: 'ksc-acoustic-doors-technical-deep-dive.pdf',
    sourceBasis: [
      'kiranslidocraft.com and kiranslidocraft.co.in door pages: published door content references internal sound-rating results, STC-54 flush communicating doors, paired STC-40 doors, 300 series bottom/top seals, and 54 mm acoustic door thickness.',
      'kiranslidocraft.com door content: acoustical doors can use normal hardware; frame/hardware selection must account for door weight, gasket position, and automatic bottom seal adjustment.',
      'kiranslidocraft.co.in catalog: the product range includes sound proof doors, sliding doors, sliding folding doors, and swing doors.',
      'Kiran Slido Craft video library: includes sound proof sliding door demonstrations and related on-site testing videos.',
    ],
    sections: [
      {
        heading: '1. System Purpose',
        lines: [
          'Acoustic doors protect spaces where privacy, speech isolation, machine noise containment, studio control, or hotel/healthcare quietness matters. The door leaf alone is not the system; frame, threshold, seals, hardware, and wall junctions are equally critical.',
        ],
      },
      {
        heading: '2. Door Families',
        lines: [
          'Kiran Slido Craft coverage includes hinged acoustic doors, sound proof sliding doors, sliding folding doors, swing doors, and wider acoustic door packages for commercial, studio, industrial, hospitality, institutional, and residential settings.',
          'The operating type should be selected from workflow first: hinged doors for high compression and privacy, sliding doors for spatial constraints, folding/sliding folding doors for wider openings, and steel/industrial formats for plant noise or heavy duty use.',
        ],
      },
      {
        heading: '3. Construction Logic',
        lines: [
          'A good acoustic door combines mass, damping, airtight sealing, frame anchoring, threshold control, and hardware alignment. Leaf mass improves blocking, but perimeter leaks can dominate the final site result.',
          'Dense core construction, engineered facings, acoustic insulation, perimeter seals, and drop/threshold seals should be coordinated with the wall rating and room use.',
        ],
      },
      {
        heading: '4. Verified Product Facts To Carry Into Specs',
        lines: [
          bullet('Published door construction note: imported door core.'),
          bullet('Published thickness note: Kiran Slido Craft acoustical doors are described as 54 mm thick.'),
          bullet('Published performance references include STC-54 flush communicating doors and two STC-40 doors installed back-to-back in a common frame.'),
          bullet('Published seal detail references double 300 series bottom seal and top seal for each door.'),
          bullet('Published use areas include conference rooms, theaters, ball rooms, clubs, board rooms, and presentation centers.'),
        ],
      },
      {
        heading: '5. Specification Inputs',
        lines: [
          bullet('Opening size, wall type, wall thickness, handedness, traffic cycle, fire or safety constraints, finish, and hardware preference.'),
          bullet('Target acoustic outcome: speech privacy, music isolation, plant-room containment, healthcare quietness, or hospitality comfort.'),
          bullet('Required door type: hinged, sliding, folding, steel, wood, glass-inclusive, or composite construction.'),
          bullet('Threshold condition: raised threshold, automatic drop seal, wheelchair movement, wet-area exposure, or high-cycle traffic.'),
        ],
      },
      {
        heading: '6. Detail Risks',
        lines: [
          'Common failure points are misaligned frames, weak wall junctions, unsealed conduits near the frame, undercut gaps, poor latch compression, and hardware substitutions after approval.',
          'For studios and plant rooms, the door should not be isolated from the wall design. The wall, frame, door, glazing, HVAC penetrations, and electrical penetrations define the final acoustic envelope.',
        ],
      },
      {
        heading: '7. Tender Checklist',
        lines: [
          bullet('Require leaf construction, frame section, seal schedule, threshold strategy, finish, hardware, shop drawings, and installation responsibility.'),
          bullet('Define acceptance criteria before production: visual finish, operation force, seal engagement, latch alignment, and acoustic verification method if applicable.'),
          bullet('Ask for maintenance guidance because acoustic seals are performance components, not decorative trim.'),
        ],
      },
    ],
  },
  {
    slug: 'movable-partitions-one-pager',
    title: 'Movable Acoustic Partitions Technical Deep Dive',
    subtitle: 'Detailed guide for operable, sliding folding, fixed, and movable acoustic partition systems.',
    filename: 'ksc-movable-partitions-technical-deep-dive.pdf',
    sourceBasis: [
      'kiranslidocraft.com acoustic movable partition page: movable sound-proof partition walls use modular elements with high acoustic insulation, slide along ceiling-mounted guide rails, and can reach length/height requirements up to 4 m in source copy.',
      'kiranslidocraft.com sound proof partition pages: listed materials include acoustic wall panel/acoustic board, insulation forming and sound reduction materials, MDF board for doors, and sound seals.',
      'kiranslidocraft.co.in catalog: product coverage includes acoustic movable partitions, fixed partitions, and sliding folding partitions.',
      'Kiran Slido Craft video library: includes sound proof movable partition and SAARC summit acoustic movable partition videos.',
    ],
    sections: [
      {
        heading: '1. System Purpose',
        lines: [
          'Movable acoustic partitions let one large room operate as multiple smaller rooms while retaining acoustic separation, event flexibility, and usable clear space. They are most relevant for hotels, banquet halls, schools, conference centers, offices, and multi-purpose interiors.',
        ],
      },
      {
        heading: '2. Product Families',
        lines: [
          'The relevant Kiran Slido Craft families include acoustic movable partitions, fixed acoustic partitions, sliding folding partitions, and related sound proof partition formats.',
          'Selection depends on whether the room needs full stacking, partial opening, fixed separation, fast daily conversion, premium finish continuity, or high acoustic privacy.',
        ],
      },
      {
        heading: '3. Engineering Inputs',
        lines: [
          bullet('Clear opening width and height, beam/ceiling support condition, track route, parking pocket, floor finish, and HVAC/sprinkler conflicts.'),
          bullet('Target acoustic separation, adjacent room use, speech privacy expectations, and whether amplified sound or music is involved.'),
          bullet('Panel finish, pass-door needs, glass/vision panel restrictions, fire/life-safety constraints, and daily operation cycle.'),
        ],
      },
      {
        heading: '4. Verified Product Facts To Carry Into Specs',
        lines: [
          bullet('Published construction basis: acoustic wall panel / acoustic board plus insulation forming and sound reduction materials.'),
          bullet('Published seal basis: sound seals are part of the material list.'),
          bullet('Published movement basis: modular elements slide quietly along guide rails fixed only into the ceiling.'),
          bullet('Published dimensional note: source copy references lengths and heights up to 4 m depending on system design.'),
          bullet('Published use areas include residential, commercial centers, industrial establishments, multiplexes, malls, theaters, and conference halls.'),
        ],
      },
      {
        heading: '5. Construction Logic',
        lines: [
          'Partition performance depends on panel mass, core design, vertical/horizontal seals, track alignment, floor/ceiling continuity, and edge compression. The weakest leak path usually controls the site result.',
          'Track load and support design are critical. A partition system should not be specified only as a finish item; it is a suspended moving acoustic assembly.',
        ],
      },
      {
        heading: '6. Tender Checklist',
        lines: [
          bullet('Require plan, elevation, track layout, parking detail, panel thickness, panel weight, finish, seal type, and operating mechanism.'),
          bullet('Coordinate HVAC return paths, sprinklers, lighting, floor thresholds, smoke/fire compartment expectations, and access control requirements.'),
          bullet('Define commissioning steps: panel movement, seal deployment, alignment, parking, finish acceptance, and user training.'),
        ],
      },
      {
        heading: '7. Maintenance Notes',
        lines: [
          'Periodic maintenance should inspect track cleanliness, trolley movement, seal condition, alignment, parking hardware, and user handling. Acoustic partitions lose performance when seals are damaged or panels are forced out of alignment.',
        ],
      },
    ],
  },
  {
    slug: 'motorized-roof-sliding-systems-one-pager',
    title: 'Motorized Roof And Sliding Systems Technical Deep Dive',
    subtitle: 'Detailed guide for motorized sliding roofs, gates, shutters, barriers, and vertical sliding systems.',
    filename: 'ksc-motorized-roof-sliding-systems-technical-deep-dive.pdf',
    sourceBasis: [
      'kiranslidocraft.com product pages: coverage includes motorized sliding roof, aluminium frame roof sliding system, stainless steel frame roof sliding system, motorized sliding gates, and barriers.',
      'kiranslidocraft.co.in motorized roof page: listed materials are aluminium extrusion or stainless-steel framework; motor options are Indian-made heavy-duty cycle motors or imported European-standard motors.',
      'kiranslidocraft.co.in motorized roof page: product details include 75% to 100% retractable, weatherproof, dust proof, IP rated, overheat protection, double slide and single slide formats.',
      'Kiran Slido Craft video library: includes motorized sliding roof, motorized sliding window, motorized sliding gate, and motorized barrier videos.',
    ],
    sections: [
      {
        heading: '1. System Purpose',
        lines: [
          'Motorized movement systems convert heavy architectural openings into controlled, repeatable movement. They are used for terraces, restaurants, villas, industrial access, security gates, roof openings, shutters, and premium vertical glazing applications.',
        ],
      },
      {
        heading: '2. Product Families',
        lines: [
          'Relevant systems include motorized sliding roofs, aluminium and stainless-steel frame roof sliding systems, motorized sliding gates, telescopic gates, rolling shutters, motorized barriers, motorized sliding windows, vertical sliding windows, and frameless vertical sliding systems.',
          'Roof systems need weather and drainage thinking. Gates and barriers need safety, duty cycle, and access-control thinking. Vertical windows need counterbalance/load, glass safety, and quiet operation thinking.',
        ],
      },
      {
        heading: '3. Engineering Inputs',
        lines: [
          bullet('Opening size, moving panel weight, travel distance, track path, structural support, wind exposure, weather exposure, drainage, and service access.'),
          bullet('Motor type, duty cycle, control logic, limit switches, manual override, obstacle protection, emergency behavior, and power backup expectations.'),
          bullet('Finish, corrosion environment, glazing/polycarbonate/metal panel choice, site wiring, remote/BMS/access-control integration, and maintenance responsibilities.'),
        ],
      },
      {
        heading: '4. Verified Product Facts To Carry Into Specs',
        lines: [
          bullet('Published roof material basis: aluminium extrusion or stainless-steel framework.'),
          bullet('Published motor basis: Indian-made heavy-duty cycle motors or imported European-standard motors.'),
          bullet('Published roof configurations: double slide and single slide.'),
          bullet('Published performance attributes: 75% to 100% retractable, weatherproof, dust proof, IP rated, and overheat protection.'),
          bullet('Published applications include skylights, pool covers, terrace entrances, gazebos, restaurants, cafes, public buildings, private houses, commercial buildings, and industrial establishments.'),
        ],
      },
      {
        heading: '5. Control And Safety Logic',
        lines: [
          'Motorized systems must be specified as mechanical plus electrical packages. Smooth movement requires load calculation, guide alignment, end-stop control, sensor logic, and commissioning under real site conditions.',
          'Safety requirements vary by system: gates and barriers need pedestrian/vehicle protection, roofs need weather and obstruction logic, and vertical glazing needs fall, pinch, and manual override considerations.',
        ],
      },
      {
        heading: '6. Tender Checklist',
        lines: [
          bullet('Require general arrangement drawings, motor/controller details, load assumptions, track/guide sections, fixing strategy, wiring scope, and control interface.'),
          bullet('Define commissioning tests: full travel, stop accuracy, noise, vibration, manual override, safety response, water/drainage behavior for roof systems, and handover training.'),
          bullet('Include maintenance access and spare-parts expectations because motorized systems are active equipment, not static facade elements.'),
        ],
      },
      {
        heading: '7. Buyer Risk Notes',
        lines: [
          'Most failures in automation packages come from underspecified site interfaces: weak substrate, misaligned supports, inadequate drainage, exposed wiring, missing service access, or late control-system changes.',
          'The safest buying path is early technical coordination before civil, facade, electrical, and interior scopes are frozen.',
        ],
      },
    ],
  },
  {
    slug: 'gaganyaan-manufacturing-proof',
    title: 'Gaganyaan Manufacturing Proof Technical Deep Dive',
    subtitle: 'Engineering proof-point guide connecting mission-critical manufacturing to acoustic and automation buyer risk.',
    filename: 'ksc-gaganyaan-manufacturing-proof-technical-deep-dive.pdf',
    sourceBasis: [
      'kiranslidocraft.com and site catalog: Kiran Slido Craft manufactured Gaganyaan capsule entry / crew onboarding and deboarding mechanism components for ISRO-related requirements.',
      'kiranslidocraft.co.in company profile: Kiran Slido Craft presents itself as a manufacturer of innovative architectural products with soundproof and automated system coverage.',
      'Kiran Slido Craft video library: includes a Gaganyaan capsule entry video and other precision movement demonstrations.',
      'Repo-local verified positioning: use the wording "manufactured Gaganyaan\'s capsule entry mechanism" and avoid unsupported aerospace test-number claims.',
    ],
    sections: [
      {
        heading: '1. Why This Proof Point Matters',
        lines: [
          'The Gaganyaan proof point is not a generic marketing claim. It signals that Kiran Slido Craft can handle unusual geometry, high accountability, movement discipline, fabrication coordination, and precision handover expectations.',
          'For buyers of soundproof windows, acoustic doors, partitions, sliding roofs, and motorized systems, this matters because these products fail when tolerances, seals, alignment, and movement details are treated casually.',
        ],
      },
      {
        heading: '2. Transferable Engineering Discipline',
        lines: [
          bullet('Movement control: relevant to vertical sliding windows, sliding roofs, gates, barriers, and automated doors.'),
          bullet('Sealing discipline: relevant to acoustic windows, acoustic doors, partitions, and weather-exposed roof systems.'),
          bullet('Fabrication repeatability: relevant to multi-unit hotel, hospital, school, industrial, and export packages.'),
          bullet('Documentation discipline: relevant to tender responses, shop drawings, installation sequencing, and handover.'),
        ],
      },
      {
        heading: '3. Buyer Interpretation',
        lines: [
          'The correct interpretation is capability proof, not a promise that every architectural product has aerospace certification. It should be used to support trust in engineering culture and manufacturing seriousness.',
          'For a commercial buyer, the practical question is: can the same team translate complex requirements into a buildable, installable, maintainable system? The Gaganyaan proof point supports that answer.',
        ],
      },
      {
        heading: '4. Technical Due Diligence Questions',
        lines: [
          bullet('What are the critical tolerances, movement paths, seal paths, and site interfaces for my project?'),
          bullet('Which details must be frozen before production: opening size, support, glass, motor, finish, controls, or threshold?'),
          bullet('What inspection steps happen before dispatch, during installation, during commissioning, and at handover?'),
          bullet('Which maintenance steps preserve acoustic, weather, or movement performance over time?'),
        ],
      },
      {
        heading: '5. How To Use This In Procurement',
        lines: [
          'Use the proof point in vendor-risk evaluation for custom acoustic and automation packages. It is most relevant when the project has unusual dimensions, strict noise expectations, heavy movement, high-cycle operation, premium finish requirements, or export coordination.',
          'Ask for project-specific method statements, shop drawings, performance assumptions, installation coordination, and service planning rather than only asking for a brochure.',
        ],
      },
    ],
  },
];

export const defaultDownloadItems: DownloadItem[] = downloadDocuments.map((document) => ({
  title: document.title.replace(' Technical Deep Dive', ''),
  type: 'PDF',
  size: 'Technical deep dive',
  href: `/downloads/${document.slug}`,
}));

export function getDownloadDocument(slug: string) {
  return downloadDocuments.find((document) => document.slug === slug);
}

function buildTextLines(document: DownloadDocument): PdfTextLine[] {
  const lines: PdfTextLine[] = [
    { text: document.title, font: 'F2', size: 18 },
    { text: document.subtitle, font: 'F1', size: 10, gapBefore: 18 },
    { text: 'Source Basis', font: 'F2', size: 12, gapBefore: 24 },
    ...document.sourceBasis.flatMap((source) =>
      wrappedPdfLines(bullet(source), 'F1', 9)
    ),
  ];

  for (const section of document.sections) {
    lines.push({ text: section.heading, font: 'F2', size: 13, gapBefore: 20 });
    for (const line of section.lines) {
      lines.push(...wrappedPdfLines(line, 'F1', 10));
      lines.push({ text: '', font: 'F1', size: 4 });
    }
  }

  lines.push(
    { text: 'Next Step', font: 'F2', size: 12, gapBefore: 18 },
    ...wrappedPdfLines(
      'Send drawings, opening sizes, noise context, photos, location, and target performance to info@kiranslidocraft.com for a project-specific engineering response.',
      'F1',
      10
    )
  );

  return lines;
}

function paginate(lines: PdfTextLine[]) {
  const pages: PdfTextLine[][] = [[]];
  let y = PAGE_TOP;

  for (const line of lines) {
    const gap = line.gapBefore || 0;
    const required = gap + (line.text ? LINE_HEIGHT : 8);
    if (y - required < PAGE_BOTTOM && pages[pages.length - 1].length > 0) {
      pages.push([]);
      y = PAGE_TOP;
    }

    pages[pages.length - 1].push(line);
    y -= required;
  }

  return pages;
}

function renderPage(lines: PdfTextLine[], pageNumber: number, pageCount: number) {
  let y = PAGE_TOP;
  const commands = ['BT'];

  for (const line of lines) {
    y -= line.gapBefore || 0;
    if (line.text) {
      commands.push(`/${line.font} ${line.size} Tf`);
      commands.push(`1 0 0 1 ${PAGE_MARGIN_X} ${y} Tm`);
      commands.push(`(${pdfEscape(line.text)}) Tj`);
    }
    y -= line.text ? LINE_HEIGHT : 8;
  }

  commands.push('/F1 8 Tf');
  commands.push(`1 0 0 1 ${PAGE_MARGIN_X} 34 Tm`);
  commands.push(`(${pdfEscape(`Kiran Slido Craft | soundproofindia.com | Page ${pageNumber} of ${pageCount}`)}) Tj`);
  commands.push('ET');

  return commands.join('\n');
}

function buildPdfObjects(pageStreams: string[]) {
  const fontObjectStart = 3;
  const pageObjectStart = 5;
  const contentObjectStart = pageObjectStart + pageStreams.length;
  const pageRefs = pageStreams.map((_, index) => `${pageObjectStart + index} 0 R`).join(' ');
  const objects = [
    `<< /Type /Catalog /Pages 2 0 R >>`,
    `<< /Type /Pages /Kids [${pageRefs}] /Count ${pageStreams.length} >>`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
  ];

  pageStreams.forEach((_, index) => {
    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${fontObjectStart} 0 R /F2 ${fontObjectStart + 1} 0 R >> >> /Contents ${contentObjectStart + index} 0 R >>`
    );
  });

  pageStreams.forEach((stream) => {
    objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
  });

  return objects;
}

export function createTechnicalPdf(document: DownloadDocument) {
  const pages = paginate(buildTextLines(document));
  const pageStreams = pages.map((pageLines, index) => renderPage(pageLines, index + 1, pages.length));
  const objects = buildPdfObjects(pageStreams);

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

export const createOnePagePdf = createTechnicalPdf;
