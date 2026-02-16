import { formatCurrency, MOCK_CAMPAIGNS } from "../../constants";
import { IconWallet, IconUsers, IconLink } from "@tabler/icons-react";



const Home = () => {
  
  const storedUser = { name: "John" };
    const userName = storedUser.name;
    console.log(userName);

    const stats = [
        {
            label: "Available",
            value: formatCurrency(1250000),
            icon: <IconWallet size={24} />, // Wallet for financial status
        },
        {
            label: "Platform Reach",
            value: "2.4M",
            icon: <IconUsers size={24} />, // Group of users for reach
        },
        {
            label: "Verified Links",
            value: "4 Assets",
            icon: <IconLink size={24} />, // Link icon for assets/URLs
        }
    ];

  return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Hero Welcome */}
            <header className="space-y-4">
                <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.4em]">
                    Creator Dashboard
                </p>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                    Hello, <span className="text-white/40">{userName}.</span>
                </h1>
                <div className="flex flex-wrap gap-4">
                    <a className="bg-white/5 border border-white/10 text-white font-black px-8 py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all btn-bubble">
                        View Wallet
                    </a>
                    <a className="bg-teal-500 text-black font-black px-8 py-4 rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-teal-500/20 active:scale-95 transition-all btn-bubble">
                        Browse Gigs
                    </a>
                </div>
            </header>

            {/* Modern Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className="bg-[#101217] border border-white/5 p-6 md:p-8 rounded-[32px] md:rounded-[40px] hover:border-white/10 transition-all group cursor-default"
                    >
                        <div
                            className={`w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-400 mb-6 border border-teal-500/20 group-hover:scale-110 transition-transform`}
                        >
                            {stat.icon}
                        </div>
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">
                            {stat.label}
                        </p>
                        <p className="text-2xl md:text-3xl font-black text-white tracking-tighter">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Active Ledger / Activity */}
                <div className="lg:col-span-4 space-y-6">
                    <h3 className="text-xl font-black text-white tracking-tight px-2">
                        Live Ledger
                    </h3>
                    <div className="bg-[#101217] border border-white/5 p-8 rounded-[40px] space-y-6">
                        {[
                            {
                                label: "Payment Received",
                                val: "+250k",
                                date: "2h ago",
                                status: "SUCCESS"
                            },
                            {
                                label: "Content Approved",
                                val: "Nile Gig",
                                date: "1d ago",
                                status: "VERIFIED"
                            },
                            {
                                label: "Gig Joined",
                                val: "Mumford",
                                date: "2d ago",
                                status: "ACTIVE"
                            }
                        ].map((log, i) => (
                            <div
                                key={i}
                                className="flex justify-between items-center group"
                            >
                                <div>
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                        {log.label}
                                    </p>
                                    <p className="text-sm font-black text-white">
                                        {log.val}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[8px] font-black text-teal-500 uppercase">
                                        {log.status}
                                    </p>
                                    <p className="text-[10px] text-gray-600 font-bold">
                                        {log.date}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <button className="w-full py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors bg-white/5 rounded-[24px] btn-bubble">
                            Full Transaction History
                        </button>
                    </div>
                </div>

                {/* Featured Content Gigs */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-xl font-black text-white tracking-tight">
                            Curated Marketplace
                        </h3>
                        <a className="text-teal-500 text-[10px] font-black uppercase tracking-widest btn-bubble px-3 py-1 rounded-lg">
                            See All Gigs
                        </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {MOCK_CAMPAIGNS.slice(0, 2).map(c => (
                            <a
                                key={c.id}
                                className="group bg-[#101217] border border-white/5 p-6 rounded-[36px] hover:border-teal-500/20 transition-all flex flex-col gap-4 btn-bubble"
                            >
                                <div className="h-40 rounded-2xl overflow-hidden relative">
                                    <img
                                        src={c.image}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-teal-500 uppercase tracking-widest mb-1">
                                        {c.brandName}
                                    </p>
                                    <h4 className="text-lg font-black text-white leading-tight">
                                        {c.title}
                                    </h4>
                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                                        <span className="text-xs font-black text-white/70">
                                            {formatCurrency(c.cpmUGX)}
                                        </span>
                                        <span className="text-[10px] font-black uppercase text-teal-500">
                                            Apply Now →
                                        </span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );}

export default Home
