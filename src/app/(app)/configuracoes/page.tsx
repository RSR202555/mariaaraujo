import { PageHeader } from "@/components/shell/PageHeader";
import { EmptyState } from "@/components/ui/empty-state";
import { Settings } from "lucide-react";

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="Preferências"
        title="Configurações"
        description="Ajustes da conta, preferências de notificação, segurança e troca de senha."
      />
      <EmptyState
        icon={Settings}
        title="Painel de Configurações"
        description="Esta rota do App Shell receberá os painéis de preferências de notificação e segurança."
      />
    </div>
  );
}
