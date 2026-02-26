import type { CreateCampaignCtx } from "../../../types";

const CreateCampaignStep3: React.FC<CreateCampaignCtx> = ({
  formData,
  setFormData,
  currentStep,
}) => {
  return (
    <div
      className={`transition-all duration-700 ease-in-out ${currentStep === 3 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full absolute inset-0 pointer-events-none"}`}
    >
      <div className="mb-10 space-y-2">
        <h2 className="text-4xl font-black text-white tracking-tighter uppercase font-display">
          Reach & Controls
        </h2>
        <p className="text-gray-500 text-sm font-medium tracking-tight">
          Targeting demographics and visibility settings.
        </p>
      </div>

      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest">
              Age Demographics
            </label>
            <div className="flex flex-wrap gap-2">
              {["13-17", "18-24", "25-34", "35-44", "45+"].map((age) => (
                <button
                  key={age}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${formData.age_ranges.includes(age) ? "bg-teal-500 text-black" : "bg-white/5 text-gray-500 hover:bg-white/10"}`}
                  onClick={() => {
                    const next = formData.age_ranges.includes(age)
                      ? formData.age_ranges.filter((a) => a !== age)
                      : [...formData.age_ranges, age];
                    setFormData({ ...formData, age_ranges: next });
                  }}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest">
              Gender
            </label>
            <div className="flex gap-2">
              {["Female", "Male", "Both"].map((g) => (
                <button
                  key={g}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${formData.gender === g[0] ? "bg-teal-500 text-black" : "bg-white/5 text-gray-500 hover:bg-white/10"}`}
                  onClick={() => {
                    const next = formData.gender.includes(g)
                      ? formData.gender.filter((item) => item !== g)
                      : [...formData.gender, g[0]];
                    setFormData({ ...formData, gender: next[0] });
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
            {
              id: "open",
              title: "Open Campaign",
              desc: "Creators apply, you approve manually.",
            },
            {
              id: "private",
              title: "Closed Campaign",
              desc: "Invite-only. No public application.",
            },
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => setFormData({ ...formData, visibility: v.id })}
              className={`p-6 rounded-3xl border text-left transition-all ${
                formData.visibility === v.id
                  ? "bg-teal-500/10 border-teal-500"
                  : "bg-[#11141A] border-white/5"
              }`}
            >
              <p
                className={`text-sm font-black uppercase tracking-tight mb-1 ${formData.visibility === v.id ? "text-teal-400" : "text-white"}`}
              >
                {v.title}
              </p>
              <p className="text-[10px] text-gray-500 font-medium">{v.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignStep3;
