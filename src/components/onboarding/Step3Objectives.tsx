"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ArrowLeft, Target, Flame, Dumbbell, Sparkles, HeartPulse, Zap, Scale } from "lucide-react";
import { objectivesSchema } from "@/schemas/onboardingSchema";
import { ObjectivesData } from "@/types/onboarding";
import { Button } from "@/components/ui/button";

interface Step3ObjectivesProps {
  initialValues: ObjectivesData;
  onNext: (data: ObjectivesData) => void;
  onPrev: () => void;
}

export function Step3Objectives({ initialValues, onNext, onPrev }: Step3ObjectivesProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ObjectivesData>({
    resolver: zodResolver(objectivesSchema),
    defaultValues: initialValues,
  });

  const selectedObjective = watch("primaryObjective");

  const objectiveOptions = [
    { id: "emagrecer", label: "Emagrecer", icon: Flame, desc: "Queima gordura sustentável" },
    { id: "ganhar_massa", label: "Ganhar Massa", icon: Dumbbell, desc: "Hipertrofia muscular" },
    { id: "definir", label: "Definir", icon: Sparkles, desc: "Manter massa e esculpir" },
    { id: "melhorar_saude", label: "Melhorar Saúde", icon: HeartPulse, desc: "Disposição e bem-estar" },
    { id: "performance", label: "Performance", icon: Zap, desc: "Força e rendimento físico" },
  ];

  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-5 sm:p-10 text-left space-y-6 shadow-2xl">
      <div className="space-y-1">
        <span className="text-[0.68rem] font-bold uppercase tracking-widest text-primary">
          Etapa 3 de 8 • Metas
        </span>
        <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">Objetivos Principais</h2>
        <p className="text-xs text-muted-foreground">
          Defina o foco do seu protocolo para ajustarmos os macronutrientes e a carga de treino.
        </p>
      </div>

      <form onSubmit={handleSubmit(onNext)} className="space-y-6">
        {/* Escolha do Objetivo Principal */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
            Qual seu principal objetivo?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {objectiveOptions.map((opt) => {
              const IconComp = opt.icon;
              const isSelected = selectedObjective === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setValue("primaryObjective", opt.id as any)}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                    isSelected
                      ? "border-primary bg-primary/15 text-white shadow-lg shadow-primary/10"
                      : "border-[#262626] bg-[#090909] text-muted-foreground hover:border-white/20 hover:text-white"
                  }`}
                >
                  <div className={`p-2 rounded-xl border shrink-0 mt-0.5 ${isSelected ? "bg-primary text-white border-primary" : "bg-[#141414] border-[#262626]"}`}>
                    <IconComp className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase block text-white">{opt.label}</span>
                    <span className="text-[0.68rem] text-muted-foreground">{opt.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Linha Dupla: Peso Desejado e Prazo Desejado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
              Peso Desejado (kg)
            </label>
            <div className="relative">
              <Scale className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="number"
                step="0.1"
                {...register("targetWeightKg", { valueAsNumber: true })}
                placeholder="Ex: 58.0"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
              />
            </div>
            {errors.targetWeightKg && <p className="text-[0.7rem] font-medium text-rose-400">{errors.targetWeightKg.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
              Prazo Desejado
            </label>
            <select
              {...register("targetTimeframe")}
              className="w-full h-11 px-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
            >
              <option value="3 meses">3 Meses (Ciclo Curto)</option>
              <option value="6 meses">6 Meses (Recomposição Completa)</option>
              <option value="1 ano">1 Ano (Transformação Definitiva)</option>
            </select>
          </div>
        </div>

        {/* Quadrado de escrita livre ao final da etapa */}
        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
            Observações / Escreva mais detalhes sobre seus objetivos
          </label>
          <textarea
            rows={3}
            {...register("notes" as any)}
            placeholder="Escreva aqui mais detalhes sobre o que você deseja alcançar com a consultoria..."
            className="w-full p-3.5 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none resize-none"
          />
        </div>

        {/* Navegação Responsiva */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-[#262626]">
          <Button type="button" variant="outline" onClick={onPrev} className="w-full sm:w-auto py-5 rounded-full text-xs font-bold uppercase border-white/10">
            <ArrowLeft className="mr-2 h-4 w-4" />
            VOLTAR
          </Button>

          <Button type="submit" variant="glow" className="w-full sm:w-auto py-5 px-6 rounded-full text-xs font-black uppercase tracking-wider">
            <span>AVANÇAR PARA EXPERIÊNCIA</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
