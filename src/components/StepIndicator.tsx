import React from "react";

interface Props {
  steps: string[];
  currentStep: string;
}

const StepIndicator: React.FC<Props> = ({ steps, currentStep }) => {
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="flex items-center justify-between w-full mb-12 px-2">
      {steps.map((step, index) => {
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;

        return (
          <React.Fragment key={step}>
            {/* Step circle */}
            <div
              className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl
              flex items-center justify-center font-black text-[10px] sm:text-xs
              transition-all duration-500
              ${
                isActive
                  ? "bg-teal-500 text-black shadow-[0_0_20px_rgba(20,184,166,0.4)] scale-110"
                  : isCompleted
                    ? "bg-teal-500/20 text-teal-500"
                    : "bg-white/5 text-gray-600"
              }`}
            >
              {isCompleted ? "✓" : step}
            </div>

            {/* Connector */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-2 sm:mx-4">
                <div
                  className={`h-0.5 w-full rounded-full transition-all duration-500 ${
                    isCompleted ? "bg-teal-500/40" : "bg-white/5"
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
export default StepIndicator;
