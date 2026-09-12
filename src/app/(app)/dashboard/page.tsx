"use client";

import { PageHeader } from "@/components/shell/PageHeader";
import { DashboardGrid } from "@/features/dashboard/DashboardGrid";
import { Button } from "@/components/ui/button";
import { MessageSquare, Dumbbell, ExternalLink } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const firstName = user?.fullName ? user.fullName.split(" ")[0] : "Aluno";

  return (
    <div className="space-y-8">
      {/* Header Personalizado da Área do Aluno */}
      <PageHeader
        badge="Área do Aluno VIP"
        title={`Olá, ${firstName} 👋`}
        description="Continue sua evolução. Seus treinos e dieta estão integrados para alta performance."
        actions={
          <div className="flex items-center space-x-3">
            <a
              href="https://wa.me/557192352255?text=Ol%C3%A1%20Maria!%20D%C3%BAvida%20sobre%20minha%20consultoria."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="rounded-full text-xs font-bold uppercase tracking-wider border-white/10">
                <MessageSquare className="mr-1.5 h-3.5 w-3.5 text-primary" />
                Falar com a Maria
              </Button>
            </a>
            <a
              href="https://app.mfitpersonal.com.br/login"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="glow"
                size="sm"
                className="rounded-full text-xs font-black uppercase tracking-wider"
              >
                <Dumbbell className="mr-1.5 h-3.5 w-3.5" />
                Acessar MFIT
                <ExternalLink className="ml-1.5 h-3 w-3" />
              </Button>
            </a>
          </div>
        }
      />

      {/* Grid Principal Bento/Linear do Dashboard */}
      <DashboardGrid />
    </div>
  );
}
