import Link from "next/link";
import { Mail, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SignUpSuccess() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 md:p-10 selection:bg-blue-100">
      {/* 🌌 Atmospheric Backdrop (Consistent with Login/Signup) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white/40 backdrop-blur-2xl border border-white p-12 rounded-[4rem] shadow-2xl text-center space-y-10 animate-in fade-in zoom-in-95 duration-700">
          
          {/* 📧 Animated Icon Header */}
          <div className="flex items-center justify-center relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
            <div className="relative flex flex-col items-center">
                <div className="bg-blue-600 p-5 rounded-[2rem] shadow-2xl shadow-blue-500/40 rotate-3 hover:rotate-0 transition-transform duration-500">
                    <Mail className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 p-2 rounded-full border-4 border-white text-white shadow-lg">
                    <CheckCircle2 className="w-5 h-5" />
                </div>
            </div>
          </div>

          {/* 📝 Copywriting */}
          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tighter text-foreground">
                Check Your Inbox!
            </h1>
            <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                Thank you for registering. We've sent a verification link to your email to ensure a <span className="text-blue-600 font-bold">fair voting process</span> for the CSI Mascot Competition.
            </p>
          </div>

          {/* 💡 Instruction Box */}
          <div className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-3xl text-sm font-semibold text-blue-800 leading-relaxed italic">
            "Didn't see the email? Please check your spam folder or wait a few minutes."
          </div>

          {/* 🔗 Navigation */}
          <div className="pt-6 border-t border-foreground/5 space-y-4">
            <Button 
                asChild
                className="w-full h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl font-black text-lg text-white shadow-2xl shadow-blue-500/25 hover:scale-[1.02] active:scale-95 transition-all"
            >
                <Link href="/auth/login">Back to Login</Link>
            </Button>
            
            <Link 
                href="/" 
                className="flex items-center justify-center gap-2 text-sm font-bold text-muted-foreground hover:text-blue-600 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Return to Home
            </Link>
          </div>
        </div>

        {/* 🏢 Branding Footer */}
        <div className="text-center mt-12 space-y-2 opacity-60">
            <p className="text-sm font-bold tracking-tight text-foreground/80">
            &copy; 2026 CSI Mascot Competition
            </p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold italic">
                Official Selection Platform
            </p>
        </div>
      </div>
    </div>
  );
}
