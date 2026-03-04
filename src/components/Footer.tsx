import React from "react";
import {
  IconRocket,
  IconBrandTiktok,
  IconBrandInstagram,
  IconBrandTwitter,
  IconChevronRight,
  IconCopyright,
  IconCopyrightFilled,
} from "@tabler/icons-react";
import { KreaterlyLogo } from "./Icons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B0E14] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <KreaterlyLogo />
              <span className="font-black tracking-tighter text-lg italic uppercase text-white">
                Kreaterly
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              The premium marketplace connecting Ugandan creators with
              world-class brands. High payouts, instant verification.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<IconBrandTiktok size={18} />} />
              <SocialIcon icon={<IconBrandInstagram size={18} />} />
              <SocialIcon icon={<IconBrandTwitter size={18} />} />
            </div>
          </div>

          {/* Quick Links */}
          <FooterGroup
            title="Platform"
            links={[
              "Marketplace",
              "Top Creators",
              "Brand Solutions",
              "Pricing",
            ]}
          />
          <FooterGroup
            title="Support"
            links={[
              "Help Center",
              "Payment Terms",
              "Safety Guidelines",
              "Contact",
            ]}
          />

          {/* Newsletter / CTA */}
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-500">
              Stay Updated
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Enter email..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-teal-500/30 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-teal-500 p-1.5 rounded-lg text-black hover:bg-teal-400 transition-colors">
                <IconChevronRight size={16} stroke={3} />
              </button>
            </div>
            <p className="text-[9px] text-gray-600 font-medium italic">
              Join 1.2k+ creators receiving weekly drops.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">
            © {new Date().getFullYear()} Kreaterly Inc. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <a href="#" className="hover:text-teal-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-teal-500 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Sub-components ---

const FooterGroup = ({ title, links }: { title: string; links: string[] }) => (
  <div className="space-y-4">
    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
      {title}
    </p>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link}>
          <a
            href="#"
            className="text-sm font-bold text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block"
          >
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a
    href="#"
    className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-gray-500 hover:bg-teal-500 hover:text-black hover:border-teal-500 transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;
