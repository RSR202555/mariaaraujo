"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ArrowLeft, Clock, Briefcase } from "lucide-react";
import { routineSchema } from "@/schemas/onboardingSchema";
import { RoutineData } from "@/types/onboarding";
import { Button } from "@/components/ui/button";

interface Step7RoutineProps {
  initialValues: RoutineData;
  onNext: (data: RoutineData) => void;
  onPrev: () => void;
}

export function Step7Routine({ initialValues, onNext, onPrev }: Step7RoutineProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<RoutineData>({
    resolver: zodResolver(routineSchema),
    defaultValues: initialValues,
  });

  const selectedDays = watch("availableDays") || [];
  const daysList = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setValue("availableDays", selectedDays.filter((d) => d !== day));
    } else {
      setValue("availableDays", [...selectedDays, day]);
    }
  };

  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-5 sm:p-10 text-left space-y-6 shadow-2xl">
      <div className="space-y-1">
        <span className="text-[0.68rem] font-bold uppercase tracking-widest text-primary">
          Etapa 7 de 8 • Estilo de Vida
        </span>
        <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">Rotina & Disponibilidade</h2>
        <p className="text-xs text-muted-foreground">
          Adequação da frequência dos treinos e estimativa da sua capacidade de recuperação.
        </p>
      </div>

      <form onSubmit={handleSubmit(onNext)} className="space-y-6">
        {/* Horário Disponível e Profissão */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
              Horário Preferencial para Treinar
            </label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                {...register("availableTime")}
                placeholder="Ex: Manhã (07h às 08h)"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
              />
            </div>
            {errors.availableTime && <p className="text-[0.7rem] font-medium text-rose-400">{errors.availableTime.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
              Sua Profissão / Ocupação
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                {...register("profession")}
                placeholder="Ex: Médica, Advogada, Empresária..."
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
              />
            </div>
            {errors.profession && <p className="text-[0.7rem] font-medium text-rose-400">{errors.profession.message}</p>}
          </div>
        </div>

        {/* Dias Disponíveis da Semana */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
            Dias disponíveis para treinar na semana
          </label>
          <div className="flex flex-wrap gap-2">
            {daysList.map((day) => {
              const isSelected = selectedDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-extrabold uppercase border transition-all ${
                    isSelected
                      ? "border-primary bg-primary text-white shadow-md shadow-primary/30"
                      : "border-[#262626] bg-[#090909] text-muted-foreground hover:border-white/20"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
          {errors.availableDays && <p className="text-[0.7rem] font-medium text-rose-400">{errors.availableDays.message}</p>}
        </div>

        {/* Nível de Estresse & Qualidade do Sono */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
              Nível Percebido de Estresse
            </label>
            <select
              {...register("stressLevel")}
              className="w-full h-11 px-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
            >
              <option value="baixo">Baixo (Tranquilo)</option>
              <option value="medio">Médio (Moderado)</option>
              <option value="alto">Alto (Intenso / Atribulado)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
              Qualidade do Sono
            </label>
            <select
              {...register("sleepQuality")}
              className="w-full h-11 px-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
            >
              <option value="ruim">Ruim (Insônia / Acordo cansada)</option>
              <option value="regular">Regular (5-6 horas)</option>
              <option value="boa">Boa (7-8 horas reparadoras)</option>
              <option value="excelente">Excelente (+8 horas profundas)</option>
            </select>
          </div>
        </div>

        {/* Quadrado de escrita livre ao final da etapa */}
        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
            Observações / Escreva mais detalhes sobre sua rotina
          </label>
          <textarea
            rows={3}
            {...register("notes" as any)}
            placeholder="Escreva aqui horários de preferência para treinar, nível de estresse ou outras observações sobre sua rotina..."
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
            <span>VER RESUMO FINAL</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
