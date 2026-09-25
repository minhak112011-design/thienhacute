import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Quản lý nhạc nền xuyên suốt website.
 * - Thử phát nhạc khi có một cử chỉ người dùng (ví dụ bấm nút mở quà).
 * - Nếu trình duyệt chặn autoplay, `blocked` sẽ = true để UI hiện nút bật nhạc.
 * - Hỗ trợ play / pause / mute / volume, nhạc lặp lại xuyên suốt các scene.
 */
export function useBackgroundMusic(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = "auto";
    audio.addEventListener("canplaythrough", () => setReady(true));
    audio.addEventListener("error", () => setHasError(true));
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  const tryPlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || hasError) return;
    try {
      await audio.play();
      setIsPlaying(true);
      setBlocked(false);
    } catch {
      setBlocked(true);
      setIsPlaying(false);
    }
  }, [hasError]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      void tryPlay();
    }
  }, [isPlaying, pause, tryPlay]);

  const setVolume = useCallback((v: number) => {
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  return { isPlaying, blocked, ready, hasError, tryPlay, pause, toggle, setVolume };
}
