import { motion } from "framer-motion";

/**
 * Hiệu ứng tim + ánh sáng nhỏ bay lên khi bấm "Ôm em một cái".
 * Dùng rất nhiều tim sẽ rối mắt nên số lượng được giữ vừa phải.
 */
export default function HeartBurst() {
  const hearts = Array.from({ length: 18 });

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      {hearts.map((_, i) => {
        const left = 10 + ((i * 47) % 80);
        const delay = (i % 6) * 0.15;
        const isHeart = i % 3 !== 0;
        return (
          <motion.span
            key={i}
            className="animate-heart-rise absolute bottom-10 select-none"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              fontSize: isHeart ? `${16 + (i % 4) * 6}px` : "8px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {isHeart ? (
              "❤️"
            ) : (
              <span
                className="block h-2 w-2 rounded-full bg-[#f3e6c5]"
                style={{ boxShadow: "0 0 12px 4px rgba(243,230,197,0.7)" }}
              />
            )}
          </motion.span>
        );
      })}
    </div>
  );
}
