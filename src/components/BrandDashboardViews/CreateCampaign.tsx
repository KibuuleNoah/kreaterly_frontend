
import React, { useState } from 'react';

type Step = 1 | 2 | 3 | 4;

const CreateCampaign: React.FC = () => {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    country: 'Uganda',
    description: '',
    showDosDonts: false,
    dos: [''],
    donts: [''],
    launchDate: '2026-02-06',
    endDate: '',
    hashtags: 'MWSS2024',
    budget: '',
    cpm: '',
    productType: 'none',
    ageRanges: ['18-24', '25-34'],
    gender: ['Female', 'Male'],
    visibility: 'open',
    enableAds: false
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4) as Step);
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1) as Step);

  const StepIndicator = () => (
    <div className="flex items-center gap-4 mb-12">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs transition-all duration-500 ${
            step === s 
            ? 'bg-teal-500 text-black shadow-[0_0_20px_rgba(20,184,166,0.5)] scale-110' 
            : step > s 
              ? 'bg-teal-500/20 text-teal-500' 
              : 'bg-white/5 text-gray-600'
          }`}>
            {step > s ? '✓' : `0${s}`}
          </div>
          {s < 4 && <div className={`w-12 h-0.5 rounded-full transition-all duration-500 ${step > s ? 'bg-teal-500/40' : 'bg-white/5'}`} />}
        </div>
      ))}
    </div>
  );

  const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="mb-10 space-y-2">
      <h2 className="text-4xl font-black text-white tracking-tighter uppercase font-display">{title}</h2>
      <p className="text-gray-500 text-sm font-medium tracking-tight">{subtitle}</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-10 min-h-screen">
      <button 
        onClick={() => navigate(-1)} 
        className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-[0.4em] mb-12 transition-colors"
      >
        ← Abandon Creation
      </button>

      <StepIndicator />

      <div className="relative overflow-hidden min-h-[600px]">
        {/* Step 1: Campaign Identity */}
        <div className={`transition-all duration-700 ease-in-out ${step === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute inset-0 pointer-events-none'}`}>
          <SectionHeader title="Campaign Identity" subtitle="Let us know the standard information about your mission." />
          
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest pl-1">Campaign Name (Internal)</label>
              <input 
                type="text" 
                placeholder="Spring/Summer Collection Launch (DK)"
                className="w-full bg-[#11141A] border border-white/5 rounded-2xl py-5 px-8 text-white focus:border-teal-500/50 outline-none transition-all placeholder:text-gray-800"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <p className="text-[9px] text-gray-600 font-bold uppercase ml-1">Visible only on your dashboard.</p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest pl-1">Campaign Title (Visible to Creators)</label>
              <input 
                type="text" 
                placeholder="Grab a pair of sunglasses and be a hero"
                className="w-full bg-[#11141A] border border-white/5 rounded-2xl py-5 px-8 text-white focus:border-teal-500/50 outline-none transition-all placeholder:text-gray-800"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest pl-1">Target Country</label>
                <select className="w-full bg-[#11141A] border border-white/5 rounded-2xl py-5 px-8 text-white focus:border-teal-500/50 outline-none appearance-none">
                  <option>🇺🇬 Uganda</option>
                  <option>🇰🇪 Kenya</option>
                  <option>🇷🇼 Rwanda</option>
                  <option>🇹🇿 Tanzania</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest pl-1">Mission Brief</label>
              <textarea 
                rows={4}
                placeholder="Describe what the campaign is about and what you expect..."
                className="w-full bg-[#11141A] border border-white/5 rounded-2xl py-6 px-8 text-white focus:border-teal-500/50 outline-none transition-all placeholder:text-gray-800 resize-none"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Step 2: Media & Timeline */}
        <div className={`transition-all duration-700 ease-in-out ${step === 2 ? 'opacity-100 translate-x-0' : step < 2 ? 'opacity-0 translate-x-full absolute inset-0 pointer-events-none' : 'opacity-0 -translate-x-full absolute inset-0 pointer-events-none'}`}>
          <SectionHeader title="Media & Timeline" subtitle="Set your launch windows and brand visuals." />
          
          <div className="space-y-10">
            <div className="p-8 bg-white/5 border border-dashed border-white/10 rounded-[40px] flex flex-col items-center justify-center text-center space-y-4 hover:border-teal-500/30 transition-all cursor-pointer">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500">
                <IconAdLibrary />
              </div>
              <div>
                <p className="text-sm font-black text-white uppercase tracking-widest">Cover Image (Optional)</p>
                <p className="text-xs text-gray-500 mt-1">Recommended: 1200x630px JPG/PNG</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest pl-1">Launch Date</label>
                <input type="date" value={formData.launchDate} className="w-full bg-[#11141A] border border-white/5 rounded-2xl py-5 px-8 text-white focus:border-teal-500/50 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest pl-1">End Date (Optional)</label>
                <input type="date" className="w-full bg-[#11141A] border border-white/5 rounded-2xl py-5 px-8 text-white focus:border-teal-500/50 outline-none" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-[#11141A] rounded-2xl border border-white/5">
                <div>
                  <p className="text-xs font-black text-white uppercase tracking-widest">Show Do's and Don'ts to creators</p>
                  <p className="text-[10px] text-gray-500">Provide specific requirements and guidelines for the campaign.</p>
                </div>
                <button 
                  onClick={() => setFormData({...formData, showDosDonts: !formData.showDosDonts})}
                  className={`w-12 h-6 rounded-full transition-all duration-300 relative ${formData.showDosDonts ? 'bg-teal-500' : 'bg-gray-800'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${formData.showDosDonts ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              {/* Do's and Don'ts Dropdown */}
              {formData.showDosDonts && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-[10px] font-black text-white uppercase tracking-widest pl-1">Do's</h4>
                      <p className="text-[9px] text-gray-600 uppercase tracking-widest pl-1 font-bold">What should the creator do?</p>
                    </div>
                    <input 
                      type="text"
                      placeholder="Add a new 'Do'"
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-xs text-white focus:border-teal-500/50 outline-none transition-all placeholder:text-gray-800 font-bold"
                    />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-[10px] font-black text-white uppercase tracking-widest pl-1">Don'ts</h4>
                      <p className="text-[9px] text-gray-600 uppercase tracking-widest pl-1 font-bold">What should the creator not do?</p>
                    </div>
                    <input 
                      type="text"
                      placeholder="Add a new 'Dont'"
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-xs text-white focus:border-teal-500/50 outline-none transition-all placeholder:text-gray-800 font-bold"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step 3: Economy */}
        <div className={`transition-all duration-700 ease-in-out ${step === 3 ? 'opacity-100 translate-x-0' : step < 3 ? 'opacity-0 translate-x-full absolute inset-0 pointer-events-none' : 'opacity-0 -translate-x-full absolute inset-0 pointer-events-none'}`}>
          <SectionHeader title="Campaign Economy" subtitle="Define how you compensate Africa's best creators." />
          
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest pl-1">Total Budget (UGX)</label>
                <input 
                  type="number" 
                  placeholder="25,000,000"
                  className="w-full bg-[#11141A] border border-white/5 rounded-2xl py-5 px-8 text-white text-2xl font-black focus:border-teal-500/50 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest pl-1">CPM Target (UGX/1k)</label>
                <input 
                  type="number" 
                  placeholder="12,000"
                  className="w-full bg-[#11141A] border border-white/5 rounded-2xl py-5 px-8 text-white text-2xl font-black focus:border-teal-500/50 outline-none" 
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest pl-1">Product Requirement</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'custom', title: 'Custom Product', desc: 'Non-physical / Digital assets' },
                  { id: 'shipped', title: 'Shipped to Creator', desc: 'Physical product we mail' },
                  { id: 'purchase', title: 'Creator Purchase', desc: 'Reimbursed after submission' },
                  { id: 'none', title: 'No Product Needed', desc: 'Purely digital or awareness' },
                ].map(p => (
                  <button 
                    key={p.id}
                    onClick={() => setFormData({...formData, productType: p.id})}
                    className={`p-6 rounded-3xl border text-left transition-all ${
                      formData.productType === p.id 
                      ? 'bg-teal-500/10 border-teal-500 shadow-[0_0_20px_rgba(20,184,166,0.1)]' 
                      : 'bg-[#11141A] border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <p className={`text-sm font-black uppercase tracking-tight ${formData.productType === p.id ? 'text-teal-400' : 'text-white'}`}>{p.title}</p>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${formData.productType === p.id ? 'border-teal-400' : 'border-gray-700'}`}>
                        {formData.productType === p.id && <div className="w-2 h-2 bg-teal-400 rounded-full" />}
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium">{p.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Reach & Controls */}
        <div className={`transition-all duration-700 ease-in-out ${step === 4 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full absolute inset-0 pointer-events-none'}`}>
          <SectionHeader title="Reach & Controls" subtitle="Targeting demographics and visibility settings." />
          
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest">Age Demographics</label>
                <div className="flex flex-wrap gap-2">
                  {['13-17', '18-24', '25-34', '35-44', '45+'].map(age => (
                    <button 
                      key={age}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${formData.ageRanges.includes(age) ? 'bg-teal-500 text-black' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}
                      onClick={() => {
                        const next = formData.ageRanges.includes(age) 
                          ? formData.ageRanges.filter(a => a !== age)
                          : [...formData.ageRanges, age];
                        setFormData({...formData, ageRanges: next});
                      }}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest">Gender</label>
                <div className="flex gap-2">
                  {['Female', 'Male', 'Non-Binary'].map(g => (
                    <button 
                      key={g}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${formData.gender.includes(g) ? 'bg-teal-500 text-black' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}
                      onClick={() => {
                        const next = formData.gender.includes(g) 
                          ? formData.gender.filter(item => item !== g)
                          : [...formData.gender, g];
                        setFormData({...formData, gender: next});
                      }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'open', title: 'Open Campaign', desc: 'Creators apply, you approve manually.' },
                { id: 'closed', title: 'Closed Campaign', desc: 'Invite-only. No public application.' },
              ].map(v => (
                <button 
                  key={v.id}
                  onClick={() => setFormData({...formData, visibility: v.id})}
                  className={`p-6 rounded-3xl border text-left transition-all ${
                    formData.visibility === v.id 
                    ? 'bg-teal-500/10 border-teal-500' 
                    : 'bg-[#11141A] border-white/5'
                  }`}
                >
                  <p className={`text-sm font-black uppercase tracking-tight mb-1 ${formData.visibility === v.id ? 'text-teal-400' : 'text-white'}`}>{v.title}</p>
                  <p className="text-[10px] text-gray-500 font-medium">{v.desc}</p>
                </button>
              ))}
            </div>

            <div className="p-8 bg-teal-500/5 border border-teal-500/10 rounded-[40px] flex items-center justify-between group">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-teal-500 rounded-2xl flex items-center justify-center text-black text-2xl shadow-xl shadow-teal-500/20">⚡</div>
                <div>
                  <h4 className="text-lg font-black text-white uppercase tracking-tight">Enable Creator Ads</h4>
                  <p className="text-xs text-gray-500 max-w-sm">Boost ROAS by 35% by running ads directly from creator profiles.</p>
                </div>
              </div>
              <button 
                onClick={() => setFormData({...formData, enableAds: !formData.enableAds})}
                className={`w-14 h-7 rounded-full transition-all duration-300 relative ${formData.enableAds ? 'bg-teal-500' : 'bg-gray-800'}`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${formData.enableAds ? 'left-8' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
        <button 
          onClick={prevStep} 
          disabled={step === 1}
          className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-all disabled:opacity-0"
        >
          Previous Step
        </button>

        <button 
          onClick={step === 4 ? () => navigate('/') : nextStep}
          className="bg-teal-500 text-black font-black px-12 py-5 rounded-2xl text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-teal-500/20 active:scale-95 transition-all btn-bubble"
        >
          {step === 4 ? 'Deploy Campaign' : 'Next Protocol'}
        </button>
      </div>
    </div>
  );
};

export default CreateCampaign;
