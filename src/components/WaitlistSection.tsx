import { WaitlistForm } from './WaitlistForm';

export function WaitlistSection() {
  return (
    <section id="waitlist" className="w-full py-20 bg-neutral-50">
      <div className="max-w-[480px] mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-bold text-3xl text-dark mb-3">Be the first to know</h2>
          <p className="text-grey">
            Join the waitlist and we&apos;ll let you know when Resov launches.
          </p>
        </div>
        <WaitlistForm />
      </div>
    </section>
  );
}
