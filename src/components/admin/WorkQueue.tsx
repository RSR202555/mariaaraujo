"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { WorkQueueItem, WorkQueueStatus } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { ExternalLink, Filter, Search, ChevronRight } from "lucide-react";

interface WorkQueueProps {
  items?: WorkQueueItem[];
}

const defaultQueue: WorkQueueItem[] = [
  {
    id: "1",
    studentName: "Juliana Mendes",
    studentAvatar: "/fotocapa.png",
    planName: "Consultoria Premium VIP",
    purchaseDate: "23/07/2026",
    daysWaiting: 2,
    status: "aguardando_protocolo",
  },
  {
    id: "2",
    studentName: "Camila Fernandes",
    studentAvatar: "/fotocapa.png",
    planName: "Consultoria Elite VIP",
    purchaseDate: "24/07/2026",
    daysWaiting: 1,
    status: "aguardando_avaliacao",
  },
  {
    id: "3",
    studentName: "Beatriz Ramos",
    studentAvatar: "/fotocapa.png",
    planName: "Consultoria Essential",
    purchaseDate: "25/07/2026",
    daysWaiting: 0,
    status: "aguardando_fotos",
  },
  {
    id: "4",
    studentName: "Fernanda Costa",
    studentAvatar: "/fotocapa.png",
    planName: "Consultoria Premium VIP",
    purchaseDate: "25/07/2026",
    daysWaiting: 0,
    status: "aguardando_anamnese",
  },
  {
    id: "5",
    studentName: "Patrícia Souza",
    studentAvatar: "/fotocapa.png",
    planName: "Consultoria Essential",
    purchaseDate: "20/07/2026",
    daysWaiting: 5,
    status: "concluido",
  },
];

const statusStyles: Record<WorkQueueStatus, { label: string; badge: string }> = {
  aguardando_anamnese: {
    label: "Aguardando Anamnese",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  aguardando_fotos: {
    label: "Aguardando Fotos",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  },
  aguardando_avaliacao: {
    label: "Aguardando Avaliação",
    badge: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  },
  aguardando_protocolo: {
    label: "Aguardando Protocolo",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  concluido: {
    label: "Concluído",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
};

export function WorkQueue({ items = [] }: WorkQueueProps) {
  const [filter, setFilter] = useState<string>("todos");
  const [search, setSearch] = useState<string>("");

  const filteredItems = items.filter((item) => {
    const matchesFilter = filter === "todos" || item.status === filter;
    const matchesSearch = item.studentName.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-[#141414] border border-[#262626] rounded-2xl overflow-hidden shadow-lg text-left">
      {/* Table Header Controls */}
      <div className="p-5 border-b border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white uppercase tracking-tight font-serif">
            Fila de Prescrição & Trabalho
          </h3>
          <p className="text-xs text-muted-foreground">
            Alunas aguardando elaboração de ficha, treino e avaliação.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar aluna..."
              className="h-8 pl-8 pr-3 bg-[#090909] border border-[#262626] rounded-xl text-xs text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-8 px-3 bg-[#090909] border border-[#262626] rounded-xl text-xs text-white focus:outline-none focus:border-primary"
          >
            <option value="todos">Todos os Status</option>
            <option value="aguardando_protocolo">🟣 Protocolo</option>
            <option value="aguardando_avaliacao">🔵 Avaliação</option>
            <option value="aguardando_fotos">🟠 Fotos</option>
            <option value="aguardando_anamnese">🟡 Anamnese</option>
            <option value="concluido">🟢 Concluído</option>
          </select>
        </div>
      </div>

      {/* Clean Linear Data Rows or Empty State */}
      {filteredItems.length === 0 ? (
        <div className="p-8 text-center space-y-2">
          <p className="text-sm font-semibold text-gray-300">Nenhuma aluna na fila de prescrição</p>
          <p className="text-xs text-muted-foreground">Novos cadastros e pedidos de ficha aparecerão aqui automaticamente.</p>
        </div>
      ) : (
        <div className="divide-y divide-[#262626]">
          {filteredItems.map((item) => {
            const style = statusStyles[item.status];
            return (
              <div
                key={item.id}
                className="p-4 flex items-center justify-between hover:bg-[#1B1B1B]/40 transition-colors group"
              >
                <div className="flex items-center space-x-3.5 min-w-0">
                  <Avatar className="h-9 w-9 border border-white/10 shrink-0">
                    <AvatarImage src={item.studentAvatar} alt={item.studentName} />
                    <AvatarFallback>AL</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-white block truncate group-hover:text-primary transition-colors">
                      {item.studentName}
                    </span>
                    <span className="text-[0.68rem] text-muted-foreground block truncate">
                      {item.planName}
                    </span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center space-x-6">
                  <div className="text-right">
                    <span className="text-[0.65rem] text-muted-foreground block font-medium">Compra</span>
                    <span className="text-xs text-gray-300 font-bold">{item.purchaseDate}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[0.65rem] text-muted-foreground block font-medium">Espera</span>
                    <span className="text-xs font-bold text-white">{item.daysWaiting} dia(s)</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <span className={`text-[0.65rem] font-bold uppercase px-2.5 py-1 rounded-md border ${style.badge}`}>
                    {style.label}
                  </span>

                  <button
                    onClick={() => alert(`Abrindo dossiê de ${item.studentName}`)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                    aria-label={`Abrir dossiê de ${item.studentName}`}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
