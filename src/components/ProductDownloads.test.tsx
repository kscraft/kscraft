import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductDownloads from './ProductDownloads';

describe('ProductDownloads', () => {
  it('renders download links', () => {
    render(<ProductDownloads productName="Test Product" />);
    expect(screen.getByText(/Technical Documentation/i)).toBeInTheDocument();
    expect(screen.getByText(/Technical Data Sheet/i)).toBeInTheDocument();
    expect(screen.getByText(/Acoustic Test Report/i)).toBeInTheDocument();
    // They are buttons in the current implementation, not links
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });
});
