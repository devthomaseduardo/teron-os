import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const tones = {
  neutral: "bg-muted/60 text-muted-foreground ring-border",
  primary: "bg-primary/10 text-primary ring-primary/20",
  success: "bg-[oklch(0.72_0.15_155_/_12%)] text-[oklch(0.82_0.15_155)] ring-[oklch(0.72_0.15_155_/_25%)]",
  warning: "bg-[oklch(0.8_0.14_78_/_12%)] text-[oklch(0.88_0.14_78)] ring-[oklch(0.8_0.14_78_/_25%)]",
  danger: "bg-[oklch(0.65_0.2_22_/_14%)] text-[oklch(0.78_0.18_22)] ring-[oklch(0.65_0.2_22_/_28%)]",
  info: "bg-[oklch(0.7_0.14_250_/_12%)] text-[oklch(0.82_0.13_250)] ring-[oklch(0.7_0.14_250_/_25%)]",
} as const;

export function StatusPill({
  tone = "neutral",
  dot = false,
  children,
  className,
}: {
  tone?: keyof typeof tones;
  dot?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}