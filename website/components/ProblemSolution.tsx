export default function ProblemSolution() {
  return (
    <section className="py-24 px-[var(--spacing-margin-x-mobile)] md:px-[var(--spacing-margin-x)] max-w-[var(--spacing-container-max)] mx-auto reveal-on-scroll text-center">
      <h2 className="text-h1-mobile md:text-h1 mb-16 text-[var(--color-primary-text)]">
        Finding the Right Help <span className="text-[var(--color-outline)]">Shouldn&apos;t Be Difficult.</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* The Old Way */}
        <div className="bg-[var(--color-error-container)]/20 p-8 rounded-2xl border border-[var(--color-error-container)]/50">
          <span className="material-symbols-outlined text-[var(--color-error)] text-[48px] mb-4">
            cancel
          </span>
          <h3 className="text-h2 mb-2 text-[var(--color-primary-text)]">The Old Way</h3>
          <p className="text-[var(--color-text-secondary)]">
            Endless searching, unverified reviews, and frustrating communication breakdowns.
          </p>
        </div>
        {/* The SkillBridge Way */}
        <div className="bg-[var(--color-secondary-container)] p-8 rounded-2xl border border-[var(--color-border-subtle)]">
          <span className="material-symbols-outlined text-[var(--color-primary-container)] text-[48px] mb-4">
            check_circle
          </span>
          <h3 className="text-h2 mb-2 text-[var(--color-primary-text)]">The SkillBridge Way</h3>
          <p className="text-[var(--color-primary-text)]">
            Instant access to vetted professionals, transparent pricing, and seamless booking.
          </p>
        </div>
      </div>
    </section>
  );
}
