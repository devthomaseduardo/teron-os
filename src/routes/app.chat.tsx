import { createFileRoute } from "@tanstack/react-router";
import { Paperclip, Send } from "lucide-react";

import { WorkspaceShell } from "@/components/teron/workspace-shell";

export const Route = createFileRoute("/app/chat")({
  head: () => ({ meta: [{ title: "Comunicação — TERON OS" }] }),
  component: ChatPage,
});

const conversations = [
  { id: "1", name: "Meridian Wealth", last: "Helena aprovou o design system", when: "12min", unread: 2 },
  { id: "2", name: "Órion Commerce v2", last: "Enviamos os wireframes v2", when: "1h", unread: 0 },
  { id: "3", name: "Aurora — Portal", last: "Diego pediu mais 2 dias", when: "3h", unread: 1 },
  { id: "4", name: "Pallas Studio", last: "Aguardando materiais…", when: "ontem", unread: 0 },
  { id: "5", name: "Lyra Insights", last: "Deploy staging ok", when: "2d", unread: 0 },
];

const thread = [
  { who: "them", name: "Helena Vasques", body: "Boa tarde! Podemos revisar o dashboard hoje?", when: "14:02" },
  { who: "me", name: "Você", body: "Claro. Acabei de subir a v3 no ambiente de staging. Link no card.", when: "14:04" },
  { who: "them", name: "Helena Vasques", body: "Perfeito. Acabo de aprovar o design system também.", when: "14:22" },
  { who: "system", body: "Aprovação do design system registrada em v1", when: "14:22" },
];

function ChatPage() {
  return (
    <WorkspaceShell
      eyebrow="Operação"
      title="Central de Comunicação"
      description="Um chat por projeto. Mensagens, arquivos e histórico centralizados. WhatsApp fica para o pessoal."
    >
      <div className="grid h-[70vh] grid-cols-1 gap-0 overflow-hidden rounded-xl border border-border bg-card md:grid-cols-[280px_1fr]">
        <aside className="border-b border-border md:border-b-0 md:border-r">
          <div className="border-b border-border px-4 py-3 text-[11px] uppercase tracking-wider text-muted-foreground">Projetos</div>
          <ul>
            {conversations.map((c, idx) => (
              <li key={c.id} className={`cursor-pointer border-b border-border/60 px-4 py-3 last:border-0 hover:bg-muted/30 ${idx === 0 ? "bg-muted/20" : ""}`}>
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-medium text-foreground">{c.name}</p>
                  <span className="text-[10px] text-muted-foreground">{c.when}</span>
                </div>
                <div className="mt-0.5 flex items-center justify-between gap-2">
                  <p className="truncate text-[12px] text-muted-foreground">{c.last}</p>
                  {c.unread > 0 && <span className="rounded-full bg-primary/20 px-1.5 text-[10px] text-primary">{c.unread}</span>}
                </div>
              </li>
            ))}
          </ul>
        </aside>

        <section className="flex flex-col">
          <div className="border-b border-border px-5 py-3">
            <p className="text-[13px] font-medium text-foreground">Meridian Wealth</p>
            <p className="text-[11px] text-muted-foreground">Helena Vasques · Product Lead: Rafael</p>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
            {thread.map((m, i) => (
              m.who === "system" ? (
                <div key={i} className="mx-auto max-w-md rounded-md border border-border/50 bg-background/40 px-3 py-1.5 text-center text-[11.5px] text-muted-foreground">{m.body} · {m.when}</div>
              ) : (
                <div key={i} className={`flex ${m.who === "me" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-md rounded-2xl px-4 py-2.5 text-[13.5px] ${m.who === "me" ? "bg-foreground text-background" : "border border-border bg-background/40 text-foreground"}`}>
                    <p>{m.body}</p>
                    <p className={`mt-1 text-[10.5px] ${m.who === "me" ? "text-background/60" : "text-muted-foreground"}`}>{m.when}</p>
                  </div>
                </div>
              )
            ))}
          </div>
          <div className="border-t border-border px-5 py-3">
            <div className="flex items-center gap-2 rounded-md border border-input bg-background/50 px-3 py-1.5">
              <button className="text-muted-foreground hover:text-foreground" aria-label="Anexar"><Paperclip className="size-4" /></button>
              <input placeholder="Escreva uma mensagem…" className="flex-1 bg-transparent text-[13.5px] outline-none placeholder:text-muted-foreground/60" />
              <button className="grid size-7 place-items-center rounded-md bg-foreground text-background"><Send className="size-3.5" /></button>
            </div>
          </div>
        </section>
      </div>
    </WorkspaceShell>
  );
}
