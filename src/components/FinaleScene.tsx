import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Mail } from "lucide-react";
import SafeImage from "./SafeImage";
import HeartBurst from "./HeartBurst";
import { FINALE, MEDIA, SITE } from "../data/content";

interface FinaleSceneProps {
  onReplay: () => void;
  onReopenLetter: () => void;
}

export default function FinaleScene({ onReplay, onReopenLetter }: FinaleSceneProps) {
  const [hugged, setHugged] = useState(false);
  const [shake, setShake] = useState(false);

  function handleHug() {
    setHugged(true);
    setShake(true);
    setTimeout(() => setShake(false), 700);
  }

  return (
    <motion.div
      animate={
        shake
          ? { x: [0, -6, 6, -4, 4, -2, 2, 0], y: [0, 2, -2, 1, -1, 0] }
          : { x: 0, y: 0 }
      }
      transition={{ duration: 0.6 }}
      className="relative flex min-h-screen min-h-[100dvh] w-full flex-col items-center justify-center gap-6 px-6 py-16 text-center"
    >
      {hugged && <HeartBurst />}

      <div className="relative">
        <div className="absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(243,230,197,0.35)_0%,transparent_70%)] blur-2xl" />
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto h-32 w-32 overflow-hidden rounded-full border border-[#e6bf7a]/50 shadow-[0_0_45px_rgba(230,191,122,0.3)] sm:h-40 sm:w-40"
        >
          <SafeImage
            src={MEDIA.heroImage}
            alt={SITE.recipientName}
            className="h-full w-full"
            imgClassName="h-full w-full"
            placeholderLabel="Ảnh Thiên Hà"
          />
        </motion.div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.9 }}
        className="font-hand text-4xl text-[#e6bf7a] text-shadow-glow sm:text-5xl"
      >
        {FINALE.name}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.9 }}
        className="max-w-md space-y-1 font-serif-love text-lg italic text-[#e9e2ff]/90 sm:text-xl"
      >
        <p>{FINALE.line1}</p>
        <p>{FINALE.line2}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, duration: 0.9 }}
        className="max-w-md space-y-1 font-serif-love text-base text-[#fdf6e3]/90 sm:text-lg"
      >
        <p>{FINALE.line3}</p>
        <p>{FINALE.line4}</p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.3, duration: 0.9 }}
        className="mt-2 font-hand text-2xl text-[#e6bf7a]/90"
      >
        {FINALE.signature}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.6, duration: 0.9 }}
        className="mt-6 flex flex-col items-center gap-4"
      >
        <AnimatePresence mode="wait">
          {!hugged ? (
            <motion.button
              key="hugbtn"
              type="button"
              onClick={handleHug}
              whileTap={{ scale: 0.94 }}
              whileHover={{ scale: 1.03 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-button rounded-full px-8 py-4 text-sm font-medium text-[#fdf6e3] shadow-[0_0_30px_rgba(230,191,122,0.25)] sm:text-base"
            >
              {FINALE.hugButton}
            </motion.button>
          ) : (
            <motion.p
              key="hugmsg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel max-w-xs whitespace-pre-line rounded-2xl px-6 py-5 font-serif-love text-base italic text-[#fdf6e3] sm:text-lg"
            >
              {FINALE.hugMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReopenLetter}
          className="glass-button flex items-center gap-2 rounded-full px-5 py-2.5 text-xs text-[#e9e2ff]/80 sm:text-sm"
        >
          <Mail className="h-4 w-4" strokeWidth={1.6} />
          {FINALE.reopenLetterButton}
        </button>
        <button
          type="button"
          onClick={onReplay}
          className="glass-button flex items-center gap-2 rounded-full px-5 py-2.5 text-xs text-[#e9e2ff]/80 sm:text-sm"
        >
          <RotateCcw className="h-4 w-4" strokeWidth={1.6} />
          {FINALE.replayButton}
        </button>
      </div>
    </motion.div>
  );
}
