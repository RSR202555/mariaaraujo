import { PageHeader } from "@/components/shell/PageHeader";
import { EmptyState } from "@/components/ui/empty-state";
import { ClipboardList } from "lucide-react";

export default function AvaliacoesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="Anamnese & Check-ins"
        title="Avaliações"
        description="Questionários de saúde, medição perimétrica e feedback de check-in."
      />
      <EmptyState
        icon={ClipboardList}
        title="Módulo de Anamnese"
        description="Esta rota do App Shell receberá o formulário de anamnese e check-in periódico."
      />
    </div>
  );
}
