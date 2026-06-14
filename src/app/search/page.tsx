import { Metadata } from 'next';
import SearchClient from './SearchClient';

export const metadata: Metadata = {
  title: 'Search Architectural Systems | Kiran Slido Craft',
  description: 'Search for high-performance soundproof windows, doors, partitions, and motorized systems by technical specification or product category.',
  alternates: {
    canonical: 'https://soundproofindia.com/search',
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
  openGraph: {
    title: 'Search Architectural Systems | Kiran Slido Craft',
    description: 'Find soundproof windows, doors, partitions, and motorized systems by technical specification.',
    url: 'https://soundproofindia.com/search',
    type: 'website',
  },
};

export default function SearchPage() {
  return <SearchClient />;
}
