import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Bell, Search, Zap, Wrench, Paintbrush } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Hero() {
  const ctaHref = siteConfig.liveAppUrl || "#app-preview";

  return (
    <section id="home" className="relative w-full overflow-hidden bg-[#f5f8fc]">
      <div className="hero-orb absolute -right-32 top-0 h-[600px] w-[600px] rounded-full"></div>
      
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1.03fr_.97fr] lg:px-8 lg:py-24">
        
        {/* Left: Text Content */}
        <div className="reveal max-w-xl">
          <h1 className="display text-4xl font-semibold leading-[1.05] text-[#10233d] sm:text-5xl lg:text-6xl">
            Find Skilled Professionals.<br/>Get Things Done.
          </h1>
          
          <p className="mt-6 max-w-lg text-lg leading-8 text-[#52647c]">
            Connect with vetted experts for any job. From home repairs to tutoring, SkillBridge makes finding the right help effortless and reliable.
          </p>
          
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a 
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-[#155eef] text-white px-5 py-3.5 font-bold shadow-lg shadow-blue-200 transition hover:-translate-y-0.5" 
              href="https://github.com/10-aqib/SkillBridge-Website/releases/latest/download/skillbridge.apk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Try the Live App
              <ArrowUpRight size={18} />
            </a> 
            <Link 
              className="focus-ring inline-flex items-center justify-center rounded-xl border border-transparent text-[#52647c] px-5 py-3.5 font-bold transition hover:text-[#155eef] bg-transparent" 
              href="#how-it-works"
            >
              How it works
            </Link>
          </div>
          
          <div className="mt-10 flex items-center gap-3 text-sm text-[#52647c]">
            <span className="flex -space-x-2">
              <span className="h-8 w-8 rounded-full border-2 border-white bg-[#c8e9e3]"></span>
              <span className="h-8 w-8 rounded-full border-2 border-white bg-[#b8cdf5]"></span>
              <span className="h-8 w-8 rounded-full border-2 border-white bg-[#f3d7a3]"></span>
            </span> 
            <span>The trusted choice</span>
          </div>
        </div>
        
        {/* Right: Phone Visuals */}
        <div className="reveal relative mx-auto h-[480px] w-full max-w-[520px] sm:h-[540px]" style={{ transitionDelay: '.14s' }}>
          
          <div className="absolute left-1/2 top-8 h-80 w-80 -translate-x-1/2 rounded-full bg-[#d8f3ee]"></div>
          
          {/* Top Left Mini Phone */}
          <div className="mini-phone absolute left-0 top-28 z-10 w-[132px] -rotate-[10deg] sm:w-[155px]">
            <div className="notch"></div>
            <div className="p-3">
              <div className="h-16 rounded-lg bg-[#dff4ef]"></div>
              <div className="mt-3 h-2 w-2/3 rounded bg-[#b8c9df]"></div>
              <div className="mt-2 h-2 w-full rounded bg-[#dce5f0]"></div>
              <div className="mt-4 rounded-lg bg-[#155eef] p-2 text-center text-[8px] font-bold text-white">
                Book now
              </div>
            </div>
          </div>
          
          {/* Center Main Phone */}
          <div className="phone absolute left-1/2 top-0 z-20 w-[230px] -translate-x-1/2 sm:w-[268px]">
            <div className="notch"></div>
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#155eef]">skillbridge</span>
                <Bell size={13} className="text-[#52647c]" />
              </div>
              
              <p className="mt-5 text-[10px] font-bold text-[#10233d]">Find help nearby</p>
              
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#edf3fb] px-3 py-2 text-[8px] text-[#6a7d95]">
                <Search size={10} /> What do you need?
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-[#e3f5f1] p-2 text-center">
                  <Zap size={15} className="mx-auto text-[#0f9f8f]" />
                  <span className="mt-1 block text-[7px] font-bold text-[#10233d]">Electrician</span>
                </div>
                <div className="rounded-xl bg-[#e8effd] p-2 text-center">
                  <Wrench size={15} className="mx-auto text-[#155eef]" />
                  <span className="mt-1 block text-[7px] font-bold text-[#10233d]">Plumber</span>
                </div>
                <div className="rounded-xl bg-[#fff2dd] p-2 text-center">
                  <Paintbrush size={15} className="mx-auto text-[#e58a1f]" />
                  <span className="mt-1 block text-[7px] font-bold text-[#10233d]">Painter</span>
                </div>
              </div>
              
              <p className="mt-5 text-[9px] font-bold text-[#10233d]">Top professionals near you</p>
              
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#e3eaf4] p-2">
                <div className="h-9 w-9 rounded-lg bg-[#c8e9e3]"></div>
                <div className="flex-1">
                  <div className="h-2 w-16 rounded bg-[#304761]"></div>
                  <div className="mt-1.5 h-1.5 w-12 rounded bg-[#c3d0df]"></div>
                </div>
                <span className="text-[8px] font-bold text-[#0f9f8f]">4.9 ★</span>
              </div>
            </div>
          </div>
          
          {/* Bottom Right Mini Phone */}
          <div className="mini-phone absolute bottom-5 right-0 z-10 w-[130px] rotate-[9deg] sm:w-[152px]">
            <div className="notch"></div>
            <div className="p-3">
              <div className="h-9 w-9 rounded-full bg-[#c4e5dd]"></div>
              <div className="mt-2 h-2 w-3/4 rounded bg-[#304761]"></div>
              <div className="mt-2 text-[8px] text-[#0f9f8f]">★★★★★</div>
              <div className="mt-3 rounded-lg bg-[#eaf1fd] p-2 text-[8px] font-bold text-[#155eef]">
                Verified profile
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
