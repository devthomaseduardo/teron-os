import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, CheckCircle2, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { submitDemoRequest } from "@/lib/demo.functions";

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

type DemoDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

export function DemoDialog({ open, onOpenChange, source = "landing" }: DemoDialogProps) {
  const submit = useServerFn(submitDemoRequest);
  const [date, setDate] = React.useState<Date | undefined>();
  const [time, setTime] = React.useState<string | undefined>();
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [summary, setSummary] = React.useState<{ date: string; time: string; email: string } | null>(null);

  React.useEffect(() => {
    if (!open) {
      // reset after close animation
      const t = setTimeout(() => {
        setStatus("idle");
        setError(null);
        setSummary(null);
        setDate(undefined);
        setTime(undefined);
      }, 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  const minDate = React.useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!date) {
      setError("Escolha uma data.");
      return;
    }
    if (!time) {
      setError("Escolha um horário.");
      return;
    }
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      company: String(form.get("company") ?? "").trim(),
      notes: String(form.get("notes") ?? "").trim(),
      preferredDate: format(date, "yyyy-MM-dd"),
      preferredTime: time,
      source,
    };

    setStatus("submitting");
    track("demo_form_submit", { source, date: payload.preferredDate, time });
    try {
      const result = await submit({ data: payload });
      setSummary(result.summary);
      setStatus("success");
      track("demo_form_success", { source, date: payload.preferredDate, time });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao enviar solicitação.";
      setError(message);
      setStatus("error");
      track("demo_form_error", { source, message });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg gap-0 border-border bg-card p-0 sm:max-w-lg">
        {status === "success" && summary ? (
          <div className="px-6 py-10 text-center">
            <div className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-[oklch(0.72_0.15_155_/_15%)]">
              <CheckCircle2 className="size-6 text-[oklch(0.82_0.15_155)]" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
              Demonstração agendada
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Enviaremos o resumo para{" "}
              <span className="text-foreground">{summary.email}</span> em instantes.
            </p>
            <div className="mx-auto mt-6 max-w-xs rounded-lg border border-border bg-background p-4 text-left">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Preferência</p>
              <p className="mt-1 font-display text-base font-semibold text-foreground">
                {format(new Date(`${summary.date}T00:00:00`), "EEEE, d 'de' MMMM", { locale: ptBR })}
              </p>
              <p className="text-sm text-muted-foreground">às {summary.time} · fuso BRT</p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="mt-6 inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground hover:bg-accent"
            >
              Fechar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <DialogHeader className="px-6 pt-6">
              <DialogTitle className="font-display text-xl">Agendar demonstração</DialogTitle>
              <DialogDescription>
                15 minutos com o time TERON. Escolha um horário — enviaremos o resumo por e-mail.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 px-6 py-5">
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="demo-name">Nome</Label>
                  <Input id="demo-name" name="name" required maxLength={120} autoComplete="name" />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="demo-email">E-mail</Label>
                  <Input id="demo-email" name="email" type="email" required maxLength={200} autoComplete="email" />
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="demo-company">Empresa</Label>
                <Input id="demo-company" name="company" maxLength={160} autoComplete="organization" />
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label>Data</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className={cn(
                          "inline-flex h-9 items-center justify-between rounded-md border border-input bg-background px-3 text-sm",
                          !date && "text-muted-foreground",
                        )}
                      >
                        {date ? format(date, "d 'de' MMM yyyy", { locale: ptBR }) : "Escolher data"}
                        <CalendarIcon className="size-3.5 text-muted-foreground" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(d) => d < minDate}
                        locale={ptBR}
                        initialFocus
                        className="pointer-events-auto p-3"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-1.5">
                  <Label>Horário</Label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        className={cn(
                          "rounded-md border px-2 py-1.5 text-[12px] font-medium transition-colors",
                          time === slot
                            ? "border-foreground bg-foreground text-background"
                            : "border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                        )}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="demo-notes">O que você quer resolver? (opcional)</Label>
                <Textarea id="demo-notes" name="notes" rows={3} maxLength={1000} />
              </div>

              {error ? (
                <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-[13px] text-destructive-foreground">
                  {error}
                </p>
              ) : null}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border/70 px-6 py-4">
              <p className="text-[11px] text-muted-foreground">Horários em BRT · reagendável por e-mail</p>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" /> Enviando…
                  </>
                ) : (
                  "Confirmar agendamento"
                )}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}