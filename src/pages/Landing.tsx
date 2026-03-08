import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IconBolt,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconCreditCard,
  IconHome,
  IconLock,
  IconTargetArrow,
} from "@tabler/icons-react";
import { FormatUGXCurrency } from "../lib/helpers";
import Footer from "../components/Footer";
import { KreaterlyLogo, KreaterlyLogoAnimateDraw } from "../components/Icons";

const PARTNERS_ROW_1 = [
  {
    name: "Nasser N.",
    initial: "NN",
    color: "bg-teal-500",
    textColor: "text-black",
    avatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "Winnie N.",
    initial: "WN",
    color: "bg-purple-600",
    textColor: "text-white",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "Airtel UG",
    initial: "A",
    color: "bg-red-600",
    textColor: "text-white",
    avatar:
      "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "Nile Brew",
    initial: "NB",
    color: "bg-amber-600",
    textColor: "text-white",
    avatar:
      "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "SafeBoda",
    initial: "SB",
    color: "bg-orange-500",
    textColor: "text-white",
    avatar:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "Stanbic",
    initial: "ST",
    color: "bg-blue-700",
    textColor: "text-white",
    avatar:
      "https://images.unsplash.com/photo-1526080652727-5b77f74e9290?auto=format&fit=crop&q=80&w=200&h=200",
  },
];

const PARTNERS_ROW_2 = [
  {
    name: "Sean O.",
    initial: "SO",
    color: "bg-teal-400",
    textColor: "text-black",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "Azawi",
    initial: "AZ",
    color: "bg-orange-600",
    textColor: "text-white",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "Jumia UG",
    initial: "J",
    color: "bg-black",
    textColor: "text-white",
    avatar:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "MTN UG",
    initial: "MTN",
    color: "bg-yellow-400",
    textColor: "text-black",
    avatar:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "KFC UG",
    initial: "KFC",
    color: "bg-red-700",
    textColor: "text-white",
    avatar:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    name: "Vinka",
    initial: "V",
    color: "bg-pink-600",
    textColor: "text-white",
    avatar:
      "https://images.unsplash.com/photo-1529139572744-b1540a799c42?auto=format&fit=crop&q=80&w=200&h=200",
  },
];

const LogoNode: React.FC<{ partner: any }> = ({ partner }) => (
  <div className="flex items-center gap-6 group cursor-pointer">
    <div
      className={`w-20 h-20 md:w-24 md:h-24 ${partner.color} rounded-[28px] md:rounded-[36px] flex items-center justify-center border border-white/10 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden`}
    >
      <img
        src={partner.avatar}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        alt={partner.name}
      />
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
    <div className="flex flex-col">
      <span className="text-white/40 text-[11px] md:text-[13px] font-black uppercase tracking-widest group-hover:text-teal-400 transition-colors">
        {partner.name}
      </span>
      <span className="text-white/10 text-[9px] font-bold uppercase tracking-[0.3em]">
        PARTNER_NODE
      </span>
    </div>
  </div>
);

