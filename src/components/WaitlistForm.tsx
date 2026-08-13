'use client';

import { useState } from 'react';

type Role = 'donor' | 'applicant';

// The 'donor' KEY is the internal role value (kept for the API/Resend/redis); the copy
// shown to users says "funder".
const SUCCESS_MESSAGES: Record<Role, string> = {
  donor: "We'll notify funders first when we launch.",
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
      <div className="text-center py-6 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4 text-3xl">
          🎉
        </div>
        <h3 className="text-xl font-bold text-dark mb-2">You&apos;re on the list!</h3>
        <p className="text-grey text-sm leading-relaxed">{SUCCESS_MESSAGES[successRole]}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-dark">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          required
          className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-dark placeholder:text-grey-light transition-shadow text-sm"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-medium text-dark">I want to join as</p>
        <div className="flex gap-2 p-1 bg-neutral-100 rounded-lg">
          {(['applicant', 'donor'] as Role[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              aria-pressed={role === r}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-150 ${
                role === r
                  ? 'bg-dark text-white shadow-sm'
                  : 'text-grey hover:text-dark'
              }`}
            >
              {r === 'donor' ? 'Funder' : 'Applicant'}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p role="alert" className="text-state-error text-sm text-center py-1">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-1 py-3 px-6 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/20 text-sm"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Joining...
          </span>
        ) : (
          'Join the Waitlist'
        )}
      </button>
    </form>
  );
}
