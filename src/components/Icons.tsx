import { motion } from 'framer-motion';

export const Icon = () => {
  return (
    <>Icon</>
  )
}

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
                    repeatType: "reverse"
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
                    repeatDelay: 1 
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

// export const KreaterlyLogo = () => {
//     // Professional spring physics for that "snappy" Google feel
//     const springTransition = {
//         type: "spring",
//         stiffness: 100,
//         damping: 15,
//         restDelta: 0.001
//     };
//
//     return (
//         <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
//             <motion.svg
//                 viewBox="0 0 100 100"
//                 className="w-full h-full text-teal-400 fill-current"
//                 initial="hidden"
//                 animate="visible"
//             >
//                 {/* Main "K" Structure - Path Drawing Animation */}
//                 <motion.path
//                     d="M25 20 L25 80 M25 50 L75 20 M25 50 L75 80"
//                     stroke="currentColor"
//                     strokeWidth="12"
//                     strokeLinecap="round"
//                     fill="none"
//                     variants={{
//                         hidden: { pathLength: 0, opacity: 0 },
//                         visible: { 
//                             pathLength: 1, 
//                             opacity: 1,
//                             transition: { duration: 0.8, ease: "easeInOut" }
//                         }
//                     }}
//                 />
//
//                 {/* Accent Spark - Scale & Drop Animation */}
//                 <motion.path 
//                     d="M78 12 L92 5 L85 22 Z" 
//                     fill="currentColor"
//                     variants={{
//                         hidden: { scale: 0, y: -10, opacity: 0 },
//                         visible: { 
//                             scale: 1, 
//                             y: 0, 
//                             opacity: 1,
//                             transition: { ...springTransition, delay: 0.6 }
//                         }
//                     }}
//                 />
//
//                 {/* Subtle Ambient Glow Pulse */}
//                 <motion.circle
//                     cx="50" cy="50" r="40"
//                     fill="transparent"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     className="opacity-20"
//                     animate={{
//                         scale: [1, 1.15, 1],
//                         opacity: [0.1, 0.3, 0.1]
//                     }}
//                     transition={{
//                         duration: 3,
//                         repeat: Infinity,
//                         ease: "easeInOut"
//                     }}
//                 />
//             </motion.svg>
//
//             {/* Static Drop Shadow for performance */}
//             <div className="absolute inset-0 rounded-full blur-xl bg-teal-400/20 -z-10" />
//         </div>
//     );
// };
