import { PageHeader } from "@/components/shell/PageHeader";
import { EmptyState } from "@/components/ui/empty-state";
import { User } from "lucide-react";

export default function PerfilPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="Conta"
        title="Meu Perfil"
        description="Gerenciamento de dados pessoais, foto de avatar e informações da assinatura."
      />
      <EmptyState
        icon={User}
        title="Perfil do Usuário"
        description="Esta rota do App Shell receberá o formulário de edição de dados pessoais no próximo módulo."
      />
    </div>
  );
}
