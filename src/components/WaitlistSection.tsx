import { WaitlistForm } from './WaitlistForm';

export function WaitlistSection() {
  return (
    <section id="waitlist" className="w-full py-24 bg-neutral-50">
      <div className="max-w-[480px] mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Early Access
          </p>
          <h2 className="font-bold text-3xl lg:text-4xl text-dark tracking-[-0.02em] mb-3">
            Be the first to know
          </h2>
          <p className="text-grey leading-relaxed">
            Join the waitlist and we&apos;ll notify you the moment Resov launches.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-8">
          <WaitlistForm />
        </div>

        <p className="text-center text-xs text-grey-light mt-4">
          No spam. Unsubscribe any time.
        </p>
      </div>
    </section>
  );
}
