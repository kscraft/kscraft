import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MediaPage from './page';

describe('Media Page', () => {
  it('renders hero title', () => {
    render(<MediaPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Systems in Focus/i);
  });

  it('renders video section', () => {
    render(<MediaPage />);
    expect(screen.getByText(/Video Demonstrations/i)).toBeInTheDocument();
    expect(screen.getByText(/Sound Proof Sliding Windows/i)).toBeInTheDocument();
  });
});
