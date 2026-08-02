"use client";

import { PageHeader } from "@/components/shell/PageHeader";
import { AdminDashboardGrid } from "@/features/admin/AdminDashboardGrid";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles, Filter } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header Administrativo */}
      <PageHeader
        badge="Painel Administrativo VIP"
        title="Dashboard"
        description="Bem-vinda, Maria. Hoje você possui um resumo completo da sua consultoria, alunas ativas e fila de prescrição."
        actions={
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="rounded-full text-xs font-bold uppercase tracking-wider border-white/10">
              <Filter className="mr-1.5 h-3.5 w-3.5 text-primary" />
              Filtrar Período
            </Button>
            <Button
              onClick={() => alert("Criar nova prescrição de treino")}
              variant="glow"
              size="sm"
              className="rounded-full text-xs font-black uppercase tracking-wider"
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Novo Protocolo
            </Button>
          </div>
        }
      />

      {/* Grid Bento Administrativo */}
      <AdminDashboardGrid />
    </div>
  );
}
