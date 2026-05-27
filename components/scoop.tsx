import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<Size, string> = {
  sm: "w-12 h-12 text-2xl",
  md: "w-20 h-20 text-4xl",
  lg: "w-32 h-32 text-6xl",
  xl: "w-48 h-48 text-7xl",
};

export function Scoop({
  emoji,
  gradient,
  size = "md",
  className,
  tilt = 0,
}: {
  emoji: string;
  gradient: string;
  size?: Size;
  className?: string;
  tilt?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative inline-flex items-center justify-center rounded-full select-none shrink-0",
        sizeMap[size],
        className
      )}
      style={{
        background: gradient,
        boxShadow:
          "inset 0 -8px 18px rgba(74,42,32,0.32), inset 0 4px 10px rgba(255,255,255,0.45), 0 14px 32px rgba(74,42,32,0.22)",
        transform: tilt ? `rotate(${tilt}deg)` : undefined,
      }}
    >
      <span
        className="drop-shadow-sm"
        style={{ filter: "drop-shadow(0 2px 3px rgba(74,42,32,0.3))" }}
      >
        {emoji}
      </span>
    </div>
  );
}
