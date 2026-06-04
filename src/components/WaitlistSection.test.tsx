import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WaitlistSection } from './WaitlistSection';

vi.mock('./WaitlistForm', () => ({
  WaitlistForm: () => <div data-testid="waitlist-form" />,
}));

describe('WaitlistSection', () => {
  it('renders section heading and the form', () => {
    render(<WaitlistSection />);
    expect(screen.getByText('Be the first to know')).toBeInTheDocument();
    expect(screen.getByTestId('waitlist-form')).toBeInTheDocument();
  });

  it('has the id="waitlist" anchor for scroll targeting', () => {
    const { container } = render(<WaitlistSection />);
    expect(container.querySelector('#waitlist')).toBeInTheDocument();
  });
});
