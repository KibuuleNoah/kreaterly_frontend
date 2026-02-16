import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreatorDashboard from "./pages/CreatorDashboard";
import BrandDashboard from "./pages/BrandDashboard";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Onboarding from "./components/Auth/Onboarding";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
 {
    path: "/home",
    element: <Home />
  },
  {
    path: "/auth",
    element: <Onboarding />
  },
 {
    path: "/brand",
    element: <BrandDashboard />
  },
  {
    path: "/creator",
    element: <CreatorDashboard />
  }
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
