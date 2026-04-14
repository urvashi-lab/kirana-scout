import { Shield, LogOut, FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export function ShopOwnerLayout({ children }: { children: React.ReactNode }) {
  const { userName, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { label: "My Applications", path: "/owner/status", icon: FileText },
    { label: "New Submission", path: "/owner/upload", icon: Upload },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="h-14 flex items-center justify-between border-b bg-card px-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <span className="text-sm font-heading font-bold text-foreground">KiranaLens</span>
            <span className="text-xs text-muted-foreground ml-2 hidden sm:inline">Welcome, {userName}</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={logout}>
          <LogOut className="h-4 w-4 mr-1.5" /> Sign Out
        </Button>
      </header>

      <nav className="flex border-b bg-card px-4 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors",
              location.pathname === tab.path
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
    </div>
  );
}
