"use client";

import { usePathname } from "next/navigation";
import { PageHeader } from "@/components/shell/PageHeader";
import { MensagensFeature } from "@/features/student/MensagensFeature";
import { AdminMensagensFeature } from "@/features/admin/AdminMensagensFeature";
import { useAuth } from "@/hooks/useAuth";

export default function MensagensPage() {
  const { user } = useAuth();
  const pathname = usePathname();

  const isAdminRole = user?.role === "ADMIN" || user?.role === "admin" || user?.role === "PERSONAL" || pathname.startsWith("/admin");

  return (
    <div className="space-y-8">
      <PageHeader
        badge={isAdminRole ? "Painel de Atendimento Admin" : "Suporte Prioritário Direto"}
        title={isAdminRole ? "Central de Mensagens das Alunas" : "Mensagens & Chat"}
        description={
          isAdminRole
            ? "Responda as dúvidas das suas alunas VIP em tempo real com histórico unificado de conversas."
            : "Canal direto de comunicação com a Maria Araújo para tirar dúvidas sobre treinos, cargas e dieta."
        }
      />

      {isAdminRole ? <AdminMensagensFeature /> : <MensagensFeature />}
    </div>
  );
}
