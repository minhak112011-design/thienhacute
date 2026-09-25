import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LETTER } from "../data/content";

interface LetterSceneProps {
  onContinue: () => void;
}

const TYPE_SPEED = 22;
const PARAGRAPH_PAUSE = 500;

export default function LetterScene({ onContinue }: LetterSceneProps) {
  const [opened, setOpened] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [typedCurrent, setTypedCurrent] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const total = LETTER.paragraphs.length;
  const finished = revealedCount >= total;

  // Type out the current paragraph, then advance.
  useEffect(() => {
    if (!opened || finished) return;
    const paragraph = LETTER.paragraphs[revealedCount];
    let i = 0;
    setTypedCurrent("");
    const id = setInterval(() => {
      i += 1;
      setTypedCurrent(paragraph.slice(0, i));
      if (i >= paragraph.length) {
        clearInterval(id);
        setTimeout(() => setRevealedCount((c) => c + 1), PARAGRAPH_PAUSE);
      }
    }, TYPE_SPEED);
    return () => clearInterval(id);
  }, [opened, revealedCount, finished]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [typedCurrent, revealedCount]);

  const progress = opened ? Math.min(1, (revealedCount + (finished ? 0 : 0.5)) / total) : 0;

  return (
    <div className="relative flex min-h-screen min-h-[100dvh] w-full items-center justify-center px-4 py-14 sm:px-6">
      {/* golden particles around the letter */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#e6bf7a] animate-float-y-slow"
            style={{
              left: `${(i * 23) % 100}%`,
              top: `${(i * 31) % 100}%`,
              width: `${1.5 + (i % 3)}px`,
              height: `${1.5 + (i % 3)}px`,
              opacity: 0.5,
              boxShadow: "0 0 8px 2px rgba(230,191,122,0.5)",
              animationDuration: `${6 + (i % 5)}s`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        layout
        transition={{ layout: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
        className="relative w-full max-w-[560px] overflow-hidden rounded-[1.6rem] border border-[#e6bf7a]/50 bg-gradient-to-b from-[#fdf6e3] via-[#f8ecd2] to-[#f3e4c4] shadow-[0_20px_70px_rgba(0,0,0,0.55)]"
      >
        {/* decorative moon */}
        <div className="absolute -top-6 left-1/2 h-14 w-14 -translate-x-1/2 rounded-full bg-gradient-to-br from-white to-[#f3e6c5] shadow-[0_0_30px_rgba(255,244,214,0.8)]" />
        {/* soft cloud corners */}
        <div className="absolute -left-6 -top-6 h-20 w-28 rounded-full bg-white/50 blur-xl" />
        <div className="absolute -right-8 -top-4 h-16 w-28 rounded-full bg-white/40 blur-xl" />
        {/* lanterns */}
        <span className="absolute left-3 top-3 text-lg opacity-80 sm:left-4 sm:top-4">🏮</span>
        <span className="absolute right-3 top-3 text-lg opacity-80 sm:right-4 sm:top-4">🏮</span>
        {/* small flowers */}
        <span className="absolute bottom-3 left-4 text-sm opacity-70">🌸</span>
        <span className="absolute bottom-3 right-4 text-sm opacity-70">🌸</span>

        <div className="relative px-6 pb-8 pt-14 sm:px-10 sm:pb-10">
          <h2 className="text-center font-serif-love text-xl italic text-[#5a3d1a] sm:text-2xl">
            {LETTER.title}
          </h2>

          <div className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-transparent via-[#c99a4a] to-transparent" />

          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.div
                key="closed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 flex flex-col items-center gap-6 py-6"
              >
                <p className="max-w-xs text-center text-sm italic text-[#7a5b2c]/80 sm:text-base">
                  Một lá thư nhỏ, viết bằng cả sự chân thành...
                </p>
                <motion.button
                  type="button"
                  onClick={() => setOpened(true)}
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.03 }}
                  className="rounded-full border border-[#c99a4a]/60 bg-[#c99a4a]/10 px-6 py-3 text-sm font-medium text-[#7a5b2c] shadow-[0_0_20px_rgba(201,154,74,0.25)] transition hover:bg-[#c99a4a]/20 sm:text-base"
                >
                  {LETTER.openButton}
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6"
              >
                <div
                  ref={scrollRef}
                  className="letter-scroll max-h-[46vh] overflow-y-auto pr-1 sm:max-h-[50vh]"
                >
                  <div className="space-y-4 pb-2">
                    {LETTER.paragraphs.slice(0, revealedCount).map((p, idx) => (
                      <p
                        key={idx}
                        className="whitespace-pre-line font-serif-love text-[15px] leading-relaxed text-[#4a3417] sm:text-base"
                      >
                        {p}
                      </p>
                    ))}
                    {!finished && (
                      <p className="whitespace-pre-line font-serif-love text-[15px] leading-relaxed text-[#4a3417] sm:text-base">
                        {typedCurrent}
                        <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-[#7a5b2c]/70">
                          &nbsp;
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                {/* progress bar */}
                <div className="mt-5 h-[3px] w-full overflow-hidden rounded-full bg-[#c99a4a]/20">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#c99a4a] to-[#e6bf7a]"
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ ease: "easeOut", duration: 0.4 }}
                  />
                </div>

                <AnimatePresence>
                  {finished && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                      className="mt-6 flex justify-center"
                    >
                      <button
                        type="button"
                        onClick={onContinue}
                        className="rounded-full border border-[#c99a4a]/60 bg-[#c99a4a]/10 px-6 py-3 text-sm font-medium text-[#7a5b2c] shadow-[0_0_20px_rgba(201,154,74,0.25)] transition hover:bg-[#c99a4a]/20 sm:text-base"
                      >
                        {LETTER.continueButton}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
