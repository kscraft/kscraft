import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import TurnstileWidget from './TurnstileWidget';

afterEach(() => {
  delete window.turnstile;
});

describe('TurnstileWidget', () => {
  it('uses an explicit-render container with the analytics action', () => {
    const { container } = render(<TurnstileWidget />);
    const widgetContainer = container.querySelector('[data-turnstile-container="true"]');

    expect(widgetContainer).toHaveAttribute('data-sitekey', '0x4AAAAAAEAl-DGJqphLw0Wv');
    expect(widgetContainer).toHaveAttribute('data-action', 'turnstile-spin-v2');
    expect(widgetContainer).not.toHaveClass('cf-turnstile');
    expect(screen.getByText('Human verification')).toBeInTheDocument();
  });

  it('removes an attached widget when the component unmounts', async () => {
    const remove = vi.fn();
    window.turnstile = {
      render: vi.fn((container: HTMLElement) => {
        const widget = document.createElement('iframe');
        widget.id = 'cf-chl-widget-test';
        container.appendChild(widget);
        return widget.id;
      }),
      remove,
    };

    const view = render(<TurnstileWidget />);
    await waitFor(() => expect(window.turnstile?.render).toHaveBeenCalledOnce());
    view.unmount();

    expect(remove).toHaveBeenCalledWith('cf-chl-widget-test');
  });

  it('does not call the provider for a widget ID whose DOM was already removed', async () => {
    const remove = vi.fn();
    window.turnstile = {
      render: vi.fn((container: HTMLElement) => {
        const widget = document.createElement('iframe');
        widget.id = 'cf-chl-widget-stale';
        container.appendChild(widget);
        return widget.id;
      }),
      remove,
    };

    const view = render(<TurnstileWidget />);
    await waitFor(() => expect(document.getElementById('cf-chl-widget-stale')).toBeInTheDocument());
    document.getElementById('cf-chl-widget-stale')?.remove();
    view.unmount();

    expect(remove).not.toHaveBeenCalled();
  });
});
