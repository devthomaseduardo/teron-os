import { Sparkles, Cpu, CheckCircle2, Zap, Layers, Code2 } from "lucide-react";
import { useState } from "react";

interface AiCopilotProps {
  projectType: string;
  selectedExtras: string[];
}

export function AiBriefingCopilot({ projectType, selectedExtras }: AiCopilotProps) {
  const [analyzing, setAnalyzing] = useState(false);

  const getAnalysis = () => {
    const isComplex = selectedExtras.includes("dashboard") || selectedExtras.includes("backend");
    const isMedium = selectedExtras.includes("cms") || selectedExtras.length >= 2;

    if (isComplex) {
      return {
        complexity: "Alta (Sistema Web Completo)",
        stack: "Next.js 15, TypeScript, Tailwind CSS, Node.js/Nest, PostgreSQL, Supabase Auth",
        timeline: "30 a 45 dias úteis",
        hoursEstimate: "140 - 180 horas",
        aiRecommendation: "Projeto com lógica de negócios avançada. Recomendada infraestrutura escalável com PostgreSQL + Redis e controle rígido de percursos de usuários.",
      };
    }

    if (isMedium) {
      return {
        complexity: "Média (Portal Dinâmico com CMS)",
        stack: "Next.js, TypeScript, Tailwind CSS, Supabase CMS, Resend Email API",
        timeline: "15 a 20 dias úteis",
        hoursEstimate: "60 - 90 horas",
        aiRecommendation: "Projeto com gerenciamento dinâmico de conteúdo. Ideal para empresas que precisam atualizar dados sem depender de código.",
      };
    }

    return {
      complexity: "Alta Conversão (Landing Page de Alta Velocidade)",
      stack: "React, Vite/Next.js, Tailwind CSS v4, Motion FX, WhatsApp Direct Lead API",
      timeline: "7 a 10 dias úteis",
      hoursEstimate: "30 - 45 horas",
      aiRecommendation: "Solução focada em conversão extrema. Design moderno, tempo de carregamento < 1s e integração direta com WhatsApp/CRM.",
    };
  };

  const analysis = getAnalysis();

  return (
    <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
          <Sparkles className="size-4 animate-pulse" />
          <span>Diagnóstico de IA — Copilot Thomas OS</span>
        </div>
        <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-[10px] font-mono font-medium text-primary">
          v2.4 Autonomous Model
        </span>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Análise em tempo real do escopo e dos requisitos selecionados pelo cliente:
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border/60 bg-background/50 p-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Layers className="size-3.5 text-blue-400" />
            <span>Complexidade</span>
          </div>
          <p className="mt-1 text-sm font-semibold text-foreground">{analysis.complexity}</p>
        </div>

        <div className="rounded-lg border border-border/60 bg-background/50 p-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Zap className="size-3.5 text-amber-400" />
            <span>Prazo Estimado</span>
          </div>
          <p className="mt-1 text-sm font-semibold text-foreground">{analysis.timeline}</p>
        </div>

        <div className="rounded-lg border border-border/60 bg-background/50 p-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Cpu className="size-3.5 text-emerald-400" />
            <span>Horas Técnicas</span>
          </div>
          <p className="mt-1 text-sm font-semibold text-foreground">{analysis.hoursEstimate}</p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-border/40 bg-card/60 p-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
          <Code2 className="size-4 text-purple-400" />
          <span>Stack Tecnológica Sugerida</span>
        </div>
        <p className="mt-1 font-mono text-xs text-muted-foreground">{analysis.stack}</p>
        <p className="mt-3 text-xs italic text-muted-foreground/90">{analysis.aiRecommendation}</p>
      </div>
    </div>
  );
}
