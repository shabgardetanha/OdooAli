import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { DashboardProvider } from "./contexts/DashboardContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CompanyProvider } from "./contexts/CompanyContext";

const container = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <AuthProvider>
      <CompanyProvider>
        <DashboardProvider>
          <App />
        </DashboardProvider>
      </CompanyProvider>
    </AuthProvider>
  </React.StrictMode>
);
