import { PageHeader } from "@/components/shell/PageHeader";
import { EmptyState } from "@/components/ui/empty-state";
import { TrendingUp } from "lucide-react";

export default function MinhaEvolucaoPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="Métricas Corporais"
        title="Minha Evolução"
        description="Gráficos de progresso, balanço de peso corporal e percentual de gordura."
      />
      <EmptyState
        icon={TrendingUp}
        title="Módulo de Gráficos"
        description="Esta rota do App Shell receberá os componentes de gráficos de evolução corporal no próximo módulo."
      />
    </div>
  );
}
