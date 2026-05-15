import intentSeoData from './intent-seo.json';

export type IntentSeo = {
  slug: string;
  title: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  primaryCategorySlug: string;
  relatedProducts: string[];
  faqs: { question: string; answer: string }[];
  proofAngle: string;
};

export const intentSeoPages: IntentSeo[] = intentSeoData as IntentSeo[];

export function getIntentSeo(slug: string) {
  return intentSeoPages.find((intent) => intent.slug === slug);
}
