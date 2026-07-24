import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Bell,
  CircleDollarSign,
  Clock,
  Command,
  FileSignature,
  FileText,
  FolderKanban,
  HeartHandshake,
  Inbox,
  LayoutDashboard,
  type LucideIcon,
  Search,
  Settings,
  Users,
  Workflow,
  Bot,
} from "lucide-react";
import type { ReactNode } from "react";

import { TeronWordmark } from "@/components/teron/logo";
import { cn } from "@/lib/utils";

type NavItem = { label: string; to: string; icon: LucideIcon; badge?: string };
type NavGroup = { label: string; items: NavItem[] };

const groups: NavGroup[] = [
  {
    label: "Workspace",
    items: [
      { label: "Hoje", to: "/app", icon: LayoutDashboard },
      { label: "Inbox", to: "/app/inbox", icon: Inbox, badge: "4" },
      { label: "Atividade", to: "/app/atividade", icon: Activity },
    ],
  },
  {
    label: "Comercial",
    items: [
      { label: "Clientes", to: "/app/clientes", icon: Users },
      { label: "Propostas", to: "/app/propostas", icon: FileText, badge: "2" },
      { label: "Contratos", to: "/app/contratos", icon: FileSignature },
    ],
  },
  {
    label: "Operação",
    items: [
      { label: "Projetos", to: "/app/projetos", icon: FolderKanban },
      { label: "Desenvolvimento", to: "/app/desenvolvimento", icon: Workflow },
      { label: "Horas", to: "/app/horas", icon: Clock },
      { label: "Atendimento", to: "/app/atendimento", icon: HeartHandshake },
      { label: "Bot & IA", to: "/app/bot", icon: Bot },
    ],
  },
  {
    label: "Financeiro",
    items: [
      { label: "Faturas", to: "/app/financeiro", icon: CircleDollarSign, badge: "1" },
    ],
  },
];

export function WorkspaceShell({
  title,
  eyebrow,
  description,
  action,
  children,
}: {
  title: string;
  eyebrow?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border/70 bg-sidebar md:flex">
        <div className="flex h-14 items-center border-b border-sidebar-border/70 px-4">
          <Link to="/">
            <TeronWordmark />
          </Link>
        </div>

        <button
          type="button"
          className="mx-3 mt-3 flex items-center gap-2 rounded-md border border-sidebar-border/80 bg-background/40 px-2.5 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:bg-accent"
        >
          <Search className="size-3.5" />
          <span className="flex-1">Buscar…</span>
          <span className="inline-flex items-center gap-0.5 rounded border border-sidebar-border/80 bg-muted/40 px-1 py-px font-mono text-[10px]">
            <Command className="size-2.5" />K
          </span>
        </button>

        <nav className="mt-4 flex-1 overflow-y-auto px-2 pb-4">
          {groups.map((g) => (
            <div key={g.label} className="mb-4">
              <div className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                {g.label}
              </div>
              <ul className="space-y-0.5">
                {g.items.map((item) => {
                  const active =
                    item.to === "/app"
                      ? pathname === "/app"
                      : pathname.startsWith(item.to);
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={cn(
                          "group flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] transition-colors",
                          active
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                        )}
                      >
                        <item.icon className={cn("size-4 shrink-0", active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.badge && (
                          <span className="rounded bg-muted/70 px-1.5 py-px text-[10px] font-medium text-muted-foreground">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-sidebar-border/70 p-2">
          <Link
            to="/app/configuracoes"
            className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
          >
            <Settings className="size-4 text-muted-foreground" />
            Configurações
          </Link>
          <div className="mt-2 flex items-center gap-2 rounded-md px-2 py-1.5">
            <div className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.7_0.14_250)] to-[oklch(0.68_0.2_320)] text-[11px] font-semibold text-white">
              RS
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-medium text-foreground">Rafael Santos</p>
              <p className="truncate text-[10px] text-muted-foreground">TERON Studio · Owner</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-border/70 bg-background/80 px-6 backdrop-blur-lg">
          <div className="min-w-0 flex-1">
            {eyebrow && (
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{eyebrow}</p>
            )}
          </div>
          <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="Notificações">
            <Bell className="size-4" />
          </button>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                {title}
              </h1>
              {description && (
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              )}
            </div>
            {action}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}