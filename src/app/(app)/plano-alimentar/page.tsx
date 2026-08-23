"use client";

import { PageHeader } from "@/components/shell/PageHeader";
import { PlanoAlimentarFeature } from "@/features/student/PlanoAlimentarFeature";

export default function PlanoAlimentarPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        badge="Nutrição Estratégica VIP"
        title="Plano Alimentar"
        description="Sua dieta individualizada com horários, detalhamento de macronutrientes, acompanhamento de hidratação e tabela de substituições."
      />

      <PlanoAlimentarFeature />
    </div>
  );
}
