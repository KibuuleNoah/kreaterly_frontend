import React, { useEffect, useState, type SetStateAction } from "react";
import { pb } from "../../lib/pocketbase";
import { useNavigate } from "react-router-dom";
import type { AlertType } from "../../types";
import { MaskEmail } from "../../constants";

interface Props {
  identifier: string;
  authOTPID: string;
  setAuthOTPID: React.Dispatch<SetStateAction<string>>;
  setAuthAlert: React.Dispatch<SetStateAction<AlertType>>;
  lastOtpRequest: string;
  setLastOtpRequest: React.Dispatch<SetStateAction<string>>;
}

function getRemainingCooldown(
  lastRequestedAt: string | null | undefined,
  cooldownSeconds: number = 120,
) {
  if (!lastRequestedAt)
    return { totalSeconds: 0, formatted: "0:00", isExpired: true };

  const lastRequest = new Date(lastRequestedAt).getTime();
  const now = new Date().getTime();
  const allowedAt = lastRequest + cooldownSeconds * 1000;
  const diff = allowedAt - now;

  if (diff <= 0) {
    return { totalSeconds: 0, formatted: "0:00", isExpired: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return {
    totalSeconds,
    formatted: `${minutes}:${seconds.toString().padStart(2, "0")}`,
    isExpired: false,
  };
}

const VerifyOTP: React.FC<Props> = ({
  identifier,
  authOTPID,
  setAuthOTPID,
  setAuthAlert,
  lastOtpRequest,
  setLastOtpRequest,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(
    getRemainingCooldown(lastOtpRequest),
  );
  const navigate = useNavigate();

  useEffect(() => {
    // Initial check
    const initial = getRemainingCooldown(lastOtpRequest);
    setTimeLeft(initial);

    // If already expired, don't start timer
    if (initial.isExpired) return;

    // Update every second
    const timer = setInterval(() => {
      const remaining = getRemainingCooldown(lastRequestDate);
      setTimeLeft(remaining);

      if (remaining.isExpired) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lastOtpRequest]); // Restart if lastRequestDate changes

  const verify = async (otpValue: string) => {
    if (otpValue.length !== 6) return;
    setIsProcessing(true);

    try {
      const authData = await pb
        .collection("users")
        .authWithOTP(authOTPID, otpValue);

      navigate(`/${authData.record.role}`);
    } catch (err: any) {
      setIsProcessing(false);
      setAuthAlert({
        message:
          err.status === 400 || err.status === 403
            ? "Invalid or expired code."
            : "An unexpected error occurred.",
        type: "error",
      });
    }
  };

  const handleResend = async () => {
    if (!timeLeft.isExpired || isProcessing) return;

    try {
      setIsProcessing(true);

      const res = await pb.collection("users").requestOTP(identifier, {
        raw: true,
      });
      setAuthOTPID(res.otpId);

      const userRecord = await pb
        .collection("users")
        .getFirstListItem(`email="${identifier}"`);

      setLastOtpRequest(userRecord?.last_otp_request || "");
      setAuthAlert({
        type: "success",
        message: "A new verification code has been sent.",
      });
    } catch (err: any) {
      setAuthAlert({
        type: "error",
        message:
          err?.response?.data?.message ||
          "Unable to resend code. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto space-y-6 md:space-y-10 animate-in slide-in-from-right-8 duration-500 py-4 px-4 h-full flex flex-col justify-center">
      <div className="space-y-2 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase font-display leading-tight">
          VERIFY <span className="text-teal-500">CREDENTIALS</span>
        </h2>
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
          A 6-digit code was dispatched to
        </p>
        <p className="text-sm md:text-xl font-black text-white bg-white/5 inline-block px-4 py-2 rounded-xl border border-white/5">
          {MaskEmail(identifier)}
        </p>
      </div>

      <div className="bg-[#11141A]/80 backdrop-blur-2xl border border-white/10 rounded-[48px] overflow-hidden shadow-3xl p-8 md:p-12 space-y-10 text-center">
        <form className="space-y-10">
          <div className="flex justify-center gap-2 md:gap-3">
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                autoFocus={idx === 0}
                className="w-10 h-14 md:w-12 md:h-16 bg-black/60 border border-white/10 rounded-2xl text-center text-xl md:text-3xl font-black text-teal-400 focus:border-teal-500 outline-none transition-all shadow-inner"
                value={otp[idx] || ""}
                onKeyDown={(e) => {
                  if (
                    e.key === "Backspace" &&
                    !otp[idx] &&
                    e.currentTarget.previousElementSibling
                  ) {
                    (
                      e.currentTarget.previousElementSibling as HTMLInputElement
                    ).focus();
                  }
                }}
                onChange={(e) => {
                  if (isProcessing) return;
                  const val = e.target.value;
                  const newOtpArr = otp.padEnd(6, " ").split("");
                  newOtpArr[idx] = val.slice(-1);

                  const updatedOtp = newOtpArr.join("").trim();
                  setOtp(updatedOtp);

                  if (val && e.target.nextElementSibling) {
                    (e.target.nextElementSibling as HTMLInputElement).focus();
                  }

                  if (updatedOtp.length === 6) {
                    verify(updatedOtp);
                  }
                }}
              />
            ))}
          </div>

          <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
            {isProcessing && (
              <div className="absolute inset-0 bg-teal-500 animate-[slide-infinite_2s_linear_infinite]"></div>
            )}
          </div>

          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
            {isProcessing
              ? "SYNCHRONIZING HUB..."
              : "SYSTEM WAITING FOR CREDENTIALS"}
          </p>

          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => {}}
              disabled={timeLeft.isExpired}
              className={`text-[10px] font-black uppercase tracking-widest transition-colors
                ${
                  !timeLeft.isExpired
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-teal-500 hover:text-white"
                }`}
            >
              Didn’t receive the code?{" "}
              {!timeLeft.isExpired ? (
                <span className="text6-gray-400">
                  Request again in {timeLeft.formatted}
                </span>
              ) : (
                <span>Request New Code</span>
              )}
            </button>

            {!timeLeft.isExpired && (
              <p className="text-[11px] text-gray-400 text-center max-w-xs">
                For security reasons, you can request a new code once the timer
                finishes. Please also check your spam folder.
              </p>
            )}
          </div>
          <div>
            {timeLeft.isExpired ? (
              <button className="btn-active">Resend OTP</button>
            ) : (
              <button className="btn-disabled" disabled>
                Wait {timeLeft.formatted} to resend
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

// interface Props {
//   identifier: string;
//   authOTPID: string;
//   setAuthAlert: React.Dispatch<React.SetStateAction<AlertType>>;
// }
//
// const VerifyOTP: React.FC<Props> = ({
//   identifier,
//   authOTPID,
//   setAuthAlert,
// }) => {
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [allowedAt, setAllowedAt] = useState("2026-02-27T10:02:00Z");
//     // localStorage.getItem("otp_allowed_at"),
//   const [secondsLeft, setSecondsLeft] = useState(0);
//   const [otp, setOtp] = useState("");
//   const navigate = useNavigate();
//
//   // Sync the UI countdown
//   useEffect(() => {
//     if (!allowedAt) return;
//
//     const calculate = () => {
//       const diff = Math.ceil(
//         (new Date(allowedAt).getTime() - Date.now()) / 1000,
//       );
//       if (diff <= 0) {
//         setSecondsLeft(0);
//         setAllowedAt("");
//         // localStorage.removeItem("otp_allowed_at");
//       } else {
//         setSecondsLeft(diff);
//       }
//     };
//
//     calculate();
//     const ticker = setInterval(calculate, 1000);
//     return () => clearInterval(ticker);
//   }, [allowedAt]);
//
//   const verify = async (otpValue: string) => {
//     if (otpValue.length !== 6) return; // Guard clause
//     setIsProcessing(true);
//
//     try {
//       const authData = await pb
//         .collection("users")
//         .authWithOTP(authOTPID, otpValue);
//       navigate(`/${authData.record.role}`);
//     } catch (err: any) {
//       setIsProcessing(false); // MUST reset this so user can try again
//       console.error("Auth failed:", err.data);
//       setAuthAlert({
//         message:
//           err.status === 400 || err.status === 403
//             ? "Invalid or expired code."
//             : "An unexpected error occurred.",
//         type: "error",
//       });
//     }
//   };
//
//   return (
//     <div className="max-w-md w-full mx-auto space-y-6 md:space-y-10 animate-in slide-in-from-right-8 duration-500 py-4 px-4 h-full flex flex-col justify-center">
//       <div className="space-y-2 text-center">
//         <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase font-display leading-tight">
//           VERIFY <span className="text-teal-500">CREDENTIALS</span>
//         </h2>
//         <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
//           A 6-digit code was dispatched to
//         </p>
//         <p className="text-sm md:text-xl font-black text-white bg-white/5 inline-block px-4 py-2 rounded-xl border border-white/5">
//           {identifier}
//         </p>
//       </div>
//
//       <div className="bg-[#11141A]/80 backdrop-blur-2xl border border-white/10 rounded-[48px] overflow-hidden shadow-3xl p-8 md:p-12 space-y-10 text-center">
//         <form className="space-y-10">
//           <div className="flex justify-center gap-2 md:gap-3">
//             {[0, 1, 2, 3, 4, 5].map((idx) => (
//               <input
//                 key={idx}
//                 type="text"
//                 maxLength={1}
//                 autoFocus={idx === 0}
//                 className="w-10 h-14 md:w-12 md:h-16 bg-black/60 border border-white/10 rounded-2xl text-center text-xl md:text-3xl font-black text-teal-400 focus:border-teal-500 outline-none transition-all shadow-inner"
//                 value={otp[idx] || ""}
//                 onKeyDown={(e) => {
//                   if (
//                     e.key === "Backspace" &&
//                     !otp[idx] &&
//                     e.currentTarget.previousElementSibling
//                   ) {
//                     (
//                       e.currentTarget.previousElementSibling as HTMLInputElement
//                     ).focus();
//                   }
//                 }}
//                 onChange={(e) => {
//                   if (isProcessing) return;
//                   const val = e.target.value;
//                   const newOtpArr = otp.padEnd(6, " ").split(""); // Ensure array is 6 long
//                   newOtpArr[idx] = val.slice(-1);
//
//                   const updatedOtp = newOtpArr.join("").trim();
//                   setOtp(updatedOtp);
//
//                   if (val && e.target.nextElementSibling) {
//                     (e.target.nextElementSibling as HTMLInputElement).focus();
//                   }
//
//                   // Pass the fresh value directly to verify
//                   if (updatedOtp.length === 6) {
//                     verify(updatedOtp);
//                   }
//                 }}
//               />
//             ))}
//           </div>
//
//           <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
//             {isProcessing && (
//               <div className="absolute inset-0 bg-teal-500 animate-[slide-infinite_2s_linear_infinite]"></div>
//             )}
//           </div>
//
//           <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
//             {isProcessing
//               ? "SYNCHRONIZING HUB..."
//               : "SYSTEM WAITING FOR CREDENTIALS"}
//           </p>
//
//           <button
//             type="button"
//             className="text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors"
//           >
//             DIDN'T RECEIVE CODE?{" "}
//             <span className="text-teal-500">Request New Code</span>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };
// {
//   "code": 429,
//   "message": "Please wait before requesting another OTP",
//   "data": {
//     "retryAfter": 75,
//     "allowedAt": "2026-02-27T10:02:00Z"
//   }
// }

// export default function OtpManager({ email }) {
//   const [allowedAt, setAllowedAt] = useState(
//     localStorage.getItem("otp_allowed_at"),
//   );
//   const [secondsLeft, setSecondsLeft] = useState(0);
//
//   // Sync the UI countdown
//   useEffect(() => {
//     if (!allowedAt) return;
//
//     const calculate = () => {
//       const diff = Math.ceil(
//         (new Date(allowedAt).getTime() - Date.now()) / 1000,
//       );
//       if (diff <= 0) {
//         setSecondsLeft(0);
//         setAllowedAt(null);
//         localStorage.removeItem("otp_allowed_at");
//       } else {
//         setSecondsLeft(diff);
//       }
//     };
//
//     calculate();
//     const ticker = setInterval(calculate, 1000);
//     return () => clearInterval(ticker);
//   }, [allowedAt]);
//
//   const handleRequest = async () => {
//     try {
//       // 1. Perform request
//       const response = await pb.collection("users").requestOTP(email);
//
//       // 2. Capture the timestamp from the custom header we set in Go
//       // In many environments, you'll need to use the Fetch response directly if headers are stripped
//       // But since we want to be safe, we can also "predict" it or read the specific header:
//       const nextAllowedAt = new Date(Date.now() + 60000).toISOString();
//
//       // If your Go backend is configured to allow CORS for this header:
//       // const nextAllowedAt = response.headers['x-next-allowed-at'];
//
//       updateCooldown(nextAllowedAt);
//       alert("OTP Sent successfully!");
//     } catch (err) {
//       // 3. Handle the 'Bypass' attempt
//       if (err.status === 429) {
//         const serverTimestamp = err.data?.allowedAt;
//         updateCooldown(serverTimestamp);
//       }
//       console.error(err.message);
//     }
//   };
//
//   const updateCooldown = (timestamp) => {
//     setAllowedAt(timestamp);
//     localStorage.setItem("otp_allowed_at", timestamp);
//   };
//
//   return (
//     <div className="p-4">
//       <button
//         onClick={handleRequest}
//         disabled={secondsLeft > 0}
//         className="btn-primary"
//       >
//         {secondsLeft > 0 ? `Resend in ${secondsLeft}s` : "Request OTP"}
//       </button>
//
//       {secondsLeft > 0 && (
//         <p className="text-sm text-gray-500 mt-2">
//           Next available: {new Date(allowedAt).toLocaleTimeString()}
//         </p>
//       )}
//     </div>
//   );
// }
export default VerifyOTP;
