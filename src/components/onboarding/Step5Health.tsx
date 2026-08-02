"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { healthSchema } from "@/schemas/onboardingSchema";
import { HealthData } from "@/types/onboarding";
import { Button } from "@/components/ui/button";

interface Step5HealthProps {
  initialValues: HealthData;
  onNext: (data: HealthData) => void;
  onPrev: () => void;
}

export function Step5Health({ initialValues, onNext, onPrev }: Step5HealthProps) {
  const { register, handleSubmit, setValue, watch } = useForm<HealthData>({
    resolver: zodResolver(healthSchema),
    defaultValues: initialValues,
  });

  const hasInjuries = watch("hasInjuries");
  const hasDiseases = watch("hasDiseases");
  const usesMedications = watch("usesMedications");

  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-5 sm:p-10 text-left space-y-6 shadow-2xl">
      <div className="space-y-1">
        <span className="text-[0.68rem] font-bold uppercase tracking-widest text-primary">
          Etapa 5 de 8 • Segurança
        </span>
        <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">Histórico de Saúde</h2>
        <p className="text-xs text-muted-foreground">
          Informações cruciais para adaptar os exercícios de forma segura e evitar lesões.
        </p>
      </div>

      <form onSubmit={handleSubmit(onNext)} className="space-y-5">
        {/* Possui Lesões */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
            Possui lesões articulares ou dores crônicas?
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setValue("hasInjuries", "nao")}
              className={`p-3 rounded-xl border text-center text-xs font-bold uppercase ${
                hasInjuries === "nao"
                  ? "border-emerald-500 bg-emerald-500/15 text-emerald-400"
                  : "border-[#262626] bg-[#090909] text-muted-foreground"
              }`}
            >
              Não possuo
            </button>
            <button
              type="button"
              onClick={() => setValue("hasInjuries", "sim")}
              className={`p-3 rounded-xl border text-center text-xs font-bold uppercase ${
                hasInjuries === "sim"
                  ? "border-rose-500 bg-rose-500/15 text-rose-400"
                  : "border-[#262626] bg-[#090909] text-muted-foreground"
              }`}
            >
              Sim, possuo
            </button>
          </div>
          {hasInjuries === "sim" && (
            <textarea
              {...register("injuryDetails")}
              rows={2}
              placeholder="Detalhe a lesão (ex: hérnia de disco L4-L5, condromalácia no joelho...)"
              className="w-full p-3 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
            />
          )}
        </div>

        {/* Possui Doenças */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
            Possui alguma condição médica ou doença diagnosticada?
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setValue("hasDiseases", "nao")}
              className={`p-3 rounded-xl border text-center text-xs font-bold uppercase ${
                hasDiseases === "nao"
                  ? "border-emerald-500 bg-emerald-500/15 text-emerald-400"
                  : "border-[#262626] bg-[#090909] text-muted-foreground"
              }`}
            >
              Não possuo
            </button>
            <button
              type="button"
              onClick={() => setValue("hasDiseases", "sim")}
              className={`p-3 rounded-xl border text-center text-xs font-bold uppercase ${
                hasDiseases === "sim"
                  ? "border-rose-500 bg-rose-500/15 text-rose-400"
                  : "border-[#262626] bg-[#090909] text-muted-foreground"
              }`}
            >
              Sim, possuo
            </button>
          </div>
          {hasDiseases === "sim" && (
            <textarea
              {...register("diseaseDetails")}
              rows={2}
              placeholder="Detalhe a condição (ex: hipertensão, hipotireoidismo, SOP...)"
              className="w-full p-3 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
            />
          )}
        </div>

        {/* Utiliza Medicamentos */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
            Utiliza medicamentos de uso contínuo?
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setValue("usesMedications", "nao")}
              className={`p-3 rounded-xl border text-center text-xs font-bold uppercase ${
                usesMedications === "nao"
                  ? "border-emerald-500 bg-emerald-500/15 text-emerald-400"
                  : "border-[#262626] bg-[#090909] text-muted-foreground"
              }`}
            >
              Não utilizo
            </button>
            <button
              type="button"
              onClick={() => setValue("usesMedications", "sim")}
              className={`p-3 rounded-xl border text-center text-xs font-bold uppercase ${
                usesMedications === "sim"
                  ? "border-amber-500 bg-amber-500/15 text-amber-400"
                  : "border-[#262626] bg-[#090909] text-muted-foreground"
              }`}
            >
              Sim, utilizo
            </button>
          </div>
          {usesMedications === "sim" && (
            <textarea
              {...register("medicationDetails")}
              rows={2}
              placeholder="Cite os medicamentos..."
              className="w-full p-3 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
            />
          )}
        </div>

        {/* Quadrado de escrita livre ao final da etapa */}
        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
            Observações / Escreva mais detalhes sobre sua saúde
          </label>
          <textarea
            rows={3}
            {...register("notes" as any)}
            placeholder="Escreva aqui dores específicas, cirurgias passadas, restrições médicas ou observações para a personal..."
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
            <span>AVANÇAR PARA ALIMENTAÇÃO</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
