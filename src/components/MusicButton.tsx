import { Music2, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MUSIC_PROMPT_LABEL } from "../data/content";

interface MusicButtonProps {
  isPlaying: boolean;
  blocked: boolean;
  onToggle: () => void;
}

export default function MusicButton({ isPlaying, blocked, onToggle }: MusicButtonProps) {
  return (
    <>
      <motion.button
        type="button"
        onClick={onToggle}
        aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
        className="glass-button fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full text-[#f3e6c5] shadow-lg sm:bottom-6 sm:right-6"
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {isPlaying ? (
          <Volume2 className="h-5 w-5" strokeWidth={1.6} />
        ) : (
          <VolumeX className="h-5 w-5" strokeWidth={1.6} />
        )}
      </motion.button>

      <AnimatePresence>
        {blocked && !isPlaying && (
          <motion.button
            type="button"
            onClick={onToggle}
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            className="glass-button fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-xs text-[#f3e6c5] sm:top-6 sm:text-sm"
          >
            <Music2 className="h-4 w-4" strokeWidth={1.6} />
            {MUSIC_PROMPT_LABEL}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
