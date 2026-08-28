import React from 'react';
import { 
  Wrench, Droplet, Hammer, Paintbrush, 
  Settings, HardHat, Fan, Truck, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const trades = [
  { id: '01', icon: Wrench, title: 'Electrical', desc: 'Wiring, fixtures, panel upgrades, inspections.' },
  { id: '02', icon: Droplet, title: 'Plumbing', desc: 'Leaks, fittings, installations, drainage.' },
  { id: '03', icon: Hammer, title: 'Carpentry', desc: 'Framing, furniture, cabinetry, repairs.' },
  { id: '04', icon: Paintbrush, title: 'Painting', desc: 'Interior, exterior, surface prep, finishing.' },
  { id: '05', icon: Settings, title: 'Appliance repair', desc: 'Diagnostics, part replacement, servicing.' },
  { id: '06', icon: HardHat, title: 'Masonry', desc: 'Brickwork, tiling, concrete, plastering.' },
  { id: '07', icon: Fan, title: 'HVAC', desc: 'Installation, servicing, ducting, thermostats.' },
  { id: '08', icon: Truck, title: 'Moving & labor', desc: 'Loading, hauling, assembly, general labor.' },
];

const Home = () => {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Abstract animated gradient background */}
        <div className="absolute inset-0 bg-graphite z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue/20 rounded-full blur-[120px] mix-blend-screen animate-[pulse_8s_infinite]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-copper/20 rounded-full blur-[150px] mix-blend-screen animate-[pulse_12s_infinite]"></div>
        </div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 grid-bg opacity-30 z-0"></div>

        {/* Hero image if exists, overlaid delicately */}
        <div 
          className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity"
          style={{
            backgroundImage: 'url(/hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/80 to-transparent z-0"></div>

        <div className="max-w-[1180px] mx-auto px-8 relative z-10 w-full flex flex-col items-center text-center mt-12">
          <div className="inline-flex font-mono text-xs tracking-widest uppercase text-copper-bright items-center gap-3 mb-8 glass-panel px-4 py-2 rounded-full border-copper/30">
            <span className="w-2 h-2 rounded-full bg-copper-bright animate-pulse"></span> LOCAL SKILLS MARKETPLACE
          </div>
          
          <h1 className="font-display font-bold text-[clamp(48px,7vw,96px)] leading-[1.05] tracking-tight max-w-[900px] text-white">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-copper-bright to-copper">bridge</span> between a job<br />and the right hands.
          </h1>
          
          <p className="text-lg md:text-xl text-paper-dim max-w-[600px] mt-8 leading-relaxed font-light">
            SkillBridge connects clients with verified electricians, plumbers, carpenters and more. Post a job, get matched, and hire with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 mt-12 w-full sm:w-auto">
            <Link to="/post-job" className="group font-sans font-medium text-base bg-gradient-to-r from-copper to-copper-bright text-graphite px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-glow hover:-translate-y-1 flex items-center justify-center gap-2">
              Post a Job <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/register?role=worker" className="font-sans font-medium text-base text-paper border border-white/20 bg-white/5 backdrop-blur-md px-8 py-4 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1 flex items-center justify-center">
              Find work as a tradesperson
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section id="how" className="relative z-10 py-32 bg-graphite">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="text-center mb-20">
            <div className="font-mono text-xs tracking-widest uppercase text-blue-bright mb-4 flex items-center justify-center gap-2.5">
              <span className="w-1.5 h-1.5 bg-blue-bright rounded-full shadow-glow-blue"></span> THE PROCESS
            </div>
            <h2 className="font-display font-bold text-[clamp(36px,5vw,56px)] tracking-tight text-white mb-6">
              Three steps to completion.
            </h2>
            <p className="text-paper-dim max-w-2xl mx-auto text-lg leading-relaxed">
              A job posting behaves like a modern spec sheet — clear scope, set budget, instantly matched to the precise trade that fits your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel-hover p-10 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-copper/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <span className="font-mono text-xs font-bold text-copper-bright mb-6 block">STEP 01</span>
              <h3 className="font-display text-2xl font-semibold mb-4 text-white">Post the job</h3>
              <p className="text-paper-dim text-base leading-relaxed">Describe the work, set your budget and pinpoint your location. The whole process takes under two minutes.</p>
            </div>
            <div className="glass-panel-hover p-10 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <span className="font-mono text-xs font-bold text-blue-bright mb-6 block">STEP 02</span>
              <h3 className="font-display text-2xl font-semibold mb-4 text-white">Get matched</h3>
              <p className="text-paper-dim text-base leading-relaxed">Verified local tradespeople respond directly with custom quotes, ratings, and immediate availability.</p>
            </div>
            <div className="glass-panel-hover p-10 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-copper/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <span className="font-mono text-xs font-bold text-copper-bright mb-6 block">STEP 03</span>
              <h3 className="font-display text-2xl font-semibold mb-4 text-white">Hire & track</h3>
              <p className="text-paper-dim text-base leading-relaxed">Review incoming proposals, accept the best bid, and track the job's progress directly through the dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- TRADES GRID ---------- */}
      <section id="trades" className="relative z-10 py-32 bg-graphite-2">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <div className="font-mono text-xs tracking-widest uppercase text-copper-bright mb-4 flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 bg-copper-bright rounded-full shadow-glow"></span> CATEGORIES
              </div>
              <h2 className="font-display font-bold text-[clamp(36px,5vw,56px)] tracking-tight text-white max-w-2xl leading-tight">
                Every trade, unified in one directory.
              </h2>
            </div>
            <Link to="/jobs" className="text-paper-dim hover:text-white border-b border-paper-dim hover:border-white transition-colors pb-1 flex items-center gap-2 font-medium">
              View all open jobs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trades.map((trade) => (
              <div 
                key={trade.id} 
                className="glass-panel-hover p-8 rounded-2xl flex flex-col items-start group"
              >
                <div className="flex justify-between w-full items-start mb-8">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-copper/20 group-hover:border-copper/30 transition-colors">
                    <trade.icon className="w-6 h-6 text-paper group-hover:text-copper-bright transition-colors" />
                  </div>
                  <span className="font-mono text-xs text-muted font-semibold">{trade.id}</span>
                </div>
                <h4 className="font-display text-xl font-semibold mb-3 text-white">{trade.title}</h4>
                <p className="text-sm text-paper-dim leading-relaxed">{trade.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="relative z-10 py-40 overflow-hidden bg-graphite">
        <div className="absolute inset-0 grid-bg opacity-30 z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
        
        <div className="max-w-[800px] mx-auto px-8 relative z-10 text-center">
          <h2 className="font-display font-bold text-[clamp(40px,6vw,72px)] tracking-tight text-white leading-[1.1] mb-8">
            The next job on your street is one bridge away.
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-5 mt-12">
            <Link to="/post-job" className="font-sans font-medium text-base bg-gradient-to-r from-blue-bright to-blue text-graphite px-10 py-4 rounded-xl transition-all duration-300 hover:shadow-glow-blue hover:-translate-y-1">
              Start Hiring
            </Link>
            <Link to="/register?role=worker" className="font-sans font-medium text-base text-paper border border-white/20 bg-white/5 backdrop-blur-md px-10 py-4 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1">
              Join as a Professional
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
