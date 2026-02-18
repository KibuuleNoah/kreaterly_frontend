import { IconBrandApple, IconBrandGoogle } from "@tabler/icons-react"
import SocialLoginButton from "../SociaLoginButton"
import type { AuthStep, UserRole } from "../../types"
import { useEffect, useState } from "react"
import { pb } from "../../lib/pocketbase"



function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (local.length <= 5) return email; // too short to mask

  const start = local.slice(0, 3);
  const end = local.slice(-2);
  const masked = start + 'X'.repeat(local.length - 5) + end;
  return `${masked}@${domain}`;
}

interface Props{
  selectedUserRole: UserRole | string
  identifier: string
  setIdentifier: React.Dispatch<React.SetStateAction<string>>
  setAuthError: React.Dispatch<React.SetStateAction<string>>
  setAuthStep: React.Dispatch<React.SetStateAction<AuthStep>>
  setAuthOTPID: React.Dispatch<React.SetStateAction<string>>
}

const Login = ({ selectedUserRole, identifier, setIdentifier, setAuthError, setAuthStep, setAuthOTPID }: Props) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setAuthError('');

    try {
      const data = {
        "email": identifier,
        "emailVisibility": true,
        "name": "brand",
        "role": selectedUserRole,
        "password": "12345678", 
        "passwordConfirm": "12345678"
      };

      try{

      await pb.collection('users').getFirstListItem(`email = "${data.email}"`);
      }catch(err: any){
        if (err.status == 404){
          await pb.collection('users').create(data);
        }
      }

      // Request the OTP code to be sent to the email
      const req = await pb.collection('users').requestOTP(data.email);
      setAuthOTPID(req.otpId)
      alert(req.otpId)

      setIsProcessing(false);
      setIdentifier(maskEmail(identifier))
      setAuthStep('OTP_VERIFY');
    } catch (err: any) {
      setIsProcessing(false);
      setAuthError(err.message || 'An error occurred');
    }
  };

  

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[#0A0B0E] relative">
      {/* Left Side: Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 relative z-20 bg-[#0A0B0E] min-h-screen">
        <div className="max-w-md w-full space-y-12">
          <div className="space-y-8">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={()=>{}}>
              <div className="w-11 h-11 bg-teal-500 rounded-2xl flex items-center justify-center text-black font-black shadow-[0_4px_30px_rgba(20,184,166,0.3)]">
                <span className="text-xl font-display leading-none pt-0.5">KkKkkk</span>
              </div>
              <span className="font-display text-4xl tracking-tight text-white uppercase pt-1">Kreaterly</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase font-display leading-none">
                Sign in as a <span className="text-teal-500 uppercase">
                  {selectedUserRole}
                </span>
              </h2>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Protocol Version Node v3.5</p>
            </div>
          </div>

          <form onSubmit={handleRequestOtp} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Email address</label>
              <input 
                required 
                type="email" 
                placeholder="amanda@kreaterly.ug" 
                value={identifier} 
                onChange={e => setIdentifier(e.target.value)} 
                className="w-full bg-[#11141A] border border-white/5 rounded-3xl py-6 px-8 text-white font-bold focus:border-teal-500/50 outline-none transition-all placeholder:text-gray-800" 
              />
              <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest px-1 mt-2">A temporary access code will be sent to this email.</p>
            </div>

            <button 
              type="submit"
              disabled={isProcessing}
              className="w-full py-6 rounded-full font-black text-xl uppercase tracking-tighter shadow-2xl transition-all active:scale-95 hover:brightness(1.1) bg-teal-500 text-black shadow-teal-500/20"
            >
              {isProcessing ? 'SENDING CODE...' : 'CONTINUE'}
            </button>
          </form>

          <div className="space-y-6 pt-4">
            <div className="relative flex items-center justify-center">
               <div className="absolute w-full h-px bg-white/5"></div>
               <span className="relative z-10 bg-[#0A0B0E] px-6 text-[8px] font-black text-gray-600 uppercase tracking-[0.6em]">or link with social</span>
            </div>

            <div className="space-y-3">
               <SocialLoginButton label="Google" icon={<IconBrandGoogle />} />
               <SocialLoginButton label="Apple" icon={<IconBrandApple />} />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Gigs Slider Visual */}
    </div>
  )
}


export default Login
