import { IconAdCircle } from "@tabler/icons-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import ErrorAlert from "../ErrorAlert";
import { formatCurrency, ObjectKeysToSnakeCase } from "../../constants";
import { pb } from "../../lib/pocketbase";
import { useBrandDashboard } from "../../hooks/useBrandDashboard";

type Step = 1 | 2 | 3;

const campaignSchema = z.object({
  title: z.string().min(5, "Title is too short"),
  country: z.number().positive("Please select a country"),
  description: z
    .string()
    .min(200, "Description Must be above 200 characters")
    .max(5000, "Description must not exceed 5000 words"),
  // showDosDonts: z.boolean(),
  // dos: z.array(z.string().min(1, "Entry cannot be empty")),
  // donts: z.array(z.string().min(1, "Entry cannot be empty")),
  launchDate: z.string().refine((date) => new Date(date) > new Date(), {
    message: "Launch date must be in the future",
  }),
  // endDate: z.string().optional("End date is required"),
  hashtags: z.string().startsWith("#", "Hashtags should start with #"),
  budget: z.coerce.number().positive("Budget must be greater than 0"),
  cpm: z.coerce.number().positive("CPM must be greater than 0"),
  productType: z.enum(["none", "physical", "digital"]),
  ageRanges: z.array(z.string()).min(1, "Select at least one age range"),
  gender: z.enum(["F", "M", "B"]),
  visibility: z.enum(["open", "private"]),
});

type CampaignFormData = z.infer<typeof campaignSchema>;

const FieldRequired = () => (
  <span className="text-red-500 font-bold text-xl">*</span>
);

