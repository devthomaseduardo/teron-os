import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  preferredTime: z.string().trim().min(1).max(16),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
  source: z.string().trim().max(80).optional().or(z.literal("")),
});

export type DemoRequestInput = z.infer<typeof schema>;

export const submitDemoRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    try {
      await prisma.lead.create({
        data: {
          name: data.name,
          email: data.email,
          company: data.company || null,
          source: data.source || "landing",
          briefing: `Data preferencial: ${data.preferredDate}, Horário: ${data.preferredTime}\nNotas: ${data.notes || ""}`,
        },
      });
    } catch (error) {
      console.error("demo_requests insert failed", error);
      throw new Error("Não foi possível registrar a solicitação. Tente novamente.");
    }

    // Email summary: sent by Lovable Emails once a sender domain is configured.
    // For now the request is stored and shows up in the workspace.
    return {
      ok: true as const,
      summary: {
        date: data.preferredDate,
        time: data.preferredTime,
        email: data.email,
      },
    };
  });