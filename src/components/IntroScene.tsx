import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { INTRO } from "../data/content";

interface IntroSceneProps {
  onOpen: () => void;
}

export default function IntroScene({ onOpen }: IntroSceneProps) {
  const [stage, setStage] = useState<"loading" | "text" | "button">("loading");

  useEffect(() => {
    const t1 = setTimeout(() => setStage("text"), 2200);
    const t2 = setTimeout(() => setStage("button"), 4200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen min-h-[100dvh] w-full flex-col items-center justify-center px-6 text-center">
      <AnimatePresence mode="wait">
        {stage === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative flex h-20 w-20 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-[#e6bf7a]/20" />
              <span className="animate-ring-spin absolute inset-0 rounded-full border-2 border-transparent border-t-[#e6bf7a] border-r-[#e6bf7a]/40" />
              <Heart className="h-6 w-6 text-[#e6bf7a]/80" strokeWidth={1.4} fill="currentColor" fillOpacity={0.15} />
            </div>
          </motion.div>
        )}

        {stage !== "loading" && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-10"
          >
            <p className="font-serif-love text-xl italic text-[#f3e6c5]/90 text-shadow-glow sm:text-2xl md:text-3xl">
              {INTRO.waitingLine}
            </p>

            <AnimatePresence>
              {stage === "button" && (
                <motion.button
                  type="button"
                  onClick={onOpen}
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.03 }}
                  className="glass-button rounded-full px-8 py-4 text-sm font-medium tracking-wide text-[#fdf6e3] shadow-[0_0_30px_rgba(230,191,122,0.25)] sm:text-base"
                >
                  {INTRO.openButton}
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="absolute bottom-6 text-[10px] uppercase tracking-[0.35em] text-[#e9e2ff]/30 sm:bottom-10">
        một lá thư giữa bầu trời đêm
      </p>
    </div>
  );
}
