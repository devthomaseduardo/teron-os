import { useCallback, useEffect, useState } from "react";

export type PublicProposal = {
  id: string;
  publicToken: string;
  title: string;
  content: string | null;
  amount: number;
  entryAmount: number;
  status: string;
  validUntil: string | null;
  version: number;
  viewedAt: string | null;
  acceptedAt: string | null;
  lead: {
    name: string;
    company: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    projectType: string | null;
    deadline: string | null;
    briefing: string | null;
    totalInvestment: number;
    entryPayment: number;
    intent: string | null;
  } | null;
  hasProject: boolean;
  project: {
    id: string;
    status: string;
    clientAccessToken: string | null;
  } | null;
  workstationUrl?: string;
};

/**
 * Carrega proposta real pelo publicToken.
 * Fallback: query params da URL (compatibilidade com links antigos do bot).
 */
export function useProposal(token: string) {
  const [data, setData] = useState<PublicProposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token) {
      setLoading(false);
      setError("Token ausente");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/proposal/${encodeURIComponent(token)}`);
      if (res.status === 404) {
        setError("Proposta não encontrada");
        setData(null);
        return;
      }
      if (res.status === 410) {
        setError("Proposta expirada");
        setData(null);
        return;
      }
      if (!res.ok) {
        setError("Não foi possível carregar a proposta");
        setData(null);
        return;
      }
      const json = (await res.json()) as PublicProposal;
      setData(json);
      setError(null);
    } catch {
      setError("Falha de rede");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const accept = useCallback(async () => {
    const res = await fetch(`/api/proposal/${encodeURIComponent(token)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "accept" }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Falha ao aceitar");
    setData(json);
    return json as PublicProposal & { workstationUrl?: string };
  }, [token]);

  const reject = useCallback(async () => {
    const res = await fetch(`/api/proposal/${encodeURIComponent(token)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reject" }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Falha ao recusar");
    setData(json);
    return json as PublicProposal;
  }, [token]);

  /** Dados prontos para a UI (API ou query string) */
  const view = (() => {
    if (typeof window === "undefined") {
      return data
        ? mapToView(data)
        : null;
    }
    if (data?.lead) return mapToView(data);

    // Fallback query params (links antigos)
    const urlParams = new URLSearchParams(window.location.search);
    const clientName = urlParams.get("cliente");
    if (!clientName && !data) return null;

    return {
      client: {
        company: data?.lead?.company || urlParams.get("empresa") || "Cliente",
        contact: data?.lead?.name || clientName || "Responsável",
        email: data?.lead?.email || urlParams.get("email") || "",
        address: data?.lead?.address || urlParams.get("endereco") || "",
        role: "Responsável",
      },
      project: data?.lead?.projectType || urlParams.get("projeto") || data?.title || "Projeto",
      summary: data?.lead?.briefing || data?.content || urlParams.get("briefing") || "",
      deadline: data?.lead?.deadline || urlParams.get("prazo") || "",
      amount: data?.amount || data?.lead?.totalInvestment || 0,
      entryAmount: data?.entryAmount || data?.lead?.entryPayment || 0,
      status: data?.status || "enviada",
      workstationUrl: data?.project?.clientAccessToken
        ? `/cliente/onboarding/${data.project.clientAccessToken}`
        : undefined,
    };
  })();

  return { data, view, loading, error, reload: load, accept, reject };
}

function mapToView(data: PublicProposal) {
  return {
    client: {
      company: data.lead?.company || "Cliente",
      contact: data.lead?.name || "Responsável",
      email: data.lead?.email || "",
      address: data.lead?.address || "",
      role: "Responsável",
    },
    project: data.lead?.projectType || data.title,
    summary: data.lead?.briefing || data.content || "",
    deadline: data.lead?.deadline || "",
    amount: data.amount || data.lead?.totalInvestment || 0,
    entryAmount: data.entryAmount || data.lead?.entryPayment || 0,
    status: data.status,
    workstationUrl: data.project?.clientAccessToken
      ? `/cliente/onboarding/${data.project.clientAccessToken}`
      : undefined,
  };
}
