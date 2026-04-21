"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      
      toast.success("Welcome back!", {
        description: "Login successful. Redirecting you to the voting panel."
      });
      router.push("/protected");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An error occurred";
      toast.error("Login Failed", {
        description: message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-white/40 backdrop-blur-xl border-white/20 shadow-2xl rounded-[2rem] overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="space-y-1 pb-8 pt-10 text-center">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-indigo-600">
              CSI Mascot Vote
            </h1>
            <p className="text-sm text-muted-foreground mt-2 font-medium">
              Secure login to cast your vote for the <br />
              <span className="text-blue-600 font-bold">Official CSI Mascot 2026</span>
            </p>
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-10">
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/50 border-foreground/5 h-12 px-4 rounded-xl focus-visible:ring-blue-600/20 focus-visible:border-blue-600 transition-all"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-xs font-bold text-blue-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/50 border-foreground/5 h-12 px-4 rounded-xl focus-visible:ring-blue-600/20 focus-visible:border-blue-600 transition-all"
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
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Log in"
                )}
              </Button>
            </div>
            <div className="mt-8 text-center text-sm text-muted-foreground font-medium">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="text-blue-600 font-bold hover:underline underline-offset-4"
              >
                Sign up for free
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
