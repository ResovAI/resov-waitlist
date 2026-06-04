import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full py-5 px-4 bg-dark border-b border-white/5">
      <div className="max-w-[1200px] mx-auto">
        <Link href="/" className="inline-block relative w-32 h-10">
          <Image src="/images/logo-white.svg" alt="Resov" fill className="object-contain" priority />
        </Link>
      </div>
    </nav>
  );
}
