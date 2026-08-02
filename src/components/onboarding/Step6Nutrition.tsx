"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { nutritionSchema } from "@/schemas/onboardingSchema";
import { NutritionData } from "@/types/onboarding";
import { Button } from "@/components/ui/button";

interface Step6NutritionProps {
  initialValues: NutritionData;
  onNext: (data: NutritionData) => void;
  onPrev: () => void;
}

export function Step6Nutrition({ initialValues, onNext, onPrev }: Step6NutritionProps) {
  const { register, handleSubmit, setValue, watch } = useForm<NutritionData>({
    resolver: zodResolver(nutritionSchema),
    defaultValues: initialValues,
  });

  const selectedRating = watch("dietRating");

  const ratingOptions = [
    { id: "ruim", label: "Ruim", desc: "Desorganizada, com muitos ultraprocessados" },
    { id: "regular", label: "Regular", desc: "Equilibrada na semana, escapa no fds" },
    { id: "boa", label: "Boa", desc: "Limpa na maioria dos dias, rica em proteínas" },
    { id: "excelente", label: "Excelente", desc: "100% calculada e regrada" },
  ];

  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-5 sm:p-10 text-left space-y-6 shadow-2xl">
      <div className="space-y-1">
        <span className="text-[0.68rem] font-bold uppercase tracking-widest text-primary">
          Etapa 6 de 8 • Nutrição
        </span>
        <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">Hábitos Alimentares</h2>
        <p className="text-xs text-muted-foreground">
          Entenda seu padrão alimentar atual para estruturarmos sua dieta com flexibilidade.
        </p>
      </div>

      <form onSubmit={handleSubmit(onNext)} className="space-y-6">
        {/* Avaliação da Alimentação */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
            Como você avalia sua alimentação atual?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ratingOptions.map((opt) => {
              const isSelected = selectedRating === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setValue("dietRating", opt.id as any)}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "border-primary bg-primary/15 text-white shadow-lg shadow-primary/10"
                      : "border-[#262626] bg-[#090909] text-muted-foreground hover:border-white/20 hover:text-white"
                  }`}
                >
                  <span className="text-xs font-black uppercase block text-white">{opt.label}</span>
                  <span className="text-[0.68rem] text-muted-foreground">{opt.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quantidade de Refeições & Consumo de Água */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
              Quantidade de Refeições/dia
            </label>
            <select
              {...register("mealsCount")}
              className="w-full h-11 px-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
            >
              <option value="2 refeições">2 refeições por dia</option>
              <option value="3 refeições">3 refeições por dia</option>
              <option value="4 refeições">4 refeições por dia (Recomendado)</option>
              <option value="5+ refeições">5 ou mais refeições</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
              Consumo Diário de Água
            </label>
            <select
              {...register("waterIntake")}
              className="w-full h-11 px-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
            >
              <option value="Menos de 1.5L">Menos de 1.5 Litro</option>
              <option value="1.5L a 2.5L">1.5 Litros a 2.5 Litros</option>
              <option value="2.5L a 3.5L">2.5 Litros a 3.5 Litros</option>
              <option value="Mais de 3.5L">Mais de 3.5 Litros</option>
            </select>
          </div>
        </div>

        {/* Suplementos Utilizados */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
            Utiliza algum suplemento alimentar?
          </label>
          <input
            type="text"
            {...register("supplements")}
            placeholder="Ex: Whey protein, creatina, multivitamínico, ômega 3..."
            className="w-full h-11 px-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
          />
        </div>

        {/* Quadrado de escrita livre ao final da etapa */}
        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
            Observações / Escreva mais detalhes sobre seus hábitos
          </label>
          <textarea
            rows={3}
            {...register("notes" as any)}
            placeholder="Escreva aqui preferências, alergias, aversões ou observações sobre seus hábitos e suplementação..."
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
            <span>AVANÇAR PARA ROTINA</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
