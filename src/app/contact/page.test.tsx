import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ContactPage from './page';

describe('Contact Page', () => {
  it('renders hero title', () => {
    render(<ContactPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Let us Connect/i);
  });

  it('renders engineering hubs', () => {
    render(<ContactPage />);
    expect(screen.getByText(/Engineering Hubs/i)).toBeInTheDocument();
    expect(screen.getByText(/Mumbai Operations/i)).toBeInTheDocument();
  });

  it('renders inquiry form', () => {
    render(<ContactPage />);
    expect(screen.getByText(/Technical Inquiry/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email@company.com/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Technical Request/i })).toBeInTheDocument();
  });
});
