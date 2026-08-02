import { PageHeader } from "@/components/shell/PageHeader";
import { EmptyState } from "@/components/ui/empty-state";
import { Dumbbell } from "lucide-react";

export default function MeuTreinoPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="Protocolos Físicos"
        title="Meu Treino"
        description="Ficha digital de exercícios, vídeos explicativos de execução e controle de cargas."
      />
      <EmptyState
        icon={Dumbbell}
        title="Ficha de Treino em Preparação"
        description="Esta rota do App Shell está preparada para receber os componentes específicos de treino no próximo módulo."
      />
    </div>
  );
}
