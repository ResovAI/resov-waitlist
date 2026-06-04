import type { Metadata } from 'next';
import { Rethink_Sans } from 'next/font/google';
import './globals.css';

const rethink = Rethink_Sans({
  subsets: ['latin'],
  variable: '--font-rethink',
});

export const metadata: Metadata = {
  title: 'Resov — Join the Waitlist',
  description:
    'The AI-powered grant marketplace. Join the waitlist to be the first to know when we launch.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${rethink.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
