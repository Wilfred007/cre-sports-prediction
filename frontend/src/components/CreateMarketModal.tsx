// "use client";

// import { useState } from "react";
// import { prepareContractCall } from "thirdweb";
// import { useActiveAccount, useSendAndConfirmTransaction } from "thirdweb/react";
// import { contract } from "@/lib/thirdweb";
// import { Plus, X, Calendar, MessageSquare, Loader2, Sparkles, AlertCircle } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// // Error signature mapping for better UX
// const CONTRACT_ERRORS: Record<string, string> = {
//     '0x61c54c4a': 'Deadline must be in the future. Please select a later date and time.',
//     '0x2c5211c6': 'Bet amount must be greater than 0.',
//     '0x8164f842': 'Market does not exist.',
//     '0x2f8bc2e7': 'Market already settled.',
// };

// export function CreateMarketModal() {
//     const [isOpen, setIsOpen] = useState(false);
//     const account = useActiveAccount();
//     const { mutateAsync: sendTransaction } = useSendAndConfirmTransaction();

//     const [question, setQuestion] = useState("");
//     const [deadline, setDeadline] = useState("");
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [error, setError] = useState("");

//     // Set default deadline to 24 hours from now when modal opens
//     const handleOpen = () => {
//         const tomorrow = new Date();
//         tomorrow.setHours(tomorrow.getHours() + 24);
//         const defaultDeadline = tomorrow.toISOString().slice(0, 16);
//         setDeadline(defaultDeadline);
//         setIsOpen(true);
//         setError("");
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!account || !question || !deadline) return;

//         // Client-side validation
//         const deadlineDate = new Date(deadline);
//         const now = new Date();

//         if (deadlineDate <= now) {
//             setError("Deadline must be in the future. Please select a later date and time.");
//             return;
//         }

//         // Require at least 1 hour in the future
//         const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
//         if (deadlineDate < oneHourFromNow) {
//             setError("Deadline must be at least 1 hour in the future.");
//             return;
//         }

//         setIsSubmitting(true);
//         setError("");

//         try {
//             const deadlineUnix = Math.floor(deadlineDate.getTime() / 1000);
//             const tx = prepareContractCall({
//                 contract,
//                 method: "function createMarket(string, uint48) returns (uint256)",
//                 params: [question, deadlineUnix],
//             });

//             await sendTransaction(tx);

//             // Success!
//             setIsOpen(false);
//             setQuestion("");
//             setDeadline("");

//             // Reload the page to show the new market
//             setTimeout(() => {
//                 window.location.reload();
//             }, 1000);

//         } catch (err: any) { // Keeping any for now but could be Error | { data: string; message: string }
//             const error = err as { data?: string; message?: string };
//             console.error("Market creation error:", error);

//             // Try to extract error signature
//             const errorData = err?.data || err?.message || "";
//             let errorMessage = "Error creating market. Please try again.";

//             // Check if it's a contract error with signature
//             if (typeof errorData === 'string') {
//                 const signature = errorData.slice(0, 10); // Get 0x + 8 chars
//                 errorMessage = CONTRACT_ERRORS[signature] || errorMessage;
//             }

//             // Check error message for known patterns
//             if (errorData.includes('BettingClosed')) {
//                 errorMessage = CONTRACT_ERRORS['0x61c54c4a'];
//             }

//             setError(errorMessage);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // Get minimum datetime (1 hour from now)
//     const getMinDateTime = () => {
//         const min = new Date();
//         min.setHours(min.getHours() + 1);
//         return min.toISOString().slice(0, 16);
//     };

//     return (
//         <>
//             <button
//                 onClick={handleOpen}
//                 className="fixed bottom-8 right-8 flex items-center gap-3 px-7 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-bold transition-all duration-300 shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 z-40 group hover-lift glow-blue"
//             >
//                 <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
//                 <span className="hidden sm:inline">New Market</span>
//             </button>

//             <AnimatePresence>
//                 {isOpen && (
//                     <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0 }}
//                             onClick={() => setIsOpen(false)}
//                             className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
//                         />
//                         <motion.div
//                             initial={{ opacity: 0, scale: 0.95, y: 20 }}
//                             animate={{ opacity: 1, scale: 1, y: 0 }}
//                             exit={{ opacity: 0, scale: 0.95, y: 20 }}
//                             transition={{ type: "spring", damping: 25, stiffness: 300 }}
//                             className="relative w-full max-w-lg glass-strong rounded-3xl p-8 shadow-2xl border-2 border-white/20 glow-blue"
//                         >
//                             <div className="flex justify-between items-start mb-8">
//                                 <div className="flex items-center gap-3">
//                                     <div className="p-2.5 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-xl border border-blue-500/50">
//                                         <Sparkles className="w-6 h-6 text-blue-400" />
//                                     </div>
//                                     <div>
//                                         <h2 className="text-2xl font-bold text-gradient">Create New Market</h2>
//                                         <p className="text-slate-400 text-sm mt-0.5">Launch a prediction market powered by AI</p>
//                                     </div>
//                                 </div>
//                                 <button
//                                     onClick={() => setIsOpen(false)}
//                                     className="p-2 hover:bg-white/10 rounded-xl transition-all"
//                                 >
//                                     <X className="w-6 h-6 text-slate-400 hover:text-white transition-colors" />
//                                 </button>
//                             </div>

