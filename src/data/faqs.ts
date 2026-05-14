export type FaqCategory = {
  id: string;
  title: string;
  icon: string;
  faqs: { question: string; answer: string }[];
};

export const faqCategories: FaqCategory[] = [
  {
    id: 'delivery',
    title: 'Delivery & Service Area',
    icon: 'MapPin',
    faqs: [
      {
        question: 'Which regions do you deliver to?',
        answer: 'We are a licensed global exporter and deliver to the UK, Europe, GCC/MENA, APAC, Australia, and across the Indian Subcontinent. Our Mumbai headquarters and Kolkata regional operations manage domestic logistics and international shipping.',
      },
      {
        question: 'What is the typical delivery timeline?',
        answer: 'Standard domestic delivery takes 4-6 weeks from order confirmation. International orders typically take 6-10 weeks including manufacturing, quality inspection, and freight. Expedited timelines are available for priority projects.',
      },
      {
        question: 'Do you handle installation or only manufacturing?',
        answer: 'We provide end-to-end support: manufacturing, shipping, and installation supervision. For domestic projects, our trained installation crews handle the complete fitment. For international projects, we provide detailed installation guides and remote support, or work with your local contractors.',
      },
    ],
  },
  {
    id: 'customization',
    title: 'Customization & Sizing',
    icon: 'Ruler',
    faqs: [
      {
        question: 'Can your systems be customized to non-standard dimensions?',
        answer: 'Absolutely. Every system we manufacture is made-to-order based on your site dimensions. We do not sell off-the-shelf products. Share your architectural drawings and we will engineer a solution that fits precisely.',
      },
      {
        question: 'What finish options are available?',
        answer: 'Aluminum systems are available in powder-coated finishes (any RAL colour), anodized finishes, or wood-grain laminate. Doors are available in wood veneer, steel, or custom paint. Partitions can be finished in fabric, melamine, veneer, or acoustic paneling.',
      },
      {
        question: 'Can you match existing building aesthetics?',
        answer: 'Yes. We routinely work with architects to match existing fenestration profiles, colour palettes, and hardware styles. Send us reference photographs or specifications and we will produce samples for approval before manufacturing.',
      },
    ],
  },
  {
    id: 'stc',
    title: 'STC Ratings & Acoustic Performance',
    icon: 'BarChart3',
    faqs: [
      {
        question: 'What STC ratings do your products achieve?',
        answer: 'Our acoustic windows achieve STC 30 to 52+, doors range from STC 42 to 55+, and movable partitions exceed STC 50. The exact rating depends on glazing configuration, core density, and seal design. We help you specify the right system for your noise reduction target.',
      },
      {
        question: 'What is STC and how does it affect my project?',
        answer: 'STC (Sound Transmission Class) measures how much sound a barrier blocks. Standard residential windows offer STC 25-28. Upgrading to STC 40+ reduces perceived noise by over 75%. For recording studios, hospitals, or hotels near highways, STC 45-50+ is typically specified.',
      },
      {
        question: 'Do you provide acoustic test reports?',
        answer: 'Yes. Our systems are tested in accredited laboratories and we provide certified acoustic test reports as part of our project documentation package. These reports are essential for regulatory compliance and building certification.',
      },
    ],
  },
  {
    id: 'installation',
    title: 'Installation & Project Support',
    icon: 'Wrench',
    faqs: [
      {
        question: 'How does the specification and ordering process work?',
        answer: 'Our process has five steps: (1) Share your drawings and requirements, (2) We define the acoustic performance target together, (3) You receive a detailed technical quotation, (4) We manufacture your custom system, (5) We deliver, install, and provide ongoing support.',
      },
      {
        question: 'Can you install without disrupting building operations?',
        answer: 'Yes. For secondary glazing and retrofit projects, installation is done from inside the building with minimal noise and no scaffolding. Hotel room retrofits can be completed within a single day per room, allowing continued operations.',
      },
      {
        question: 'Do you provide shop drawings and technical documentation?',
        answer: 'Every project receives complete shop drawings, material specifications, acoustic performance data, installation manuals, and maintenance guides. We also provide BIM-compatible files for larger commercial and institutional projects.',
      },
    ],
  },
  {
    id: 'warranty',
    title: 'Warranty & After-Sales',
    icon: 'ShieldCheck',
    faqs: [
      {
        question: 'What warranty do you offer?',
        answer: 'All our systems come with a standard warranty covering manufacturing defects, hardware, and seals. Extended warranty packages are available for commercial and institutional projects. Specific warranty terms are outlined in each project quotation.',
      },
      {
        question: 'Do you provide maintenance services?',
        answer: 'Yes. We offer annual maintenance contracts (AMC) that include periodic inspection, hardware lubrication, seal replacement, track cleaning, and performance verification. Maintenance is essential for sustained acoustic performance over the life of the system.',
      },
      {
        question: 'What if a component needs replacement?',
        answer: 'All hardware components, seals, and glazing elements are serviceable and replaceable. Because we manufacture in-house, spare parts are always available without dependency on third-party suppliers.',
      },
    ],
  },
  {
    id: 'export',
    title: 'Export & International Projects',
    icon: 'Globe',
    faqs: [
      {
        question: 'Are your systems suitable for international building codes?',
        answer: 'Yes. We manufacture to international standards and our systems have been installed in projects across the UAE, Saudi Arabia, Qatar, Singapore, Malaysia, Maldives, and more. We work with your local compliance requirements to ensure full regulatory approval.',
      },
      {
        question: 'How do you handle international shipping and customs?',
        answer: 'As a licensed global exporter registered with NSIC, we handle all export documentation, customs clearance, and freight logistics. Systems are packed in custom marine-grade crating designed for safe international transit.',
      },

      {
        question: 'Can you work with our local contractors for installation?',
        answer: 'Absolutely. For international projects, we provide comprehensive installation training, detailed video guides, and remote supervision via video call during critical installation phases. We can also send our installation supervisors to site for complex projects.',
      },
    ],
  },
];

export function getAllFaqs() {
  return faqCategories.flatMap((cat) =>
    cat.faqs.map((faq) => ({ ...faq, category: cat.title }))
  );
}
