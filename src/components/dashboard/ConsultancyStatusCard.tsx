"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Calendar, Clock, Sparkles } from "lucide-react";
import { ConsultancyInfo } from "@/types/dashboard";

interface ConsultancyStatusCardProps {
  info?: ConsultancyInfo;
}

const defaultInfo: ConsultancyInfo = {
  status: "ativa",
  startDate: "10/01/2026",
  nextEvaluationDate: "10/02/2026",
  daysRemaining: 16,
  totalDays: 30,
  progressPercentage: 46,
};

export function ConsultancyStatusCard({ info = defaultInfo }: ConsultancyStatusCardProps) {
  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-7 text-left space-y-5 shadow-2xl relative overflow-hidden group hover:border-primary/40 transition-colors">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Card Header */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[0.68rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Consultoria Ativa • Plano VIP</span>
        </span>
        <span className="text-[0.65rem] font-extrabold uppercase text-muted-foreground bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
          {info.daysRemaining} dias restantes
        </span>
      </div>

      {/* Main Info */}
      <div className="space-y-1">
        <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
          Acompanhamento Maria Araújo
        </h3>
        <p className="text-xs text-muted-foreground">
          Protocolo de alta performance ajustado e supervisionado individualmente.
        </p>
      </div>

      {/* Grid de Metadados */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
        <div className="bg-[#090909] border border-[#262626] p-3 rounded-2xl">
          <span className="text-[0.65rem] font-bold uppercase text-muted-foreground block flex items-center space-x-1">
            <Calendar className="h-3 w-3 mr-1 text-primary" />
            Data de Início
          </span>
          <span className="text-xs font-black text-white">{info.startDate}</span>
        </div>

        <div className="bg-[#090909] border border-[#262626] p-3 rounded-2xl">
          <span className="text-[0.65rem] font-bold uppercase text-muted-foreground block flex items-center space-x-1">
            <Clock className="h-3 w-3 mr-1 text-amber-400" />
            Próxima Avaliação
          </span>
          <span className="text-xs font-black text-white">{info.nextEvaluationDate}</span>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-[#090909] border border-[#262626] p-3 rounded-2xl">
          <span className="text-[0.65rem] font-bold uppercase text-muted-foreground block flex items-center space-x-1">
            <Sparkles className="h-3 w-3 mr-1 text-emerald-400" />
            Ciclo Atual
          </span>
          <span className="text-xs font-black text-emerald-400">{info.progressPercentage}% Concluído</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-[0.68rem] font-bold uppercase">
          <span className="text-muted-foreground">Progresso do Mês</span>
          <span className="text-white">{info.totalDays - info.daysRemaining} / {info.totalDays} dias</span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#090909] border border-[#262626] overflow-hidden p-0.5">
          <motion.div
            className="h-full rounded-full bg-primary shadow-[0_0_12px_rgba(216,92,138,0.6)]"
            initial={{ width: 0 }}
            animate={{ width: `${info.progressPercentage}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}
