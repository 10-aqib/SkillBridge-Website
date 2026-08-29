import Link from "next/link";
import { Link2 } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f5f8fc] py-10 border-t border-[#dce5f0] text-center text-[#52647c]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-sm font-medium">
          © 2026 SkillBridge Tech. Built for expert reliability.<br className="sm:hidden" />
          {" "}Designed for professionals and customers to connect seamlessly. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
