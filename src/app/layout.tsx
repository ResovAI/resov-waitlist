import type { Metadata } from 'next';
import { Rethink_Sans } from 'next/font/google';
import './globals.css';

const rethink = Rethink_Sans({
  subsets: ['latin'],
  variable: '--font-rethink',
});

export const metadata: Metadata = {
  title: 'Resov: Join the Waitlist',
  description:
    'AI-powered application management with templates, AI vetting, verification, scoring, and ranking for grants, fellowships, and challenges. Join the waitlist.',
  metadataBase: new URL('https://www.tryresov.com'),
  openGraph: {
    title: 'Resov: The AI-Powered Application Management Platform',
    description:
      'Create and manage applications end to end, with built-in analysis, verification, scoring, and ranking. Join the waitlist.',
    url: 'https://www.tryresov.com',
    siteName: 'Resov',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resov: The AI-Powered Application Management Platform',
    description:
      'Create and manage applications end to end, with built-in analysis, verification, scoring, and ranking. Join the waitlist.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${rethink.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
