"use client";

import { PageHeader } from "@/components/shell/PageHeader";
import { MeuTreinoFeature } from "@/features/student/MeuTreinoFeature";

export default function MeuTreinoPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        badge="Protocolos Físicos VIP"
        title="Meu Treino"
        description="Sua ficha digital completa de exercícios, controle individual de cargas, vídeos demonstrativos e acompanhamento de séries."
      />

      <MeuTreinoFeature />
    </div>
  );
}
