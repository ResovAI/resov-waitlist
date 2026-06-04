import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('Footer', () => {
  it('renders logo and copyright', () => {
    render(<Footer />);
    expect(screen.getByAltText('Resov')).toBeInTheDocument();
    expect(screen.getByText(/CSG Development/i)).toBeInTheDocument();
  });
});
