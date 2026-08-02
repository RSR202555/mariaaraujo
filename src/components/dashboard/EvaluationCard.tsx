"use client";

import { ClipboardCheck, Calendar, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { EvaluationStatusInfo } from "@/types/dashboard";
import { Button } from "@/components/ui/button";

interface EvaluationCardProps {
  evaluation?: EvaluationStatusInfo;
}

const defaultEvaluation: EvaluationStatusInfo = {
  nextDate: "28/02/2026",
  daysLeft: 5,
  checklist: {
    photosUploaded: true,
    weightLogged: true,
    anamneseUpdated: false,
  },
};

export function EvaluationCard({ evaluation = defaultEvaluation }: EvaluationCardProps) {
  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-7 text-left space-y-5 shadow-2xl group hover:border-primary/40 transition-colors">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-[0.68rem] font-bold uppercase tracking-widest text-amber-400 block">
            Check-in Quinzenal
          </span>
          <h3 className="text-xl font-black uppercase text-white tracking-tight">
            Próxima Reavaliação
          </h3>
        </div>
        <span className="text-[0.65rem] font-extrabold uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
          Em {evaluation.daysLeft} dias
        </span>
      </div>

      {/* Date banner */}
      <div className="bg-[#090909] border border-[#262626] p-3.5 rounded-2xl flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2.5">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="font-bold text-white uppercase">Data Limite de Envio:</span>
        </div>
        <span className="font-black text-amber-400 text-sm">{evaluation.nextDate}</span>
      </div>

      {/* Checklist Pendente */}
      <div className="space-y-2">
        <span className="text-[0.65rem] font-bold uppercase text-muted-foreground block">
          Checklist de Reavaliação:
        </span>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#090909]/60 border border-[#262626]">
            <span className="text-gray-300">4 Fotos de Evolução</span>
            {evaluation.checklist.photosUploaded ? (
              <span className="text-emerald-400 font-bold flex items-center space-x-1 text-[0.68rem]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Pronto</span>
              </span>
            ) : (
              <span className="text-amber-400 font-bold text-[0.68rem]">Pendente</span>
            )}
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-[#090909]/60 border border-[#262626]">
            <span className="text-gray-300">Pesagem Atualizada</span>
            {evaluation.checklist.weightLogged ? (
              <span className="text-emerald-400 font-bold flex items-center space-x-1 text-[0.68rem]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Pronto</span>
              </span>
            ) : (
              <span className="text-amber-400 font-bold text-[0.68rem]">Pendente</span>
            )}
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-[#090909]/60 border border-[#262626]">
            <span className="text-gray-300">Feedback de Feedback & Dores</span>
            {evaluation.checklist.anamneseUpdated ? (
              <span className="text-emerald-400 font-bold flex items-center space-x-1 text-[0.68rem]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Pronto</span>
              </span>
            ) : (
              <span className="text-amber-400 font-bold text-[0.68rem]">Pendente</span>
            )}
          </div>
        </div>
      </div>

      <Button
        onClick={() => (window.location.href = "/avaliacoes")}
        variant="glow"
        className="w-full py-5 rounded-full font-black text-xs uppercase tracking-wider"
      >
        <ClipboardCheck className="mr-2 h-4 w-4" />
        <span>ENVIAR NOVA AVALIAÇÃO</span>
      </Button>
    </div>
  );
}
