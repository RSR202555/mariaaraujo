"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Scale,
  Activity,
  Plus,
  Calendar,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface MetricEntry {
  date: string;
  weight: number;
  fatPercent?: number;
  waistCm?: number;
  hipCm?: number;
  thighCm?: number;
}

export function MinhaEvolucaoFeature() {
  const [entries, setEntries] = useState<MetricEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newEntry, setNewEntry] = useState({
    weight: "",
    waistCm: "",
    hipCm: "",
    thighCm: "",
  });

  const latest = entries[0];

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.weight) return;

    const created: MetricEntry = {
      date: new Date().toLocaleDateString("pt-BR"),
      weight: parseFloat(newEntry.weight),
      waistCm: newEntry.waistCm ? parseFloat(newEntry.waistCm) : undefined,
      hipCm: newEntry.hipCm ? parseFloat(newEntry.hipCm) : undefined,
      thighCm: newEntry.thighCm ? parseFloat(newEntry.thighCm) : undefined,
    };

    setEntries([created, ...entries]);
    setNewEntry({ weight: "", waistCm: "", hipCm: "", thighCm: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 text-left">
      {/* 4 Cards de Métricas Reais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0f0f0f] border border-[#262626] rounded-2xl p-4 flex items-center justify-between shadow-xl">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
              Peso Atual
            </p>
            <h3 className="text-2xl font-black text-white mt-1">
              {latest ? `${latest.weight} kg` : "--"}
            </h3>
            <span className="text-[0.65rem] text-primary font-semibold flex items-center gap-1 mt-1">
              {latest ? "Peso registrado hoje" : "Aguardando 1º registro"}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Scale className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0f0f0f] border border-[#262626] rounded-2xl p-4 flex items-center justify-between shadow-xl">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
              % Gordura Estimado
            </p>
            <h3 className="text-2xl font-black text-primary mt-1">
              {latest?.fatPercent ? `${latest.fatPercent}%` : "--"}
            </h3>
            <span className="text-[0.65rem] text-muted-foreground font-semibold flex items-center gap-1 mt-1">
              Calculado na avaliação
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0f0f0f] border border-[#262626] rounded-2xl p-4 flex items-center justify-between shadow-xl">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
              Cintura (Circunferência)
            </p>
            <h3 className="text-2xl font-black text-white mt-1">
              {latest?.waistCm ? `${latest.waistCm} cm` : "--"}
            </h3>
            <span className="text-[0.65rem] text-muted-foreground font-semibold flex items-center gap-1 mt-1">
              Medição antropométrica
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0f0f0f] border border-[#262626] rounded-2xl p-4 flex items-center justify-between shadow-xl">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
              Frequência de Treinos
            </p>
            <h3 className="text-2xl font-black text-emerald-400 mt-1">
              {entries.length > 0 ? `${entries.length} Registros` : "0 Registros"}
            </h3>
            <span className="text-[0.65rem] text-muted-foreground font-semibold flex items-center gap-1 mt-1">
              Acompanhamento mensal
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Botão Registrar e Tabela de Histórico */}
      <div className="bg-[#090909] border border-[#262626] rounded-3xl p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1c1c1c] pb-4">
          <div>
            <h3 className="text-base font-extrabold text-white uppercase tracking-tight font-serif">
              Histórico de Medições
            </h3>
            <p className="text-xs text-muted-foreground">
              Seus registros de peso e medidas corporais.
            </p>
          </div>

          <Button
            onClick={() => setIsModalOpen(true)}
            variant="glow"
            size="sm"
            className="rounded-full text-xs font-black uppercase tracking-wider"
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Registrar Peso Hoje
          </Button>
        </div>

        {/* Tabela de Evolução */}
        {entries.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <p className="text-sm font-semibold text-white">Nenhum peso registrado ainda</p>
            <p className="text-xs text-muted-foreground">
              Clique no botão acima para registrar seu peso inicial e acompanhar sua evolução!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#262626] bg-[#121212]/50 text-[0.65rem] uppercase tracking-wider font-extrabold text-muted-foreground">
                  <th className="py-3 px-4">Data do Registro</th>
                  <th className="py-3 px-4">Peso (kg)</th>
                  <th className="py-3 px-4">% Gordura</th>
                  <th className="py-3 px-4">Cintura</th>
                  <th className="py-3 px-4">Quadril</th>
                  <th className="py-3 px-4">Coxa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1c1c1c] text-xs">
                {entries.map((entry, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-primary" /> {entry.date}
                    </td>
                    <td className="py-3.5 px-4 font-black text-primary">{entry.weight} kg</td>
                    <td className="py-3.5 px-4 font-semibold text-gray-200">{entry.fatPercent ? `${entry.fatPercent}%` : "--"}</td>
                    <td className="py-3.5 px-4 text-muted-foreground">{entry.waistCm ? `${entry.waistCm} cm` : "--"}</td>
                    <td className="py-3.5 px-4 text-muted-foreground">{entry.hipCm ? `${entry.hipCm} cm` : "--"}</td>
                    <td className="py-3.5 px-4 text-muted-foreground">{entry.thighCm ? `${entry.thighCm} cm` : "--"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL: Registrar Novo Peso */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Registrar Novo Peso & Medidas</DialogTitle>
            <DialogDescription>
              Adicione a pesagem do dia para atualizar o seu gráfico de evolução corporal.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddEntry} className="space-y-4 text-left mt-2">
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground block mb-1">
                Peso Atual (kg) *
              </label>
              <Input
                required
                type="number"
                step="0.1"
                placeholder="Ex: 62.5"
                value={newEntry.weight}
                onChange={(e) => setNewEntry({ ...newEntry, weight: e.target.value })}
                className="bg-[#121212] border-[#262626] text-xs text-white rounded-xl"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Cintura (cm)
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 68"
                  value={newEntry.waistCm}
                  onChange={(e) => setNewEntry({ ...newEntry, waistCm: e.target.value })}
                  className="bg-[#121212] border-[#262626] text-xs text-white rounded-xl"
                />
              </div>

              <div>
                <label className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Quadril (cm)
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 98"
                  value={newEntry.hipCm}
                  onChange={(e) => setNewEntry({ ...newEntry, hipCm: e.target.value })}
                  className="bg-[#121212] border-[#262626] text-xs text-white rounded-xl"
                />
              </div>

              <div>
                <label className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Coxa (cm)
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 56"
                  value={newEntry.thighCm}
                  onChange={(e) => setNewEntry({ ...newEntry, thighCm: e.target.value })}
                  className="bg-[#121212] border-[#262626] text-xs text-white rounded-xl"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-[#262626]">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl border-white/10 text-xs font-bold"
              >
                Cancelar
              </Button>
              <Button type="submit" variant="glow" size="sm" className="rounded-xl text-xs font-black uppercase tracking-wider">
                Salvar Peso
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
