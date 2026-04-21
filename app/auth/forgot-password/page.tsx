import { ForgotPasswordForm } from "@/components/forgot-password-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center p-6 md:p-10 relative">
      <div className="absolute top-8 left-8">
        <Link 
          href="/" 
          className="group flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-blue-600 transition-all"
        >
          <div className="w-8 h-8 bg-white/50 backdrop-blur-md border border-foreground/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-all shadow-sm">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="hidden sm:inline">Back to Home</span>
        </Link>
      </div>
      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
