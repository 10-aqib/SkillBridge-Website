import Image from "next/image";

interface PhoneMockupProps {
  imageSrc?: string;
  alt?: string;
  className?: string;
}

export default function PhoneMockup({ imageSrc, alt = "App screenshot", className = "" }: PhoneMockupProps) {
  return (
    <div
      className={`relative w-[280px] md:w-[320px] aspect-[9/19.5] rounded-[40px] shadow-2xl border-[8px] border-[var(--color-card)] bg-[var(--color-surface-container)] overflow-hidden flex flex-col items-center justify-center ${className}`}
    >
      {/* Top Notch / Dynamic Island placeholder */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[24px] bg-[var(--color-card)] rounded-b-3xl z-20"></div>

      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover z-10"
          sizes="(max-width: 768px) 280px, 320px"
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full p-6 text-center z-10 opacity-60">
          <span className="material-symbols-outlined text-[48px] text-[var(--color-primary)] mb-4">
            phone_iphone
          </span>
          <p className="text-[var(--color-text-secondary)] font-label-sm text-sm">
            App UI Placeholder
          </p>
        </div>
      )}
    </div>
  );
}
