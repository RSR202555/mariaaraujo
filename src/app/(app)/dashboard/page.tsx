"use client";

import { PageHeader } from "@/components/shell/PageHeader";
import { DashboardGrid } from "@/features/dashboard/DashboardGrid";
import { Button } from "@/components/ui/button";
import { MessageSquare, Dumbbell } from "lucide-react";

export default function StudentDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header Personalizado da Área do Aluno */}
      <PageHeader
        badge="Área do Aluno VIP"
        title="Olá, João 👋"
        description="Continue sua evolução. Cada treino e refeição contam para atingir seu objetivo de alta performance."
        actions={
          <div className="flex items-center space-x-3">
            <a
              href="https://wa.me/5500000000000?text=Ol%C3%A1%20Maria!%20D%C3%BAvida%20sobre%20meu%20treino."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="rounded-full text-xs font-bold uppercase tracking-wider border-white/10">
                <MessageSquare className="mr-1.5 h-3.5 w-3.5 text-primary" />
                Falar com a Maria
              </Button>
            </a>
            <Button
              onClick={() => (window.location.href = "/meu-treino")}
              variant="glow"
              size="sm"
              className="rounded-full text-xs font-black uppercase tracking-wider"
            >
              <Dumbbell className="mr-1.5 h-3.5 w-3.5" />
              Treino de Hoje
            </Button>
          </div>
        }
      />

      {/* Grid Principal Bento/Linear do Dashboard */}
      <DashboardGrid />
    </div>
  );
}
