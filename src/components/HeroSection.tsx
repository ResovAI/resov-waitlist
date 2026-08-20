export function HeroSection() {
  return (
    <section
      className="relative w-full min-h-[calc(100vh-72px)] flex items-center bg-dark overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 py-24 text-center w-full">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/70 text-sm mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Coming Soon
          </div>
        </div>

        <h1
          className="font-bold text-4xl lg:text-[64px] lg:leading-[67px] tracking-[-0.02em] text-white mb-6 animate-fade-up"
          style={{ animationDelay: '0.1s', opacity: 0 }}
        >
          AI-Powered Application
          <br className="hidden lg:block" />
          Management Platform
        </h1>

        <p
          className="text-grey-light text-base lg:text-lg leading-7 lg:leading-8 max-w-xl mx-auto mb-10 animate-fade-up"
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          The application forms you already use, now with built-in analysis, verification, scoring,
          and ranking. From grants and fellowships to competitions and innovation challenges, Resov
          makes selection faster and fairer.
        </p>

        <div
          className="animate-fade-up"
          style={{ animationDelay: '0.3s', opacity: 0 }}
        >
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-medium text-base hover:bg-primary-hover transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
          >
            Join the Waitlist
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-5 h-5 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
