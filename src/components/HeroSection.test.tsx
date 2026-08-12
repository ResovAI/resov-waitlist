import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSection } from './HeroSection';

describe('HeroSection', () => {
  it('renders the headline and CTA link', () => {
    render(<HeroSection />);
    expect(screen.getByText(/AI-powered application/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Join the Waitlist/i })).toHaveAttribute('href', '#waitlist');
  });
});
