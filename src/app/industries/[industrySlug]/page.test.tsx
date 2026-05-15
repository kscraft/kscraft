import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import IndustryPage from './page';

describe('Industry Page', () => {
  it('renders education tender specification guidance', async () => {
    render(await IndustryPage({ params: Promise.resolve({ industrySlug: 'education-institutions' }) }));

    expect(screen.getByText(/Tender-ready acoustic criteria for Education & Institutions/i)).toBeInTheDocument();
    expect(screen.getByText(/Movable partitions shall include perimeter compression seals/i)).toBeInTheDocument();
    expect(screen.getByText(/Room-by-room acoustic target/i)).toBeInTheDocument();
  });

  it('renders industrial tender specification guidance', async () => {
    render(await IndustryPage({ params: Promise.resolve({ industrySlug: 'industrial-manufacturing' }) }));

    expect(screen.getByText(/Tender-ready acoustic criteria for Industrial & Manufacturing/i)).toBeInTheDocument();
    expect(screen.getByText(/Automation packages shall define motor duty cycle/i)).toBeInTheDocument();
    expect(screen.getByText(/Source noise level, octave-band data/i)).toBeInTheDocument();
  });
});
