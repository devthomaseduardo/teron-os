import { createFileRoute, useParams } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock,
  MessageSquare,
  Upload,
  ShieldAlert,
  FileCheck,
  X,
  UploadCloud,
  Loader2,
  AlertTriangle,
} from "lucide-react";

import { TeronWordmark } from "@/components/teron/logo";
import { StatusPill } from "@/components/teron/status-pill";
import { currency } from "@/lib/teron-data";

export const Route = createFileRoute("/cliente/onboarding/$projeto")({
  head: () => ({
    meta: [
      { title: "Workstation · TERON OS" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WorkstationPage,
});

type ChecklistItem = {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  done?: boolean;
  fileName?: string;
};

type ProjectPayload = {
  id: string;
  title: string;
  clientName: string;
  clientCompany: string | null;
  clientEmail: string | null;
  status: string;
  deadline: string | null;
  budget: number;
  description: string | null;
  portal: { checklist: ChecklistItem[]; notes: { text: string; at: string }[] };
  progress: number;
  requiredProgress: number;
  lead: {
    name: string;
    company: string | null;
    email: string | null;
    phone: string | null;
    briefing: string | null;
    projectType: string | null;
    deadline: string | null;
  } | null;
  proposal: { publicToken: string; status: string; amount: number } | null;
};

function WorkstationPage() {
  const { projeto } = useParams({ from: "/cliente/onboarding/$projeto" });
  const [data, setData] = useState<ProjectPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeUpload, setActiveUpload] = useState<ChecklistItem | null>(null);
  const [fileName, setFileName] = useState("");
  const [saving, setSaving] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/project/${encodeURIComponent(projeto)}`);
      if (res.status === 404) {
        setError("Projeto n\u00e3o encontrado. Use o link enviado na proposta.");
        setData(null);
        return;
      }
      if (!res.ok) {
        setError("N\u00e3o foi poss\u00edvel carregar a workstation.");
        setData(null);
        return;
      }
      const json = await res.json();
      setData(json);
      setError(null);
    } catch {
      setError("Falha de rede");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [projeto]);

  useEffect(() => {
    load();
  }, [load]);

  const markDone = async () => {
    if (!activeUpload) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/project/${encodeURIComponent(projeto)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checklistItemId: activeUpload.id,
          done: true,
          fileName: fileName || `arquivo-${activeUpload.id}`,
        }),
      });
      if (res.ok) {
        await load();
        setActiveUpload(null);
        setFileName("");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="size-6 animate-spin text-primary" />
        <p className="text-sm">Carregando workstation...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6 text-center">
        <AlertTriangle className="size-10 text-amber-400" />
        <h1 className="font-display text-2xl font-semibold">Workstation indispon\u00edvel</h1>
        <p className="text-sm text-muted-foreground max-w-md">{error}</p>
      </div>
    );
  }

  const checklist = data.portal.checklist || [];
  const required = checklist.filter((c) => c.required !== false);
  const requiredDone = required.filter((c) => c.done).length;
  const isBlocked = data.requiredProgress < 100;
  const company = data.clientCompany || data.lead?.company || data.clientName;
  const contact = data.clientName || data.lead?.name || "Cliente";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <TeronWordmark />
            <span className="hidden text-xs text-muted-foreground sm:inline">
              Workstation · {data.title}
            </span>
          </div>
          <StatusPill tone={isBlocked ? "warning" : "success"} dot>
            {data.status}
          </StatusPill>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{data.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          Envie os materiais obrigat\u00f3rios. Quando 100% estiverem ok, o cronograma segue em andamento — e o painel admin v\u00ea a mesma atualiza\u00e7\u00e3o.
        </p>

        <div className="mt-8 rounded-2xl border border-primary/30 bg-card/80 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3 flex-wrap gap-2">
            <span className="text-primary font-bold text-sm">Cliente e briefing</span>
            <StatusPill tone="info" dot>
              {data.proposal?.status || data.status}
            </StatusPill>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <Info label="Respons\u00e1vel" value={contact} sub={company} />
            <Info label="E-mail" value={data.clientEmail || data.lead?.email || "—"} />
            <Info label="Escopo" value={data.lead?.projectType || data.title} sub={data.deadline || data.lead?.deadline || ""} />
            <Info
              label="Investimento"
              value={currency(data.budget || data.proposal?.amount || 0)}
              sub="Registrado no contrato"
            />
          </div>
          {(data.description || data.lead?.briefing) && (
            <div className="rounded-xl border border-border/40 bg-background/40 p-4 text-xs">
              <span className="text-[10px] font-mono text-muted-foreground uppercase">Briefing</span>
              <p className="mt-1 leading-relaxed">{data.description || data.lead?.briefing}</p>
            </div>
          )}
        </div>

        {isBlocked ? (
          <div className="mt-8 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-6">
            <div className="flex items-start gap-4">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-500/20 text-amber-400">
                <ShieldAlert className="size-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base">
                  Aguardando materiais ({data.requiredProgress}%)
                </h3>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  O prazo oficial conta a partir de 100% dos itens obrigat\u00f3rios enviados.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex-1 h-2.5 rounded-full bg-background/80 overflow-hidden">
                    <div
                      className="h-full bg-amber-400 transition-all rounded-full"
                      style={{ width: `${data.requiredProgress}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs font-bold text-amber-400">
                    {requiredDone}/{required.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 flex items-start gap-4">
            <CheckCircle2 className="size-6 text-emerald-400 shrink-0" />
            <div>
              <h3 className="font-semibold">Materiais completos — projeto em andamento</h3>
              <p className="mt-1 text-xs text-muted-foreground">Checklist sincronizado com o painel admin.</p>
            </div>
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-display text-xl font-bold flex items-center gap-2">
              <FileCheck className="size-5 text-primary" /> Checklist de materiais
            </h2>
            <div className="space-y-3">
              {checklist.map((item) => {
                const done = Boolean(item.done);
                return (
                  <div
                    key={item.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border p-5 ${
                      done ? "border-emerald-500/30 bg-card/40" : "border-border/60 bg-card/80"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`grid size-8 shrink-0 place-items-center rounded-full border mt-0.5 ${
                          done
                            ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-400"
                            : "border-border/60 bg-background text-muted-foreground"
                        }`}
                      >
                        {done ? <CheckCircle2 className="size-4" /> : <Clock className="size-4" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold">{item.label}</p>
                          {item.required !== false && (
                            <span className="rounded bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 text-[9px] font-bold uppercase text-amber-400">
                              Obrigat\u00f3rio
                            </span>
                          )}
                        </div>
                        {item.hint && <p className="mt-1 text-xs text-muted-foreground">{item.hint}</p>}
                        {item.fileName && (
                          <p className="mt-2 font-mono text-[11px] text-emerald-400">Arquivo: {item.fileName}</p>
                        )}
                      </div>
                    </div>
                    {!done ? (
                      <button
                        onClick={() => {
                          setActiveUpload(item);
                          setFileName(`material-${item.id}`);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-primary bg-primary/10 px-3.5 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground self-end sm:self-center"
                      >
                        <Upload className="size-3.5" /> Marcar enviado
                      </button>
                    ) : (
                      <StatusPill tone="success" dot>
                        OK
                      </StatusPill>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-border/60 bg-card/40 p-5 space-y-3 text-xs">
              <h3 className="font-semibold text-sm border-b border-border/60 pb-3">Resumo</h3>
              <Row k="Status" v={data.status} />
              <Row k="Progresso" v={`${data.progress}%`} />
              <Row k="Prazo" v={data.deadline || data.lead?.deadline || "—"} />
              <Row k="Or\u00e7amento" v={currency(data.budget || 0)} />
            </div>

            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <MessageSquare className="size-4 text-primary" /> Precisa de ajuda?
              </h3>
              <p className="text-xs text-muted-foreground">Fale com o time sobre materiais ou prazos.</p>
              <button
                onClick={() => setShowSupport(true)}
                className="w-full rounded-lg bg-primary py-2.5 text-xs font-semibold text-primary-foreground"
              >
                Abrir suporte
              </button>
            </div>
          </div>
        </div>
      </main>

      {activeUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg rounded-2xl border border-primary/30 bg-card p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <UploadCloud className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Registrar material</h3>
                  <p className="text-[11px] text-muted-foreground">Sincroniza com o painel admin</p>
                </div>
              </div>
              <button onClick={() => setActiveUpload(null)} className="p-1.5 text-muted-foreground">
                <X className="size-4" />
              </button>
            </div>
            <p className="text-sm font-bold">{activeUpload.label}</p>
            <input
              type="text"
              placeholder="Nome do arquivo"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs font-mono"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setActiveUpload(null)} className="text-xs text-muted-foreground px-4 py-2">
                Cancelar
              </button>
              <button
                onClick={markDone}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-50"
              >
                {saving ? <Loader2 className="size-3.5 animate-spin" /> : <CheckCircle2 className="size-4" />}
                Confirmar envio
              </button>
            </div>
          </div>
        </div>
      )}

      {showSupport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md rounded-2xl border border-primary/30 bg-card p-6 space-y-4">
            <h3 className="font-semibold">Suporte</h3>
            <p className="text-xs text-muted-foreground">
              Em produ\u00e7\u00e3o este modal abre chamado. Por enquanto use o WhatsApp do time ou o bot.
            </p>
            <button
              onClick={() => setShowSupport(false)}
              className="w-full rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Info({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/50 p-3.5 space-y-1">
      <span className="text-[10px] text-muted-foreground uppercase font-mono font-semibold">{label}</span>
      <p className="font-semibold text-sm">{value}</p>
      {sub && <p className="text-[11px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-border/30 pb-2">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
