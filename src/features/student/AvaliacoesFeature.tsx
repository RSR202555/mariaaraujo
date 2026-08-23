"use client";

import React, { useState } from "react";
import { ClipboardList, CheckCircle2, FileText, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface EvaluationItem {
  id: string;
  title: string;
  date: string;
  status: "CONCLUIDA" | "PENDENTE";
  notes: string;
}

export function AvaliacoesFeature() {
  const [evaluations, setEvaluations] = useState<EvaluationItem[]>([]);
  const [isAnamneseModalOpen, setIsAnamneseModalOpen] = useState(false);

  return (
    <div className="space-y-6 text-left">
      {/* Banner da Anamnese Ativa */}
      <div className="bg-[#090909] border border-[#262626] rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[0.65rem] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                Anamnese VIP
              </span>
            </div>
            <h3 className="text-base font-extrabold text-white mt-1">Formulário de Anamnese Física e Saúde</h3>
            <p className="text-xs text-muted-foreground">
              Mantenha seus dados de saúde, lesões e preferências atualizados para ajustes na sua prescrição de treinos.
            </p>
          </div>
        </div>

        <Button
          onClick={() => setIsAnamneseModalOpen(true)}
          variant="glow"
          size="sm"
          className="rounded-full text-xs font-black uppercase tracking-wider shrink-0 w-full sm:w-auto"
        >
          <FileText className="mr-1.5 h-3.5 w-3.5" />
          Responder Anamnese
        </Button>
      </div>

      {/* Lista de Avaliações Realizadas */}
      <div className="bg-[#090909] border border-[#262626] rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-extrabold text-white uppercase tracking-tight font-serif">
          Relatórios & Avaliações Quinzenais
        </h3>

        {evaluations.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <p className="text-sm font-semibold text-white">Nenhum relatório de avaliação liberado ainda</p>
            <p className="text-xs text-muted-foreground">
              Seus relatórios e dossiês de evolução quinzenais elaborados pela Maria Araújo aparecerão aqui.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {evaluations.map((ev) => (
              <div key={ev.id} className="bg-[#121212] border border-[#262626] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-extrabold text-white">{ev.title}</h4>
                    <span className="text-[0.65rem] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Concluída
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{ev.notes}</p>
                  <span className="text-[0.7rem] text-primary font-semibold flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Data: {ev.date}
                  </span>
                </div>

                <Button
                  onClick={() => alert(`Baixando relatório em PDF de ${ev.title}`)}
                  variant="outline"
                  size="sm"
                  className="rounded-xl text-xs font-bold border-white/10 shrink-0"
                >
                  <Download className="w-3.5 h-3.5 text-primary mr-1.5" /> Baixar Dossiê PDF
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL: Formulário de Anamnese */}
      <Dialog open={isAnamneseModalOpen} onOpenChange={setIsAnamneseModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Formulário de Anamnese VIP</DialogTitle>
            <DialogDescription>
              Responda às questões sobre sua rotina, dores articulares ou objetivos para refinamento da ficha.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Anamnese enviada com sucesso para análise da Maria Araújo!");
              setIsAnamneseModalOpen(false);
            }}
            className="space-y-4 text-left border-t border-[#262626] pt-4"
          >
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Possui alguma dor articular ou lesão recente?
              </label>
              <textarea
                placeholder="Ex: Leve desconforto no joelho direito durante agachamento profundo..."
                className="w-full bg-[#121212] border border-[#262626] text-xs text-white rounded-xl p-3 h-20 focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Quantos dias por semana consegue treinar?
              </label>
              <select className="w-full bg-[#121212] border border-[#262626] text-xs text-white rounded-xl p-3 focus:outline-none focus:border-primary">
                <option value="3">3 dias por semana</option>
                <option value="4">4 dias por semana (Recomendado)</option>
                <option value="5" selected>5 dias por semana</option>
                <option value="6">6 dias por semana</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#262626]">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsAnamneseModalOpen(false)}
                className="rounded-xl text-xs font-bold border-white/10"
              >
                Cancelar
              </Button>
              <Button type="submit" variant="glow" size="sm" className="rounded-xl text-xs font-black uppercase">
                Enviar Anamnese
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
