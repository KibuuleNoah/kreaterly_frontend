import type React from "react";
import { useState } from "react";

const CollapsibleDescription: React.FC<{
  desc: string;
  toggleMore?: boolean;
}> = ({ desc, toggleMore }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <p
        className={`text-gray-400 text-lg md:text-xl max-w-4xl transition-all ${!isExpanded && "line-clamp-3"}`}
      >
        {desc}
      </p>
      {toggleMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:underline mt-2 text-sm font-medium"
        >
          {isExpanded ? "Show Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default CollapsibleDescription;
