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

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);

    if (password !== repeatPassword) {
      toast.error("Passwords mismatch", {
        description: "Please make sure your passwords match."
      });
      setIsLoading(false);
      return;
    }

    if (!email.toLowerCase().endsWith("@itbss.ac.id")) {
      toast.error("Invalid Email Domain", {
        description: "Maaf, pendaftaran hanya diperbolehkan menggunakan email institusi @itbss.ac.id"
      });
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });

      if (error) {
        if (error.message.toLowerCase().includes("already registered") || error.message.toLowerCase().includes("already exists")) {
          toast.info("Account Exists", {
            description: "Email ini sudah terdaftar. Mengalihkan ke halaman login..."
          });
          setTimeout(() => {
            router.push("/auth/login");
          }, 2000);
          return;
        }
        throw error;
      }

      toast.success("Account Created!", {
        description: "Please check your email to verify your account."
      });
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Terjadi kesalahan saat mendaftar";
      toast.error("Registration Error", {
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
              Join CSI Voting
            </h1>
            <p className="text-sm text-muted-foreground mt-2 font-medium">
              Create an account to participate in the <br />
              <span className="text-blue-600 font-bold">Mascot Selection 2026</span>
            </p>
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-10">
          <form onSubmit={handleSignUp}>
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
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/50 border-foreground/5 h-12 px-4 rounded-xl focus-visible:ring-blue-600/20 focus-visible:border-blue-600 transition-all"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="repeat-password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Repeat Password</Label>
                <Input
                  id="repeat-password"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
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
                    <span>Creating account...</span>
                  </div>
                ) : (
                  "Sign up"
                )}
              </Button>
            </div>
            <div className="mt-8 text-center text-sm text-muted-foreground font-medium">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-600 font-bold hover:underline underline-offset-4">
                Login here
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
