"use client";

import { PageHeader } from "@/components/shell/PageHeader";
import { ProtocolManagement } from "@/features/admin/ProtocolManagement";

export default function AdminProtocolosPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        badge="Prescrição de Treinos VIP"
        title="Protocolos & Treinos"
        description="Elabore, gerencie e acompanhe todas as fichas de treino personalizadas enviadas para os alunos da consultoria."
      />

      <ProtocolManagement />
    </div>
  );
}
