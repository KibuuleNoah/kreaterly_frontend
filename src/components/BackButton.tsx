import React, { type SetStateAction } from "react";
import { IconArrowLeft } from "@tabler/icons-react";

interface Props {
  label?: string;
  className?: string;
  viewNavTree: string[];
  setViewNavTree: React.Dispatch<SetStateAction<string[]>>;
  setActiveView: React.Dispatch<SetStateAction<string>>;
}
// const removeLast = () => {
//     setTexts(prev => prev.slice(0, -1));
//   };

const BackButton: React.FC<Props> = ({
  label = "Back",
  className = "",
  viewNavTree,
  setViewNavTree,
  setActiveView,
}) => {
  return (
    <div
      className={`
      sticky top-15 z-50 w-full transition-all duration-500 ease-in-out ${
        viewNavTree.length <= 1
          ? "max-h-0 opacity-0 -translate-y-2"
          : "opacity-100 translate-y-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <button
          onClick={() => {
            if (viewNavTree.length > 1) {
              setViewNavTree((prev) => {
                setActiveView(prev[prev.length - 2]);
                return prev.slice(0, -1);
              });
            }
          }}
          className={`
            group flex items-center gap-2 px-3 py-1.5 rounded-full
            text-teal-600 font-medium transition-all duration-200
            hover:bg-teal-500 backdrop-blur-md hover:text-white
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-teal-500/40
            
            ${className}
          `}
        >
          <IconArrowLeft
            size={18}
            stroke={2.5}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
          <span className="text-sm">{label}</span>
        </button>
      </div>
    </div>
  );
};

export default BackButton;
