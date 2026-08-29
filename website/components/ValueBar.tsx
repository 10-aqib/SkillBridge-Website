import { MapPin, BadgeCheck, MessageCircle, BriefcaseBusiness } from "lucide-react";

export default function ValueBar() {
  return (
    <section className="w-full border-y border-[#e5ebf3] bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:grid-cols-4 lg:px-8">
        
        <div className="reveal p-6 sm:p-8 border-b border-r border-[#e5ebf3] sm:border-b-0">
          <MapPin className="mb-3 text-[#155eef]" size={22} />
          <h2 className="font-bold text-[#10233d]">Explore services</h2>
          <p className="mt-1 text-sm leading-5 text-[#6a7d95]">Find professionals for any job.</p>
        </div>
        
        <div className="reveal p-6 sm:p-8 border-b border-[#e5ebf3] sm:border-b-0 sm:border-r">
          <BadgeCheck className="mb-3 text-[#0f9f8f]" size={22} />
          <h2 className="font-bold text-[#10233d]">Verified profiles</h2>
          <p className="mt-1 text-sm leading-5 text-[#6a7d95]">Trust through background checks.</p>
        </div>
        
        <div className="reveal p-6 sm:p-8 border-r border-[#e5ebf3]">
          <MessageCircle className="mb-3 text-[#155eef]" size={22} />
          <h2 className="font-bold text-[#10233d]">Secure messaging</h2>
          <p className="mt-1 text-sm leading-5 text-[#6a7d95]">Chat directly before booking.</p>
        </div>
        
        <div className="reveal p-6 sm:p-8">
          <BriefcaseBusiness className="mb-3 text-[#0f9f8f]" size={22} />
          <h2 className="font-bold text-[#10233d]">Reliable booking</h2>
          <p className="mt-1 text-sm leading-5 text-[#6a7d95]">Get it done right, every time.</p>
        </div>

      </div>
    </section>
  );
}
