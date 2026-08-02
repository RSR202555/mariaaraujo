import { PageHeader } from "@/components/shell/PageHeader";
import { EmptyState } from "@/components/ui/empty-state";
import { Utensils } from "lucide-react";

export default function PlanoAlimentarPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="Nutrição Estratégica"
        title="Plano Alimentar"
        description="Prescrição nutricional personalizada, horários de refeição e tabela de substituições."
      />
      <EmptyState
        icon={Utensils}
        title="Estrutura de Dieta Pronta"
        description="Esta rota do App Shell está preparada para receber a tabela de alimentos e macros na próxima etapa."
      />
    </div>
  );
}
