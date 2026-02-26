import { IconBrandApple, IconBrandGoogle } from "@tabler/icons-react";
import SocialLoginButton from "../SociaLoginButton";
import type { AuthStep, UserRole } from "../../types";
import { useEffect, useState } from "react";
import { pb } from "../../lib/pocketbase";
import { KreaterlyLogoAnimateDraw, KreaterlyLogoAnimateGrow } from "../Icons";
import { motion, AnimatePresence } from "framer-motion";

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (local.length <= 5) return email; // too short to mask

  const start = local.slice(0, 3);
  const end = local.slice(-2);
  const masked = start + "X".repeat(local.length - 5) + end;
  return `${masked}@${domain}`;
}

interface Props {
  selectedUserRole: UserRole | string;
  identifier: string;
  setIdentifier: React.Dispatch<React.SetStateAction<string>>;
  setAuthError: React.Dispatch<React.SetStateAction<string>>;
  authError: string;
  setAuthStep: React.Dispatch<React.SetStateAction<AuthStep>>;
  setAuthOTPID: React.Dispatch<React.SetStateAction<string>>;
}

type AuthMode = "LOGIN" | "SIGNUP";

const Login = ({
  selectedUserRole,
  identifier,
  setIdentifier,
  setAuthError,
  authError,
  setAuthStep,
  setAuthOTPID,
}: Props) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("LOGIN");

  const toggleMode = () => {
    setAuthMode((prev) => (prev === "LOGIN" ? "SIGNUP" : "LOGIN"));
    setAuthError("");
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setAuthError("");

    try {
      // 1. Check if user exists
      let existingUser = null;
      try {
        existingUser = await pb
          .collection("users")
          .getFirstListItem(`email = "${identifier}"`);
      } catch (err: any) {
        // 404 means user not found
      }

      // 2. Logic: If Login but no user, or Signup but user exists
      if (authMode === "LOGIN" && !existingUser) {
        setIsProcessing(false);
        setAuthError("Email not found. Create an account instead?");
        return; // Stops here so user can click 'Create'
      }

      if (authMode === "SIGNUP" && existingUser) {
        setIsProcessing(false);
        setAuthError("Account already exists. Try signing in?");
        return;
      }

      // 3. Create user if in Signup mode
      if (authMode === "SIGNUP" && !existingUser) {
        await pb.collection("users").create({
          email: identifier,
          emailVisibility: true,
          name: "User",
          role: selectedUserRole,
          password: "secure-random-password-123", // OTP bypasses this usually
          passwordConfirm: "secure-random-password-123",
        });
      }

      // 4. Request OTP
      const req = await pb.collection("users").requestOTP(identifier);
      setAuthOTPID(req.otpId);

      setIdentifier(maskEmail(identifier));
      setAuthStep("OTP_VERIFY");
    } catch (err: any) {
      setAuthError(err.message || "Something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[#0A0B0E] relative overflow-hidden">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 relative z-20 bg-[#0A0B0E] min-h-screen">
        <div className="">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={authMode} // Triggers animation when mode changes
              initial={{
                opacity: 0,
                x: authMode === "LOGIN" ? -20 : 20,
                filter: "blur(10px)",
              }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{
                opacity: 0,
                x: authMode === "LOGIN" ? 20 : -20,
                filter: "blur(10px)",
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Custom cubic-bezier for "snappy" feel
              className="space-y-12"
            >
              {/* Header Section */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <KreaterlyLogoAnimateDraw />
                  <span className="font-display text-4xl tracking-tight text-white uppercase pt-1">
                    Kreaterly
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-4xl md:text-5xl font-black text-gray-500 tracking-tighter uppercase font-display leading-none text-center">
                    {authMode === "LOGIN" ? "Sign in as a" : "Join us as a"}{" "}
                    <span className="block text-teal-500 uppercase text-center">
                      {selectedUserRole}
                    </span>
                  </h2>
                </div>
              </div>

              {/* Form Section */}
              <form onSubmit={handleRequestOtp} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">
                    Email address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="amanda@kreaterly.ug"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full bg-[#11141A] border border-white/5 rounded-3xl py-6 px-8 text-white font-bold focus:border-teal-500/50 outline-none transition-all placeholder:text-gray-800"
                  />
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-6 rounded-full font-black text-xl uppercase tracking-tighter shadow-2xl transition-all active:scale-95 hover:brightness(110%) bg-teal-500 text-black shadow-teal-500/20"
                  >
                    {isProcessing
                      ? "SENDING CODE..."
                      : authMode === "LOGIN"
                        ? "CONTINUE"
                        : "CREATE ACCOUNT"}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={toggleMode}
                      className="text-white/60 hover:text-teal-500 transition-colors text-xs font-bold"
                    >
                      {authMode === "LOGIN" ? (
                        <>
                          Don't Have An Account?{" "}
                          <span className="text-teal-500 underline underline-offset-4 ml-1">
                            Create One
                          </span>
                        </>
                      ) : (
                        <>
                          Already Have An Account?{" "}
                          <span className="text-teal-500 underline underline-offset-4 ml-1">
                            Sign In
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>

          {/* Footer (Socials) - Keep outside AnimatePresence so it doesn't move */}
          <div className="space-y-6 pt-4">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-full h-px bg-white/5"></div>
              <span className="relative z-10 bg-[#0A0B0E] px-6 text-[8px] font-black text-gray-600 uppercase tracking-[0.6em]">
                or link with social
              </span>
            </div>
            <div className="space-y-3">
              <SocialLoginButton label="Google" icon={<IconBrandGoogle />} />
              <SocialLoginButton label="Apple" icon={<IconBrandApple />} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// const Login = ({
//   selectedUserRole,
//   identifier,
//   setIdentifier,
//   setAuthError,
//   setAuthStep,
//   setAuthOTPID,
// }: Props) => {
//   const [isProcessing, setIsProcessing] = useState(false);
//
//   const handleRequestOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsProcessing(true);
//     setAuthError("");
//
//     try {
//       const data = {
//         email: identifier,
//         emailVisibility: true,
//         name: "brand",
//         role: selectedUserRole,
//         password: "12345678",
//         passwordConfirm: "12345678",
//       };
//
//       try {
//         await pb
//           .collection("users")
//           .getFirstListItem(`email = "${data.email}"`);
//       } catch (err: any) {
//         if (err.status == 404) {
//           await pb.collection("users").create(data);
//         }
//       }
//
//       // Request the OTP code to be sent to the email
//       const req = await pb.collection("users").requestOTP(data.email);
//       setAuthOTPID(req.otpId);
//       alert(req.otpId);
//
//       setIsProcessing(false);
//       setIdentifier(maskEmail(identifier));
//       setAuthStep("OTP_VERIFY");
//     } catch (err: any) {
//       setIsProcessing(false);
//       setAuthError(err.message || "An error occurred");
//     }
//   };
//
//   return (
//     <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[#0A0B0E] relative">
//       {/* Left Side: Auth Form */}
//       <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 relative z-20 bg-[#0A0B0E] min-h-screen">
//         <div className="max-w-md w-full space-y-12">
//           <div className="space-y-8">
//             <div
//               className="flex items-center gap-4 group cursor-pointer"
//               onClick={() => {}}
//             >
//               <KreaterlyLogoAnimateDraw />
//               <span className="font-display text-4xl tracking-tight text-white uppercase pt-1">
//                 Kreaterly
//               </span>
//             </div>
//
//             <div className="space-y-2">
//               <h2 className="text-4xl md:text-5xl font-black text-gray-500 tracking-tighter uppercase font-display leading-none text-center">
//                 Sign in as a{" "}
//                 <span className="block text-teal-500 uppercase text-center">
//                   {selectedUserRole}
//                 </span>
//               </h2>
//             </div>
//           </div>
//
//           <form onSubmit={handleRequestOtp} className="space-y-8">
//             <div className="space-y-2">
//               <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">
//                 Email address
//               </label>
//               <input
//                 required
//                 type="email"
//                 placeholder="amanda@kreaterly.ug"
//                 value={identifier}
//                 onChange={(e) => setIdentifier(e.target.value)}
//                 className="w-full bg-[#11141A] border border-white/5 rounded-3xl py-6 px-8 text-white font-bold focus:border-teal-500/50 outline-none transition-all placeholder:text-gray-800"
//               />
//             </div>
//
//             <button
//               type="submit"
//               disabled={isProcessing}
//               className="w-full py-6 rounded-full font-black text-xl uppercase tracking-tighter shadow-2xl transition-all active:scale-95 hover:brightness(1.1) bg-teal-500 text-black shadow-teal-500/20"
//             >
//               {isProcessing ? "SENDING CODE..." : "CONTINUE"}
//             </button>
//             <small className="text-white">
//               Don't Have An Account Yet?,{" "}
//               <span className="text-teal-500 uppercase font-bold">
//                 Create One
//               </span>
//             </small>
//           </form>
//
//           <div className="space-y-6 pt-4">
//             <div className="relative flex items-center justify-center">
//               <div className="absolute w-full h-px bg-white/5"></div>
//               <span className="relative z-10 bg-[#0A0B0E] px-6 text-[8px] font-black text-gray-600 uppercase tracking-[0.6em]">
//                 or link with social
//               </span>
//             </div>
//
//             <div className="space-y-3">
//               <SocialLoginButton label="Google" icon={<IconBrandGoogle />} />
//               <SocialLoginButton label="Apple" icon={<IconBrandApple />} />
//             </div>
//           </div>
//         </div>
//       </div>
//
//     </div>
//   );
// };

export default Login;
