"use client";

import { PageHeader } from "@/components/shell/PageHeader";
import { AlunasManagement } from "@/features/admin/AlunasManagement";

export default function AdminAlunasPage() {
  return (
    <div className="space-y-8">
      {/* Header Administrativo de Gestão de Alunas */}
      <PageHeader
        badge="Gestão de Alunas VIP"
        title="Gestão de Alunas"
        description="Gerencie o cadastro de alunas, acompanhe o status dos contratos, avaliações, ficha de anamnese e montagem de treinos individualizados."
      />

      {/* Tabela & Gestão Interativa */}
      <AlunasManagement />
    </div>
  );
}
