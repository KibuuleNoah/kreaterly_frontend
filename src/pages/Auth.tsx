








import React, { useState } from "react";
import { UserRole, type AuthStep } from "../types";
import UserRoleSelection from "../components/Auth/UserRoleSelection";
import Login from "../components/Auth/Login";
import VerifyOTP from "../components/Auth/VerifyOTP";
import Landing from "./Landing";



const Auth: React.FC = () => {
  const [authStep, setAuthStep] = useState<AuthStep>('ROLE_SELECTION'); 
  const [selectedUserRole, setSelectedUserRole] = useState<UserRole | string>("");
  const [identifier, setIdentifier] = useState('');
  const [authError, setAuthError] = useState<string>('');
  const [authOTPID, setAuthOTPID] = useState<string>('');


  // const usePersistState = (key: string, defaultValue: any, expiryInHours: number = 24) => {
  //   const [state, setState] = useState(() => {
  //     const saved = localStorage.getItem(key);
  //     if (saved) {
  //       const { value, expiry } = JSON.parse(saved);
  //       // Check if expiry hours have passed
  //       if (new Date().getTime() < expiry) {
  //         return value;
  //       }
  //       localStorage.removeItem(key);
  //     }
  //     return defaultValue;
  //   });
  //
  //   useEffect(() => {
  //     const expiry = new Date().getTime() + expiryInHours * 60 * 60 * 1000;
  //     localStorage.setItem(key, JSON.stringify({ value: state, expiry }));
  //   }, [key, state, expiryInHours]);
  //
  //   return [state, setState];
  // }



  const handleRoleSelect = (role: string) => {
    setSelectedUserRole(role);
    setAuthStep('AUTH_ENTRY');
  };

  // const handleAuthStepLocation = (step: AuthStep) =>{
  //   setAuthStep(step)
  // }

  
  const renderContent = () => {
    switch(authStep) {
      case 'ROLE_SELECTION': return <UserRoleSelection handleRoleSelect={handleRoleSelect} />; 
      case 'AUTH_ENTRY': return <Login selectedUserRole={selectedUserRole} identifier={identifier} setIdentifier={setIdentifier} setAuthStep={setAuthStep} setAuthError={setAuthError} setAuthOTPID={setAuthOTPID}/>
      case 'OTP_VERIFY': return <VerifyOTP identifier={identifier} authOTPID={authOTPID} setAuthError={setAuthError}/> 
      default: return <Landing />;
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#0A0B0E] overflow-y-auto overflow-x-hidden">
      {/* Background remains fixed */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-teal-500/5 blur-[200px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-teal-500/5 blur-[200px] rounded-full"></div>
      </div>
      
      {authError && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest animate-shake">{authError}</p>}
      {/* Changed: Removed items-center, added py-10 for scroll safety */}
      <div className="relative z-10 w-full min-h-full flex flex-col justify-center items-center py-10 px-4">
      {renderContent()}
      </div>
    </div>
  )
}

export default Auth;
