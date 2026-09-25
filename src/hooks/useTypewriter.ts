import { useEffect, useState } from "react";

/**
 * Hiệu ứng chữ xuất hiện từng ký tự (typewriter nhẹ nhàng).
 * @param text nội dung cần hiển thị
 * @param speed tốc độ (ms / ký tự)
 * @param start chỉ bắt đầu chạy khi true
 */
export function useTypewriter(text: string, speed = 45, start = true) {
  const [output, setOutput] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start) {
      setOutput("");
      setDone(false);
      return;
    }
    let i = 0;
    setOutput("");
    setDone(false);
    const id = setInterval(() => {
      i += 1;
      setOutput(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, start]);

  return { output, done };
}
