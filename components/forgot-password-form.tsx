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
import { useState } from "react";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setError(null);
    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    
    if (!cleanEmail.endsWith("@itbss.ac.id")) {
      setError("Maaf, pendaftaran hanya diperbolehkan menggunakan email institusi @itbss.ac.id");
      setIsLoading(false);
      return;
    }

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {success ? (
        <Card className="bg-white/40 backdrop-blur-xl border-white/20 shadow-2xl rounded-[2rem] overflow-hidden animate-in fade-in zoom-in-95 duration-500">
          <CardHeader className="space-y-1 pb-8 pt-10 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/10 font-bold text-2xl">
                ✓
              </div>
            </div>
            <CardTitle className="text-3xl font-black tracking-tight text-green-600">Check Your Email</CardTitle>
            <CardDescription className="text-muted-foreground/80 font-medium pt-2">
              Password reset instructions sent
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-10 text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you registered using your email and password, you will receive
              a password reset email shortly. Please check your inbox and spam folder.
            </p>
            <Link href="/auth/login" className="mt-8 inline-block text-blue-600 font-bold hover:underline">
              Back to Login
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white/40 backdrop-blur-xl border-white/20 shadow-2xl rounded-[2rem] overflow-hidden animate-in fade-in zoom-in-95 duration-500">
          <CardHeader className="space-y-1 pb-8 pt-10 text-center">
            <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-indigo-600">
              Reset Access
            </h1>
            <p className="text-sm text-muted-foreground mt-2 font-medium">
              Recover your account to continue <br />
              <span className="text-blue-600 font-bold">Supporting Your Entry</span>
            </p>
          </div>
          </CardHeader>
          <CardContent className="px-8 pb-10">
            <form onSubmit={handleForgotPassword}>
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
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-xl flex items-center gap-2">
                    <span className="text-lg">⚠️</span> {error}
                  </div>
                )}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 active:scale-95 transition-all h-14 rounded-2xl font-black text-lg shadow-lg shadow-blue-500/25" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-3 border-white border-t-transparent animate-spin rounded-full" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send reset link"
                  )}
                </Button>
              </div>
              <div className="mt-8 text-center text-sm text-muted-foreground font-medium">
                Remembered your password?{" "}
                <Link
                  href="/auth/login"
                  className="text-blue-600 font-bold hover:underline underline-offset-4"
                >
                  Return to login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
