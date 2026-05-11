import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('Footer Component', () => {
  it('renders company branding', () => {
    render(<Footer />);
    // Check for company name in the logo area (span)
    const branding = screen.getByText('Kiran Slido Craft', { selector: 'span' });
    expect(branding).toBeInTheDocument();
    expect(screen.getByText(/Engineering Silence/i, { selector: 'span' })).toBeInTheDocument();
  });

  it('renders solution links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /Acoustic Windows/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Automation Systems/i })).toBeInTheDocument();
  });

  it('renders contact email', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /info@doorwindowcraft.com/i })).toBeInTheDocument();
  });
});
