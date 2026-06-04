export function HeroSection() {
  return (
    <section className="w-full py-24 lg:py-32 bg-dark">
      <div className="max-w-[1200px] mx-auto px-4 text-center">
        <h1 className="font-bold text-4xl lg:text-[64px] lg:leading-[67px] tracking-[-0.02em] text-white mb-6">
          The AI-Powered Grant{' '}
          <br className="hidden lg:block" />
          Marketplace — Launching Soon
        </h1>
        <p className="text-grey-light text-base lg:text-lg leading-7 lg:leading-8 max-w-2xl mx-auto mb-10">
          Move beyond simple listings. Resov connects enterprise donors with qualified applicants
          through AI-powered matching, full grant lifecycle management, and seamless disbursement.
        </p>
        <a
          href="#waitlist"
          className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-lg font-medium text-base hover:bg-primary-hover transition-colors"
        >
          Join the Waitlist
        </a>
      </div>
    </section>
  );
}
