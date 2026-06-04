import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full py-8 px-4 bg-dark">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="inline-block relative w-28 h-9">
          <Image src="/images/logo-white.svg" alt="Resov" fill className="object-contain" />
        </Link>
        <p className="text-sm text-grey">
          © {new Date().getFullYear()} Resov · Built by CSG Development
        </p>
      </div>
    </footer>
  );
}
