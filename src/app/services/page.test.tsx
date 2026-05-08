import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ServicesPage from './page';

describe('Services Page', () => {
  it('renders hero title', () => {
    render(<ServicesPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Service Support/i);
  });

  it('renders main services', () => {
    render(<ServicesPage />);
    expect(screen.getByRole('heading', { level: 2, name: /Annual Maintenance/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Acoustic Support/i })).toBeInTheDocument();
  });

  it('renders call to action', () => {
    render(<ServicesPage />);
    expect(screen.getByRole('link', { name: /Request Service Support/i })).toBeInTheDocument();
  });
});
