import { createContext, useContext, useState, ReactNode } from "react";

export type CaseStatus = "pending" | "approved" | "rejected";

export interface ShopCase {
  id: string;
  shopName: string;
  ownerName: string;
  images: string[];
  location: string;
  submittedAt: string;
  status: CaseStatus;
}

interface CaseContextType {
  cases: ShopCase[];
  addCase: (c: Omit<ShopCase, "id" | "submittedAt" | "status">) => string;
  updateStatus: (id: string, status: CaseStatus) => void;
  getOwnerCases: (ownerName: string) => ShopCase[];
}

const CaseContext = createContext<CaseContextType | null>(null);

const demoCases: ShopCase[] = [
  {
    id: "CASE-001",
    shopName: "Sharma General Store",
    ownerName: "demo",
    images: ["shelf_1.jpg", "counter_1.jpg", "exterior_1.jpg"],
    location: "Andheri West, Mumbai",
    submittedAt: "2025-04-10T10:30:00Z",
    status: "pending",
  },
];

export function CaseProvider({ children }: { children: ReactNode }) {
  const [cases, setCases] = useState<ShopCase[]>(demoCases);

  const addCase = (c: Omit<ShopCase, "id" | "submittedAt" | "status">) => {
    const id = `CASE-${String(cases.length + 1).padStart(3, "0")}`;
    const newCase: ShopCase = {
      ...c,
      id,
      submittedAt: new Date().toISOString(),
      status: "pending",
    };
    setCases((prev) => [...prev, newCase]);
    return id;
  };

  const updateStatus = (id: string, status: CaseStatus) => {
    setCases((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  const getOwnerCases = (ownerName: string) =>
    cases.filter((c) => c.ownerName === ownerName);

  return (
    <CaseContext.Provider value={{ cases, addCase, updateStatus, getOwnerCases }}>
      {children}
    </CaseContext.Provider>
  );
}

export function useCases() {
  const ctx = useContext(CaseContext);
  if (!ctx) throw new Error("useCases must be used within CaseProvider");
  return ctx;
}
