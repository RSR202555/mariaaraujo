"use client";

import { PageHeader } from "@/components/shell/PageHeader";
import { MinhaEvolucaoFeature } from "@/features/student/MinhaEvolucaoFeature";

export default function MinhaEvolucaoPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        badge="Métricas Corporais VIP"
        title="Minha Evolução"
        description="Acompanhamento gráfico do seu progresso físico, medições antropométricas e históricos de pesagem."
      />

      <MinhaEvolucaoFeature />
    </div>
  );
}
