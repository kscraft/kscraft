import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MediaPage from './page';

describe('Media Page', () => {
  it('renders hero title', () => {
    render(<MediaPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Engineering in Focus/i);
  });

  it('renders video section', () => {
    render(<MediaPage />);
    expect(screen.getByText(/Project Documentation/i)).toBeInTheDocument();
    expect(screen.getByText(/Motorized Barrier System/i)).toBeInTheDocument();
  });
});
