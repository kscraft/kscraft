import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import QuoteModal from './QuoteModal';

describe('QuoteModal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('does not render when closed', () => {
    render(<QuoteModal isOpen={false} onClose={mockOnClose} productName="Test Product" />);
    expect(screen.queryByText(/Test Product/i)).not.toBeInTheDocument();
  });

  it( 'renders when open', () => {
    render(<QuoteModal isOpen={true} onClose={mockOnClose} productName="Test Product" />);
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Engineering Inquiry/i)).toBeInTheDocument();
  });

  it('calls onClose when clicking the close button', () => {
    render(<QuoteModal isOpen={true} onClose={mockOnClose} productName="Test Product" />);
    // Close button has icon-x
    const closeButton = screen.getByTestId('icon-x').parentElement;
    if (closeButton) fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('renders all contact options', () => {
    render(<QuoteModal isOpen={true} onClose={mockOnClose} productName="Test Product" />);
    expect(screen.getByText(/WhatsApp/i)).toBeInTheDocument();
    expect(screen.getByText(/Call Now/i)).toBeInTheDocument();
    expect(screen.getByText(/Formal Inquiry/i)).toBeInTheDocument();
  });

  it('portals to the document body and locks background scrolling', () => {
    render(<QuoteModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByRole('dialog').parentElement?.parentElement).toBe(document.body);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('closes on Escape', () => {
    render(<QuoteModal isOpen={true} onClose={mockOnClose} />);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledOnce();
  });
});
