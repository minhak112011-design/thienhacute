import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SafeImage from "./SafeImage";
import { GALLERY } from "../data/content";

interface GallerySceneProps {
  onContinue: () => void;
}

const ROTATIONS = [-4, 3, -2, 5, -3, 2];

export default function GalleryScene({ onContinue }: GallerySceneProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function scrollToIndex(idx: number) {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[idx] as HTMLElement | undefined;
    if (child) {
      track.scrollTo({ left: child.offsetLeft - (track.clientWidth - child.clientWidth) / 2, behavior: "smooth" });
      setActive(idx);
    }
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let min = Infinity;
    Array.from(track.children).forEach((child, idx) => {
      const el = child as HTMLElement;
      const elCenter = el.offsetLeft + el.clientWidth / 2;
      const d = Math.abs(elCenter - center);
      if (d < min) {
        min = d;
        closest = idx;
      }
    });
    setActive(closest);
  }

  return (
    <div className="relative flex min-h-screen min-h-[100dvh] w-full flex-col items-center justify-center gap-10 px-4 py-16">
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="font-serif-love text-2xl italic text-[#fdf6e3] text-shadow-glow sm:text-3xl"
        >
          {GALLERY.title}
        </motion.h2>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[#e9e2ff]/50">
          {GALLERY.subtitle}
        </p>
      </div>

      <div className="relative w-full max-w-4xl">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="letter-scroll flex snap-x snap-mandatory gap-6 overflow-x-auto px-[10vw] pb-6 sm:px-[18vw]"
          style={{ scrollbarWidth: "thin" }}
        >
          {GALLERY.photos.map((photo, idx) => (
            <motion.div
              key={idx}
              className="flex w-[70vw] max-w-[300px] shrink-0 snap-center flex-col items-center rounded-sm bg-[#fdf9ef] p-3 pb-6 shadow-[0_20px_45px_rgba(0,0,0,0.45)] sm:w-[280px]"
              style={{ rotate: ROTATIONS[idx % ROTATIONS.length] }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: (idx % 4) * 0.1 }}
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-[#e9e2ff]/10">
                <SafeImage
                  src={photo.src}
                  alt={`Kỷ niệm ${idx + 1}`}
                  className="h-full w-full"
                  imgClassName="h-full w-full"
                  placeholderLabel={`Thêm ảnh kỷ niệm vào public${photo.src}`}
                />
              </div>
              {photo.caption && (
                <p className="mt-3 px-1 text-center font-hand text-lg text-[#4a3417]">
                  {photo.caption}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollToIndex(Math.max(0, active - 1))}
          className="glass-button absolute left-0 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full p-2 text-[#f3e6c5] sm:flex"
          aria-label="Ảnh trước"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollToIndex(Math.min(GALLERY.photos.length - 1, active + 1))}
          className="glass-button absolute right-0 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full p-2 text-[#f3e6c5] sm:flex"
          aria-label="Ảnh tiếp theo"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex gap-2">
        {GALLERY.photos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            aria-label={`Đến ảnh ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              active === idx ? "w-6 bg-[#e6bf7a]" : "w-1.5 bg-[#e6bf7a]/30"
            }`}
          />
        ))}
      </div>

      <motion.button
        type="button"
        onClick={onContinue}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.9 }}
        whileTap={{ scale: 0.96 }}
        className="glass-button rounded-full px-7 py-3.5 text-sm text-[#fdf6e3] sm:text-base"
      >
        {GALLERY.continueButton}
      </motion.button>
    </div>
  );
}
