"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { experienceSchema } from "@/schemas/onboardingSchema";
import { ExperienceData } from "@/types/onboarding";
import { Button } from "@/components/ui/button";

interface Step4ExperienceProps {
  initialValues: ExperienceData;
  onNext: (data: ExperienceData) => void;
  onPrev: () => void;
}

export function Step4Experience({ initialValues, onNext, onPrev }: Step4ExperienceProps) {
  const {
    handleSubmit,
    setValue,
    watch,
    register,
  } = useForm<ExperienceData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: initialValues,
  });

  const selectedTime = watch("trainingTime");
  const selectedHadCoach = watch("hadPreviousCoach");

  const trainingTimeOptions = [
    { id: "nunca", label: "Nunca treinei" },
    { id: "menos_6_meses", label: "Menos de 6 meses" },
    { id: "1_ano", label: "1 ano" },
    { id: "2_anos", label: "2 anos" },
    { id: "mais_3_anos", label: "Mais de 3 anos" },
  ];

  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-5 sm:p-10 text-left space-y-6 shadow-2xl">
      <div className="space-y-1">
        <span className="text-[0.68rem] font-bold uppercase tracking-widest text-primary">
          Etapa 4 de 8 • Histórico
        </span>
        <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">Experiência com Treino</h2>
        <p className="text-xs text-muted-foreground">
          Conte-nos sobre seu histórico prévio com exercícios físicos.
        </p>
      </div>

      <form onSubmit={handleSubmit(onNext)} className="space-y-6">
        {/* Quanto tempo treina */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
            Quanto tempo você já treina musculação?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {trainingTimeOptions.map((opt) => {
              const isSelected = selectedTime === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setValue("trainingTime", opt.id as any)}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-center text-xs font-bold uppercase transition-all ${
                    isSelected
                      ? "border-primary bg-primary/15 text-white shadow-lg shadow-primary/10"
                      : "border-[#262626] bg-[#090909] text-muted-foreground hover:border-white/20 hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quantas vezes por semana */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
            Treina (ou pretende treinar) quantas vezes por semana?
          </label>
          <select
            {...register("weeklyFrequency")}
            className="w-full h-11 px-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
          >
            <option value="3 dias por semana">3 dias por semana</option>
            <option value="4 dias por semana">4 dias por semana (Recomendado)</option>
            <option value="5 dias por semana">5 dias por semana</option>
            <option value="6 dias por semana">6 dias por semana</option>
          </select>
        </div>

        {/* Já teve acompanhamento prévio */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
            Já teve acompanhamento com personal ou consultoria antes?
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setValue("hadPreviousCoach", "sim")}
              className={`p-3.5 sm:p-4 rounded-2xl border text-center text-xs font-bold uppercase transition-all ${
                selectedHadCoach === "sim"
                  ? "border-primary bg-primary/15 text-white"
                  : "border-[#262626] bg-[#090909] text-muted-foreground"
              }`}
            >
              Sim, já tive
            </button>
            <button
              type="button"
              onClick={() => setValue("hadPreviousCoach", "nao")}
              className={`p-3.5 sm:p-4 rounded-2xl border text-center text-xs font-bold uppercase transition-all ${
                selectedHadCoach === "nao"
                  ? "border-primary bg-primary/15 text-white"
                  : "border-[#262626] bg-[#090909] text-muted-foreground"
              }`}
            >
              Não, é a primeira vez
            </button>
          </div>
        </div>

        {/* Quadrado de escrita livre ao final da etapa */}
        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
            Observações / Escreva mais detalhes sobre sua experiência
          </label>
          <textarea
            rows={3}
            {...register("notes" as any)}
            placeholder="Escreva aqui quais exercícios você gosta, prefere evitar ou detalhes dos seus treinos anteriores..."
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
            <span>AVANÇAR PARA SAÚDE</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
