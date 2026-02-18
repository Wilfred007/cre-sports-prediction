// "use client";

// import { useReadContract } from "thirdweb/react";
// import { contract } from "@/lib/thirdweb";
// import { Navbar } from "@/components/Navbar";
// import { MarketCard } from "@/components/MarketCard";
// import { CreateMarketModal } from "@/components/CreateMarketModal";
// import { TrendingUp, Users, ShieldCheck, Zap, Sparkles, Activity } from "lucide-react";

// export default function Home() {
//   const { data: nextMarketId, isLoading } = useReadContract({
//     contract,
//     method: "function nextMarketId() view returns (uint256)",
//     params: [],
//   });

//   const marketIds = nextMarketId
//     ? Array.from({ length: Number(nextMarketId) }, (_, i) => BigInt(i)).reverse()
//     : [];

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-950 relative overflow-hidden">
//       {/* Animated Background Orbs */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
//         <Navbar />

//         {/* Hero Section */}
//         <section className="py-20 mb-16 animate-fade-in-up">
//           <div className="text-center space-y-8">
//             {/* Badge */}
//             <div className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full text-sm text-blue-400 font-semibold glow-blue">
//               <Sparkles className="w-4 h-4 animate-pulse" />
//               Powered by Chainlink CRE
//             </div>

//             {/* Main Heading */}
//             <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight">
//               The Future of <br />
//               <span className="text-gradient">Sports Predictions</span>
//             </h1>

//             {/* Subtitle */}
//             <p className="text-slate-400 text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
//               Decentralized prediction markets settled by AI with Chainlink CRE.
//               <br className="hidden sm:block" />
//               <span className="text-slate-500">No middleman, just code and consensus.</span>
//             </p>

//             {/* Feature Badges */}
//             <div className="flex flex-wrap justify-center gap-4 pt-12">
//               <div className="group flex items-center gap-3 text-sm glass py-4 px-6 rounded-2xl hover:glass-strong hover-lift cursor-pointer glow-blue">
//                 <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
//                   <Zap className="w-5 h-5 text-blue-400" />
//                 </div>
//                 <span className="font-semibold text-slate-200">Gasless Settlement</span>
//               </div>
//               <div className="group flex items-center gap-3 text-sm glass py-4 px-6 rounded-2xl hover:glass-strong hover-lift cursor-pointer glow-green">
//                 <div className="p-2 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
//                   <ShieldCheck className="w-5 h-5 text-emerald-400" />
//                 </div>
//                 <span className="font-semibold text-slate-200">AI Verified</span>
//               </div>
//               <div className="group flex items-center gap-3 text-sm glass py-4 px-6 rounded-2xl hover:glass-strong hover-lift cursor-pointer glow-purple">
//                 <div className="p-2 bg-violet-500/20 rounded-lg group-hover:bg-violet-500/30 transition-colors">
//                   <Users className="w-5 h-5 text-violet-400" />
//                 </div>
//                 <span className="font-semibold text-slate-200">100% Trustless</span>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Markets Grid */}
//         <section>
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-6">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl border border-blue-500/50 glow-blue">
//                 <TrendingUp className="w-7 h-7 text-blue-400" />
//               </div>
//               <div>
//                 <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
//                   Active Markets
//                 </h2>
//                 <p className="text-slate-500 text-base mt-1">Place your predictions and win rewards</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 glass px-5 py-3 rounded-full">
//               <Activity className="w-5 h-5 text-blue-400 animate-pulse" />
//               <span className="font-semibold text-slate-300">{marketIds.length} markets</span>
//             </div>
//           </div>

//           {isLoading ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[1, 2, 3].map((i) => (
//                 <div
//                   key={i}
//                   className="h-96 rounded-3xl glass animate-pulse"
//                 />
//               ))}
//             </div>
//           ) : marketIds.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {marketIds.map((id) => (
//                 <MarketCard key={id.toString()} marketId={id} />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-32 rounded-3xl glass border-2 border-dashed border-white/20">
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full mb-6 border border-blue-500/50 glow-blue">
//                 <TrendingUp className="w-10 h-10 text-blue-400" />
//               </div>
//               <p className="text-slate-300 text-xl font-semibold mb-2">No markets have been created yet.</p>
//               <p className="text-slate-500 text-base">Be the first to launch a prediction market!</p>
//             </div>
//           )}
//         </section>

