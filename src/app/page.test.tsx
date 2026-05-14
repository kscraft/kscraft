import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './page';

describe('Home Page', () => {
  it('renders hero section', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Soundproof Windows/i);
    expect(screen.getByText(/Gaganyaan's capsule entry/i)).toBeInTheDocument();
  });

  it('renders call to action buttons', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /Request Technical Quote/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View ISRO Case Study/i })).toBeInTheDocument();
  });

  it('renders engineering promise section', () => {
    render(<Home />);
    expect(screen.getByText(/Built for specification/i)).toBeInTheDocument();
    // Use getAllByText for terms that appear multiple times or be more specific
    expect(screen.getAllByText(/Acoustic Control/i).length).toBeGreaterThan(0);
  });

  it('renders catalog navigation', () => {
    render(<Home />);
    expect(screen.getByText(/System Catalog/i)).toBeInTheDocument();
    // Header catalog title vs navigation catalog title might collide
    const catalogTitles = screen.getAllByText(/Acoustic Windows/i);
    expect(catalogTitles.length).toBeGreaterThan(0);
  });

  it('renders specs search', () => {
    render(<Home />);
    expect(screen.getByPlaceholderText(/Search specifications/i)).toBeInTheDocument();
  });
});
