import { useState } from "react";
import { Clock, Calendar } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface DaySchedule {
  day: number; // 0 = Dom, 1 = Seg, ... 6 = Sáb
  label: string;
  enabled: boolean;
  openTime: string;
  closeTime: string;
}

const DEFAULT_DAYS: DaySchedule[] = [
  { day: 1, label: "Segunda-feira", enabled: true, openTime: "09:00", closeTime: "18:00" },
  { day: 2, label: "Terça-feira", enabled: true, openTime: "09:00", closeTime: "18:00" },
  { day: 3, label: "Quarta-feira", enabled: true, openTime: "09:00", closeTime: "18:00" },
  { day: 4, label: "Quinta-feira", enabled: true, openTime: "09:00", closeTime: "18:00" },
  { day: 5, label: "Sexta-feira", enabled: true, openTime: "09:00", closeTime: "18:00" },
  { day: 6, label: "Sábado", enabled: false, openTime: "09:00", closeTime: "14:00" },
  { day: 0, label: "Domingo", enabled: false, openTime: "09:00", closeTime: "13:00" },
];

interface WeeklyScheduleEditorProps {
  daysOpen?: number[];
  onChange?: (daysOpen: number[]) => void;
}

export function WeeklyScheduleEditor({ daysOpen = [1, 2, 3, 4, 5, 6], onChange }: WeeklyScheduleEditorProps) {
  const [schedule, setSchedule] = useState<DaySchedule[]>(() =>
    DEFAULT_DAYS.map((d) => ({
      ...d,
      enabled: daysOpen.includes(d.day),
    }))
  );

  const toggleDay = (dayIndex: number) => {
    const next = schedule.map((d) =>
      d.day === dayIndex ? { ...d, enabled: !d.enabled } : 
    );
    setSchedule(next);
    if (onChange) {
      onChange(next.filter((d) => d.enabled).map((d) => d.day));
    }
  };

  const updateTime = (dayIndex: number, field: "openTime" | "closeTime", val: string) => {
    const next = schedule.map((d) =>
      d.day === dayIndex ? { ...d, [field]: val } : d
    );
    setSchedule(next);
  };

  return (
    <div className="space-y-3 rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <Calendar className="size-4 text-primary" />
        <h4 className="text-sm font-semibold text-foreground">Horários de Funcionamento Semanal</h4>
      </div>

      <div className="grid gap-2.5">
        {schedule.map((item) => (
          <div
            key={item.day}
            className={`flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3 transition-colors ${
              item.enabled
                ? "border-border bg-background"
                : "border-border/40 bg-muted/20 opacity-60"
            }`}
          >
            <div className="flex items-center gap-3">
              <Switch
                checked={item.enabled}
                onCheckedChange={() => toggleDay(item.day)}
                id={`day-switch-${item.day}`}
              />
              <Label htmlFor={`day-switch-${item.day}`} className="cursor-pointer text-[13px] font-medium">
                {item.label}
              </Label>
            </div>

            {item.enabled ? (
              <div className="flex items-center gap-2">
                <Clock className="size-3.5 text-muted-foreground" />
                <Input
                  type="time"
                  value={item.openTime}
                  onChange={(e) => updateTime(item.day, "openTime", e.target.value)}
                  className="h-8 w-24 text-[12px]"
                />
                <span className="text-[12px] text-muted-foreground">até</span>
                <Input
                  type="time"
                  value={item.closeTime}
                  onChange={(e) => updateTime(item.day, "closeTime", e.target.value)}
                  className="h-8 w-24 text-[12px]"
                />
              </div>
            ) : (
              <span className="text-[12px] italic text-muted-foreground">Fechado</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
