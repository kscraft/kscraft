import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AboutPage from './page';

describe('About Page', () => {
  it('renders hero title', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Our Legacy/i);
  });

  it('renders company mission and vision', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { level: 3, name: /Our Mission/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Our Vision/i })).toBeInTheDocument();
  });

  it('renders stats', () => {
    render(<AboutPage />);
    expect(screen.getByText(/35\+/i)).toBeInTheDocument();
    expect(screen.getByText(/Years Experience/i)).toBeInTheDocument();
  });
});
