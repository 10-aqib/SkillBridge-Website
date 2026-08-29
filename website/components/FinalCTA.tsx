import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function FinalCTA() {
  const ctaHref = siteConfig.liveAppUrl || "#app-preview";

  return (
    <section className="w-full bg-white py-16 sm:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 px-5 sm:flex-row sm:items-center lg:px-8">
        
        <div className="reveal">
          <h2 className="display text-3xl font-semibold text-[#10233d] sm:text-4xl">
            The Right Skills Are Closer Than You Think.
          </h2>
          <p className="mt-3 max-w-xl text-lg text-[#52647c]">
            Join thousands of users getting things done and professionals growing their business on {siteConfig.name}.
          </p>
        </div>
        
        <a 
          className="focus-ring reveal shrink-0 rounded-xl bg-[#155eef] text-white px-5 py-3.5 font-bold shadow-lg shadow-blue-200 transition hover:-translate-y-0.5" 
          href="https://github.com/10-aqib/SkillBridge-Website/releases/latest/download/skillbridge.apk"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Started Now
        </a>
        
      </div>
    </section>
  );
}
