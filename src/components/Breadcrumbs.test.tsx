import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Breadcrumbs from './Breadcrumbs';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('Breadcrumbs', () => {
  it('renders the home link', () => {
    render(<Breadcrumbs items={[]} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });

  it('renders breadcrumb items', () => {
    const items = [
      { label: 'Level 1', href: '/level-1' },
      { label: 'Current', href: '/current' },
    ];
    render(<Breadcrumbs items={items} />);
    
    expect(screen.getByText('Level 1')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
  });

  it('renders correctly on the last item', () => {
    const items = [
      { label: 'Level 1', href: '/level-1' },
      { label: 'Current' },
    ];
    render(<Breadcrumbs items={items} />);
    
    const currentItem = screen.getByText('Current');
    expect(currentItem.tagName).toBe('SPAN');
    expect(currentItem).toHaveAttribute('aria-current', 'page');
  });
});
