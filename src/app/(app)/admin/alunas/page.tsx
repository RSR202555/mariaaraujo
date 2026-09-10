"use client";

import { PageHeader } from "@/components/shell/PageHeader";
import { AlunasManagement } from "@/features/admin/AlunasManagement";

export default function AdminAlunasPage() {
  return (
    <div className="space-y-8">
      {/* Header Administrativo de Gestão de Alunas */}
      <PageHeader
        badge="Gestão de Alunos VIP"
        title="Gestão de Alunos"
        description="Gerencie o cadastro de alunos, acompanhe o status dos contratos, avaliações, ficha de anamnese e montagem de treinos individualizados."
      />

      {/* Tabela & Gestão Interativa */}
      <AlunasManagement />
    </div>
  );
}