const CreateCampaign: React.FC = () => {
  const { setActiveView, setIsLoading } = useBrandDashboard();
  const [step, setStep] = useState<Step>(1);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CampaignFormData, string>>
  >({});
  const [stepError, setStepError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    country: 256,
    description: "",
    // showDosDonts: false,
    // dos: [''],
    // donts: [''],
    launchDate: "2026-02-21",
    // endDate: '',
    hashtags: "MWSS2024",
    budget: 0,
    cpm: 0,
    productType: "none",
    ageRanges: ["18-24", "25-34"],
    gender: "B",
    visibility: "open",
  });

  const navigate = useNavigate();

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4) as Step);
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1) as Step);

  // Inside your ue = (key: keyof typeof formData) => {
  //   return formData[key];
  // };

  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const numericValue = parseInt(value.replace(/\D/g, ""), 10);

    setFormData((prev) => ({
      ...prev,
      [name]: numericValue || 0,
    }));
  };

  const handleMoneyBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    const numericValue = parseInt(value.replace(/\D/g, ""), 10);

    const fieldSchema = campaignSchema.shape[name as keyof CampaignFormData];
    const result = fieldSchema.safeParse(numericValue);

    setErrors((prev) => ({
      ...prev,
      [name]: result.success ? undefined : result.error.issues[0].message,
    }));
  };

  // // Helper to format for display
  // const formatCurrency = (val: string) => {
  //   if (!val) return '';
  //   // Convert string to number and add commas
  //   return Number(val).toLocaleString('en-US');
  // };
  const handleValidateStep = async () => {
    const isValidStep = (stepFields: string[]): boolean => {
      for (const key of stepFields) {
        const fieldSchema = campaignSchema.shape[key as keyof CampaignFormData];
        if (
          !fieldSchema.safeParse(formData[key as keyof typeof formData]).success
        ) {
          setStepError(
            "Oops, Some Input Field is Missing! or Invalid Please Check Above",
          );
          return false;
        }
      }
      return true;
    };

    if (step === 1) {
      const stepFields = ["title", "country", "description", "launchDate"];
      if (!isValidStep(stepFields)) {
        return;
      }
    } else if (step === 2) {
      const stepFields = ["budget", "cpm"];
      if (!isValidStep(stepFields)) {
        return;
      }
    } else if (step === 3) {
      const stepFields = ["title", "country", "description"];
      if (!isValidStep(stepFields)) {
        return;
      } else {
        const payload = ObjectKeysToSnakeCase(formData);
        try {
          await pb.collection("campaigns").create(payload);
          navigate("/brand");
        } catch (err: any) {
          setStepError(err.message);
          return;
        }
      }
    }

    setStepError("");
    nextStep();
  };

  // 1. Keep handleChange simple (only updates state)
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  // 2. Add handleBlur (triggers validation on defocus)
  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    // Validate only the field that just lost focus
    const fieldSchema = campaignSchema.shape[name as keyof CampaignFormData];
    const result = fieldSchema.safeParse(val || "");

    setErrors((prev) => ({
      ...prev,
      [name]: result.success ? undefined : result.error.issues[0].message,
    }));
  };

  // Specialized handler for Arrays (Dos/Donts)
  // const handleArrayChange = (index: number, value: string, field: 'dos' | 'donts') => {
  //   const updatedArray = [...formData[field]];
  //   updatedArray[index] = value;
  //   setFormData(prev => ({ ...prev, [field]: updatedArray }));
  // };
  //
  // // Final Submission Validation
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const result = campaignSchema.safeParse(formData);
  //
  //   if (!result.success) {
  //     const formattedErrors = result.error.flatten().fieldErrors;
  //     // Map first error of each field to state
  //     const newErrors: any = {};
  //     for (const key in formattedErrors) {
  //       newErrors[key] = formattedErrors[key as keyof CampaignFormData]?.[0];
  //     }
  //     setErrors(newErrors);
  //     return;
  //   }

  //   console.log("Form is valid!", result.data);
  // };

  //   return (
  //     <form onSubmit={handleSubmit}>
  //       <input name="name" value={formData.name} onChange={handleChange} />
  // {errors.name && <span className="error">{errors.name}</span>}
  //
  //       {/* Example for dynamic arrays */}
  //       {formData.dos.map((doItem, idx) => (
  //         <input
  //           key={idx}
  //           value={doItem}
  //           onChange={(e) => handleArrayChange(idx, e.target.value, 'dos')}
  //         />
  //       ))}
  //       <button type="submit">Create Campaign</button>
  //     </form>
  //   );
  // };

  const StepIndicator = () => (
    // justify-between ensures it uses the full width without overflow
    <div className="flex items-center justify-between w-full mb-12 px-2">
      {[1, 2, 3].map((s) => (
        <React.Fragment key={s}>
          {/* Circle: Scaled down to w-8 on small screens */}
          <div
            className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-[10px] sm:text-xs transition-all duration-500 ${
              step === s
                ? "bg-teal-500 text-black shadow-[0_0_20px_rgba(20,184,166,0.4)] scale-110"
                : step > s
                  ? "bg-teal-500/20 text-teal-500"
                  : "bg-white/5 text-gray-600"
            }`}
          >
            {step > s ? "✓" : `0${s}`}
          </div>

          {/* Line: flex-1 allows it to shrink/grow based on screen size */}
          {s < 3 && (
            <div className="flex-1 mx-2 sm:mx-4">
              <div
                className={`h-0.5 w-full rounded-full transition-all duration-500 ${
                  step > s ? "bg-teal-500/40" : "bg-white/5"
                }`}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const SectionHeader = ({
    title,
    subtitle,
  }: {
    title: string;
    subtitle: string;
  }) => (
    <div className="mb-10 space-y-2">
      <h2 className="text-4xl font-black text-white tracking-tighter uppercase font-display">
        {title}
      </h2>
      <p className="text-gray-500 text-sm font-medium tracking-tight">
        {subtitle}
      </p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-10">
      <button
        onClick={() => setActiveView("Home")}
        className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-[0.4em] mb-12 transition-colors"
      >
        ← Abandon Creation
      </button>

      <StepIndicator />

      <div className="relative overflow-hidden min-h-[600px]">
        {/* Step 1: Campaign Identity */}
        <div
          className={`transition-all duration-700 ease-in-out ${step === 1 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full absolute inset-0 pointer-events-none"}`}
        >
          <SectionHeader
            title="Campaign Identity"
            subtitle="Let us know the standard information about your mission."
          />

          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest pl-1">
                Campaign Title (Visible to Creators) <FieldRequired />
              </label>
              <input
                type="text"
                name="title"
                placeholder="Grab a pair of sunglasses and be a hero"
                className="w-full bg-[#11141A] border border-white/5 rounded-2xl py-5 px-8 text-white focus:border-teal-500/50 outline-none transition-all placeholder:text-gray-800"
                value={formData.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.title && <span className="error">{errors.title}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest pl-1">
                  Target Country
                  <FieldRequired />
                </label>
                <select className="w-full bg-[#11141A] border border-white/5 rounded-2xl py-5 px-8 text-white focus:border-teal-500/50 outline-none appearance-none">
                  <option selected>🇺🇬 Uganda</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest pl-1">
                Mission Brief <FieldRequired />
              </label>
              <textarea
                rows={4}
                name="description"
                placeholder="Describe what the campaign is about and what you expect..."
                className="w-full bg-[#11141A] border border-white/5 rounded-2xl py-6 px-8 text-white focus:border-teal-500/50 outline-none transition-all placeholder:text-gray-800 resize-none"
                value={formData.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.description && (
                <span className="error">{errors.description}</span>
              )}
            </div>

            <div className="p-8 bg-white/5 border border-dashed border-white/10 rounded-[40px] flex flex-col items-center justify-center text-center space-y-4 hover:border-teal-500/30 transition-all cursor-pointer">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500">
                <IconAdCircle />
              </div>
              <div>
                <p className="text-sm font-black text-white uppercase tracking-widest">
                  Cover Image (Optional)
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 1200x630px JPG/PNG
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest pl-1">
                  Launch Date
                </label>
                <input
                  name="launchDate"
                  type="date"
                  value={formData.launchDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full bg-[#11141A] border border-white/5 rounded-2xl py-5 px-8 text-white focus:border-teal-500/50 outline-none"
                />
                {errors.launchDate && (
                  <span className="error">{errors.launchDate}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Economy */}
        <div
          className={`transition-all duration-700 ease-in-out ${step === 2 ? "opacity-100 translate-x-0" : step < 2 ? "opacity-0 translate-x-full absolute inset-0 pointer-events-none" : "opacity-0 -translate-x-full absolute inset-0 pointer-events-none"}`}
        >
          <SectionHeader
            title="Campaign Economy"
            subtitle="Define how you compensate Africa's best creators."
          />

          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest pl-1">
                  Total Budget (UGX)
                  <FieldRequired />
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formatCurrency(formData.budget)}
                  placeholder="25,000,000"
                  className="w-full bg-[#11141A] border border-white/5 rounded-2xl py-5 px-8 text-white text-2xl font-black focus:border-teal-500/50 outline-none"
                  onChange={handleMoneyChange}
                  onBlur={handleMoneyBlur}
                />
                {errors.budget && (
                  <span className="error">{errors.budget}</span>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest pl-1">
                  CPM Target (UGX/1k)
                  <FieldRequired />
                </label>
                <input
                  type="text"
                  name="cpm"
                  value={formatCurrency(formData.cpm)}
                  placeholder="10,000"
                  className="w-full bg-[#11141A] border border-white/5 rounded-2xl py-5 px-8 text-white text-2xl font-black focus:border-teal-500/50 outline-none"
                  onChange={handleMoneyChange}
                  onBlur={handleMoneyBlur}
                />
                {errors.cpm && <span className="error">{errors.cpm}</span>}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest pl-1">
                Product Requirement
                <FieldRequired />
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    id: "custom",
                    title: "Custom Product",
                    desc: "Non-physical / Digital assets",
                  },
                  {
                    id: "shipped",
                    title: "Shipped to Creator",
                    desc: "Physical product we mail",
                  },
                  {
                    id: "purchase",
                    title: "Creator Purchase",
                    desc: "Reimbursed after submission",
                  },
                  {
                    id: "none",
                    title: "No Product Needed",
                    desc: "Purely digital or awareness",
                  },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() =>
                      setFormData({ ...formData, productType: p.id })
                    }
                    className={`p-6 rounded-3xl border text-left transition-all ${
                      formData.productType === p.id
                        ? "bg-teal-500/10 border-teal-500 shadow-[0_0_20px_rgba(20,184,166,0.1)]"
                        : "bg-[#11141A] border-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <p
                        className={`text-sm font-black uppercase tracking-tight ${formData.productType === p.id ? "text-teal-400" : "text-white"}`}
                      >
                        {p.title}
                      </p>
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${formData.productType === p.id ? "border-teal-400" : "border-gray-700"}`}
                      >
                        {formData.productType === p.id && (
                          <div className="w-2 h-2 bg-teal-400 rounded-full" />
                        )}
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium">
                      {p.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Reach & Controls */}
        <div
          className={`transition-all duration-700 ease-in-out ${step === 3 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full absolute inset-0 pointer-events-none"}`}
        >
          <SectionHeader
            title="Reach & Controls"
            subtitle="Targeting demographics and visibility settings."
          />

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
                      className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${formData.ageRanges.includes(age) ? "bg-teal-500 text-black" : "bg-white/5 text-gray-500 hover:bg-white/10"}`}
                      onClick={() => {
                        const next = formData.ageRanges.includes(age)
                          ? formData.ageRanges.filter((a) => a !== age)
                          : [...formData.ageRanges, age];
                        setFormData({ ...formData, ageRanges: next });
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
                  id: "closed",
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
                  <p className="text-[10px] text-gray-500 font-medium">
                    {v.desc}
                  </p>
                </button>
              ))}
            </div>

            {/*<div className="p-8 bg-teal-500/5 border border-teal-500/10 rounded-[40px] flex items-center justify-between group">
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
            </div>*/}
          </div>
        </div>
      </div>

      <ErrorAlert message={stepError} onClose={() => setStepError("")} />

      <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-all disabled:opacity-0"
        >
          Previous Step
        </button>

        <button
          onClick={handleValidateStep}
          disabled={false}
          className="bg-teal-500 text-black font-black px-12 py-5 rounded-2xl text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-teal-500/20 active:scale-95 transition-all btn-bubble disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none disabled:scale-100 disabled:cursor-not-allowed"
        >
          {step === 3 ? "Deploy" : "Next Step"}
        </button>
      </div>
    </div>
  );
};

export default CreateCampaign;
