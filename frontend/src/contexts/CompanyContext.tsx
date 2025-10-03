import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserRole, useAuth } from "./AuthContext";

export interface Company {
  id: number;
  name: string;
}

interface CompanyContextType {
  currentCompany: Company | null;
  switchCompany: (company: Company) => void;
  allowedRoles: UserRole[];
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);

  // برای هر شرکت می‌توان Roleهای مجاز را بر اساس User تعیین کرد
  const allowedRoles: UserRole[] = user?.role ? [user.role] : [];

  const switchCompany = (company: Company) => setCurrentCompany(company);

  return (
    <CompanyContext.Provider value={{ currentCompany, switchCompany, allowedRoles }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = (): CompanyContextType => {
  const context = useContext(CompanyContext);
  if (!context) throw new Error("useCompany must be used within CompanyProvider");
  return context;
};
