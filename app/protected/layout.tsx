import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen relative flex flex-col items-center selection:bg-blue-100 selection:text-blue-900">
      {/* 🌌 Decorative Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-400/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-indigo-400/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="flex-1 w-full flex flex-col items-center">
        {/* 🧭 Sticky Glassmorphism Navbar */}
        <nav className="sticky top-0 z-50 w-full flex justify-center border-b border-foreground/5 bg-background/60 backdrop-blur-xl h-16 transition-all duration-300">
          <div className="w-full max-w-5xl flex justify-between items-center px-6">
            <div className="flex items-center gap-6">
              <Link href={"/protected/vote"} className="group flex items-center gap-2.5">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:rotate-12 transition-all duration-300 group-hover:scale-110">
                  <span className="text-white text-xl font-black">C</span>
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-lg md:text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600">
                    CSI Mascot Vote
                  </span>
                  <span className="text-[10px] text-gray-500 hidden sm:block">Mascot Design Competition</span>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {!hasEnvVars ? (
                <EnvVarWarning />
              ) : (
                <Suspense fallback={<div className="w-20 h-8 bg-muted animate-pulse rounded-full" />}>
                  <AuthButton />
                </Suspense>
              )}
            </div>
          </div>
        </nav>

        {/* 🎬 Main Content Area */}
        <div className="flex-1 w-full flex flex-col max-w-5xl px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>

        {/* 🏢 Modern Footer */}
        <footer className="w-full border-t border-foreground/5 py-12 mt-auto">
          <div className="max-w-5xl mx-auto px-6 flex justify-center items-center">
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm font-semibold tracking-tight text-foreground/80">
                &copy; 2026{" "}
                <Link
                  href="https://www.instagram.com/xenelly.dev/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-600 transition-colors cursor-pointer text-blue-600"
                >
                  Xenelly Dev
                </Link>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
