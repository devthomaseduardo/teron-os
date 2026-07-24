import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Users,
  Plus,
  RefreshCw,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Trash2,
  Search,
  Building2,
  Shield,
  Zap,
} from "lucide-react";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { StatusPill } from "@/components/teron/status-pill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  fetchPlatformOverview,
  createTenant,
  deleteTenant,
  updateTenant,
  fetchWaStatus,
  fetchNiches,
  type TenantMeta,
  type PlatformConfig,
  type NicheInfo,
  type WaStatus,
} from "@/services/bot-api";
import { toast } from "sonner";

export const Route = createFileRoute("/app/bot-admin")({
  head: () => ({ 
    meta: [{ title: "Super Admin · Plataforma de Bots TERON" }],
    links: [{ rel: "icon", href: "/favicon.ico", type: "image/x-icon" }]
  }),
  component: SuperAdminPage,
});

function SuperAdminPage() {
  const [overview, setOverview] = useState<{
    platform: PlatformConfig;
    health: { logExists: boolean; logAgeSec: number | null; sessionDir: boolean; appointments: number };
    niches: NicheInfo[];
    liveTenant: { shop: { name?: string }; services?: number; barbers?: number; today: number; ticketsOpen: number; ratingAvg: number };
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState<"overview" | "tenants" | "qr" | "settings">("overview");

  // State para modal de criação de tenant
  const [openModal, setOpenModal] = useState(false);
  const [newTenant, setNewTenant] = useState({
    name: "",
    slug: "",
    ownerName: "",
    ownerEmail: "",
    ownerPassword: "",
    nicheId: "generic",
    plan: "pro" as "starter" | "pro" | "business",
  });
  const [creating, setCreating] = useState(false);

  // State para QR code central
  const [waStatus, setWaStatus] = useState<WaStatus | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetchPlatformOverview();
      setOverview(res);
      const wa = await fetchWaStatus().catch(() => null);
      if (wa) setWaStatus(wa);
    } catch (err) {
      toast.error("Falha ao carregar dados do Super Admin. Verifique se o servidor do bot está ativo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTenant.name || !newTenant.slug) {
      toast.error("Informe o nome da empresa e o subdomínio/slug.");
      return;
    }
    try {
      setCreating(true);
      const res = await createTenant(newTenant);
      toast.success(res.message || "Cliente criado com sucesso!");
      if (res.setupUrl) {
        navigator.clipboard.writeText(res.setupUrl).catch(() => {});
        toast.info("Link do dono copiado para a área de transferência!");
      }
      setOpenModal(false);
      setNewTenant({
        name: "",
        slug: "",
        ownerName: "",
        ownerEmail: "",
        ownerPassword: "",
        nicheId: "generic",
        plan: "pro",
      });
      await loadData();
    } catch (err: unknown) {
      toast.error(`Erro ao cadastrar cliente: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteTenant = async (id: string, name: string) => {
    if (!confirm(`Tem certeza que deseja remover o cliente "${name}"?`)) return;
    try {
      await deleteTenant(id);
      toast.success("Cliente removido com sucesso!");
      await loadData();
    } catch (err: unknown) {
      toast.error(`Erro ao remover cliente: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "live" ? "suspended" : "live";
    try {
      await updateTenant(id, { status: nextStatus });
      toast.success(`Status alterado para ${nextStatus}!`);
      await loadData();
    } catch (err: unknown) {
      toast.error(`Erro ao atualizar status: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const tenants = overview?.platform?.tenants || [];
  const filteredTenants = tenants.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.slug.toLowerCase().includes(search.toLowerCase()) ||
      (t.ownerName && t.ownerName.toLowerCase().includes(search.toLowerCase())) ||
      (t.ownerEmail && t.ownerEmail.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <WorkspaceShell
      eyebrow="TERON OS · Sistema Nosso (Plataforma Master)"
      title="Super Admin · Gestão Global de Clientes & Plataforma"
      description="Gerencie todos os clientes, provisione novos negócios (Thomas, Maria, etc.), controle conexões de WhatsApp e configure regras globais da plataforma."
      action={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={loadData} disabled={loading}>
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} /> Atualizar
          </Button>

          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-foreground text-background hover:opacity-90">
                <Plus className="size-3.5" /> Novo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Provisionar Novo Cliente</DialogTitle>
                <DialogDescription>
                  Cadastre uma nova empresa e crie os acessos do proprietário para o painel.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreateTenant} className="space-y-3 py-2">
                <div className="space-y-1">
                  <Label htmlFor="tName">Nome da Empresa / Loja</Label>
                  <Input
                    id="tName"
                    placeholder="Ex: Thomas Barbearia / Clínica Silva"
                    value={newTenant.name}
                    onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="tSlug">Subdomínio (Slug)</Label>
                    <Input
                      id="tSlug"
                      placeholder="ex: thomas-barber"
                      value={newTenant.slug}
                      onChange={(e) => setNewTenant({ ...newTenant, slug: e.target.value.toLowerCase().trim() })}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="tNiche">Nicho / Segmento</Label>
                    <Select
                      value={newTenant.nicheId}
                      onValueChange={(val) => setNewTenant({ ...newTenant, nicheId: val })}
                    >
                      <SelectTrigger id="tNiche">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        {(overview?.niches || []).map((n) => (
                          <SelectItem key={n.id} value={n.id}>
                            {n.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="tOwnerName">Nome do Proprietário</Label>
                  <Input
                    id="tOwnerName"
                    placeholder="Ex: Thomas Eduardo"
                    value={newTenant.ownerName}
                    onChange={(e) => setNewTenant({ ...newTenant, ownerName: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="tOwnerEmail">E-mail de Acesso</Label>
                    <Input
                      id="tOwnerEmail"
                      type="email"
                      placeholder="thomas@empresa.com"
                      value={newTenant.ownerEmail}
                      onChange={(e) => setNewTenant({ ...newTenant, ownerEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="tOwnerPassword">Senha Inicial</Label>
                    <Input
                      id="tOwnerPassword"
                      type="password"
                      placeholder="Senha do dono"
                      value={newTenant.ownerPassword}
                      onChange={(e) => setNewTenant({ ...newTenant, ownerPassword: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="tPlan">Plano Contratado</Label>
                  <Select
                    value={newTenant.plan}
                    onValueChange={(val: "starter" | "pro" | "business") =>
                      setNewTenant({ ...newTenant, plan: val })
                    }
                  >
                    <SelectTrigger id="tPlan">
                      <SelectValue placeholder="Selecione o plano" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter (R$ 197/mês)</SelectItem>
                      <SelectItem value="pro">Pro (R$ 347/mês)</SelectItem>
                      <SelectItem value="business">Business (R$ 597/mês)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setOpenModal(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={creating}>
                    {creating ? "Criando..." : "Provisionar Cliente"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      }
    >
      {/* Abas de Navegação */}
      <div className="flex border-b border-border mb-6">
        <button
          onClick={() => setSelectedTab("overview")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
            selectedTab === "overview"
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Building2 className="size-4" /> Visão Geral
        </button>
        <button
          onClick={() => setSelectedTab("tenants")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
            selectedTab === "tenants"
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users className="size-4" /> Clientes / Tenants ({tenants.length})
        </button>
        <button
          onClick={() => setSelectedTab("qr")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
            selectedTab === "qr"
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <QrCode className="size-4" /> Central QR WhatsApp
        </button>
      </div>

      {/* ── CONTEÚDO DAS ABAS ── */}
      {selectedTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <KpiCard label="Total de Clientes" value={String(tenants.length)} hint="Tenants cadastrados" />
            <KpiCard label="Bots Ativos" value={String(tenants.filter((t) => t.status === "live").length)} hint="Sessões operando" />
            <KpiCard label="Atendimentos Hoje" value={String(overview?.liveTenant?.today || 0)} hint="Agendados no sistema" />
            <KpiCard label="Chamados Abertos" value={String(overview?.liveTenant?.ticketsOpen || 0)} hint="Reclamações/Suporte" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground">Status da Plataforma</h3>
              <div className="mt-4 space-y-3 text-xs">
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Log do Bot</span>
                  <span className="font-mono">{overview?.health?.logExists ? "OK" : "Ausente"}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Sessão WhatsApp</span>
                  <span className="font-mono">{overview?.health?.sessionDir ? "Tokens armazenados" : "Sem sessão"}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Última atualização log</span>
                  <span className="font-mono">{overview?.health?.logAgeSec != null ? `${overview.health.logAgeSec}s atrás` : "—"}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground">Resumo do Tenant Principal</h3>
              <div className="mt-4 space-y-3 text-xs">
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Empresa Ativa</span>
                  <span className="font-medium text-foreground">{overview?.liveTenant?.shop?.name || "Nenhuma"}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Serviços e Equipe</span>
                  <span>{overview?.liveTenant?.services || 0} serviços · {overview?.liveTenant?.barbers || 0} equipe</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Avaliação Média</span>
                  <span>{overview?.liveTenant?.ratingAvg ? overview.liveTenant.ratingAvg.toFixed(1) : "—"} / 5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === "tenants" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por empresa, dono ou e-mail..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {filteredTenants.length} cliente{filteredTenants.length === 1 ? "" : "s"} encontrado{filteredTenants.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-muted/30 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Empresa / Loja</th>
                  <th className="px-4 py-3 font-medium">Proprietário</th>
                  <th className="px-4 py-3 font-medium">Segmento</th>
                  <th className="px-4 py-3 font-medium">Plano</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredTenants.map((t) => (
                  <tr key={t.id} className="hover:bg-muted/20">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-foreground">{t.name}</p>
                      <p className="font-mono text-[11px] text-muted-foreground">{t.slug}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{t.ownerName || "Não informado"}</p>
                      <p className="text-[11px] text-muted-foreground">{t.ownerEmail || "—"}</p>
                    </td>
                    <td className="px-4 py-3 capitalize">{t.nicheId}</td>
                    <td className="px-4 py-3 uppercase text-[11px] font-semibold">{t.plan}</td>
                    <td className="px-4 py-3">
                      <StatusPill tone={t.status === "live" ? "success" : "warning"} dot>
                        {t.status}
                      </StatusPill>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7"
                          title="Copiar link do dono"
                          onClick={() => {
                            const url = `${window.location.origin}/app/bot?tenant=${t.slug}&token=${t.ownerToken || t.slug}`;
                            navigator.clipboard.writeText(url);
                            toast.success("Link do dono copiado!");
                          }}
                        >
                          <ExternalLink className="size-3.5" />
                        </Button>

                        <Button
                          variant={t.status === "live" ? "outline" : "default"}
                          size="sm"
                          className="h-7 text-[11px]"
                          onClick={() => handleToggleStatus(t.id, t.status)}
                        >
                          {t.status === "live" ? "Suspender" : "Ativar Live"}
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7 text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteTenant(t.id, t.name)}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedTab === "qr" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <QrCode className="size-4 text-primary" /> Status da Conexão WhatsApp
            </h3>

            <div className="mt-4 flex flex-col items-center justify-center rounded-lg border border-dashed border-border p-6 text-center">
              {waStatus?.state === "online" ? (
                <div className="space-y-2">
                  <CheckCircle2 className="size-12 text-emerald-500 mx-auto" />
                  <p className="font-semibold text-foreground">WhatsApp Conectado e Operando</p>
                  <p className="text-xs text-muted-foreground">Sessão: {waStatus.session}</p>
                </div>
              ) : waStatus?.qrDataUrl ? (
                <div className="space-y-3">
                  <img src={waStatus.qrDataUrl} alt="QR Code WhatsApp" className="size-48 mx-auto rounded-md shadow-md" />
                  <p className="text-xs font-medium text-foreground">Escaneie este QR Code no aplicativo do WhatsApp</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <AlertTriangle className="size-10 text-amber-500 mx-auto" />
                  <p className="font-medium text-foreground">Sem QR Code Ativo</p>
                  <p className="text-xs text-muted-foreground">Inicie o motor do bot para gerar um novo QR Code</p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Instruções de Suporte ao Cliente</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              O proprietário do tenant pode conectar seu WhatsApp de forma 100% remota acessando o portal do dono
              em <span className="font-mono text-foreground">/app/bot</span> e escaneando o QR Code na aba <strong>Bot & IA</strong>.
            </p>
          </div>
        </div>
      )}
    </WorkspaceShell>
  );
}

function KpiCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-foreground">{value}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>
    </div>
  );
}
