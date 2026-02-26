import React, { useState } from "react";
import ErrorAlert from "../ErrorAlert";
import { pb } from "../../lib/pocketbase";
import { useBrandDashboard } from "../../hooks/useBrandDashboard";
import {
  CampaignsGenderOptions,
  CampaignsStatusOptions,
  CampaignsVisibilityOptions,
  type CampaignsRecord,
} from "../../pocketbase-types";
import {
  CampaignSchema,
  type CampaignFormData,
  type CampaignFormErrors,
  type CreateCampaignCtx,
} from "../../types";
import CreateCampaignStep1 from "./sections/CreateCampaignStep1";
import CreateCampaignStep2 from "./sections/CreateCampaignStep2";
import CreateCampaignStep3 from "./sections/CreateCampaignStep3";
import StepIndicator from "../StepIndicator";

type Step = 1 | 2 | 3;

const defaultCampaign: CampaignsRecord = {
  title: "",
  description: "", // HTMLString
  budget: 0,
  category: "Beauty",
  product_type: "none",
  country: 256,
  cpm: 125,

  launch_date: new Date().toISOString(),
  end_date: "",

  gender: CampaignsGenderOptions["B"],
  status: CampaignsStatusOptions["active"],
  visibility: CampaignsVisibilityOptions["open"],

  age_ranges: [],
  platform_payouts: [],
  top_videos: [],

  requirements: "",
  min_followers: 0,
};

const CreateCampaign: React.FC = () => {
  const { setActiveView, campaigns, setCampaigns } = useBrandDashboard();
  const [step, setStep] = useState<Step>(1);
  const [campaignFormErrors, setCampaignFormErrors] =
    useState<CampaignFormErrors>({});
  const [stepError, setStepError] = useState("");
  const [formData, setFormData] = useState<CampaignsRecord>(defaultCampaign);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4) as Step);
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1) as Step);

  const handleMoneyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const numericValue = parseInt(value.replace(/\D/g, ""), 10);

    setFormData((prev) => ({
      ...prev,
      [name]: numericValue || 0,
    }));
  };

  const handleMoneyInputBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    const numericValue = parseInt(value.replace(/\D/g, ""), 10);

    const fieldSchema = CampaignSchema.shape[name as keyof CampaignFormData];
    const result = fieldSchema.safeParse(numericValue);

    setCampaignFormErrors((prev) => ({
      ...prev,
      [name]: result.success ? undefined : result.error.issues[0].message,
    }));
  };

  const handleValidateStep = async () => {
    const isValidStep = (stepFields: string[]): boolean => {
      for (const key of stepFields) {
        const fieldSchema = CampaignSchema.shape[key as keyof CampaignFormData];
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

    const stepFieldsMap: Record<number, string[]> = {
      1: ["title", "country", "description", "launch_date", "end_date"],
      2: ["budget", "cpm"],
      3: ["title", "country", "description"],
    };

    const fields = stepFieldsMap[step];

    if (!fields || !isValidStep(fields)) return;

    if (step === 3) {
      try {
        const campaign = await pb
          .collection("campaigns")
          .create<CampaignsRecord>(formData);

        let updatedCampaigns: CampaignsRecord[] = [campaign];
        if (campaigns) {
          updatedCampaigns = [campaign, ...campaigns];
        }
        setCampaigns(updatedCampaigns);
        setActiveView("Home");
      } catch (err: any) {
        setStepError(err.message);
        return;
      }
    }

    setStepError("");
    nextStep();
  };

  const handleGeneralInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    console.log(name, value, type);
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleGeneralInputBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    // Validate only the field that just lost focus
    const fieldSchema = CampaignSchema.shape[name as keyof CampaignFormData];
    const result = fieldSchema.safeParse(val || "");

    setCampaignFormErrors((prev) => ({
      ...prev,
      [name]: result.success ? undefined : result.error.issues[0].message,
    }));
  };

  const createCampaignCtx: CreateCampaignCtx = {
    formData,
    currentStep: step,
    setFormData,
    stepError,
    setStepError,
    campaignFormErrors,
    setCampaignFormErrors,
    handleGeneralInputChange,
    handleGeneralInputBlur,
    handleMoneyInputChange,
    handleMoneyInputBlur,
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <button
        onClick={() => setActiveView("Home")}
        className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-[0.4em] mb-12 transition-colors"
      >
        ← Abandon Creation
      </button>

      <StepIndicator steps={["1", "2", "3"]} currentStep={`${step}`} />

      <div className="relative overflow-hidden min-h-[600px]">
        {/* Step 1: Campaign Identity */}
        <CreateCampaignStep1 {...createCampaignCtx} />

        {/* Step 2: Economy */}
        <CreateCampaignStep2 {...createCampaignCtx} />

        {/* Step 3: Reach & Controls */}
        <CreateCampaignStep3 {...createCampaignCtx} />
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
