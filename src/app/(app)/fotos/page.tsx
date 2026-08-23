"use client";

import { PageHeader } from "@/components/shell/PageHeader";
import { FotosEvolucaoFeature } from "@/features/student/FotosEvolucaoFeature";

export default function FotosPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        badge="Comparativo Corporal VIP"
        title="Fotos de Evolução"
        description="Acompanhamento visual quinzenal da sua transformação corporal com privacidade e ambiente criptografado."
      />

      <FotosEvolucaoFeature />
    </div>
  );
}
