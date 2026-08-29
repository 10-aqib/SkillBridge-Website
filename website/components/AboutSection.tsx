import { Handshake, BriefcaseBusiness } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="w-full bg-[#f5f8fc] py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
        
        <div className="reveal">
          <p className="text-sm font-bold uppercase tracking-[.16em] text-[#155eef]">OUR MISSION</p>
          <h2 className="display mt-3 text-4xl font-semibold sm:text-5xl text-[#10233d]">Built for Reliability</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#52647c]">
            Connecting skilled professionals with those who need them. We are building a marketplace founded on trust, transparency, and quality work.
          </p>
        </div>
        
        <div className="reveal relative mx-auto h-56 w-full max-w-md">
          <div className="absolute left-8 top-12 h-24 w-24 rounded-full border border-[#dce5f0] bg-white"></div>
          
          <div className="absolute right-8 top-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#0f9f8f] shadow-xl shadow-[#0f9f8f]/20">
            <Handshake size={36} color="white" />
          </div>
          
          <div className="absolute bottom-5 left-1/2 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full bg-[#155eef] shadow-xl shadow-blue-200">
            <BriefcaseBusiness size={29} color="white" />
          </div>
          
          <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path d="M95 110 C170 40 245 50 292 85 M95 110 C165 190 230 195 250 175" fill="none" stroke="#cbd9ec" strokeDasharray="5 7" strokeWidth="2" />
          </svg>
        </div>
        
      </div>
    </section>
  );
}
