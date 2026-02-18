// "use client";

// import { useState } from "react";
// import { prepareContractCall, toEther } from "thirdweb";
// import { useActiveAccount, useSendAndConfirmTransaction, useReadContract } from "thirdweb/react";
// import { contract } from "@/lib/thirdweb";
// import { Clock, TrendingUp, TrendingDown, CheckCircle2, AlertCircle, Zap } from "lucide-react";
// import { clsx } from "clsx";
// import { twMerge } from "tailwind-merge";

// function cn(...inputs: unknown[]) {
//     return twMerge(clsx(inputs));
// }

// interface MarketCardProps {
//     marketId: bigint;
// }

// export function MarketCard({ marketId }: MarketCardProps) {
//     const account = useActiveAccount();
//     const [betAmount, setBetAmount] = useState("");
//     const [isBetting, setIsBetting] = useState(false);

//     const { data: market, isLoading } = useReadContract({
//         contract,
//         method: "function getMarket(uint256) view returns (address creator, uint48 createdAt, uint48 deadline, uint48 settledAt, bool settled, uint16 confidence, uint8 outcome, uint256 totalYesPool, uint256 totalNoPool, string question)",
//         params: [marketId],
//     });

//     const { mutateAsync: sendTransaction } = useSendAndConfirmTransaction();

//     if (isLoading || !market) {
//         return (
//             <div className="glass-card rounded-2xl p-6 h-80 skeleton flex flex-col gap-4">
//                 <div className="h-4 bg-white/10 rounded w-1/3" />
//                 <div className="h-8 bg-white/10 rounded w-full" />
//                 <div className="flex-1" />
//                 <div className="h-12 bg-white/10 rounded-xl w-full" />
//             </div>
//         );
//     }

//     const [
//         ,
//         ,
//         deadline,
//         ,
//         settled,
//         confidence,
//         outcome,
//         totalYesPool,
//         totalNoPool,
//         question
//     ] = market;

//     const isExpired = Number(deadline) < Date.now() / 1000;
//     const canBet = !settled && !isExpired;

//     const totalPool = Number(toEther(totalYesPool)) + Number(toEther(totalNoPool));
//     const yesPercentage = totalPool > 0 ? (Number(toEther(totalYesPool)) / totalPool) * 100 : 50;
//     const noPercentage = totalPool > 0 ? (Number(toEther(totalNoPool)) / totalPool) * 100 : 50;

//     const handlePredict = async (prediction: number) => {
//         if (!account || !betAmount) return;
//         setIsBetting(true);
//         try {
//             const tx = prepareContractCall({
//                 contract,
//                 method: "function predict(uint256, uint8) payable",
//                 params: [marketId, prediction],
//                 value: BigInt(parseFloat(betAmount) * 1e18),
//             });
//             await sendTransaction(tx);
//             alert("Prediction placed!");
//         } catch (error) {
//             console.error(error);
//             alert("Error placing prediction");
//         } finally {
//             setIsBetting(false);
//         }
//     };

