// import Link from "next/link";
// import { Trophy, Sparkles } from "lucide-react";
// import { ConnectButton } from "thirdweb/react";
// import { client } from "@/lib/thirdweb";
// import { NETWORK } from "@/lib/constants";

// export function Navbar() {
//     return (
//         <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex justify-between items-center h-20">
//                     <Link href="/" className="flex items-center gap-4 hover:opacity-90 transition-opacity group">
//                         <div className="relative p-3 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl border border-blue-500/50 glow-blue group-hover:scale-105 transition-transform">
//                             <Trophy className="w-7 h-7 text-blue-400" />
//                             <Sparkles className="absolute -top-1.5 -right-1.5 w-4 h-4 text-yellow-400 animate-pulse" />
//                         </div>
//                         <div className="hidden sm:flex flex-col">
//                             <span className="font-bold text-2xl tracking-tight">
//                                 Sports<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Pred</span>
//                             </span>
//                             <span className="text-[11px] text-slate-500 font-semibold tracking-widest uppercase">AI Powered</span>
//                         </div>
//                     </Link>

//                     <div className="flex items-center gap-4">
//                         <ConnectButton
//                             client={client}
//                             chain={NETWORK}
//                             theme="dark"
//                             connectButton={{
//                                 className: "!bg-gradient-to-r !from-blue-600 !to-indigo-600 hover:!from-blue-500 hover:!to-indigo-500 !text-white !rounded-xl !font-semibold !transition-all !duration-300 hover:!scale-105 !shadow-lg !shadow-blue-500/50 !px-6 !py-3",
//                                 label: "Connect Wallet"
//                             }}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// }


"use client";

import { Activity } from "lucide-react";
import { ConnectButton } from "thirdweb/react";
import { client, NETWORK } from "@/lib/thirdweb";

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-accent">
                        <Activity className="w-5 h-5 text-foreground" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-foreground">PredictChain</span>
                </div>
                <div className="flex items-center gap-6">
                    <a href="#" className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition-colors">Markets</a>
                    <a href="#" className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition-colors">Docs</a>
                    <ConnectButton
                        client={client}
                        chain={NETWORK}
                        theme="dark"
                        connectButton={{
                            className: "!bg-foreground !text-background !rounded-lg !text-sm !font-medium !px-4 !py-2 !h-9 hover:!opacity-90 !transition-opacity",
                            label: "Connect"
                        }}
                    />
                </div>
            </div>
        </nav>
    );
}
