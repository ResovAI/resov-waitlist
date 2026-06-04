import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';

vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('Navbar', () => {
  it('renders the Resov logo', () => {
    render(<Navbar />);
    expect(screen.getByAltText('Resov')).toBeInTheDocument();
  });
});
