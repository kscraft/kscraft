import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './Header';

describe('Header Component', () => {
  it('renders company name', () => {
    render(<Header />);
    expect(screen.getByText(/Kiran Slido Craft/i, { selector: 'span' })).toBeInTheDocument();
  });

  it('renders desktop navigation links', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: 'Engineering' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Case Studies' })).toBeInTheDocument();
  });

  it('renders get quote button', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: /Get a Quote/i })).toBeInTheDocument();
  });

  it('toggles mobile menu', () => {
    render(<Header />);
    const menuButton = screen.getByRole('button', { name: 'Open menu' });

    fireEvent.click(menuButton);

    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/System Catalog/i)).toBeInTheDocument();
  });

  it('exposes the catalog as a menu trigger', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: /Catalog/i })).toHaveAttribute('aria-haspopup', 'true');
  });
});
