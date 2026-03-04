import type { CreateCampaignCtx } from "../../../types";
import FieldRequired from "../../FieldRequired";
import { FormatUGXCurrency } from "../../../lib/helpers";

const CreateCampaignStep2: React.FC<CreateCampaignCtx> = ({
  formData,
  setFormData,
  campaignFormErrors,
  currentStep,
  handleMoneyInputChange,
  handleMoneyInputBlur,
  handleGeneralInputChange,
}) => {
  return (
    <div
      className={`transition-all duration-700 ease-in-out ${currentStep === 2 ? "opacity-100 translate-x-0" : currentStep < 2 ? "opacity-0 translate-x-full absolute inset-0 pointer-events-none" : "opacity-0 -translate-x-full absolute inset-0 pointer-events-none"}`}
    >
      <div className="mb-10 space-y-2">
        <h2 className="text-4xl font-black text-white tracking-tighter uppercase font-display">
          Campaign Economy
        </h2>
        <p className="text-gray-500 text-sm font-medium tracking-tight">
          Define how you compensate Africa's best creators'
        </p>
      </div>

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
              value={FormatUGXCurrency(formData.budget)}
              placeholder="25,000,000"
              className="w-full bg-[#11141A] border border-white/5 rounded-2xl py-5 px-8 text-white text-2xl font-black focus:border-teal-500/50 outline-none"
              onChange={handleMoneyInputChange}
              onBlur={handleMoneyInputBlur}
            />
            {campaignFormErrors.budget && (
              <span className="error">{campaignFormErrors.budget}</span>
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
              value={FormatUGXCurrency(formData.cpm)}
              placeholder="10,000"
              className="w-full bg-[#11141A] border border-white/5 rounded-2xl py-5 px-8 text-white text-2xl font-black focus:border-teal-500/50 outline-none"
              onChange={handleMoneyInputChange}
              onBlur={handleMoneyInputBlur}
            />
            {campaignFormErrors.cpm && (
              <span className="error">{campaignFormErrors.cpm}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-teal-500 uppercase tracking-widest pl-1">
              Category
              <FieldRequired />
            </label>
            <select
              name="category"
              className="w-full bg-[#11141A] border border-white/5 rounded-2xl py-5 px-8 text-white focus:border-teal-500/50 outline-none appearance-none"
              onChange={handleGeneralInputChange}
            >
              <option value="Tech" selected>
                Tech
              </option>
              <option value="Game">Game</option>
              <option value="Beauty">Beauty</option>
            </select>
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
                onClick={() => setFormData({ ...formData, product_type: p.id })}
                className={`p-6 rounded-3xl border text-left transition-all ${
                  formData.product_type === p.id
                    ? "bg-teal-500/10 border-teal-500 shadow-[0_0_20px_rgba(20,184,166,0.1)]"
                    : "bg-[#11141A] border-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <p
                    className={`text-sm font-black uppercase tracking-tight ${formData.product_type === p.id ? "text-teal-400" : "text-white"}`}
                  >
                    {p.title}
                  </p>
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${formData.product_type === p.id ? "border-teal-400" : "border-gray-700"}`}
                  >
                    {formData.product_type === p.id && (
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
  );
};

export default CreateCampaignStep2;
