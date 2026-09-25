import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTypewriter } from "../hooks/useTypewriter";
import { GREETING } from "../data/content";

interface GreetingSceneProps {
  onContinue: () => void;
}

export default function GreetingScene({ onContinue }: GreetingSceneProps) {
  const [stage, setStage] = useState(0);

  const t1 = useTypewriter(GREETING.line1, 55, stage >= 0);
  const t2 = useTypewriter(GREETING.line2, 65, stage >= 1);
  const t3 = useTypewriter(GREETING.line3, 40, stage >= 2);

  useEffect(() => {
    if (t1.done && stage === 0) {
      const id = setTimeout(() => setStage(1), 350);
      return () => clearTimeout(id);
    }
  }, [t1.done, stage]);

  useEffect(() => {
    if (t2.done && stage === 1) {
      const id = setTimeout(() => setStage(2), 700);
      return () => clearTimeout(id);
    }
  }, [t2.done, stage]);

  useEffect(() => {
    if (t3.done && stage === 2) {
      const id = setTimeout(() => setStage(3), 900);
      return () => clearTimeout(id);
    }
  }, [t3.done, stage]);

  return (
    <div className="relative flex min-h-screen min-h-[100dvh] w-full flex-col items-center justify-center px-6 text-center">
      <div className="flex max-w-xl flex-col items-center gap-4">
        <p className="font-serif-love text-2xl text-[#e9e2ff]/90 sm:text-3xl">
          {t1.output}
          {!t1.done && <Cursor />}
        </p>
        <p className="font-hand text-5xl text-[#e6bf7a] text-shadow-glow sm:text-6xl">
          {t2.output}
          {stage === 1 && !t2.done && <Cursor />}
        </p>
        <p className="mt-4 font-serif-love text-lg italic text-[#e9e2ff]/70 sm:text-xl">
          {t3.output}
          {stage === 2 && !t3.done && <Cursor />}
        </p>
      </div>

      <AnimatePresence>
        {stage === 3 && (
          <motion.button
            type="button"
            onClick={onContinue}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            whileTap={{ scale: 0.96 }}
            className="glass-button mt-14 rounded-full px-7 py-3.5 text-sm text-[#fdf6e3] sm:text-base"
          >
            Đọc tiếp lời anh, em nhé
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function Cursor() {
  return <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-[#e6bf7a]/80">&nbsp;</span>;
}
