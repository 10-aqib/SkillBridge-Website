export default function ValueHighlights() {
  return (
    <section className="bg-[var(--color-surface-container)] py-8 border-y border-[var(--color-border-subtle)] reveal-on-scroll">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-wrap justify-center gap-8 md:gap-16 text-center">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[var(--color-primary)] text-[24px]">search</span>
          <span className="font-label-sm text-label-sm text-[var(--color-text-secondary)]">Find Professionals</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[var(--color-primary)] text-[24px]">person_search</span>
          <span className="font-label-sm text-label-sm text-[var(--color-text-secondary)]">Explore Profiles</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[var(--color-primary)] text-[24px]">handshake</span>
          <span className="font-label-sm text-label-sm text-[var(--color-text-secondary)]">Connect Easily</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[var(--color-primary)] text-[24px]">star</span>
          <span className="font-label-sm text-label-sm text-[var(--color-text-secondary)]">More Opportunities</span>
        </div>
      </div>
    </section>
  );
}
