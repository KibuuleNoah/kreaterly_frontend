








import React, { useState, useCallback } from 'react';
import { UserRole } from '../../types';
import { MOCK_CAMPAIGNS, formatCurrency } from '../../constants';
import { IconBrandApple, IconBrandFacebook, IconBrandGoogle, IconBrandInstagram, IconBrandTiktok } from '@tabler/icons-react';

type Step = 'ROLE_SELECTION' | 'AUTH_ENTRY' | 'OTP_VERIFY';

const DEV_OTP = '123456';

// Advanced professional icons for Role Selection
const IconBusiness = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const IconArtist = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

const GigsVideoSlider = () => {
  const cards = [...MOCK_CAMPAIGNS, ...MOCK_CAMPAIGNS, ...MOCK_CAMPAIGNS];
  
  return (
    <div className="grid grid-cols-2 gap-4 h-full overflow-hidden min-w-[320px]">
      <div className="flex flex-col gap-4 animate-slide-vertical">
        {cards.map((campaign, i) => (
          <div key={`col1-${i}`} className="w-full bg-[#11141A]/90 backdrop-blur-md border border-white/5 rounded-[32px] overflow-hidden shadow-2xl flex-shrink-0 min-h-[280px]">
            <div className="h-40 relative bg-black/40">
               <img 
                  src={campaign.image} 
                  className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-500" 
                  alt="" 
                  loading="lazy"
                />
               <div className="absolute inset-0 bg-gradient-to-t from-[#11141A] to-transparent" />
               <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-teal-500 text-black text-[7px] font-black uppercase px-2 py-1 rounded-md tracking-widest">{campaign.type}</span>
               </div>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-[8px] font-black text-teal-500 uppercase tracking-widest leading-none">{campaign.brandName}</p>
              <h4 className="text-sm font-black text-white tracking-tight leading-none truncate">{campaign.title}</h4>
              <div className="flex justify-between items-center pt-3 border-t border-white/5">
                <span className="text-[10px] font-black text-white/70">{formatCurrency(campaign.cpmUGX)}</span>
                <span className="text-[10px] font-black text-teal-400">Apply →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 animate-slide-vertical-reverse pt-40">
        {cards.reverse().map((campaign, i) => (
          <div key={`col2-${i}`} className="w-full bg-[#11141A]/90 backdrop-blur-md border border-white/5 rounded-[32px] overflow-hidden shadow-2xl flex-shrink-0 min-h-[280px]">
            <div className="h-40 relative bg-black/40">
               <img 
                src={campaign.image} 
                className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-500" 
                alt="" 
                loading="lazy"
              />
               <div className="absolute inset-0 bg-gradient-to-t from-[#11141A] to-transparent" />
               <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-teal-500 text-black text-[7px] font-black uppercase px-2 py-1 rounded-md tracking-widest">{campaign.type}</span>
               </div>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-[8px] font-black text-teal-500 uppercase tracking-widest leading-none">{campaign.brandName}</p>
              <h4 className="text-sm font-black text-white tracking-tight leading-none truncate">{campaign.title}</h4>
              <div className="flex justify-between items-center pt-3 border-t border-white/5">
                <span className="text-[10px] font-black text-white/70">{formatCurrency(campaign.cpmUGX)}</span>
                <span className="text-[10px] font-black text-teal-400">Join →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface SocialButtonProps {
  label: string;
  icon: React.ReactNode;
}

const SocialLoginButton = ({ label, icon }: SocialButtonProps) => {
  return (
    <button className="w-full bg-[#11141A] border border-white/5 hover:border-teal-500/40 hover:bg-teal-500/5 p-4 rounded-2xl flex items-center justify-center gap-4 transition-all duration-300 group active:scale-[0.98] shadow-lg">
      <div className="w-5 h-5 flex items-center justify-center transition-transform group-hover:scale-110">
        {icon}
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-all">
        {label}
      </span>
    </button>
  );
};

const Onboarding: React.FC = () => {
  const [step, setStep] = useState<Step>('ROLE_SELECTION');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === UserRole.ADMIN) {
      localStorage.setItem('kreaterly_role', UserRole.ADMIN);
      localStorage.setItem('kreaterly_user', JSON.stringify({ name: 'System Admin' }));
      window.location.href = window.location.origin + '/#/';
      window.location.reload();
      return;
    }
    setStep('AUTH_ENTRY');
  };

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('OTP_VERIFY');
    }, 1200);
  };

  const performVerification = useCallback((code: string) => {
    if (!selectedRole || isProcessing) return;
    setIsProcessing(true);
    setError(null);

    // Mock verification
    if (code !== DEV_OTP && code !== '654321') {
      setTimeout(() => {
        setIsProcessing(false);
        setError('Invalid verification code. Please try ' + DEV_OTP);
        setOtp(''); 
      }, 800);
      return;
    }

    // Success flow
    setTimeout(() => {
      localStorage.setItem('kreaterly_role', selectedRole);
      const userData = selectedRole === UserRole.TALENT 
        ? { name: 'Kigozi John', handle: '@kigozi_new', email: identifier }
        : { name: 'New Brand Partner', company: 'Nile Breweries', email: identifier };
      
      localStorage.setItem('kreaterly_user', JSON.stringify(userData));
      
      // Fixed Redirect Logic: Hard reset to dashboard
      window.location.href = window.location.origin + '/#/';
      window.location.reload();
    }, 1000);
  }, [selectedRole, isProcessing, identifier]);

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    performVerification(otp);
  };

  const renderRoleSelection = () => (
    <div className="w-full max-w-6xl mx-auto space-y-6 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 py-4 px-4 h-full flex flex-col justify-center">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto w-full">
        {/* Talent / Creator Card */}
        <button 
          onClick={() => handleRoleSelect(UserRole.TALENT)}
          className="group bg-[#11141A]/60 backdrop-blur-xl border border-white/5 p-8 md:p-14 rounded-[48px] text-left hover:border-teal-500/40 hover:bg-[#151921] transition-all duration-500 relative overflow-hidden shadow-2xl active:scale-[0.98]"
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-all"></div>
          <div className="space-y-6 relative z-10">
            <div className="w-20 h-20 bg-teal-500 rounded-3xl flex items-center justify-center text-black shadow-teal-500/20 shadow-2xl group-hover:rotate-12 transition-transform">
              <IconArtist />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-white tracking-tight uppercase font-display leading-none">CREATOR / INFLUENCER</h3>
              <p className="text-sm text-gray-400 font-medium">Monetize your content & get paid instantly via MoMo.</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-teal-500 group-hover:gap-4 transition-all">
              ACCESS HUB 
              <span className="bg-white/10 p-1.5 rounded-lg">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
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
              <h3 className="text-3xl font-black text-white tracking-tight uppercase font-display leading-none">BRAND / BUSINESS</h3>
              <p className="text-sm text-gray-400 font-medium">Launch localized campaigns & find top creators in minutes.</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-teal-500 group-hover:gap-4 transition-all">
              ENTER PORTAL 
              <span className="bg-white/10 p-1.5 rounded-lg">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );

  const renderAuthEntry = () => (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[#0A0B0E] relative">
      {/* Left Side: Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 relative z-20 bg-[#0A0B0E] min-h-screen">
        <div className="max-w-md w-full space-y-12">
          <div className="space-y-8">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setStep('ROLE_SELECTION')}>
              <div className="w-11 h-11 bg-teal-500 rounded-2xl flex items-center justify-center text-black font-black shadow-[0_4px_30px_rgba(20,184,166,0.3)]">
                <span className="text-xl font-display leading-none pt-0.5">K</span>
              </div>
              <span className="font-display text-4xl tracking-tight text-white uppercase pt-1">Kreaterly</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase font-display leading-none">
                Sign in as a <span className="text-teal-500 uppercase">
                  {selectedRole === UserRole.BRAND ? 'business' : 'creator'}
                </span>
              </h2>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Protocol Version Node v3.5</p>
            </div>
          </div>

          <form onSubmit={handleRequestOtp} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Email address</label>
              <input 
                required 
                type="email" 
                placeholder="amanda@kreaterly.ug" 
                value={identifier} 
                onChange={e => setIdentifier(e.target.value)} 
                className="w-full bg-[#11141A] border border-white/5 rounded-3xl py-6 px-8 text-white font-bold focus:border-teal-500/50 outline-none transition-all placeholder:text-gray-800" 
              />
              <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest px-1 mt-2">A temporary access code will be sent to this email.</p>
            </div>

            <button 
              type="submit"
              disabled={isProcessing}
              className="w-full py-6 rounded-full font-black text-xl uppercase tracking-tighter shadow-2xl transition-all active:scale-95 hover:brightness(1.1) bg-teal-500 text-black shadow-teal-500/20"
            >
              {isProcessing ? 'SENDING CODE...' : 'CONTINUE'}
            </button>
          </form>

          <div className="space-y-6 pt-4">
            <div className="relative flex items-center justify-center">
               <div className="absolute w-full h-px bg-white/5"></div>
               <span className="relative z-10 bg-[#0A0B0E] px-6 text-[8px] font-black text-gray-600 uppercase tracking-[0.6em]">or link with social</span>
            </div>

            <div className="space-y-3">
               <SocialLoginButton label="Google" icon={<IconBrandGoogle />} />
               <SocialLoginButton label="Apple" icon={<IconBrandApple />} />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Gigs Slider Visual */}
      <div className="hidden lg:block w-1/2 h-screen sticky top-0 bg-[#0A0B0E] border-l border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="h-full w-full p-4 md:p-8">
            <GigsVideoSlider />
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none transition-all duration-1000 bg-gradient-to-t from-[#0A0B0E] via-transparent to-transparent z-10">
          <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-teal-500/20 via-[#0A0B0E] to-transparent"></div>
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 pointer-events-none z-20">
          <div className="glass-card border border-white/10 p-12 rounded-[56px] shadow-3xl space-y-6 max-w-sm animate-in zoom-in-95 duration-700">
            <div className="w-20 h-20 rounded-[24px] flex items-center justify-center text-black font-black text-4xl mx-auto shadow-2xl transition-all bg-teal-500 shadow-teal-500/40">
              <span className="font-display pt-1">K</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-white tracking-tight uppercase font-display leading-none">Join the Nucleus</h3>
              <p className="text-gray-400 text-sm font-medium">Gain instant access to over <br/><span className="text-teal-500 font-bold uppercase tracking-widest text-xs">+12,000 professional creators</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOtpVerify = () => (
    <div className="max-w-md w-full mx-auto space-y-6 md:space-y-10 animate-in slide-in-from-right-8 duration-500 py-4 px-4 h-full flex flex-col justify-center">
      <div className="space-y-2 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase font-display leading-tight">
          VERIFY <span className="text-teal-500">CREDENTIALS</span>
        </h2>
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">A 6-digit code was dispatched to</p>
        <p className="text-sm md:text-xl font-black text-white bg-white/5 inline-block px-4 py-2 rounded-xl border border-white/5">{identifier}</p>
        <div className="mt-2 text-teal-400 text-[10px] font-black uppercase tracking-widest border border-teal-500/20 bg-teal-500/5 px-4 py-2 rounded-lg inline-block animate-pulse">
           DEV MODE: AUTO-CHECKS FOR {DEV_OTP}
        </div>
      </div>

      <div className="bg-[#11141A]/80 backdrop-blur-2xl border border-white/10 rounded-[48px] overflow-hidden shadow-3xl p-8 md:p-12 space-y-10 text-center">
        <form onSubmit={handleVerifyOtp} className="space-y-10">
          <div className="flex justify-center gap-2 md:gap-3">
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <input 
                key={idx}
                type="text"
                maxLength={1}
                autoFocus={idx === 0}
                className="w-10 h-14 md:w-12 md:h-16 bg-black/60 border border-white/10 rounded-2xl text-center text-xl md:text-3xl font-black text-teal-400 focus:border-teal-500 outline-none transition-all shadow-inner"
                value={otp[idx] || ''}
                onChange={e => {
                  if (isProcessing) return;
                  const val = e.target.value;
                  const newOtpArr = otp.split('');
                  // Allow clearing or replacing
                  if (val === '') {
                    newOtpArr[idx] = '';
                  } else {
                    newOtpArr[idx] = val.slice(-1);
                  }
                  
                  const updatedOtp = newOtpArr.join('').slice(0, 6);
                  setOtp(updatedOtp);
                  
                  // Move focus
                  if (val && e.target.nextSibling) {
                    (e.target.nextSibling as HTMLInputElement).focus();
                  }

                  // Auto-submit when length reaches 6
                  if (updatedOtp.length === 6) {
                    performVerification(updatedOtp);
                  }
                }}
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest animate-shake">{error}</p>}

          <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
            {isProcessing && <div className="absolute inset-0 bg-teal-500 animate-[slide-infinite_2s_linear_infinite]"></div>}
          </div>

          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
            {isProcessing ? 'SYNCHRONIZING HUB...' : 'SYSTEM WAITING FOR CREDENTIALS'}
          </p>
          
          <button type="button" onClick={() => setStep('AUTH_ENTRY')} className="text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors">
            DIDN'T RECEIVE CODE? <span className="text-teal-500">RESEND NOW</span>
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[200] bg-[#0A0B0E] flex items-center justify-center overflow-y-auto overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-teal-500/5 blur-[200px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-teal-500/5 blur-[200px] rounded-full"></div>
      </div>
      
      <div className="w-full min-h-full flex flex-col items-center justify-center relative z-10">
        {step === 'ROLE_SELECTION' ? renderRoleSelection() : step === 'AUTH_ENTRY' ? renderAuthEntry() : renderOtpVerify()}
      </div>
    </div>
  );
};

export default Onboarding;