//     const handleRequestSettlement = async () => {
//         try {
//             const tx = prepareContractCall({
//                 contract,
//                 method: "function requestSettlement(uint256)",
//                 params: [marketId],
//             });
//             await sendTransaction(tx);
//             alert("Settlement requested!");
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleClaim = async () => {
//         try {
//             const tx = prepareContractCall({
//                 contract,
//                 method: "function claim(uint256)",
//                 params: [marketId],
//             });
//             await sendTransaction(tx);
//             alert("Winnings claimed!");
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div className="glass-card rounded-2xl p-6 flex flex-col gap-5 hover:border-white/20 transition-smooth hover-lift group">
//             {/* Header */}
//             <div className="flex justify-between items-start gap-2">
//                 <span className={cn(
//                     "px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-smooth",
//                     settled ? "bg-green-500/10 text-green-400 border border-green-500/30 glow-green" :
//                         isExpired ? "bg-amber-500/10 text-amber-400 border border-amber-500/30" :
//                             "bg-blue-500/10 text-blue-400 border border-blue-500/30 glow-blue"
//                 )}>
//                     {settled && <CheckCircle2 className="w-3 h-3" />}
//                     {settled ? "Settled" : isExpired ? "Betting Closed" : "Active"}
//                 </span>
//                 <div className="flex items-center gap-1.5 text-slate-400 text-sm bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
//                     <Clock className="w-3.5 h-3.5" />
//                     <span className="font-medium">{new Date(Number(deadline) * 1000).toLocaleDateString()}</span>
//                 </div>
//             </div>

//             {/* Question */}
//             <h3 className="text-xl font-bold leading-tight min-h-[3.5rem] flex items-center group-hover:text-gradient-static transition-smooth">
//                 {question}
//             </h3>

//             {/* Pool Distribution Visualization */}
//             <div className="space-y-3">
//                 <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
//                     <span>Total Pool: {totalPool.toFixed(3)} ETH</span>
//                     <span className="flex items-center gap-1">
//                         <Zap className="w-3 h-3" />
//                         {totalPool > 0 ? `${yesPercentage.toFixed(0)}% / ${noPercentage.toFixed(0)}%` : "No bets yet"}
//                     </span>
//                 </div>

//                 {/* Animated Progress Bar */}
//                 <div className="relative h-2 bg-slate-900/50 rounded-full overflow-hidden border border-white/5">
//                     <div
//                         className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500 ease-out"
//                         style={{ width: `${yesPercentage}%` }}
//                     />
//                     <div
//                         className="absolute right-0 top-0 h-full bg-gradient-to-l from-slate-600 to-slate-500 transition-all duration-500 ease-out"
//                         style={{ width: `${noPercentage}%` }}
//                     />
//                 </div>

//                 {/* Pool Values */}
//                 <div className="grid grid-cols-2 gap-3">
//                     <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl border border-blue-500/20 transition-smooth hover:border-blue-500/40">
//                         <p className="text-blue-400 text-xs mb-1 font-semibold flex items-center gap-1">
//                             <TrendingUp className="w-3 h-3" />
//                             Yes Pool
//                         </p>
//                         <p className="font-mono text-lg font-bold">{Number(toEther(totalYesPool)).toFixed(3)} ETH</p>
//                     </div>
//                     <div className="p-3 bg-gradient-to-br from-slate-500/10 to-slate-500/5 rounded-xl border border-slate-500/20 transition-smooth hover:border-slate-500/40">
//                         <p className="text-slate-400 text-xs mb-1 font-semibold flex items-center gap-1">
//                             <TrendingDown className="w-3 h-3" />
//                             No Pool
//                         </p>
//                         <p className="font-mono text-lg font-bold">{Number(toEther(totalNoPool)).toFixed(3)} ETH</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Actions */}
//             {canBet ? (
//                 <div className="space-y-3 pt-2">
//                     <div className="relative">
//                         <input
//                             type="number"
//                             step="0.001"
//                             value={betAmount}
//                             onChange={(e) => setBetAmount(e.target.value)}
//                             placeholder="0.000"
//                             className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 pr-16 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-mono text-lg"
//                         />
//                         <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-semibold">ETH</span>
//                     </div>
//                     <div className="grid grid-cols-2 gap-3">
//                         <button
//                             onClick={() => handlePredict(0)}
//                             disabled={isBetting || !account}
//                             className="flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-smooth shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 hover-lift"
//                         >
//                             <TrendingUp className="w-5 h-5" />
//                             Yes
//                         </button>
//                         <button
//                             onClick={() => handlePredict(1)}
//                             disabled={isBetting || !account}
//                             className="flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-smooth hover-lift"
//                         >
//                             <TrendingDown className="w-5 h-5" />
//                             No
//                         </button>
//                     </div>
//                 </div>
//             ) : settled ? (
//                 <div className="space-y-4 pt-2">
//                     <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/30 glow-green">
//                         <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
//                         <div className="flex-1">
//                             <p className="text-green-400 font-bold text-lg">Outcome: {outcome === 0 ? "YES" : "NO"}</p>
//                             <p className="text-slate-400 text-xs mt-0.5 flex items-center gap-1">
//                                 <Zap className="w-3 h-3" />
//                                 AI Confidence: {confidence}%
//                             </p>
//                         </div>
//                     </div>
//                     <button
//                         onClick={handleClaim}
//                         className="w-full py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl font-bold transition-smooth shadow-lg shadow-green-900/30 hover:shadow-green-900/50 hover-lift"
//                     >
//                         Claim Winnings
//                     </button>
//                 </div>
//             ) : (
//                 <div className="space-y-3 pt-2">
//                     <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/30">
//                         <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0" />
//                         <p className="text-amber-400 text-sm leading-snug font-medium">Market expired. Awaiting AI settlement via CRE.</p>
//                     </div>
//                     <button
//                         onClick={handleRequestSettlement}
//                         className="w-full py-3.5 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white rounded-xl font-bold transition-smooth hover-lift"
//                     >
//                         Request Settlement
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }


"use client";

"use client";

import { useState } from "react";
import { TrendingUp, Clock, Users, Zap, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useActiveAccount, useReadContract, useSendAndConfirmTransaction } from "thirdweb/react";
import { contract } from "@/lib/thirdweb";
import { prepareContractCall, toEther } from "thirdweb";

