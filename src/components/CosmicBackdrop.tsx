import StarField from "./StarField";

/**
 * Lớp nền vũ trụ dùng chung cho toàn bộ website:
 * bầu trời đêm, nebula mờ, hạt sáng lơ lửng, sao băng, ánh trăng.
 * Đặt cố định (fixed) phía sau mọi scene, các scene chỉ cần
 * render nội dung của mình lên trên.
 */
export default function CosmicBackdrop() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#05040d]">
      {/* Base night gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,#1b1440_0%,#0a081f_45%,#05040d_100%)]" />

      {/* Nebula soft clouds */}
      <div className="absolute -left-1/4 top-[-10%] h-[60vh] w-[60vh] rounded-full bg-[#4c2f7a]/25 blur-[110px] animate-pulse-glow" />
      <div
        className="absolute -right-1/4 top-[20%] h-[55vh] w-[55vh] rounded-full bg-[#2c3f6e]/25 blur-[120px] animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-[-15%] left-[20%] h-[50vh] w-[50vh] rounded-full bg-[#6b3f57]/20 blur-[130px] animate-pulse-glow"
        style={{ animationDelay: "4s" }}
      />

      {/* Moon halo */}
      <div className="absolute right-[8%] top-[8%] h-28 w-28 rounded-full bg-[#f3e6c5] opacity-90 shadow-[0_0_60px_25px_rgba(243,230,197,0.35)] sm:h-36 sm:w-36" />
      <div className="absolute right-[6%] top-[6%] h-40 w-40 rounded-full bg-[#f3e6c5]/10 blur-2xl sm:h-52 sm:w-52" />

      {/* Golden light rays */}
      <div className="absolute inset-0 opacity-[0.07] mix-blend-screen">
        <div className="absolute left-1/2 top-0 h-[140%] w-[2px] -translate-x-1/2 rotate-[8deg] bg-gradient-to-b from-[#e6bf7a] via-transparent to-transparent" />
        <div className="absolute left-[40%] top-0 h-[140%] w-[1.5px] -translate-x-1/2 rotate-[-6deg] bg-gradient-to-b from-[#e6bf7a] via-transparent to-transparent" />
        <div className="absolute left-[62%] top-0 h-[140%] w-[1.5px] -translate-x-1/2 rotate-[4deg] bg-gradient-to-b from-[#e6bf7a] via-transparent to-transparent" />
      </div>

      {/* Star field */}
      <StarField />

      {/* Falling stars */}
      <div className="absolute inset-0 overflow-hidden">
        <span className="absolute left-[15%] top-[5%] h-[2px] w-14 rounded-full bg-gradient-to-r from-transparent via-[#fdf6e3] to-transparent animate-fall-star [animation-duration:6s] [animation-delay:1s]" />
        <span className="absolute left-[55%] top-[0%] h-[2px] w-20 rounded-full bg-gradient-to-r from-transparent via-[#fdf6e3] to-transparent animate-fall-star [animation-duration:8s] [animation-delay:4s]" />
        <span className="absolute left-[80%] top-[10%] h-[2px] w-10 rounded-full bg-gradient-to-r from-transparent via-[#fdf6e3] to-transparent animate-fall-star [animation-duration:7s] [animation-delay:7s]" />
      </div>

      {/* Floating glowing dust */}
      <div className="absolute inset-0">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#e6bf7a] animate-float-y-slow"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              opacity: 0.35 + (i % 4) * 0.1,
              filter: "blur(0.5px)",
              boxShadow: "0 0 8px 2px rgba(230,191,122,0.5)",
              animationDuration: `${7 + (i % 5)}s`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