// Maintains the compact "Instagram/Twitter post" size
const CampaingCard: React.FC<{ campaign: any }> = ({ campaign }) => (
  <div className="w-[180px] sm:w-[220px] md:w-[240px] flex-shrink-0 glass-card border border-white/[0.04] rounded-[20px] md:rounded-[28px] overflow-hidden p-2 md:p-3 group hover:border-teal-500/20 hover:bg-white/[0.02] transition-all duration-500 shadow-lg mx-2">
    <div className="aspect-square rounded-[14px] md:rounded-[20px] overflow-hidden relative bg-black/40">
      {/*<img
        src={campaign.image}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        alt={campaign.title}
      />*/}
      <div className="absolute inset-0 flex items-center justify-center bg-teal-400/10">
        <svg
          xmlns="http://www.w3.org"
          className="h-10 w-10 stroke-teal-400/20"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 8h.01" />
          <path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z" />
          <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" />
          <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" />
        </svg>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-transparent to-transparent opacity-60"></div>
      <div className="absolute top-2 md:top-3 left-2 md:left-3">
        <span className="bg-teal-500 text-black px-1.5 py-0.5 md:px-2 md:py-1 rounded-md text-[6px] md:text-[7px] font-black uppercase tracking-widest shadow-lg">
          {campaign.type}
        </span>
      </div>
    </div>
    <div className="p-1.5 md:p-3 space-y-1.5 md:space-y-3">
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-[10px] md:text-xs font-black tracking-tight font-display uppercase leading-tight line-clamp-2">
          {campaign.title}
        </h3>
        <div className="text-right flex-shrink-0">
          <p className="text-[5px] md:text-[6px] font-black text-teal-500 uppercase tracking-widest">
            Rate
          </p>
          <p className="text-[9px] md:text-[11px] font-black tracking-tighter whitespace-nowrap">
            {FormatUGXCurrency(campaign.cpmUGX || 25000)}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center pt-2 md:pt-3 border-t border-white/5">
        <div className="flex gap-1">
          <div className="w-5 h-5 md:w-6 md:h-6 rounded-md bg-white/5 flex items-center justify-center text-teal-400 border border-white/5 scale-75 md:scale-90 opacity-40 group-hover:opacity-100 transition-opacity">
            <IconBrandTiktok />
          </div>
          <div className="w-5 h-5 md:w-6 md:h-6 rounded-md bg-white/5 flex items-center justify-center text-teal-400 border border-white/5 scale-75 md:scale-90 opacity-40 group-hover:opacity-100 transition-opacity">
            <IconBrandInstagram />
          </div>
        </div>
        <button className="text-[6px] md:text-[7px] font-black uppercase tracking-[0.1em] text-teal-500 hover:text-white transition-all underline underline-offset-2 decoration-teal-500/20">
          Accept →
        </button>
      </div>
    </div>
  </div>
);

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  to: string;
  isLink?: boolean;
  onClick?: () => void;
}> = ({ icon, label, to, isLink = true, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Content = (
    <div
      className={`flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-500 ease-out cursor-pointer hover:bg-teal-500/10 group ${isHovered ? "bg-teal-500/10 ring-1 ring-teal-500/20" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (onClick) onClick();
        if (!isLink) window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <div
        className={`transition-all duration-300 ${isHovered ? "text-teal-400 scale-110" : "text-gray-400"}`}
      >
        {icon}
      </div>
      <span
        className={`text-[10px] font-black uppercase tracking-widest overflow-hidden transition-all duration-500 ease-in-out ${isHovered ? "max-w-[120px] opacity-100 ml-1" : "max-w-0 opacity-0 ml-0"}`}
      >
        {label}
      </span>
    </div>
  );

  return isLink ? <Link to={to}>{Content}</Link> : Content;
};

const Landing: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const avatarIds = [
    "1531427186611-ecfd6d936c79",
    "1531123897727-8f129e1688ce",
    "1507003211169-0a1dd7228f2d",
    // "1523910088395-d7457f8ee315",
  ];

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-white selection:bg-teal-500/30 font-['Plus_Jakarta_Sans']">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-teal-500/5 blur-[180px] rounded-full animate-pulse"
          style={{
            transform: `translate(${scrollY * 0.01}px, ${scrollY * 0.02}px)`,
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-orange-500/5 blur-[180px] rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[100] px-4 py-6 md:px-6 md:py-8 transition-all duration-500">
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between glass-card border border-white/10 rounded-full px-4 md:px-8 py-2 md:py-3 transition-all ${scrollY > 50 ? "shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] bg-[#0A0B0E]/80 translate-y-1" : ""}`}
        >
          <div
            className="flex items-center gap-3 md:gap-4 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-9 h-9 md:w-11 md:h-11 rounded-[10px] md:rounded-[14px] flex items-center justify-center font-black shadow-[0_4px_30px_rgba(20,184,166,0.4)] group-hover:scale-110 transition-transform">
              <KreaterlyLogo />
            </div>
            <span className="font-display text-2xl md:text-3xl tracking-tight text-white uppercase pt-1">
              Kreaterly
            </span>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <nav className="hidden md:flex items-center gap-2 mr-4 bg-white/5 p-1 rounded-full border border-white/5">
              <NavItem icon={<IconHome />} label="Home" to="#" isLink={false} />
              <NavItem icon={<>Icon</>} label="Campaings" to="/discover" />
              <NavItem icon={<>Icon</>} label="Contact" to="/contact" />
            </nav>
            <div className="flex items-center gap-3">
              <Link
                to="/auth"
                className="bg-white text-black text-[9px] md:text-[10px] font-black uppercase tracking-widest px-5 md:px-8 py-3 md:py-4 rounded-full btn-bubble shadow-2xl hover:bg-teal-500 transition-all"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-48 md:pt-64 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
          <div className="space-y-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-1 py-1 bg-teal-500 border border-teal-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-teal-400">
              <div className="flex items-center gap-4 px-6 py-4 bg-black rounded-[32px] border border-teal-500 shadow-2xl">
                <div className="flex -space-x-3">
                  {avatarIds.map((id) => (
                    <img
                      key={id}
                      src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=100&h=100`}
                      className="w-10 h-10 rounded-full border-2 border-white bg-gray-800 object-cover shadow-lg"
                      alt=""
                    />
                  ))}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                  <span className="text-white">12k+</span> Active Creators
                </div>
              </div>
            </div>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[140px] font-display tracking-tight leading-[0.8] animate-in fade-in slide-in-from-bottom-8 duration-700">
              BUILD <span className="text-teal-500">WEALTH</span> <br />
              THROUGH{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-orange-500 font-display">
                CONTENT.
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-medium leading-relaxed mx-auto lg:mx-0">
              Unlock direct access to top brands and instant UGX Mobile Money
              payouts. We empower Ugandan TikTokers, YouTubers, and Artists to
              scale.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
              <Link
                to="/home"
                className="w-full sm:w-auto bg-teal-500 text-black text-xl font-black uppercase tracking-tighter px-12 py-7 rounded-[32px] shadow-[0_20px_50px_rgba(20,184,166,0.3)] hover:scale-105 transition-transform btn-bubble"
              >
                Explore Campaigns
              </Link>

              <Link
                to="/auth"
                className="w-full sm:w-auto bg-transparent text-white/50 hover:text-teal-400 text-xl font-black uppercase tracking-tighter px-12 py-7 rounded-[32px] border border-white/10 hover:border-teal-500/50 transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Optimized Hero Graphic */}
          <div className="relative group hidden lg:block">
            <div className="absolute inset-0 bg-teal-500/10 blur-[120px] rounded-full group-hover:bg-teal-500/20 transition-all duration-1000"></div>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[64px] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
              <img
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                alt="African Creative Studio"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-[#0A0B0E]/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between">
                <div className="glass-card p-6 rounded-[32px] border border-white/10 shadow-2xl animate-bounce duration-[4000ms]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-black text-xl shadow-lg">
                      💰
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">
                        Instant UGX Node Transfer
                      </p>
                      <p className="text-lg font-black text-white">
                        750,000 UGX
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual-Row Marquee Slider for Partners */}
      <section className="py-24 bg-black/40 border-y border-white/5 relative overflow-hidden">
        <div className="space-y-16">
          <div className="flex overflow-hidden">
            <div className="flex space-x-24 animate-slide-infinite whitespace-nowrap items-center py-4">
              {[...PARTNERS_ROW_1, ...PARTNERS_ROW_1].map((partner, i) => (
                <LogoNode key={`row1-${i}`} partner={partner} />
              ))}
            </div>
          </div>
          <div className="flex overflow-hidden">
            <div className="flex space-x-24 animate-slide-infinite-reverse whitespace-nowrap items-center py-4">
              {[...PARTNERS_ROW_2, ...PARTNERS_ROW_2].map((partner, i) => (
                <LogoNode key={`row2-${i}`} partner={partner} />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute top-0 bottom-0 left-0 w-40 bg-gradient-to-r from-[#0A0B0E] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-40 bg-gradient-to-l from-[#0A0B0E] to-transparent z-10 pointer-events-none"></div>
      </section>

      {/* campaingsS SAMPLE SECTION (Now a Slider with Compact Cards) */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-teal-500">
              Global Pulse Hub
            </h2>
            <p className="text-4xl md:text-5xl font-black text-white tracking-tighter font-display uppercase leading-none">
              PREMIUM <span className="text-orange-500">campaingsS</span>
            </p>
          </div>
          <Link
            to="/home"
            className="bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white/10 transition-all btn-bubble"
          >
            Explore Campaings →
          </Link>
        </div>

        <div className="relative group">
          <div className="flex overflow-hidden">
            <div className="flex animate-slide-infinite whitespace-nowrap items-stretch py-6 md:py-8">
              {[1, 2, 2, 1, 1, 2, 2, 2, 3, 2, 2, 2, 2, 2].map((campaign, i) => (
                <CampaingCard key={`campaings-${i}`} campaign={campaign} />
              ))}
            </div>
          </div>
          {/* Edge Gradients for smooth transition */}
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-48 bg-gradient-to-r from-[#0A0B0E] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-48 bg-gradient-to-l from-[#0A0B0E] to-transparent z-10 pointer-events-none"></div>
        </div>
      </section>

      {/* CREATOR SHOWCASE (Improved Grid) */}
      <section className="py-32 md:py-48 px-6 bg-black relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-32 items-center relative z-10">
          <div className="space-y-8 md:space-y-12 text-center lg:text-left">
            <h2 className="text-6xl sm:text-8xl md:text-9xl font-black text-white font-display tracking-tight leading-[0.85] uppercase">
              THE NEW <br />
              <span className="text-teal-400">CREATIVE</span> ECONOMY.
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              Join the elite network of African creators redefining the digital
              landscape. Direct brand access, AI analytics, and automated
              billing built in Kampala.
            </p>
            <div className="space-y-6 md:space-y-8">
              {[
                {
                  icon: <IconBolt className="w-8 h-8 text-black" />,
                  title: "UGX Mobile Payouts",
                  desc: "Real-time settlements. Instant liquidity directly to your MTN MoMo or Airtel Money wallet.",
                  accent: "border-teal-500/20",
                },
                {
                  icon: <IconTargetArrow className="w-8 h-8 text-black" />,
                  title: "Global Brand",
                  desc: "Direct infrastructure for the big players. Secure contracts with MTN, Airtel, and Global FMCGs.",
                  accent: "border-teal-500/20",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-8 p-8 md:p-10 bg-[#11141A] rounded-[32px] md:rounded-[48px] border border-white/5 hover:border-teal-500/40 transition-all group"
                >
                  <div className="w-16 h-16 bg-teal-500 rounded-3xl flex items-center justify-center text-black text-2xl group-hover:rotate-12 transition-transform shadow-2xl flex-shrink-0">
                    {f.icon}
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight font-display">
                      {f.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
