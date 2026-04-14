import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "shop_owner" | "loan_officer";

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole | null;
  userName: string;
}

interface AuthContextType extends AuthState {
  login: (role: UserRole, name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = sessionStorage.getItem("kl_auth");
    return saved ? JSON.parse(saved) : { isAuthenticated: false, role: null, userName: "" };
  });

  const login = (role: UserRole, name: string) => {
    const state = { isAuthenticated: true, role, userName: name };
    sessionStorage.setItem("kl_auth", JSON.stringify(state));
    setAuth(state);
  };

  const logout = () => {
    sessionStorage.removeItem("kl_auth");
    setAuth({ isAuthenticated: false, role: null, userName: "" });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
