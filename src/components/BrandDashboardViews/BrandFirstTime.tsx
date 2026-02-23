import { useBrandDashboard } from "../../hooks/useBrandDashboard";
import BrandTopBar from "./sections/BrandTopBar";

const BrandFirstTime: React.FC = () => {
  const { activeView, setActiveView } = useBrandDashboard();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] relative overflow-hidden">
      <BrandTopBar />
      {/* Dark Node Network Background Visual */}
      <div className="hidden absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Connection Lines (Subtle glow) */}
        <svg className="absolute inset-0 w-full h-full stroke-white/[0.03] stroke-[1px] fill-none">
          <path d="M 25% 30% Q 50% 20% 70% 30%" />
          <path d="M 25% 30% Q 40% 60% 70% 60%" />
          <path d="M 70% 30% Q 80% 45% 70% 60%" />
          <path d="M 25% 30% Q 15% 50% 30% 70%" />
          <path d="M 30% 70% Q 50% 80% 70% 60%" />
        </svg>

        {/* Junction Points (Teal glowing dots) */}
        <div className="absolute top-[30%] left-[25%] w-3 h-3 bg-teal-500/10 rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-teal-500 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.8)]"></div>
        </div>
        <div className="absolute top-[30%] left-[70%] w-3 h-3 bg-teal-500/10 rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-teal-500 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.8)]"></div>
        </div>
        <div className="absolute top-[60%] left-[70%] w-3 h-3 bg-teal-500/10 rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-teal-500 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.8)]"></div>
        </div>
        <div className="absolute top-[70%] left-[30%] w-3 h-3 bg-teal-500/10 rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-teal-500 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.8)]"></div>
        </div>

        {/* Blurred Avatar Nodes */}
        <div className="absolute top-[20%] left-[65%] w-24 h-24 rounded-full overflow-hidden opacity-30 blur-[2px] border border-white/5 shadow-3xl">
          <img
            src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200"
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="absolute top-[55%] left-[65%] w-32 h-32 rounded-full overflow-hidden opacity-20 blur-[1px] border border-white/5 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=200"
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="absolute top-[65%] left-[25%] w-20 h-20 rounded-full overflow-hidden opacity-10 blur-[3px] border border-white/5">
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=200"
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="absolute top-[25%] left-[20%] w-28 h-28 rounded-full overflow-hidden opacity-15 blur-[2px] border border-white/5">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      </div>

      <div className="max-w-2xl w-full text-center space-y-12 relative z-10 px-6">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.85] uppercase font-display">
            Create your <br />
            <span className="text-teal-500">first campaign</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-medium tracking-tight">
            Deploy your mission and find Africa's best creators in minutes.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={() => setActiveView("Create Campaign")}
            className="bg-white text-black font-black px-12 py-5 rounded-2xl text-[12px] uppercase tracking-[0.2em] transition-all shadow-[0_20px_50px_rgba(20,184,166,0.15)] hover:bg-teal-500 active:scale-95 btn-bubble"
          >
            New campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandFirstTime;
