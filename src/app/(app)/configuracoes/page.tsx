"use client";

import { PageHeader } from "@/components/shell/PageHeader";
import { ConfiguracoesFeature } from "@/features/student/ConfiguracoesFeature";

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        badge="Preferências & Segurança"
        title="Configurações"
        description="Ajuste suas preferências de notificação, alertas de treino, segurança da conta e troca de senha."
      />

      <ConfiguracoesFeature />
    </div>
  );
}
