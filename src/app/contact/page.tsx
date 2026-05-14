import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Engineering | Kiran Slido Craft',
  description: 'Request a technical quote for soundproof windows, acoustic doors, and automation systems. Connect with our engineering team for project specifications.',
};

export default function ContactPage() {
  return <ContactClient />;
}
