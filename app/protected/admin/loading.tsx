export default function AdminLoading() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 animate-pulse p-4">
      {/* 🏷️ Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4">
        <div className="space-y-4">
          <div className="h-12 w-64 bg-muted rounded-2xl" />
          <div className="h-4 w-96 bg-muted rounded-xl" />
        </div>
        <div className="h-12 w-48 bg-muted rounded-2xl" />
      </div>

      {/* 📈 SUMMARY CARDS SKELETON */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/20 border border-white/10 p-8 rounded-[2.5rem] h-48" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* 🏆 LEADERBOARD SKELETON */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white/20 border border-white/10 rounded-[3rem] p-8 h-[500px]" />
          <div className="bg-white/20 border border-white/10 rounded-[2.5rem] p-8 h-[300px]" />
        </div>

        {/* 🛠️ TOOLS SKELETON */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white/20 border border-white/10 rounded-[2.5rem] p-8 h-[400px]" />
          <div className="bg-white/20 border border-white/10 rounded-[2.5rem] p-8 h-[300px]" />
        </div>
      </div>
    </div>
  );
}
