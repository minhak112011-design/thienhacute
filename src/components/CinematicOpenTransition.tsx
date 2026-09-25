import { motion } from "framer-motion";

/**
 * Hiệu ứng cinematic khi bấm "Mở món quà dành cho vợ":
 * ánh sáng lan ra từ tâm màn hình + particle bay + fade + zoom nhẹ.
 */
export default function CinematicOpenTransition() {
  const particles = Array.from({ length: 26 });

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#05040d]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
    >
      {/* Expanding golden light */}
      <motion.div
        className="absolute rounded-full bg-[radial-gradient(circle,rgba(243,230,197,0.95)_0%,rgba(230,191,122,0.55)_28%,rgba(90,60,160,0.25)_55%,transparent_75%)]"
        initial={{ width: 10, height: 10, opacity: 0.9 }}
        animate={{ width: "220vw", height: "220vw", opacity: 0 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Soft white core flash */}
      <motion.div
        className="absolute h-10 w-10 rounded-full bg-white"
        initial={{ opacity: 0.9, scale: 0.4 }}
        animate={{ opacity: 0, scale: 3 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />

      {/* Flying particles */}
      {particles.map((_, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const distance = 180 + (i % 5) * 60;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        return (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-[#f3e6c5]"
            style={{ boxShadow: "0 0 10px 3px rgba(243,230,197,0.7)" }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x, y, opacity: 0, scale: 0.3 }}
            transition={{ duration: 1.3 + (i % 4) * 0.15, ease: "easeOut" }}
          />
        );
      })}
    </motion.div>
  );
}
