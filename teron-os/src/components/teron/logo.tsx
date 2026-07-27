import teronLogo from "@/assets/teron-logo.png.asset.json";
import { cn } from "@/lib/utils";

export function TeronMark({ className }: { className?: string }) {
  return (
    <img
      src={teronLogo.url}
      alt="TERON"
      className={cn("h-7 w-7 rounded-md object-contain", className)}
    />
  );
}

export function TeronWordmark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <TeronMark />
      <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
        Thomas<span className="text-muted-foreground/70"> OS</span>
      </span>
    </div>
  );
}
