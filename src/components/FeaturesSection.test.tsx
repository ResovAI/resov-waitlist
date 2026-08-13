import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeaturesSection } from './FeaturesSection';

describe('FeaturesSection', () => {
  it('renders all three feature cards', () => {
    render(<FeaturesSection />);
    expect(screen.getByText('For Funders & Grantmakers')).toBeInTheDocument();
    expect(screen.getByText('For Applicants')).toBeInTheDocument();
    expect(screen.getByText('AI-Powered')).toBeInTheDocument();
  });
});
