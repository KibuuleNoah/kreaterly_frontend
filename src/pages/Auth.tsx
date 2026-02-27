import React, { useEffect, useState } from "react";
import { UserRole, type AlertType, type AuthStep } from "../types";
import UserRoleSelection from "../components/Auth/UserRoleSelection";
import VerifyOTP from "../components/Auth/VerifyOTP";
import Landing from "./Landing";
import { useSearchParams } from "react-router-dom";

import Alert from "../components/Alert";
import AuthComponent from "../components/Auth/AuthComponent";

const Auth: React.FC = () => {
  const [authStep, setAuthStep] = useState<AuthStep>("ROLE_SELECTION");
  const [selectedUserRole, setSelectedUserRole] = useState<UserRole | string>(
    "",
  );
  const [identifier, setIdentifier] = useState("");
  const [authAlert, setAuthAlert] = useState<AlertType>({
    message: "",
    type: "error",
  });
  const [authOTPID, setAuthOTPID] = useState<string>("");
  const [lastOtpRequest, setLastOtpRequest] = useState<string>(
    localStorage.getItem("kty_last_otp_request") || "",
  );

  const [searchParams] = useSearchParams();

  useEffect(() => {
    localStorage.setItem("kty_last_otp_request", lastOtpRequest);
  }, [lastOtpRequest]);

  useEffect(() => {
    const GetRoleAutomatically = () => {
      const role = searchParams.get("role");
      if (role !== null) {
        if (role === "brand") {
          setSelectedUserRole(UserRole.BRAND);
          setAuthStep("AUTH_ENTRY");
        } else if (role === "creator") {
          setSelectedUserRole(UserRole.CREATOR);
          setAuthStep("AUTH_ENTRY");
        }
      }
    };
    GetRoleAutomatically();
  }, []);

  const handleRoleSelect = (role: string) => {
    setSelectedUserRole(role);
    setAuthStep("AUTH_ENTRY");
  };

  const renderContent = () => {
    switch (authStep) {
      case "ROLE_SELECTION":
        return <UserRoleSelection handleRoleSelect={handleRoleSelect} />;
      case "AUTH_ENTRY":
        return (
          <AuthComponent
            selectedUserRole={selectedUserRole}
            identifier={identifier}
            setIdentifier={setIdentifier}
            setAuthStep={setAuthStep}
            setAuthAlert={setAuthAlert}
            authAlert={authAlert}
            setAuthOTPID={setAuthOTPID}
            setLastOtpRequest={setLastOtpRequest}
          />
        );
      case "OTP_VERIFY":
        return (
          <VerifyOTP
            identifier={identifier}
            authOTPID={authOTPID}
            setAuthOTPID={setAuthOTPID}
            setAuthAlert={setAuthAlert}
            lastOtpRequest={lastOtpRequest}
            setLastOtpRequest={setLastOtpRequest}
          />
        );
      default:
        return <Landing />;
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#0A0B0E] overflow-y-auto overflow-x-hidden">
      {/* Background remains fixed */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-teal-500/5 blur-[200px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-teal-500/5 blur-[200px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full min-h-full flex flex-col justify-center items-center py-10 px-4">
        <Alert {...authAlert} />
        {renderContent()}
      </div>
    </div>
  );
};

export default Auth;
