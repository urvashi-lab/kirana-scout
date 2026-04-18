import { useState } from "react";
import { Briefcase, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

export default function LoanOfficerLogin() {
  const { login } = useAuth();
  const [officerId, setOfficerId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (officerId.trim() && password.trim()) {
      login("loan_officer", officerId.trim());
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="h-12 w-12 rounded-xl mx-auto flex items-center justify-center mb-3 bg-primary/10">
            <Briefcase className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-heading font-bold text-foreground">Loan Officer Login</h2>
          <p className="text-xs text-muted-foreground mt-1">Access the credit intelligence dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Officer ID</label>
            <Input
              value={officerId}
              onChange={(e) => setOfficerId(e.target.value)}
              placeholder="Enter officer ID"
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

          <Button
            type="submit"
            className="w-full h-11 rounded-xl"
            disabled={!officerId.trim() || !password.trim()}
          >
            Sign In <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </form>
      </div>
    </div>
  );
}