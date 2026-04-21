import { AuthButton } from "@/components/auth-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* 🌌 Atmospheric Backdrop */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-blue-600/10 rounded-full blur-[140px] animate-pulse" />
        <div
          className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-indigo-600/10 rounded-full blur-[140px] animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="flex-1 w-full flex flex-col items-center">
        {/* 🏛️ Header / Navbar */}
        <nav className="w-full flex justify-center border-b border-foreground/5 bg-background/80 backdrop-blur-xl h-16 fixed top-0 z-50">
          <div className="w-full max-w-6xl flex justify-between items-center px-6">
            <div className="flex items-center gap-6">
              <Link href="/" className="group flex items-center gap-2.5">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:rotate-12 transition-all duration-300">
                  <span className="text-white text-lg font-black">C</span>
                </div>

                <div className="flex flex-col leading-tight">
                  <span className="text-lg md:text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600">
                    CSI Mascot Vote
                  </span>
                  <span className="text-[10px] text-gray-500 hidden sm:block">
                    Mascot Design Competition
                  </span>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Suspense
                fallback={
                  <div className="w-20 h-8 bg-muted animate-pulse rounded-full" />
                }
              >
                <AuthButton />
              </Suspense>
            </div>
          </div>
        </nav>

        {/* 🧱 Spacer for Fixed Nav */}
        <div className="h-16 w-full" />

        {/* 🚀 High-Impact Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center pt-24 pb-32 px-6 text-center max-w-5xl mx-auto space-y-10 animate-in fade-in zoom-in-95 duration-1000">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] animate-in fade-in slide-in-from-top-2 duration-1000">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Voting Phase Active
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.9] text-balance">
              Define the <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600">
                Identity.
              </span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            Your vote determines the official design that will represent the <span className="text-blue-600 font-bold">CSI Spirit</span>. Join fellow students in choosing the face of our organization for 2026 and beyond.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
            <Button
              asChild 
              size="lg" 
              className="h-16 px-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 active:scale-95 transition-all font-black text-lg shadow-[0_20px_50px_rgba(37,99,235,0.25)] border-none text-white"
            >
              <Link href="/protected/vote">Cast My Vote Now</Link>
            </Button>
            <Button 
                variant="ghost" 
                size="lg" 
                asChild
                className="h-16 px-8 rounded-2xl font-bold bg-white/50 backdrop-blur-md border border-white/20 hover:bg-white transition-all"
            >
              <Link href="#how-it-works">How It Works</Link>
            </Button>
          </div>
        </div>

        {/* 🍱 Steps Section */}
        <div
          id="how-it-works"
          className="w-full max-w-6xl px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-foreground/5"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center font-black text-xl">
              1
            </div>
            <h3 className="text-2xl font-black tracking-tight">
              Register Student Account
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Verify your participation through our secure student portal. One student, one vote for a fair and transparent result.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-indigo-600/10 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-xl">
              2
            </div>
            <h3 className="text-2xl font-black tracking-tight">
              Review Design Entries
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Browse the gallery of mascot candidates created by our talented designers. Each entry tells a story of the CSI vision.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center font-black text-xl">
              3
            </div>
            <h3 className="text-2xl font-black tracking-tight">
              Lock Your Final Choice
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Submit your vote securely. Your choice will help decide the official mascot that will lead CSI into the future.
            </p>
          </div>
        </div>

        {/* 🧘 Minimalist Footer */}
        <footer className="w-full py-16 border-t border-foreground/5">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[13px] font-medium text-muted-foreground/60 tracking-tight">
              © 2026 CSI Mascot Competition. All rights reserved.
            </p>
            
            <div className="flex items-center gap-2 text-[13px] font-medium text-muted-foreground/60">
              <span>Developed by</span>
              <Link 
                href="https://www.instagram.com/xenelly.dev/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-blue-600 transition-colors font-bold decoration-blue-600/30 underline underline-offset-4"
              >
                Xenelly Dev
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
