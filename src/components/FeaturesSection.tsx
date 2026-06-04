const features = [
  {
    title: 'For Donors',
    icon: '🏛️',
    description:
      'Post grants, monitor the full lifecycle, and leverage AI-powered applicant vetting to fund the right projects with confidence.',
  },
  {
    title: 'For Applicants',
    icon: '🎯',
    description:
      'Discover relevant funding opportunities, apply in one place, and get AI-assisted tools to strengthen your applications.',
  },
  {
    title: 'AI-Powered',
    icon: '⚡',
    description:
      'Automated applicant–grant matching, risk scoring, and disbursement management — powered by AI from start to finish.',
  },
];

export function FeaturesSection() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col gap-4 p-8 rounded-2xl border border-neutral-200 shadow-card"
            >
              <span className="text-3xl">{f.icon}</span>
              <h3 className="font-bold text-xl text-dark">{f.title}</h3>
              <p className="text-grey leading-7">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