//                             {error && (
//                                 <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
//                                     <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
//                                     <p className="text-red-300 text-sm">{error}</p>
//                                 </div>
//                             )}

//                             <form onSubmit={handleSubmit} className="space-y-6">
//                                 <div className="space-y-3">
//                                     <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
//                                         <MessageSquare className="w-4 h-4 text-blue-400" />
//                                         Market Question
//                                     </label>
//                                     <textarea
//                                         required
//                                         value={question}
//                                         onChange={(e) => setQuestion(e.target.value)}
//                                         placeholder="e.g. Will Manchester City win the Champions League 2025?"
//                                         className="w-full glass border border-white/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all min-h-[120px] resize-none text-slate-100 placeholder:text-slate-500 font-medium"
//                                     />
//                                 </div>

//                                 <div className="space-y-3">
//                                     <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
//                                         <Calendar className="w-4 h-4 text-purple-400" />
//                                         Deadline
//                                     </label>
//                                     <input
//                                         required
//                                         type="datetime-local"
//                                         value={deadline}
//                                         min={getMinDateTime()}
//                                         onChange={(e) => setDeadline(e.target.value)}
//                                         className="w-full glass border border-white/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all text-slate-100"
//                                     />
//                                     <p className="text-xs text-slate-500">
//                                         Betting closes at this time. Must be at least 1 hour in the future.
//                                     </p>
//                                 </div>

//                                 <div className="pt-4 space-y-4">
//                                     <button
//                                         disabled={isSubmitting || !account}
//                                         type="submit"
//                                         className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover-lift glow-blue"
//                                     >
//                                         {isSubmitting ? (
//                                             <>
//                                                 <Loader2 className="w-5 h-5 animate-spin" />
//                                                 Creating...
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <Sparkles className="w-5 h-5" />
//                                                 Launch Market
//                                             </>
//                                         )}
//                                     </button>
//                                     {!account && (
//                                         <p className="text-center text-amber-400 text-sm bg-amber-400/10 py-3 px-4 rounded-xl border border-amber-400/30">
//                                             Please connect your wallet to create a market
//                                         </p>
//                                     )}
//                                 </div>
//                             </form>
//                         </motion.div>
//                     </div>
//                 )}
//             </AnimatePresence>
//         </>
//     );
// }


"use client";

import { useState } from "react";
import { Plus, X, Loader2, AlertCircle } from "lucide-react";
import { prepareContractCall } from "thirdweb";
import { useActiveAccount, useSendAndConfirmTransaction } from "thirdweb/react";
import { contract } from "@/lib/thirdweb";

import { DatePicker } from "./DatePicker";

export function CreateMarketModal() {
    const [open, setOpen] = useState(false);
    const account = useActiveAccount();
    const { mutateAsync: sendTransaction } = useSendAndConfirmTransaction();

    const [question, setQuestion] = useState("");
    const [deadline, setDeadline] = useState<Date | undefined>(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleOpen = () => {
        const tomorrow = new Date();
        tomorrow.setHours(tomorrow.getHours() + 24, 0, 0, 0);
        setDeadline(tomorrow);
        setOpen(true);
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!account || !question || !deadline) return;

        if (deadline <= new Date()) {
            setError("Deadline must be in the future.");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const deadlineUnix = Math.floor(deadline.getTime() / 1000);
            const tx = prepareContractCall({
                contract,
                method: "createMarket",
                params: [question, deadlineUnix],
            });

            await sendTransaction(tx);
            setOpen(false);
            setQuestion("");
            setDeadline(undefined);
            window.location.reload();
        } catch (err: any) {
            console.error("Market creation error:", err);
            if (err.message?.includes("BettingClosed") || err.message?.includes("0x61c54c4a")) {
                setError("Deadline must be in the future.");
            } else {
                setError("Failed to create market. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <button
                onClick={handleOpen}
                className="fixed bottom-8 right-8 z-50 flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity"
            >
                <Plus className="w-4 h-4" />
                Create Market
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl">
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h2 className="text-xl font-bold text-foreground mb-2">Create a Market</h2>
                        <p className="text-sm text-muted-foreground mb-6">
                            Launch a new prediction market for others to participate in.
                        </p>

                        {error && (
                            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-xl flex gap-2 items-center">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5">Question</label>
                                <input
                                    required
                                    type="text"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    placeholder="Will Team X win the finals?"
                                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5">End Date</label>
                                <DatePicker date={deadline} setDate={setDeadline} />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting || !account || !deadline}
                                className="w-full py-2.5 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                {isSubmitting ? "Creating..." : "Launch Market"}
                            </button>
                            {!account && (
                                <p className="text-xs text-center text-amber-500">Please connect your wallet first</p>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
