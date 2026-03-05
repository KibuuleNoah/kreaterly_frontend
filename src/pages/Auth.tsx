import React, { useEffect, useState } from "react";
import { UserRole, type AlertType, type AuthStep } from "../types";
import UserRoleSelection from "../components/Auth/UserRoleSelection";
import VerifyOTP from "../components/Auth/VerifyOTP";
import Landing from "./Landing";
import { useSearchParams } from "react-router-dom";

import Alert from "../components/Alert";
import AuthComponent from "../components/Auth/AuthComponent";

const Auth: React.FC = () => {
  const [authStep, setAuthStep] = useState<AuthStep>(
    (localStorage.getItem("kty_auth_step") as AuthStep) || "ROLE_SELECTION",
  );
  const [selectedUserRole, setSelectedUserRole] = useState<UserRole | string>(
    localStorage.getItem("kty_selected_user_role") || "",
  );
  const [identifier, setIdentifier] = useState("");
  const [authAlert, setAuthAlert] = useState<AlertType>({
    message: "",
    type: "error",
  });
  // Used by the back btn to travese views
  const [navTree, setNavTree] = useState<string[]>(["ROLE_SELECTION"]);

  const [authOTPID, setAuthOTPID] = useState<string>(
    localStorage.getItem("kty_auth_otp_id") || "",
  );
  const [lastOtpRequest, setLastOtpRequest] = useState<string>(
    localStorage.getItem("kty_last_otp_request") || "",
  );

  const [searchParams] = useSearchParams();

  useEffect(() => {
    localStorage.setItem("kty_auth_step", authStep);
  }, [authStep]);

  useEffect(() => {
    localStorage.setItem("kty_selected_user_role", selectedUserRole);
  }, [selectedUserRole]);

  useEffect(() => {
    localStorage.setItem("kty_auth_otp_id", authOTPID);
  }, [authOTPID]);

  useEffect(() => {
    // When the tree grows (user goes forward), push a new entry to the browser history
    // This gives the hardware back button something to "pop"
    if (navTree.length > 1) {
      window.history.pushState({ view: navTree[navTree.length - 1] }, "");
    }

    const handleHardwareBack = (event: PopStateEvent) => {
      // If user hits hardware back and we have a custom history
      if (navTree.length > 1) {
        // Prevent the browser from actually leaving the site
        event.preventDefault();

        // Trigger your existing logic to go back in your state
        setNavTree((prev) => {
          const newTree = prev.slice(0, -1);
          setAuthStep(`${newTree[newTree.length - 1]}` as AuthStep);
          return newTree;
        });
      }
    };

    // Listen for the hardware/browser back button
    window.addEventListener("popstate", handleHardwareBack);

    return () => window.removeEventListener("popstate", handleHardwareBack);
  }, [navTree, setNavTree]);

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
    setNavTree((prev) => [...prev, "AUTH_ENTRY"]);
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
            setNavTree={setNavTree}
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
