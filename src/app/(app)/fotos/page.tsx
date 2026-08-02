import { PageHeader } from "@/components/shell/PageHeader";
import { EmptyState } from "@/components/ui/empty-state";
import { Camera } from "lucide-react";

export default function FotosPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="Registro Visual"
        title="Galeria de Fotos"
        description="Comparativos de postura, evolução de físico e histórico de fotografias."
      />
      <EmptyState
        icon={Camera}
        title="Galeria de Fotos Pronta"
        description="Esta rota do App Shell está integrada e aguardando a inclusão do componente de upload de fotos na próxima etapa."
      />
    </div>
  );
}
