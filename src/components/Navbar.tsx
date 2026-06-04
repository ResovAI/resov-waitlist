import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="w-full py-5 px-4 bg-dark">
      <div className="max-w-[1200px] mx-auto">
        <Link href="/" className="inline-block relative w-32 h-10">
          <Image src="/images/logo-white.svg" alt="Resov" fill className="object-contain" priority />
        </Link>
      </div>
    </nav>
  );
}
