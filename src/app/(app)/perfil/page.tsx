"use client";

import { PageHeader } from "@/components/shell/PageHeader";
import { PerfilFeature } from "@/features/student/PerfilFeature";

export default function PerfilPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        badge="Conta Aluno VIP"
        title="Meu Perfil"
        description="Gerenciamento dos seus dados pessoais, telefone de contato e status da sua assinatura na consultoria."
      />

      <PerfilFeature />
    </div>
  );
}
