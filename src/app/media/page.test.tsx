import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MediaPage from './page';

describe('Media Page', () => {
  it('renders hero title', () => {
    render(<MediaPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Engineering in Motion/i);
  });

  it('renders media items', () => {
    render(<MediaPage />);
    expect(screen.getByText(/Operational Precision/i)).toBeInTheDocument();
    expect(screen.getByText(/Roof Sliding System/i)).toBeInTheDocument();
  });
});
