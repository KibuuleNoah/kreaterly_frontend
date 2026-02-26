import { IconAdCircle } from "@tabler/icons-react";
import type { CreateCampaignCtx } from "../../../types";
import FieldRequired from "../../FieldRequired";

const CreateCampaignStep1: React.FC<CreateCampaignCtx> = ({
  formData,
  currentStep,
  campaignFormErrors,
  handleGeneralInputChange,
  handleGeneralInputBlur,
}) => {
  return (
    <div
      className={`transition-all duration-700 ease-in-out ${
        currentStep === 1
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-full absolute inset-0 pointer-events-none"
      }`}
    >
      <div className="mb-10 space-y-2">
        <h2 className="text-4xl font-black text-white tracking-tighter uppercase font-display">
          Campaign Identity
        </h2>
        <p className="text-gray-500 text-sm font-medium tracking-tight">
          Let us know the standard information about your mission.
        </p>
      </div>

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
            onChange={handleGeneralInputChange}
            onBlur={handleGeneralInputBlur}
          />
          {campaignFormErrors.title && (
            <span className="error">{campaignFormErrors.title}</span>
          )}
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
            onChange={handleGeneralInputChange}
            onBlur={handleGeneralInputBlur}
          />
          {campaignFormErrors.description && (
            <span className="error">{campaignFormErrors.description}</span>
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
              Launch Date <FieldRequired />
            </label>
            <input
              name="launch_date"
              type="date"
              value={formData.launch_date}
              onChange={handleGeneralInputChange}
              onBlur={handleGeneralInputBlur}
              className="w-full bg-[#11141A] border border-white/5 rounded-2xl py-5 px-8 text-white focus:border-teal-500/50 outline-none"
            />
            {campaignFormErrors.launch_date && (
              <span className="error">{campaignFormErrors.launch_date}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest pl-1">
              End Date (Optional)
            </label>
            <input
              name="end_date"
              type="date"
              value={formData.end_date}
              onChange={handleGeneralInputChange}
              onBlur={handleGeneralInputBlur}
              className="w-full bg-[#11141A] border border-white/5 rounded-2xl py-5 px-8 text-white focus:border-teal-500/50 outline-none"
            />
            {campaignFormErrors.end_date && (
              <span className="error">{campaignFormErrors.end_date}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignStep1;
