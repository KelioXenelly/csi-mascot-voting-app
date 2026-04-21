import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export async function AuthButton() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const formatName = (email: string | undefined) => {
    if (!email) return "Tamu";
    
    // 1. Ambil bagian sebelum @
    const username = email.split("@")[0];
    
    // 2. Split berdasarkan titik dan bersihkan
    const words = username.split(".");
    
    // 3. Kapitalisasi setiap kata
    const formatted = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
      
    return formatted;
  };

  return user ? (
    <div className="flex items-center gap-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md p-1 px-4 rounded-full border border-white/20 shadow-lg">
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none hidden sm:block">Participant</span>
          <span className="text-sm font-black tracking-tight text-blue-600">Hai {formatName(user.email!)}</span>
        </div>
        <div className="h-8 w-[1px] bg-foreground/10 mx-1" />
        <LogoutButton />
      </div>
    </div>
  ) : (
    <div className="flex items-center gap-2 md:gap-3 animate-in fade-in duration-500">
      <Button 
        asChild 
        size="sm" 
        variant="ghost"
        className="rounded-full px-4 md:px-5 font-semibold text-muted-foreground hover:text-foreground transition-colors text-xs md:text-sm"
      >
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button 
        asChild 
        size="sm" 
        className="rounded-full px-5 md:px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition-all shadow-lg shadow-blue-500/20 font-bold border-none hidden sm:flex text-xs md:text-sm"
      >
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
