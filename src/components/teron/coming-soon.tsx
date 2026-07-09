import { ArrowUpRight, Sparkles } from "lucide-react";

export function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card/40 p-12 text-center">
      <div className="mx-auto grid size-10 place-items-center rounded-md bg-muted">
        <Sparkles className="size-4 text-muted-foreground" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      <button className="mt-6 inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-[12.5px] text-foreground hover:bg-accent">
        Entrar na fila do beta <ArrowUpRight className="size-3" />
      </button>
    </div>
  );
}