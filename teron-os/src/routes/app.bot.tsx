import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Store,
  Clock,
  Users,
  Tag,
  Bot,
  QrCode,
  CreditCard,
  Calendar,
  MessageSquare,
  RefreshCw,
  Plus,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MapPin,
  Phone,
  UserCheck,
} from "lucide-react";
import { WorkspaceShell } from "@/components/teron/workspace-shell";
import { StatusPill } from "@/components/teron/status-pill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { WeeklyScheduleEditor } from "@/components/teron/weekly-schedule-editor";
import {
  fetchOwnerDashboard,
  fetchShopConfig,
  saveShopConfig,
  fetchWaStatus,
  fetchMessages,
  sendOwnerMessage,
  fetchNiches,
  type ShopConfig,
  type NicheLabels,
  type WaStatus,
  type ChatMessage,
} from "@/services/bot-api";
import { toast } from "sonner";

export const Route = createFileRoute("/app/bot")({
  head: () => ({ meta: [{ title: "Painel do Dono · Gestão da Empresa & Bot" }] }),
  component: TenantOwnerPage,
});

function TenantOwnerPage() {
  const [tab, setTab] = useState<"dashboard" | "shop" | "schedule" | "team" | "services" | "bot" | "payments" | "agenda" | "chat">("dashboard");

  const [loading, setLoading] = useState(true);
  const [dash, setDash] = useState<{
    shop: ShopConfig["shop"];
    labels: NicheLabels;
    dayReport: {
      date: string;
      total: number;
      upcoming: number;
      inQueue: number;
      inService: number;
      completed: number;
      noShow: number;
      revenuePaid: number;
      revenuePending: number;
      avgTicket: number;
    };
  } | null>(null);

  const [shopConfig, setShopConfig] = useState<ShopConfig | null>(null);
  const [waStatus, setWaStatus] = useState<WaStatus | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [activeChatId, setActiveChatId] = useState<string>("");

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetchOwnerDashboard().catch(() => null);
      if (res) setDash(res);

      const cfg = await fetchShopConfig().catch(() => null);
      if (cfg) setShopConfig(cfg);

      const wa = await fetchWaStatus().catch(() => null);
      if (wa) setWaStatus(wa);

      const msgs = await fetchMessages().catch(() => ({ messages: [] }));
      setMessages(msgs.messages || []);
    } catch (err) {
      toast.error("Erro ao carregar dados do painel do dono.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveShop = async () => {
    if (!shopConfig) return;
    try {
      await saveShopConfig(shopConfig);
      toast.success("Configurações da empresa salvas com sucesso!");
      await loadData();
    } catch (err: unknown) {
      toast.error(`Erro ao salvar empresa: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeChatId) return;
    try {
      await sendOwnerMessage(activeChatId, chatInput.trim());
      toast.success("Mensagem enviada no WhatsApp!");
      setChatInput("");
      const msgs = await fetchMessages(activeChatId).catch(() => ({ messages: [] }));
      setMessages(msgs.messages || []);
    } catch (err: unknown) {
      toast.error(`Erro ao enviar mensagem: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const labels = dash?.labels || {
    business: "loja",
    professional: "profissional",
    professionals: "equipe",
    service: "serviço",
    services: "serviços",
    booking: "atendimento",
    bookings: "atendimentos",
    client: "cliente",
  };

  return (
    <WorkspaceShell
      eyebrow={`Painel do Cliente · ${dash?.shop?.name || "Empresa do Cliente"}`}
      title="Painel de Gestão do Proprietário"
      description="Gerencie sua equipe, horários de atendimento, serviços oferecidos, chave PIX e personalize a IA do WhatsApp."
      action={
        <div className="flex items-center gap-2">
          <StatusPill tone={waStatus?.state === "online" ? "success" : "warning"} dot>
            {waStatus?.state === "online" ? "WhatsApp Online" : "Desconectado"}
          </StatusPill>
          <Button variant="outline" size="sm" onClick={loadData} disabled={loading}>
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} /> Atualizar
          </Button>
        </div>
      }
    >
      {/* ── Navegação de Abas do Dono ── */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-muted/40 border border-border/50 rounded-xl mb-8 shadow-sm overflow-x-auto no-scrollbar">
        <button
          onClick={() => setTab("dashboard")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
            tab === "dashboard" ? "bg-background text-foreground shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] ring-1 ring-border/50" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
          }`}
        >
          <Store className="size-3.5" /> Visão Geral
        </button>
        <button
          onClick={() => setTab("shop")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
            tab === "shop" ? "bg-background text-foreground shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] ring-1 ring-border/50" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
          }`}
        >
          <Building2Icon className="size-3.5" /> Empresa
        </button>
        <button
          onClick={() => setTab("schedule")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
            tab === "schedule" ? "bg-background text-foreground shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] ring-1 ring-border/50" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
          }`}
        >
          <Clock className="size-3.5" /> Horários
        </button>
        <button
          onClick={() => setTab("team")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
            tab === "team" ? "bg-background text-foreground shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] ring-1 ring-border/50" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
          }`}
        >
          <Users className="size-3.5" /> Equipe ({shopConfig?.barbers?.length || 0})
        </button>
        <button
          onClick={() => setTab("services")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
            tab === "services" ? "bg-background text-foreground shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] ring-1 ring-border/50" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
          }`}
        >
          <Tag className="size-3.5" /> Serviços ({shopConfig?.services?.length || 0})
        </button>
        <button
          onClick={() => setTab("bot")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
            tab === "bot" ? "bg-background text-foreground shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] ring-1 ring-border/50" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
          }`}
        >
          <Bot className="size-3.5" /> Bot & IA
        </button>
        <button
          onClick={() => setTab("payments")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
            tab === "payments" ? "bg-background text-foreground shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] ring-1 ring-border/50" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
          }`}
        >
          <CreditCard className="size-3.5" /> PIX & Pagamentos
        </button>
        <button
          onClick={() => setTab("agenda")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
            tab === "agenda" ? "bg-background text-foreground shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] ring-1 ring-border/50" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
          }`}
        >
          <Calendar className="size-3.5" /> Agenda do Dia
        </button>
        <button
          onClick={() => setTab("chat")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
            tab === "chat" ? "bg-background text-foreground shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] ring-1 ring-border/50" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
          }`}
        >
          <MessageSquare className="size-3.5" /> Conversas WhatsApp
        </button>
      </div>

      {/* ── VISÃO GERAL ── */}
      {tab === "dashboard" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <KpiCard label="Recebido Hoje" value={`R$ ${dash?.dayReport?.revenuePaid?.toFixed(2) || "0,00"}`} hint="Confirmados via PIX" />
            <KpiCard label="Pendente Hoje" value={`R$ ${dash?.dayReport?.revenuePending?.toFixed(2) || "0,00"}`} hint="Aguardando pagamento" />
            <KpiCard label="Total de Atendimentos" value={String(dash?.dayReport?.total || 0)} hint="Agendados para hoje" />
            <KpiCard label="Fila de Espera" value={String(dash?.dayReport?.inQueue || 0)} hint="Clientes aguardando" />
          </div>
        </div>
      )}

      {/* ── MINHA EMPRESA ── */}
      {tab === "shop" && (
        <div className="max-w-2xl space-y-4 rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground">Dados da Empresa / Loja</h3>

          <div className="space-y-3">
            <div>
              <Label htmlFor="sName">Nome Fantasia da Empresa</Label>
              <Input
                id="sName"
                value={shopConfig?.shop?.name || ""}
                onChange={(e) =>
                  setShopConfig(
                    shopConfig
                      ? { ...shopConfig, shop: { ...shopConfig.shop, name: e.target.value } }
                      : null
                  )
                }
              />
            </div>

            <div>
              <Label htmlFor="sPhone">Telefone WhatsApp Comercial</Label>
              <Input
                id="sPhone"
                value={shopConfig?.shop?.phone || ""}
                onChange={(e) =>
                  setShopConfig(
                    shopConfig
                      ? { ...shopConfig, shop: { ...shopConfig.shop, phone: e.target.value } }
                      : null
                  )
                }
              />
            </div>

            <div>
              <Label htmlFor="sAddress">Endereço Completo</Label>
              <Input
                id="sAddress"
                value={shopConfig?.shop?.address || ""}
                onChange={(e) =>
                  setShopConfig(
                    shopConfig
                      ? { ...shopConfig, shop: { ...shopConfig.shop, address: e.target.value } }
                      : null
                  )
                }
              />
            </div>

            <Button onClick={handleSaveShop} className="mt-2">
              Salvar Alterações
            </Button>
          </div>
        </div>
      )}

      {/* ── HORÁRIOS ── */}
      {tab === "schedule" && (
        <div className="max-w-3xl space-y-4">
          <WeeklyScheduleEditor
            daysOpen={shopConfig?.shop?.daysOpen || [1, 2, 3, 4, 5, 6]}
            onChange={(days) => {
              if (shopConfig) {
                setShopConfig({
                  ...shopConfig,
                  shop: { ...shopConfig.shop, daysOpen: days },
                });
              }
            }}
          />
          <Button onClick={handleSaveShop}>Salvar Grade de Horários</Button>
        </div>
      )}

      {/* ── EQUIPE & RECURSOS ── */}
      {tab === "team" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Profissionais / Equipe</h3>
            <Button
              size="sm"
              onClick={() => {
                if (!shopConfig) return;
                const newBarber: ShopConfig["barbers"][number] = {
                  id: `b${Date.now()}`,
                  name: "Novo Profissional",
                  nickname: "Pro",
                  specialty: "Geral",
                  schedule: { "1": ["09:00", "18:00"] as [string, string] },
                  onDuty: true,
                };
                setShopConfig({
                  ...shopConfig,
                  barbers: [...shopConfig.barbers, newBarber],
                });
              }}
            >
              <Plus className="size-3.5" /> Adicionar {labels.professional}
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {(shopConfig?.barbers || []).map((b, i) => (
              <div key={b.id || i} className="rounded-xl border border-border bg-card p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">{b.name}</span>
                  <StatusPill tone={b.onDuty !== false ? "success" : "neutral"}>
                    {b.onDuty !== false ? "Em Expediente" : "Ausente"}
                  </StatusPill>
                </div>
                <p className="text-xs text-muted-foreground">Especialidade: {b.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CATÁLOGO & SERVIÇOS ── */}
      {tab === "services" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Catálogo de Serviços / Ofertas</h3>
            <Button
              size="sm"
              onClick={() => {
                if (!shopConfig) return;
                const newServ = {
                  id: `s${Date.now()}`,
                  name: "Novo Serviço",
                  price: 50,
                  durationMin: 30,
                };
                setShopConfig({
                  ...shopConfig,
                  services: [...shopConfig.services, newServ],
                });
              }}
            >
              <Plus className="size-3.5" /> Adicionar {labels.service}
            </Button>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-muted/30 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Serviço / Procedimento</th>
                  <th className="px-4 py-3 font-medium">Duração</th>
                  <th className="px-4 py-3 font-medium">Valor (R$)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {(shopConfig?.services || []).map((s) => (
                  <tr key={s.id}>
                    <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.durationMin} min</td>
                    <td className="px-4 py-3 font-semibold text-foreground">R$ {s.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── BOT & IA ── */}
      {tab === "bot" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <QrCode className="size-4 text-primary" /> Conexão WhatsApp
            </h3>

            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-background/50 p-8 text-center transition-all hover:bg-muted/20">
              {waStatus?.state === "online" ? (
                <div className="space-y-4 animate-in fade-in zoom-in duration-500">
                  <div className="relative mx-auto size-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping"></div>
                    <CheckCircle2 className="relative size-12 text-emerald-500" />
                  </div>
                  <p className="font-semibold text-foreground text-lg">Conectado ao WhatsApp</p>
                  <p className="text-xs text-muted-foreground">Seu agente está monitorando mensagens.</p>
                </div>
              ) : waStatus?.qrDataUrl ? (
                <div className="space-y-4 animate-in fade-in duration-500">
                  <div className="p-3 bg-white rounded-xl shadow-xl mx-auto inline-block">
                    <img src={waStatus.qrDataUrl} alt="QR Code" className="size-52" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Escaneie o QR Code</p>
                  <p className="text-xs text-muted-foreground max-w-[250px] mx-auto">Abra o WhatsApp no seu celular, vá em Aparelhos Conectados e escaneie a imagem acima.</p>
                </div>
              ) : (
                <div className="space-y-4 animate-pulse">
                  <div className="mx-auto size-12 rounded-full border-4 border-muted border-t-primary animate-spin"></div>
                  <p className="text-xs text-muted-foreground">Carregando status do WhatsApp...</p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="size-4 text-primary" /> Personalidade da IA
            </h3>

            <div>
              <Label htmlFor="aiPrompt">Prompt / Instruções da IA</Label>
              <Textarea
                id="aiPrompt"
                rows={6}
                placeholder="Ex: Você é o assistente virtual da empresa Thomas. Seja muito cortês, tire dúvidas sobre serviços e ofereça agendamento..."
                className="text-xs"
              />
            </div>

            <Button onClick={() => toast.success("Prompt da IA atualizado!")}>Salvar Prompt</Button>
          </div>
        </div>
      )}

      {/* ── PAGAMENTOS & PIX ── */}
      {tab === "payments" && (
        <div className="max-w-xl rounded-xl border border-border bg-card p-5 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Configurar Recebimento via PIX</h3>

          <div>
            <Label htmlFor="pixKey">Chave PIX da Empresa</Label>
            <Input
              id="pixKey"
              value={shopConfig?.shop?.pixKey || ""}
              onChange={(e) =>
                setShopConfig(
                  shopConfig
                    ? { ...shopConfig, shop: { ...shopConfig.shop, pixKey: e.target.value } }
                    : null
                )
              }
            />
          </div>

          <div>
            <Label htmlFor="pixName">Nome do Favorecido (Como aparece no banco)</Label>
            <Input
              id="pixName"
              value={shopConfig?.shop?.pixName || ""}
              onChange={(e) =>
                setShopConfig(
                  shopConfig
                    ? { ...shopConfig, shop: { ...shopConfig.shop, pixName: e.target.value } }
                    : null
                )
              }
            />
          </div>

          <Button onClick={handleSaveShop}>Salvar Chave PIX</Button>
        </div>
      )}

      {/* ── CONVERSAS WHATSAPP ── */}
      {tab === "chat" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Conversas Recentes</h4>
            <div className="space-y-1">
              {messages.length === 0 ? (
                <p className="text-xs text-muted-foreground py-4 text-center">Nenhuma mensagem gravada ainda.</p>
              ) : (
                Array.from(new Set(messages.map((m) => m.chatId))).map((chatId) => (
                  <button
                    key={chatId}
                    onClick={() => setActiveChatId(chatId)}
                    className={`w-full rounded-lg p-2.5 text-left text-xs transition-colors ${
                      activeChatId === chatId ? "bg-muted font-medium" : "hover:bg-muted/40"
                    }`}
                  >
                    <p className="font-semibold text-foreground">{chatId}</p>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="md:col-span-2 rounded-xl border border-border bg-card p-4 flex flex-col justify-between h-[450px]">
            <div className="space-y-4 overflow-y-auto pr-4 h-full flex flex-col no-scrollbar">
              {messages
                .filter((m) => !activeChatId || m.chatId === activeChatId)
                .map((m, i) => {
                  const isClient = m.sender === "client";
                  return (
                    <div
                      key={m.id || i}
                      className={`flex flex-col max-w-[75%] ${isClient ? "self-start" : "self-end"}`}
                    >
                      <div
                        className={`rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                          isClient
                            ? "bg-muted/70 text-foreground border border-border/50 rounded-tl-sm"
                            : "bg-primary text-primary-foreground rounded-tr-sm"
                        }`}
                      >
                        <p className="leading-relaxed">{m.text}</p>
                      </div>
                      <span className={`mt-1 text-[10px] opacity-60 ${isClient ? "ml-1" : "mr-1 text-right"}`}>
                        {m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                      </span>
                    </div>
                  );
                })}
            </div>

            <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-3 border-t border-border">
              <Input
                placeholder="Digite uma mensagem para responder no WhatsApp..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="text-xs"
              />
              <Button type="submit" size="sm">
                <Send className="size-3.5" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </WorkspaceShell>
  );
}

function KpiCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-border">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      <p className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold text-foreground">{value}</p>
      <p className="mt-2 text-[11px] text-muted-foreground/80 flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-primary/60 block"></span>
        {hint}
      </p>
    </div>
  );
}

function Building2Icon({ className }: { className?: string }) {
  return <Store className={className} />;
}
