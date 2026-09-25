import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  speed: number;
  twinkleSpeed: number;
  phase: number;
}

/**
 * Canvas starfield: nhẹ, mượt, tự resize theo màn hình.
 * Vẽ các ngôi sao lấp lánh trôi rất chậm để tạo chiều sâu (parallax nhẹ).
 */
export default function StarField({ density = 1 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let rafId = 0;
    let mouseX = 0;
    let mouseY = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor(((width * height) / 9000) * density);
      stars = Array.from({ length: Math.min(count, 220) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.3,
        speed: Math.random() * 0.02 + 0.005,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function onMouseMove(e: MouseEvent) {
      mouseX = (e.clientX / width - 0.5) * 10;
      mouseY = (e.clientY / height - 0.5) * 10;
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      for (const s of stars) {
        s.phase += s.twinkleSpeed;
        s.y += s.speed;
        if (s.y > height) s.y = 0;
        const twinkle = (Math.sin(s.phase) + 1) / 2;
        const alpha = 0.25 + twinkle * 0.75;
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(255, 250, 235, ${alpha})`;
        ctx!.shadowColor = "rgba(230, 191, 122, 0.9)";
        ctx!.shadowBlur = s.r * 3;
        ctx!.arc(s.x + mouseX, s.y + mouseY, s.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      rafId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
