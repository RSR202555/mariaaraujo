"use client";

import { PageHeader } from "@/components/shell/PageHeader";
import { AvaliacoesFeature } from "@/features/student/AvaliacoesFeature";

export default function AvaliacoesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        badge="Avaliações Físicas VIP"
        title="Avaliações & Anamnese"
        description="Histórico de avaliações físicas, formulário de saúde e dossiês de evolução enviados pela Maria Araújo."
      />

      <AvaliacoesFeature />
    </div>
  );
}
