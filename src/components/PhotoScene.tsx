import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SafeImage from "./SafeImage";
import { MEDIA, PHOTO_SCENE, SITE } from "../data/content";

interface PhotoSceneProps {
  onContinue: () => void;
}

export default function PhotoScene({ onContinue }: PhotoSceneProps) {
  return (
    <div className="relative flex min-h-screen min-h-[100dvh] w-full flex-col items-center justify-center px-6 py-16 text-center">
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="mb-6 text-xs uppercase tracking-[0.4em] text-[#e6bf7a]/70 sm:text-sm"
      >
        {PHOTO_SCENE.eyebrow}
      </motion.p>

      <div className="relative">
        {/* Halo behind photo */}
        <div className="absolute left-1/2 top-1/2 -z-10 h-[95%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(243,230,197,0.4)_0%,rgba(230,191,122,0.12)_45%,transparent_70%)] blur-2xl" />

        {/* Floating sparkles around the photo */}
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="pointer-events-none absolute rounded-full bg-[#f3e6c5] animate-float-y"
            style={{
              left: `${(i * 41) % 100}%`,
              top: `${(i * 29) % 100}%`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              boxShadow: "0 0 10px 3px rgba(243,230,197,0.6)",
              animationDelay: `${i * 0.35}s`,
              animationDuration: `${5 + (i % 4)}s`,
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: "blur(18px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative mx-auto aspect-[3/4] w-[72vw] max-w-[300px] overflow-hidden rounded-[1.6rem] border border-[#e6bf7a]/40 shadow-[0_0_50px_rgba(230,191,122,0.25)] sm:w-[320px] sm:max-w-[340px] md:w-[360px]"
        >
          <SafeImage
            src={MEDIA.heroImage}
            alt={SITE.recipientName}
            className="h-full w-full"
            imgClassName="h-full w-full"
            placeholderLabel="Đặt ảnh của Thiên Hà vào /public/images/thienha.jpg"
          />
          <div className="pointer-events-none absolute inset-0 rounded-[1.6rem] ring-1 ring-inset ring-white/10" />
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="mt-7 font-serif-love text-2xl italic text-[#fdf6e3] text-shadow-glow sm:text-3xl"
      >
        {PHOTO_SCENE.caption}
      </motion.p>

      <motion.button
        type="button"
        onClick={onContinue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="mt-12 flex flex-col items-center gap-2 text-[#e9e2ff]/60 transition hover:text-[#f3e6c5]"
      >
        <span className="text-xs tracking-widest">{PHOTO_SCENE.continueLabel}</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown className="h-5 w-5" strokeWidth={1.4} />
        </motion.span>
      </motion.button>
    </div>
  );
}
