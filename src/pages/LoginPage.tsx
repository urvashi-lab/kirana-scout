import { useState } from "react";
import { Shield, Store, Briefcase, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole && name.trim()) {
      login(selectedRole, name.trim());
    }
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center">
            <div className="h-14 w-14 rounded-2xl bg-primary mx-auto flex items-center justify-center mb-4">
              <Shield className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-foreground">KiranaLens</h1>
            <p className="text-sm text-muted-foreground mt-1">AI Credit Intelligence Platform</p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-center text-muted-foreground">Select your role to continue</p>

            <button
              onClick={() => setSelectedRole("shop_owner")}
              className="w-full glass-card rounded-2xl p-6 text-left hover:border-primary/40 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-risk-low/10 flex items-center justify-center">
                  <Store className="h-6 w-6 text-risk-low" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-foreground">Shop Owner</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Submit your shop for credit assessment</p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </button>

            <button
              onClick={() => setSelectedRole("loan_officer")}
              className="w-full glass-card rounded-2xl p-6 text-left hover:border-primary/40 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-foreground">Loan Officer</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Access analytics and credit decisions</p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isOwner = selectedRole === "shop_owner";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className={cn("h-12 w-12 rounded-xl mx-auto flex items-center justify-center mb-3", isOwner ? "bg-risk-low/10" : "bg-primary/10")}>
            {isOwner ? <Store className="h-6 w-6 text-risk-low" /> : <Briefcase className="h-6 w-6 text-primary" />}
          </div>
          <h2 className="text-xl font-heading font-bold text-foreground">
            {isOwner ? "Shop Owner Login" : "Loan Officer Login"}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            {isOwner ? "Submit your shop for credit review" : "Access the credit intelligence dashboard"}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              {isOwner ? "Shop Owner Name" : "Officer ID"}
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isOwner ? "Enter your name" : "Enter officer ID"}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full h-11 rounded-xl" disabled={!name.trim() || !password.trim()}>
            Sign In <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </form>

        <button
          onClick={() => setSelectedRole(null)}
          className="text-xs text-muted-foreground hover:text-foreground w-full text-center transition-colors"
        >
          ← Choose a different role
        </button>
      </div>
    </div>
  );
}
