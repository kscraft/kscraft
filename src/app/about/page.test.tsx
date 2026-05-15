import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AboutPage from './page';

describe('About Page', () => {
  it('renders hero title', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Acoustic Engineering/i);
  });

  it('renders stats', () => {
    render(<AboutPage />);
    expect(screen.getAllByText(/35\+/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Years Experience/i)).toBeInTheDocument();
  });
});
