const features = [
  {
    title: 'For Donors',
    accent: 'bg-blue-50',
    iconColor: 'text-blue-600',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
      </svg>
    ),
    description:
      'Post grants, monitor the full lifecycle, and leverage AI-powered applicant vetting to fund the right projects with confidence.',
  },
  {
    title: 'For Applicants',
    accent: 'bg-primary-light',
    iconColor: 'text-primary',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    description:
      'Discover relevant funding opportunities, apply in one place, and get AI-assisted tools to strengthen your applications.',
  },
  {
    title: 'AI-Powered',
    accent: 'bg-amber-50',
    iconColor: 'text-amber-500',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    description:
      'Automated applicant–grant matching, risk scoring, and disbursement management — powered by AI from start to finish.',
  },
];

export function FeaturesSection() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Platform
          </p>
          <h2 className="font-bold text-3xl lg:text-4xl text-dark tracking-[-0.02em]">
            Everything in one place
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group flex flex-col gap-5 p-8 rounded-2xl border border-neutral-200 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-xl ${f.accent} ${f.iconColor} flex items-center justify-center`}>
                {f.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg text-dark mb-2">{f.title}</h3>
                <p className="text-grey leading-7 text-sm">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
