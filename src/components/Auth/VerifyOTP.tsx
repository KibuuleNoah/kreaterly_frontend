











import React, { useState } from "react";
import { pb } from "../../lib/pocketbase";
import { useNavigate } from "react-router-dom";


interface Props{
  identifier: string
  authOTPID: string
  setAuthError: React.Dispatch<React.SetStateAction<string>>
}

const VerifyOTP = ({ identifier, authOTPID, setAuthError }: Props) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const verify = async (otpValue: string) => { 
    if (otpValue.length !== 6) return; // Guard clause
    setIsProcessing(true);

    try {
      const authData = await pb.collection('users').authWithOTP(authOTPID, otpValue);
      navigate(`/${authData.record.role}`);
    } catch (err: any) {
      setIsProcessing(false); // MUST reset this so user can try again
      console.error("Auth failed:", err.data);
      setAuthError(err.status === 400 || err.status === 403 
        ? "Invalid or expired code." 
        : "An unexpected error occurred.");
    }
  };
 
  return (
    <div className="max-w-md w-full mx-auto space-y-6 md:space-y-10 animate-in slide-in-from-right-8 duration-500 py-4 px-4 h-full flex flex-col justify-center">
      <div className="space-y-2 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase font-display leading-tight">
          VERIFY <span className="text-teal-500">CREDENTIALS</span>
        </h2>
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">A 6-digit code was dispatched to</p>
        <p className="text-sm md:text-xl font-black text-white bg-white/5 inline-block px-4 py-2 rounded-xl border border-white/5">{identifier}</p>
        <div className="mt-2 text-teal-400 text-[10px] font-black uppercase tracking-widest border border-teal-500/20 bg-teal-500/5 px-4 py-2 rounded-lg inline-block animate-pulse">
           DEV MODE: AUTO-CHECKS FOR xxxxx
        </div>
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
                value={otp[idx] || ''}
                onKeyDown={e => {
                  if (e.key === 'Backspace' && !otp[idx] && e.currentTarget.previousElementSibling) {
                    (e.currentTarget.previousElementSibling as HTMLInputElement).focus();
                  }
                }}

                onChange={e => {
                  if (isProcessing) return;
                  const val = e.target.value;
                  const newOtpArr = otp.padEnd(6, ' ').split(''); // Ensure array is 6 long
                  newOtpArr[idx] = val.slice(-1);

                  const updatedOtp = newOtpArr.join('').trim();
                  setOtp(updatedOtp);

                  if (val && e.target.nextElementSibling) {
                    (e.target.nextElementSibling as HTMLInputElement).focus();
                  }

                  // Pass the fresh value directly to verify
                  if (updatedOtp.length === 6) {
                    verify(updatedOtp); 
                  }
                }}
                />
            ))}
          </div>

          <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
            {isProcessing && <div className="absolute inset-0 bg-teal-500 animate-[slide-infinite_2s_linear_infinite]"></div>}
          </div>

          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
            {isProcessing ? 'SYNCHRONIZING HUB...' : 'SYSTEM WAITING FOR CREDENTIALS'}
          </p>
          
          <button type="button" className="text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors">
            DIDN'T RECEIVE CODE? <span className="text-teal-500">RESEND NOW</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default VerifyOTP

