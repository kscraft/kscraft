import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductDownloads from './ProductDownloads';

describe('ProductDownloads', () => {
  it('renders download links', () => {
    render(<ProductDownloads productTitle="Test Product" />);
    expect(screen.getByText(/Technical Documentation/i)).toBeInTheDocument();
    expect(screen.getByText(/Soundproof Windows/i)).toBeInTheDocument();
    expect(screen.getByText(/Gaganyaan Manufacturing Proof/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: /Soundproof Windows/i })).toHaveAttribute(
      'href',
      '/downloads/soundproof-windows-one-pager'
    );
  });
});
