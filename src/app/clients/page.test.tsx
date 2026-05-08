import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ClientsPage from './page';

describe('Clients Page', () => {
  it('renders hero title', () => {
    render(<ClientsPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Trust & Precision/i);
  });

  it('renders featured projects', () => {
    render(<ClientsPage />);
    expect(screen.getByText(/ISRO Gaganyaan Mission/i)).toBeInTheDocument();
    expect(screen.getByText(/Hilton Hotel/i)).toBeInTheDocument();
  });

  it('renders trusted partners section', () => {
    render(<ClientsPage />);
    expect(screen.getByText(/Partnering with Leaders/i)).toBeInTheDocument();
    expect(screen.getByText(/Pfizer India/i)).toBeInTheDocument();
  });
});
