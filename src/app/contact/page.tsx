import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Engineering | Kiran Slido Craft',
  description: 'Request a technical quote for soundproof windows, acoustic doors, and automation systems. Connect with our engineering team for project specifications.',
  alternates: {
    canonical: 'https://soundproofindia.com/contact',
  },
  openGraph: {
    title: 'Contact Engineering | Kiran Slido Craft',
    description: 'Request a technical quote for acoustic systems and architectural automation.',
    url: 'https://soundproofindia.com/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
