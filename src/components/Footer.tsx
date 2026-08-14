import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full py-8 px-4 bg-dark">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="inline-block relative w-28 h-9">
          <Image src="/images/logo-white.svg" alt="Resov" fill className="object-contain" />
        </Link>

        <div className="flex items-center gap-5">
          <a
            href="https://x.com/resovtech"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="text-grey hover:text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.16 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/showcase/resov-ai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-grey hover:text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.114 20.452H3.556V9h3.558v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
            </svg>
          </a>
        </div>

        <p className="text-sm text-grey">
          © {new Date().getFullYear()} Resov · Built by CSG Development
        </p>
      </div>
    </footer>
  );
}
