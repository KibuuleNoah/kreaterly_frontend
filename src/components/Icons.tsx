import { motion } from "framer-motion";

export const Icon = () => {
  return <>Icon</>;
};

export const KreaterlyLogo = () => (
  <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full text-teal-400 fill-current drop-shadow-[0_0_8px_rgba(45,212,191,0.3)]"
    >
      <path
        d="M25 20 L25 80 M25 50 L75 20 M25 50 L75 80"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M78 12 L92 5 L85 22 Z" fill="currentColor" />
    </svg>
  </div>
);

export const KreaterlyLogoAnimateDraw = () => (
  <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full text-teal-400 fill-current drop-shadow-[0_0_12px_rgba(45,212,191,0.5)]"
    >
      <motion.path
        d="M25 20 L25 80 M25 50 L75 20 M25 50 L75 80"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        }}
      />
      <motion.path
        d="M78 12 L92 5 L85 22 Z"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
    </svg>
  </div>
);

export const KreaterlyLogoAnimateGrow = () => (
  <div className="w-10 h-10 flex items-center justify-center">
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full text-teal-400 fill-current animate-pulse"
    >
      <path
        className="transition-all duration-700"
        d="M25 20 L25 80 M25 50 L75 20 M25 50 L75 80"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      {/* The spark/arrow-head blinks faster */}
      <path
        d="M78 12 L92 5 L85 22 Z"
        fill="currentColor"
        className="animate-bounce"
      />
    </svg>
  </div>
);
// <svg
//                 width="24"
//                 height="24"
//
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org"
//               >
//                 <path
//                   d="M12 2L14.8 3.5L18 3.2L19.2 6.2L22 7.8L21.2 11L22.5 14L20.2 16.5L20 19.8L16.8 20.2L14.5 22.5L11.2 21.5L8 22.5L5.8 20.2L2.5 19.8L2.2 16.5L0 14L1.2 11L0.5 7.8L3.2 6.2L4.5 3.2L7.8 3.5L10.5 2H12Z"
//                   fill="#14b8a6"
//                 />
//                 <path
//                   d="M9 12L11 14L15 10"
//                   stroke="#0B0E14"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 />
//               </svg>
