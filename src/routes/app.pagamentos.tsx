import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, CreditCard, QrCode, Receipt } from "lucide-react";
import { StatusPill } from "@/components/teron/status-pill";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { currency } from "@/lib/teron-data";
import { payments } from "@/lib/teron-os-data";

export const Route = createFileRoute("/app/pagamentos")({
  head: () => ({ meta: [{ title: "Pagamentos — TERON OS" }] }),
  component: PagamentosPage,
});

const statusTone = {
  confirmado: "success",
  processando: "info",
  falhou: "danger",
  estornado: "warning",
} as const;

const methodIcon = { pix: QrCode, cartão: CreditCard, boleto: Receipt };

function PagamentosPage() {
  const confirmed = payments.filter((p) => p.status === "confirmado").reduce((s, p) => s + p.amount, 0);

  return (
    <WorkspaceShell
      eyebrow="Vendas"
      title="Pagamentos"
      description="PIX, cartão e boleto integrados. Parcelamento inteligente e cobrança automática."
      action={
        <button className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90">
          + Cobrar cliente
        </button>
      }
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Kpi label="Recebido (30d)" value={currency(confirmed)} hint="4 confirmações" />
        <Kpi label="A receber" value={currency(45300)} hint="6 faturas em aberto" />
        <Kpi label="Taxa de falha" value="3.2%" hint="cartão internacional" />
        <Kpi label="Tempo médio de pagamento" value="2d" hint="após envio" />
      </div>

      <section className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        {(["pix", "cartão", "boleto"] as const).map((m) => {
          const Icon = methodIcon[m];
          const items = payments.filter((p) => p.method === m);
          const total = items.reduce((s, p) => s + p.amount, 0);
          return (
            <div key={m} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon className="size-4" />
                  <span className="text-[12px] font-medium uppercase tracking-wider">{m}</span>
                </div>
                <StatusPill tone="success">Ativo</StatusPill>
              </div>
              <p className="mt-3 font-display text-xl font-semibold">{currency(total)}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{items.length} transações</p>
            </div>
          );
        })}
      </section>

      <section className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
        <header className="flex items-center justify-between border-b border-border px-5 py-3">
          <h3 className="text-[13px] font-semibold">Últimos pagamentos</h3>
        </header>
        <table className="w-full text-[13px]">
          <thead className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-2 font-medium">Cliente</th>
              <th className="px-5 py-2 font-medium">Método</th>
              <th className="px-5 py-2 font-medium">Parcela</th>
              <th className="px-5 py-2 text-right font-medium">Valor</th>
              <th className="px-5 py-2 font-medium">Quando</th>
              <th className="px-5 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {payments.map((p) => {
              const Icon = methodIcon[p.method];
              return (
                <tr key={p.id} className="hover:bg-muted/30">
                  <td className="px-5 py-3 font-medium">{p.client}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <Icon className="size-3.5" /> {p.method}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{p.installment ?? "—"}</td>
                  <td className="px-5 py-3 text-right font-mono">{currency(p.amount)}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.when}</td>
                  <td className="px-5 py-3">
                    <StatusPill tone={statusTone[p.status]} dot>
                      {p.status}
                    </StatusPill>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="mt-6 rounded-xl border border-border bg-card p-5">
        <div className="flex items-start gap-3">
          <div className="grid size-9 place-items-center rounded-md bg-primary/10 text-primary">
            <CheckCircle2 className="size-4" />
          </div>
          <div>
            <h3 className="text-[13px] font-semibold">Cobrança automática</h3>
            <p className="mt-1 text-[12.5px] text-muted-foreground">
              Faturas vencidas geram lembretes escalonados (amigável → firme → escalar para owner) e aplicam multa/juros conforme contrato. Nenhum cliente escapa, você não cobra ninguém manualmente.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <StatusPill tone="success" dot>Ativa</StatusPill>
              <span className="text-[11px] text-muted-foreground">3 automações rodando neste momento</span>
            </div>
          </div>
        </div>
      </section>
    </WorkspaceShell>
  );
}

function Kpi({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-xl font-semibold text-foreground">{value}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>
    </div>
  );
}
