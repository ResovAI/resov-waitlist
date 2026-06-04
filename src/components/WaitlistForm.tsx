'use client';

import { useState } from 'react';

type Role = 'donor' | 'applicant';

const SUCCESS_MESSAGES: Record<Role, string> = {
  donor: "We'll notify donors first when we launch.",
  applicant: 'Start finding funding the day we go live.',
};

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('applicant');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successRole, setSuccessRole] = useState<Role | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? 'Something went wrong, please try again');
        return;
      }

      setSuccessRole(role);
    } catch {
      setError('Something went wrong, please try again');
    } finally {
      setIsLoading(false);
    }
  }

  if (successRole) {
    return (
      <div className="text-center py-8">
        <p className="text-4xl mb-4">🎉</p>
        <h3 className="text-xl font-bold text-dark mb-2">You&apos;re on the list!</h3>
        <p className="text-grey">{SUCCESS_MESSAGES[successRole]}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        aria-label="Email address"
        required
        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-dark"
      />

      <div className="flex gap-2">
        {(['applicant', 'donor'] as Role[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            aria-pressed={role === r}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              role === r
                ? 'bg-dark text-white'
                : 'bg-neutral-100 text-grey hover:bg-neutral-200'
            }`}
          >
            {r === 'donor' ? "I&apos;m a Donor" : "I&apos;m an Applicant"}
          </button>
        ))}
      </div>

      {error && <p role="alert" className="text-state-error text-sm text-center">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-6 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Joining...' : 'Join the Waitlist'}
      </button>
    </form>
  );
}
