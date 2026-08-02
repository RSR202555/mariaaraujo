import { PageHeader } from "@/components/shell/PageHeader";
import { EmptyState } from "@/components/ui/empty-state";
import { MessageSquare } from "lucide-react";

export default function MensagensPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="Suporte Direto"
        title="Mensagens"
        description="Canal direto de comunicação com a equipe Maria Araújo Personal."
      />
      <EmptyState
        icon={MessageSquare}
        title="Chat Direto Pronto"
        description="Esta rota do App Shell receberá o módulo de troca de mensagens e envio de vídeos de execução."
      />
    </div>
  );
}
