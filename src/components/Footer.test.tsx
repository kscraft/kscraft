import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('Footer Component', () => {
  it('renders company branding', () => {
    render(<Footer />);
    const branding = screen.getAllByText('Kiran Slido Craft', { selector: 'span' });
    expect(branding.length).toBeGreaterThan(0);
    expect(screen.getByText(/Engineering & Manufacturing/i, { selector: 'span' })).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Footer />);
    expect(screen.getByText('Acoustic Windows')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
  });
});
