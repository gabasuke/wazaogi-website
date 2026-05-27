import { Camera } from "lucide-react";

type Props = {
  className?: string;
};

export function InstagramMark({ className = "" }: Props) {
  return (
    <span
      className={`instagram-pulse inline-grid place-items-center rounded-2xl bg-[radial-gradient(circle_at_30%_25%,#ffd27d,transparent_26%),linear-gradient(135deg,#833ab4,#fd1d1d_48%,#fcb045)] text-white shadow-glow ${className}`}
      aria-hidden="true"
    >
      <Camera className="size-5" />
    </span>
  );
}
