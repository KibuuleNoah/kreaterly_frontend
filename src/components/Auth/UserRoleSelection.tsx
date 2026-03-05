import { UserRole } from "../../types";

// Advanced professional icons for Role Selection
const IconBusiness = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const IconArtist = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

interface Props {
  handleRoleSelect: (role: UserRole) => void;
}

const UserRoleSelection = ({ handleRoleSelect }: Props) => (
  // <div className="w-full max-w-6xl mx-auto space-y-6 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 py-4 px-4 h-fulll flex flex-col justify-center">
  <div className="w-full max-w-6xl mx-auto space-y-6 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 py-4 px-4 h-full flex flex-col">
    <div className="text-center space-y-3 md:space-y-6">
      <div className="inline-block px-4 py-1.5 bg-teal-500/10 border border-teal-500/20 rounded-full text-[8px] md:text-[10px] font-black text-teal-500 uppercase tracking-[0.4em]">
        AFRICA'S CREATOR INFRASTRUCTURE GATEWAY
      </div>
      <h1 className="text-5xl md:text-8xl lg:text-[120px] font-black text-white tracking-tighter leading-[0.85] font-display uppercase">
        CHOOSE YOUR <span className="text-teal-500">GATEWAY</span>
      </h1>
      <p className="text-gray-500 text-[10px] md:text-base font-bold uppercase tracking-[0.3em] max-w-lg mx-auto leading-relaxed">
        The hub for monetization & brand scaling in Africa.
      </p>
    </div>

    <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto w-full">
      {/* Talent / Creator Card */}
      <button
        onClick={() => handleRoleSelect(UserRole.CREATOR)}
        className="group bg-[#11141A]/60 backdrop-blur-xl border border-white/5 p-8 md:p-14 rounded-[48px] text-left hover:border-teal-500/40 hover:bg-[#151921] transition-all duration-500 relative overflow-hidden shadow-2xl active:scale-[0.98]"
      >
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-all"></div>
        <div className="space-y-6 relative z-10">
          <div className="w-20 h-20 bg-teal-500 rounded-3xl flex items-center justify-center text-black shadow-teal-500/20 shadow-2xl group-hover:rotate-12 transition-transform">
            <IconArtist />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl md:text-3xl font-black text-white tracking-tight uppercase font-display leading-none">
              CREATOR / INFLUENCER
            </h3>
            <p className="text-sm text-gray-400 font-medium">
              Monetize your content & get paid instantly via MoMo.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-teal-500 group-hover:gap-4 transition-all">
            ACCESS HUB
            <span className="bg-white/10 p-1.5 rounded-lg">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </div>
        </div>
      </button>

      {/* Brand / Business Card */}
      <button
        onClick={() => handleRoleSelect(UserRole.BRAND)}
        className="group bg-[#11141A]/60 backdrop-blur-xl border border-white/5 p-8 md:p-14 rounded-[48px] text-left hover:border-teal-500/40 hover:bg-[#151921] transition-all duration-500 relative overflow-hidden shadow-2xl active:scale-[0.98]"
      >
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-all"></div>
        <div className="space-y-6 relative z-10">
          <div className="w-20 h-20 bg-teal-500 rounded-3xl flex items-center justify-center text-black shadow-teal-500/20 shadow-2xl group-hover:-rotate-12 transition-transform">
            <IconBusiness />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl md:text-3xl font-black text-white tracking-tight uppercase font-display leading-none">
              BRAND / BUSINESS
            </h3>
            <p className="text-sm text-gray-400 font-medium">
              Launch localized campaigns & find top creators in minutes.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-teal-500 group-hover:gap-4 transition-all">
            ENTER PORTAL
            <span className="bg-white/10 p-1.5 rounded-lg">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </div>
        </div>
      </button>
    </div>
  </div>
);

export default UserRoleSelection;
