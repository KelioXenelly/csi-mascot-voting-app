import { createClient } from "@/lib/supabase/server";
import { ADMIN_EMAILS } from "@/utils/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
import { AddMascotForm } from "@/components/add-mascot-form";
import { AdminMascotList } from "@/components/admin-mascot-list";
import { 
  Users, 
  Vote, 
  Trophy, 
  TrendingUp, 
  Activity, 
  Crown,
  MousePointer2
} from "lucide-react";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  if (!ADMIN_EMAILS.includes(user.email!)) {
    redirect('/protected/vote');
  }

  // 📊 DATA FETCHING
  const [
    { count: totalVotes },
    { count: totalMascots },
    { data: rawMascots },
    { data: recentVotes },
    { count: totalUsers }
  ] = await Promise.all([
    supabase.from("votes").select("*", { count: "exact", head: true }),
    supabase.from("mascots").select("*", { count: "exact", head: true }),
    supabase.from("mascots").select("*, votes(count)"),
    supabase.from("votes").select("*, mascots(name)").order("created_at", { ascending: false }).limit(6),
    supabase.from("votes").select("user_id", { count: "exact", head: false }), // Unique voters count logic below
  ]);

  // Process unique voters
  const uniqueVoterIds = new Set(recentVotes?.map(v => v.user_id));
  const uniqueCount = totalVotes || 0; // In a simple system, total votes = total unique voters if 1 vote per user

  // Process mascot rankings
  const rankings = (rawMascots || [])
    .map((m: any) => ({
      ...m,
      voteCount: m.votes[0]?.count || 0,
      percentage: totalVotes ? Math.round((m.votes[0]?.count || 0) / totalVotes * 100) : 0
    }))
    .sort((a, b) => b.voteCount - a.voteCount);

  const winner = rankings[0]?.voteCount > 0 ? rankings[0] : null;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
      
      {/* 🏷️ Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4">
        <div className="space-y-1">
          <h1 className="text-5xl font-black tracking-tight text-foreground">Committee Console</h1>
          <p className="text-muted-foreground font-medium text-lg">Managing the CSI Mascot Design Competition</p>
        </div>
        <div className="flex bg-white/40 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-lg">
           <div className="px-4 py-2 bg-blue-600 rounded-xl text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
             <Activity className="w-4 h-4" /> Live Tracking
           </div>
           <div className="px-4 py-2 text-xs font-bold text-muted-foreground flex items-center gap-2">
             Status: Public Voting Active
           </div>
        </div>
      </div>

      {/* 📈 SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white/40 backdrop-blur-xl border border-white/20 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-[5rem] -mr-8 -mt-8 transition-all group-hover:bg-blue-600/10" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/10">
              <Vote className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-muted-foreground uppercase tracking-widest text-xs">Total Ballots</h3>
          </div>
          <p className="text-5xl font-black text-foreground">{totalVotes || 0}</p>
          <div className="mt-4 flex items-center gap-2 text-sm font-bold text-green-600">
            <TrendingUp className="w-4 h-4" /> Official Count
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-xl border border-white/20 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-bl-[5rem] -mr-8 -mt-8 transition-all group-hover:bg-indigo-600/10" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/10">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-muted-foreground uppercase tracking-widest text-xs">Verified Voters</h3>
          </div>
          <p className="text-5xl font-black text-foreground">{totalVotes || 0}</p>
          <p className="mt-4 text-sm font-bold text-muted-foreground/60 italic">Authenticated Students</p>
        </div>

        <div className="bg-white/40 backdrop-blur-xl border border-white/20 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-bl-[5rem] -mr-8 -mt-8 transition-all group-hover:bg-purple-600/10" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/10">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-muted-foreground uppercase tracking-widest text-xs">Design Entries</h3>
          </div>
          <p className="text-5xl font-black text-foreground">{totalMascots || 0}</p>
          <p className="mt-4 text-sm font-bold text-muted-foreground/60 italic">Competition Candidates</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* 🏆 LEADERBOARD */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white/40 backdrop-blur-xl border border-white/20 rounded-[3rem] shadow-xl overflow-hidden p-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
                  Live Standings
                </h2>
                <p className="text-muted-foreground font-medium">Real-time design entry performance</p>
              </div>
              <MousePointer2 className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>

            <div className="space-y-8">
              {rankings.map((m, idx) => (
                <div key={m.id} className="relative group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shadow-md
                        ${idx === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' : 
                          idx === 1 ? 'bg-slate-300 text-slate-700' :
                          idx === 2 ? 'bg-amber-600 text-white' : 'bg-white/50 text-muted-foreground'}
                      `}>
                        {idx + 1}
                      </div>
                      <span className="font-black text-lg tracking-tight">{m.name}</span>
                      {idx === 0 && winner && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-[10px] font-black text-white uppercase shadow-lg animate-pulse">
                          <Crown className="w-3 h-3" /> Current Favorite
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black text-foreground">{m.voteCount}</span>
                      <span className="text-sm font-bold text-muted-foreground bg-white/50 px-3 py-1 rounded-lg">{m.percentage}%</span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-4 w-full bg-white/20 rounded-full overflow-hidden border border-white/10 shadow-inner">
                    <div 
                      className={`h-full transition-all duration-1000 ease-out rounded-full shadow-lg
                        ${idx === 0 ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-slate-400'}
                      `}
                      style={{ width: `${m.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <AdminMascotList mascots={rawMascots || []} />
        </div>

        {/* 🛠️ TOOLS & ACTIVITIES */}
        <div className="lg:col-span-4 space-y-8">
          <AddMascotForm />

          {/* ⚡ RECENT ACTIVITY */}
          <div className="bg-white/40 backdrop-blur-xl border border-white/20 p-8 rounded-[2.5rem] shadow-xl">
             <h3 className="text-xl font-black mb-6 flex items-center gap-2">
               <Activity className="w-5 h-5 text-blue-600" /> Recent Ballots
             </h3>
             <div className="space-y-6">
                {(recentVotes || []).map((v, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-1.5 h-auto bg-blue-600/30 rounded-full group-hover:bg-blue-600 transition-colors" />
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        Student <span className="text-muted-foreground">#{v.user_id.slice(-4)}</span>
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        Supported <span className="text-blue-600 font-bold">{(v as any).mascots?.name}</span>
                      </p>
                      <p className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-tighter mt-1">
                        {new Date(v.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}