"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShieldCheck, Lock } from "lucide-react";
import { toast } from "sonner";

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);

    if (password !== confirmPassword) {
      toast.error("Password Mismatch", {
        description: "The new passwords do not match. Please try again."
      });
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      
      toast.success("Password Updated", {
        description: "Your account security has been updated successfully."
      });
      router.push("/protected");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Terjadi kesalahan saat memperbarui password";
      toast.error("Update Failed", {
        description: message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-white/40 backdrop-blur-xl border-white/20 shadow-2xl rounded-[2.5rem] overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="space-y-1 pb-8 pt-10 text-center">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center mb-4 relative">
                <ShieldCheck className="w-8 h-8" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-indigo-600">
              Secure Account
            </h1>
            <p className="text-sm text-muted-foreground mt-2 font-medium">
              Create a new strong password for your <br />
              <span className="text-blue-600 font-bold">CSI Voting Access</span>
            </p>
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-10">
          <form onSubmit={handleUpdatePassword}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password gold" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                  <Lock className="w-3 h-3" /> New Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-white/50 border-foreground/5 h-12 px-4 rounded-xl focus-visible:ring-blue-600/20 focus-visible:border-blue-600 transition-all font-mono"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3" /> Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-white/50 border-foreground/5 h-12 px-4 rounded-xl focus-visible:ring-blue-600/20 focus-visible:border-blue-600 transition-all font-mono"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 active:scale-95 transition-all h-14 rounded-2xl font-black text-lg shadow-lg shadow-blue-500/25" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-3 border-white border-t-transparent animate-spin rounded-full" />
                    <span>Updating...</span>
                  </div>
                ) : (
                  "Update & Continue"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
