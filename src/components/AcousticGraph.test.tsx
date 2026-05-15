import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AcousticGraph from './AcousticGraph';

describe('AcousticGraph', () => {
  it('renders correctly', () => {
    render(<AcousticGraph stcRating={45} />);
    expect(screen.getByText(/Transmission Loss \(dB\)/i)).toBeInTheDocument();
    expect(screen.getByText(/STC 45/i)).toBeInTheDocument();
  });

  it('renders the SVG graph', () => {
    const { container } = render(<AcousticGraph stcRating={45} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
