"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mascot } from "../types/mascot";
import { Button } from "@/components/ui/button";
import { Check, Star, ChevronLeft } from "lucide-react";
import { MascotPreviewModal } from "@/components/mascot-preview-modal";
import { cn } from "@/lib/utils";

export default function VotePage() {
  const supabase = createClient();
  const router = useRouter();
  const [mascots, setMascots] = useState<Mascot[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [votedMascot, setVotedMascot] = useState<Mascot | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewMascot, setPreviewMascot] = useState<Mascot | null>(null);

  // 🔥 INIT
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();

        if (!authUser) {
          router.push("/auth/login");
          return;
        }

        setUser(authUser);

        // 🔍 CEK STATUS VOTE (Sangat Krusial)
        const { data: vote, error: voteError } = await supabase
          .from("votes")
          .select("*, mascots(*)")
          .eq("user_id", authUser.id)
          .maybeSingle();

        if (voteError) {
          console.error("❌ GAGAL CEK VOTE (Cek RLS Supabase!):", voteError);
        }

        if (vote) {
          setAlreadyVoted(true);
          setVotedMascot((vote as any).mascots);
          return;
        }

        // 📦 Ambil daftar hero HANYA jika belum vote
        const { data: mascotsData } = await supabase.from("mascots").select("*");
        setMascots(mascotsData || []);
        
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [supabase, router]);

  // ✅ submit vote
  const handleSubmit = async (mascotId: string) => {
    if (!user || alreadyVoted) return;
    setIsSubmitting(true);

    const { error } = await supabase.from("votes").insert({
      user_id: user.id,
      mascot_id: mascotId,
      created_at: new Date().toISOString(),
    });

    if (error) {
      alert("Error submitting vote ❌ (Maybe you already voted?)");
      setIsSubmitting(false);
      return;
    }

    // Refresh state locally
    const chosen = mascots.find(m => m.id === mascotId);
    if (chosen) setVotedMascot(chosen);
    setAlreadyVoted(true);
    setIsSubmitting(false);
    setIsPreviewOpen(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent animate-spin rounded-full" />
        <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">Checking your eligibility...</p>
      </div>
    );
  }

  // 🔒 POST-VOTE SUCCESS STATE
  if (alreadyVoted) {
    return (
      <div className="w-full max-w-4xl pb-20 pt-10 px-4">
        <div className="bg-white/40 backdrop-blur-2xl border border-white p-12 rounded-[4rem] shadow-2xl text-center space-y-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-bl-[15rem] -mr-16 -mt-16" />
          
          <div className="flex items-center justify-center">
            <div className="bg-green-500/10 p-5 rounded-full border-4 border-green-500/20 shadow-inner">
               <div className="bg-green-500 p-4 rounded-full shadow-lg shadow-green-500/40">
                  <Check className="w-10 h-10 text-white" />
               </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-black tracking-tighter text-foreground">
              Thank You for Participating!
            </h1>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              Your contribution in selecting the <span className="text-blue-600 font-bold underline decoration-blue-200 underline-offset-4">CSI Official Mascot</span> has been recorded. 
              The winner will be announced at the grand finale!
            </p>
          </div>

          {votedMascot ? (
            <div className="relative pt-10 animate-in zoom-in-95 duration-700">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest px-6 py-1.5 rounded-full z-10 shadow-lg">
                 Your Selected Choice
               </div>
               <div className="bg-white/60 p-8 rounded-[3.5rem] border border-white shadow-xl max-w-sm mx-auto group-hover:scale-[1.02] transition-transform">
                  <div className="aspect-square rounded-[2.5rem] overflow-hidden mb-6 shadow-lg border border-white/50">
                    <img 
                      src={votedMascot.image_url} 
                      alt={votedMascot.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-3xl font-black text-blue-600 tracking-tight">{votedMascot.name}</h3>
                  <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest mt-1 opacity-60">
                    ID: {votedMascot.id.slice(0, 8)}
                  </p>
               </div>
            </div>
          ) : (
            <div className="bg-white/60 p-12 rounded-[3.5rem] border border-white shadow-xl max-w-sm mx-auto">
               <div className="w-20 h-20 bg-muted/20 rounded-full animate-pulse mx-auto mb-6" />
               <p className="text-muted-foreground font-bold">Retrieving entry details...</p>
            </div>
          )}

          <div className="pt-8">
            <Button 
                variant="ghost" 
                onClick={() => router.push("/")}
                className="rounded-full px-8 h-12 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 transition-all font-bold gap-2"
            >
                <ChevronLeft className="w-4 h-4" /> Return to Welcome Page
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 🗳️ VOTING INTERFACE
  return (
    <div className="w-full flex flex-col items-center px-4">
      {/* 🏷️ Banner */}
      <div className="w-full max-w-4xl bg-white/40 backdrop-blur-md border border-white/20 p-8 rounded-[3rem] shadow-xl mb-16 text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-[5rem] -mr-8 -mt-8 transition-all group-hover:bg-blue-600/10" />
        <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
           <Star className="w-3 h-3 fill-blue-600" /> CSI Mascot Design Competition 2026
        </div>
        <h1 className="text-6xl font-black tracking-tight mb-4 text-foreground relative z-10">
          Cast Your Vote
        </h1>
        <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed relative z-10">
          Help us decide the official design that best represents the <span className="text-blue-600 font-bold">CSI Spirit</span>. 
          Each student is allowed one final vote.
        </p>
      </div>

      {/* 🎨 Competition Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl pb-40">
        {mascots.map((m) => (
          <div
            key={m.id}
            onClick={() => {
              setPreviewMascot(m);
              setIsPreviewOpen(true);
            }}
            className={cn(
              "group relative flex flex-col items-center p-6 bg-white/40 backdrop-blur-xl border-2 transition-all duration-300 cursor-pointer rounded-[3rem]",
              "border-transparent hover:border-white shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:bg-white"
            )}
          >
            {/* Entry Label */}
            <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/50 z-10 shadow-sm">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Entry ID: {m.id.slice(0, 4)}</span>
            </div>

            <div className="relative w-full aspect-square mb-8 overflow-hidden rounded-[2.5rem] shadow-lg border border-white/50">
              <img
                src={m.image_url}
                alt={m.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="w-full space-y-3 mb-8">
                <h3 className="text-3xl font-black text-foreground tracking-tight leading-none group-hover:text-blue-600 transition-colors">
                {m.name}
                </h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed line-clamp-2">
                {m.description}
                </p>
            </div>

            <div
              className={`
                mt-auto w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2
                ${
                  selected === m.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white/60 text-muted-foreground group-hover:bg-white group-hover:text-blue-600"
                }
              `}
            >
              {selected === m.id ? (
                <><Check className="w-5 h-5" /> Design Selected</>
              ) : (
                "Support Design"
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 🚀 PREVIEW MODAL */}
      <MascotPreviewModal 
        mascot={previewMascot}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onConfirm={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
