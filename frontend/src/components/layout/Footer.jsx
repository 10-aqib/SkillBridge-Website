import React from 'react';

const Footer = () => {
  return (
    <footer className="max-w-[1180px] mx-auto px-8 py-10 border-t border-white/10 flex flex-wrap justify-between items-center gap-4 mt-auto">
      <div className="flex items-center gap-2 font-display font-bold text-xl tracking-tight">
        <span className="relative w-[26px] h-[26px] border-[1.5px] border-[#c9793b] rounded-[3px] flex items-center justify-center">
          <span className="absolute w-[1.5px] h-[14px] bg-[#c9793b]"></span>
          <span className="absolute w-[14px] h-[1.5px] bg-[#c9793b]"></span>
        </span>
        SkillBridge
      </div>
      <span className="font-mono text-xs text-[#8c8375] tracking-widest uppercase">
        © {new Date().getFullYear()} SKILLBRIDGE — LOCAL SKILLS MARKETPLACE
      </span>
    </footer>
  );
};

export default Footer;
