import { Metadata } from 'next';
import SearchClient from './SearchClient';

export const metadata: Metadata = {
  title: 'Search Architectural Systems | Kiran Slido Craft',
  description: 'Search for high-performance soundproof windows, doors, partitions, and motorized systems by technical specification or product category.',
};

export default function SearchPage() {
  return <SearchClient />;
}