//         <CreateMarketModal />
//       </div>
//     </main>
//   );
// }


"use client";

import { useReadContract, useContractEvents } from "thirdweb/react";
import { contract } from "@/lib/thirdweb";
import { prepareEvent } from "thirdweb";
import { Navbar } from "@/components/Navbar";
import { MarketCard } from "@/components/MarketCard";
import { CreateMarketModal } from "@/components/CreateMarketModal";
import { TrendingUp, ShieldCheck, Zap, Sparkles, Activity } from "lucide-react";

export default function Home() {
  const { data: nextMarketId, isLoading: isNextIdLoading, error: readError } = useReadContract({
    contract,
    method: "nextMarketId",
    params: [],
  });

  const { data: events, isLoading: isEventsLoading } = useContractEvents({
    contract,
    events: [
      prepareEvent({
        signature: "event MarketCreated(uint256 indexed marketId, string question, uint48 deadline, address creator)",
      }),
    ],
  });

  // Consolidate market IDs from both the getter and events for maximum robustness
  const marketIds = (() => {
    const ids = new Set<string>();

    // Add IDs from nextMarketId if successful
    if (nextMarketId) {
      for (let i = 0; i < Number(nextMarketId); i++) {
        ids.add(i.toString());
      }
    }

    // Add IDs from events (reliable fallback when getter fails)
    events?.forEach(event => {
      ids.add(event.args.marketId.toString());
    });

    return Array.from(ids).map(id => BigInt(id)).sort((a, b) => Number(b - a));
  })();

  const isLoading = isNextIdLoading && isEventsLoading;

  return (
    <main className="min-h-screen bg-background relative">
      <Navbar />

      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">

        {/* Hero Section */}
        <section className="py-16 mb-20 animate-fade-in-up">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-secondary text-xs font-medium text-muted-foreground mb-8">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Powered by Chainlink CRE
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-foreground text-balance mb-6">
              The Future of{" "}
              <span className="text-emerald-400">Sports Predictions</span>
            </h1>

            {/* Subtitle */}
            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl leading-relaxed mb-12 animate-fade-in-up-delay">
              Decentralized prediction markets settled by AI with Chainlink CRE.{" "}
              <span className="text-muted-foreground/60">No middleman, just code and consensus.</span>
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-3 animate-fade-in-up-delay-2">
              <div className="group flex items-center gap-2.5 text-sm border border-border bg-card py-3 px-5 rounded-xl transition-colors hover:border-muted-foreground/30 cursor-default">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="font-medium text-secondary-foreground">Gasless Settlement</span>
              </div>
              <div className="group flex items-center gap-2.5 text-sm border border-border bg-card py-3 px-5 rounded-xl transition-colors hover:border-muted-foreground/30 cursor-default">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-medium text-secondary-foreground">AI Verified</span>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-border mb-12" />

        {/* Markets Section */}
        <section>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl border border-border bg-card">
                <TrendingUp className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground tracking-tight">
                  Active Markets
                </h2>
                <p className="text-muted-foreground text-sm mt-0.5">Place your predictions and win rewards</p>
              </div>
            </div>
            <div className="flex items-center gap-2 border border-border bg-card px-4 py-2 rounded-lg">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-sm font-medium text-secondary-foreground">{marketIds.length} markets</span>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-80 rounded-2xl border border-border bg-card animate-pulse"
                />
              ))}
            </div>
          ) : marketIds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {marketIds.map((id) => (
                <MarketCard key={id.toString()} marketId={id} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 rounded-2xl border border-dashed border-border bg-card/50">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl border border-border bg-card mb-5">
                <TrendingUp className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-foreground text-lg font-semibold mb-1.5">No markets yet</p>
              <p className="text-muted-foreground text-sm">Be the first to launch a prediction market.</p>
            </div>
          )}
        </section>

        <CreateMarketModal />
      </div>
    </main>
  );
}
