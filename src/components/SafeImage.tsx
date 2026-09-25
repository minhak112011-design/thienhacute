import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { cn } from "../utils/cn";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderLabel?: string;
  imgClassName?: string;
}

/**
 * Ảnh "an toàn": nếu file chưa tồn tại (chưa upload), hiển thị khung
 * placeholder sang trọng thay vì vỡ giao diện. Khi ảnh thật được thêm
 * vào đúng đường dẫn, component tự động hiển thị ảnh thật.
 */
export default function SafeImage({
  src,
  alt,
  className,
  placeholderLabel,
  imgClassName,
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-3 rounded-[1.4rem] border border-dashed border-[#e6bf7a]/40 bg-gradient-to-br from-[#151029]/80 to-[#0a0818]/80 p-6 text-center",
          className,
        )}
      >
        <ImagePlus className="h-9 w-9 text-[#e6bf7a]/70" strokeWidth={1.4} />
        <p className="max-w-[220px] text-sm leading-relaxed text-[#e9e2ff]/70">
          {placeholderLabel ?? "Đặt ảnh của Thiên Hà vào /public/images/thienha.jpg"}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={cn("object-cover", className, imgClassName)}
      draggable={false}
    />
  );
}
