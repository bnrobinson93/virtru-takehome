import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HealthDashboard from "./HealthDashboard";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HealthDashboard />
  </StrictMode>,
);