export function MarketCard({ marketId }: { marketId: bigint }) {
    const account = useActiveAccount();
    const [betAmount, setBetAmount] = useState("");
    const [isBetting, setIsBetting] = useState(false);

    const { data: market, isLoading } = useReadContract({
        contract,
        method: "getMarket",
        params: [marketId],
    });

    const { mutateAsync: sendTransaction } = useSendAndConfirmTransaction();

    if (isLoading || !market) {
        return (
            <div className="h-80 rounded-2xl border border-border bg-card animate-pulse" />
        );
    }

    const {
        deadline,
        settled,
        confidence,
        outcome,
        totalYesPool,
        totalNoPool,
        question
    } = market;

    const isExpired = Number(deadline) < Date.now() / 1000;
    const canBet = !settled && !isExpired;

    const totalPool = Number(toEther(totalYesPool)) + Number(toEther(totalNoPool));
    const yesPercentage = totalPool > 0 ? (Number(toEther(totalYesPool)) / totalPool) * 100 : 50;
    const noPercentage = totalPool > 0 ? (Number(toEther(totalNoPool)) / totalPool) * 100 : 50;

    const handlePredict = async (prediction: number) => {
        if (!account || !betAmount) return;
        setIsBetting(true);
        try {
            const tx = prepareContractCall({
                contract,
                method: "function predict(uint256, uint8) payable",
                params: [marketId, prediction],
                value: BigInt(Math.floor(parseFloat(betAmount) * 1e18)),
            });
            await sendTransaction(tx);
        } catch (error) {
            console.error(error);
        } finally {
            setIsBetting(false);
        }
    };

    const handleClaim = async () => {
        try {
            const tx = prepareContractCall({
                contract,
                method: "function claim(uint256)",
                params: [marketId],
            });
            await sendTransaction(tx);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRequestSettlement = async () => {
        try {
            const tx = prepareContractCall({
                contract,
                method: "requestSettlement",
                params: [marketId],
            });
            await sendTransaction(tx);
            alert("Settlement requested!");
        } catch (error: any) {
            console.error("Settlement error:", error);
            if (error.message?.includes("BettingClosed")) {
                alert("Market has not ended yet. Settlement can only be requested after the deadline.");
            } else if (error.message?.includes("0x61c54c4a")) {
                alert("Market has not ended yet (BettingClosed).");
            } else {
                alert("Failed to request settlement. Please try again.");
            }
        }
    };

    return (
        <div className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-muted-foreground/30 hover:shadow-lg hover:-translate-y-0.5">
            {/* Status Badge */}
            <div className="flex items-center justify-between mb-5">
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${settled ? "text-blue-400 bg-blue-400/10" :
                    isExpired ? "text-amber-400 bg-amber-400/10" :
                        "text-emerald-400 bg-emerald-400/10"
                    }`}>
                    {!settled && !isExpired && <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />}
                    {settled ? "Settled" : isExpired ? "Awaiting Settlement" : "Active"}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">#{marketId.toString()}</span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-foreground mb-2 leading-snug text-balance">
                {question}
            </h3>

            {settled ? (
                <div className="flex items-center gap-2 mb-4 p-2.5 bg-accent/50 rounded-xl border border-border">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <div className="flex-1">
                        <p className="text-xs font-semibold text-foreground">Outcome: {outcome === 0 ? "YES" : "NO"}</p>
                        <p className="text-[10px] text-muted-foreground">Confidence: {confidence}%</p>
                    </div>
                </div>
            ) : isExpired ? (
                <div className="flex items-center gap-2 mb-4 p-2.5 bg-amber-400/5 rounded-xl border border-amber-400/20">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <p className="text-[10px] text-amber-400 font-medium">Betting closed. Settlement in progress.</p>
                </div>
            ) : null}

            {/* Stats Row */}
            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{totalPool.toFixed(3)} ETH</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(Number(deadline) * 1000).toLocaleDateString()}</span>
                </div>
            </div>

            {/* Outcome bars */}
            <div className="space-y-3">
                <div>
                    <div className="flex items-center justify-between text-[10px] mb-1.5">
                        <span className="text-muted-foreground uppercase font-bold tracking-tight">Yes</span>
                        <span className="font-mono text-foreground">{yesPercentage.toFixed(0)}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-emerald-500/80 transition-all duration-500" style={{ width: `${yesPercentage}%` }} />
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between text-[10px] mb-1.5">
                        <span className="text-muted-foreground uppercase font-bold tracking-tight">No</span>
                        <span className="font-mono text-foreground">{noPercentage.toFixed(0)}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-red-400/80 transition-all duration-500" style={{ width: `${noPercentage}%` }} />
                    </div>
                </div>
            </div>

            {/* Action */}
            <div className="mt-6 flex flex-col gap-2">
                {canBet ? (
                    <>
                        <div className="relative">
                            <input
                                type="number"
                                step="0.001"
                                value={betAmount}
                                onChange={(e) => setBetAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full bg-muted border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground">ETH</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => handlePredict(0)}
                                className="py-2 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-colors"
                            >
                                Bet YES
                            </button>
                            <button
                                onClick={() => handlePredict(1)}
                                className="py-2 rounded-xl bg-red-400/10 text-red-400 text-xs font-bold hover:bg-red-400/20 transition-colors"
                            >
                                Bet NO
                            </button>
                        </div>
                    </>
                ) : settled ? (
                    <button
                        onClick={handleClaim}
                        className="w-full py-2.5 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 transition-opacity"
                    >
                        Claim Winnings
                    </button>
                ) : (
                    <button
                        onClick={handleRequestSettlement}
                        className="w-full py-2.5 rounded-xl border border-border bg-accent text-xs font-bold hover:bg-muted transition-colors flex items-center justify-center gap-2"
                    >
                        <Zap className="w-3.5 h-3.5" />
                        Request Settlement
                    </button>
                )}
            </div>
        </div>
    );
}
