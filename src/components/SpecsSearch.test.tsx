import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SpecsSearch from './SpecsSearch';

describe('SpecsSearch Component', () => {
  it('renders search input', () => {
    render(<SpecsSearch />);
    expect(screen.getByRole('combobox', { name: 'Search technical specifications' })).toBeInTheDocument();
  });

  it('shows results when typing', () => {
    render(<SpecsSearch />);
    const input = screen.getByPlaceholderText(/Search specifications/i);
    
    fireEvent.change(input, { target: { value: 'Sound' } });
    
    expect(screen.getByText(/Matching Systems/i)).toBeInTheDocument();
  });

  it('shows no results message when no matches found', () => {
    render(<SpecsSearch />);
    const input = screen.getByPlaceholderText(/Search specifications/i);
    
    fireEvent.change(input, { target: { value: 'NonExistentProductXYZ' } });
    
    expect(screen.getByText(/No technical systems match your query/i)).toBeInTheDocument();
  });

  it('clears query when clear button is clicked', () => {
    render(<SpecsSearch />);
    const input = screen.getByPlaceholderText(/Search specifications/i);
    
    fireEvent.change(input, { target: { value: 'Sound' } });
    expect(input).toHaveValue('Sound');
    
    const clearButton = screen.getByRole('button', { name: 'Clear specification search' });
    fireEvent.click(clearButton);
    
    expect(input).toHaveValue('');
  });
});
