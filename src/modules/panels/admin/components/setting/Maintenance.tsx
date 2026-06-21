"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Settings, RefreshCw } from "lucide-react";

export default function Maintenance() {
  const reduceMotion = useReducedMotion();

  const date =
    typeof window === "undefined"
      ? null
      : new Date()
          .toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          .toUpperCase();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-[#1e1e1e] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.07] pointer-events-none
        bg-[repeating-linear-gradient(to_right,#7c3aed_0_1px,transparent_1px_44px),repeating-linear-gradient(to_bottom,#7c3aed_0_1px,transparent_1px_44px)]
        dark:bg-[repeating-linear-gradient(to_right,#a78bfa_0_1px,transparent_1px_44px),repeating-linear-gradient(to_bottom,#a78bfa_0_1px,transparent_1px_44px)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#f8fafc_75%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,#1e1e1e_75%)] pointer-events-none" />

      <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-violet-600/20 dark:border-violet-400/20 pointer-events-none" />
      <div className="absolute top-6 right-6 w-5 h-5 border-t border-r border-violet-600/20 dark:border-violet-400/20 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-violet-600/20 dark:border-violet-400/20 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-violet-600/20 dark:border-violet-400/20 pointer-events-none" />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="border border-violet-600/15 dark:border-violet-400/15 rounded-md p-[6px] shadow-[0_0_60px_-15px_rgba(124,58,237,0.2)] dark:shadow-[0_0_60px_-15px_rgba(167,139,250,0.2)]">
          <div className="border border-dashed border-violet-600/25 dark:border-violet-400/20 rounded-[4px] px-7 py-9 sm:px-9 sm:py-10 bg-white dark:bg-[#333]">
            <div className="font-mono flex items-center justify-between text-[10px] tracking-[0.2em] uppercase mb-9">
              <span className="flex items-center gap-2 text-violet-700/70 dark:text-violet-300/70">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
                </span>
                System status
              </span>
              <span className="text-amber-600 dark:text-amber-400">
                Maintenance
              </span>
            </div>

            <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-violet-500/10 dark:bg-violet-400/10 blur-xl" />
              <motion.div
                animate={{ rotate: reduceMotion ? 0 : 360 }}
                transition={{
                  duration: 14,
                  repeat: reduceMotion ? 0 : Infinity,
                  ease: "linear",
                }}
                className="absolute"
              >
                <Settings
                  className="w-20 h-20 text-violet-600/70 dark:text-violet-400/70"
                  strokeWidth={1.25}
                />
              </motion.div>
              <motion.div
                animate={{ rotate: reduceMotion ? 0 : -360 }}
                transition={{
                  duration: 9,
                  repeat: reduceMotion ? 0 : Infinity,
                  ease: "linear",
                }}
                className="absolute translate-x-5 translate-y-5"
              >
                <Settings
                  className="w-10 h-10 text-amber-600 dark:text-amber-400"
                  strokeWidth={1.5}
                />
              </motion.div>
            </div>

            <h1 className="text-2xl sm:text-[26px] font-bold text-slate-900 dark:text-white text-center leading-snug mb-3">
              We&rsquo;re making things better
            </h1>
            <p className="text-[13.5px] leading-relaxed text-slate-500 dark:text-[#aaa] text-center mb-9">
              Our team is upgrading the platform behind the scenes. The site
              will be back online shortly — thanks for sticking with us.
            </p>

            <div className="mb-8">
              <div className="font-mono flex items-center justify-between text-[10px] uppercase tracking-[0.15em] text-violet-700/60 dark:text-violet-300/55 mb-2">
                <span>Restoring service</span>
                {reduceMotion ? (
                  <span>···</span>
                ) : (
                  <span className="flex gap-1">
                    <motion.span
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                    >
                      .
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: 0.2,
                      }}
                    >
                      .
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: 0.4,
                      }}
                    >
                      .
                    </motion.span>
                  </span>
                )}
              </div>
              <div className="relative h-[3px] w-full bg-violet-100 dark:bg-[#444] rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-violet-600 dark:via-violet-400 to-transparent rounded-full"
                  initial={{ left: "-35%" }}
                  animate={{ left: reduceMotion ? "30%" : ["-35%", "100%"] }}
                  transition={{
                    duration: 1.8,
                    repeat: reduceMotion ? 0 : Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>

            <div className="flex justify-center mb-9">
              <button
                onClick={() => window.location.reload()}
                className=" cursor-pointer group font-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-violet-700/80 dark:text-violet-300/80 hover:text-violet-900 dark:hover:text-violet-100 border border-violet-600/25 dark:border-violet-400/25 hover:border-violet-600/50 dark:hover:border-violet-400/40 rounded-sm px-4 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600/40 dark:focus-visible:ring-violet-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#333]"
              >
                <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                Check again
              </button>
            </div>

            <div className="font-mono flex items-center justify-between text-[9px] uppercase tracking-[0.1em] text-slate-400 dark:text-[#777] border-t border-dashed border-violet-600/15 dark:border-violet-400/15 pt-4">
              <span>Doc. MNT-2026</span>
              <span>Rev. A</span>
              <span suppressHydrationWarning>{date ?? "--- -- ----"}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
