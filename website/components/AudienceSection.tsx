import { Home, HardHat } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function AudienceSection() {
  const ctaHref = siteConfig.liveAppUrl || "#app-preview";

  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-2 lg:px-8">
        
        <article className="reveal rounded-[2rem] p-8 sm:p-10 bg-[#f5f8fc]">
          <Home className="text-[#155eef]" size={28} />
          <h2 className="mt-6 text-2xl font-bold text-[#10233d]">For Customers</h2>
          <p className="mt-3 leading-7 text-[#52647c]">
            Skip the hassle of endless calls and quotes. Find trusted, rated professionals ready to tackle your projects today.
          </p>
          <Link 
            className="focus-ring mt-7 inline-block rounded-xl bg-[#155eef] px-4 py-3 font-bold text-white transition hover:-translate-y-0.5" 
            href={ctaHref}
          >
            Find a Pro
          </Link>
        </article>
        
        <article className="reveal rounded-[2rem] p-8 sm:p-10 bg-[#f5f8fc]">
          <HardHat className="text-[#087c6e]" size={28} />
          <h2 className="mt-6 text-2xl font-bold text-[#10233d]">For Skilled Workers</h2>
          <p className="mt-3 leading-7 text-[#52647c]">
            Grow your business, showcase your expertise, and connect with clients who value quality work. Join the network.
          </p>
          <Link 
            className="focus-ring mt-7 inline-block rounded-xl bg-[#0f9f8f] px-4 py-3 font-bold text-white transition hover:-translate-y-0.5" 
            href={ctaHref}
          >
            Create a Profile
          </Link>
        </article>
        
      </div>
    </section>
  );
}
