"use client";

import { Utensils, ExternalLink, ArrowRight, Flame, Clock } from "lucide-react";
import { NutritionPlan } from "@/types/dashboard";
import { Button } from "@/components/ui/button";

interface NutritionCardProps {
  nutrition?: NutritionPlan;
}

const defaultNutrition: NutritionPlan = {
  title: "Plano 01 • Recomposição Corporal & Definição",
  caloriesKcal: 1850,
  proteinGrams: 140,
  carbsGrams: 180,
  fatsGrams: 55,
  externalUrl: "https://web.dietbox.me",
  isReady: true,
};

export function NutritionCard({ nutrition = defaultNutrition }: NutritionCardProps) {
  if (!nutrition.isReady) {
    return (
      <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-7 text-left space-y-4 shadow-2xl flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center space-x-1.5">
            <Utensils className="h-4 w-4 text-primary" />
            <span>Plano Alimentar</span>
          </span>
          <span className="text-[0.65rem] font-bold uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
            Calculando Macros
          </span>
        </div>

        <div className="space-y-2 py-2">
          <h4 className="text-lg font-black uppercase text-white">Elaborando Nutrição</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Seus macronutrientes estão sendo calculados para o seu objetivo de composição corporal.
          </p>
        </div>

        <div className="pt-2">
          <Button disabled variant="outline" className="w-full py-5 rounded-full text-xs font-bold uppercase border-white/10 opacity-60">
            <Clock className="mr-2 h-4 w-4 text-amber-400 animate-spin" />
            Aguardando Liberação
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-7 text-left space-y-5 shadow-2xl flex flex-col justify-between group hover:border-primary/40 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-wider text-primary flex items-center space-x-1.5">
          <Utensils className="h-4 w-4 text-primary" />
          <span>Plano Alimentar Atual</span>
        </span>
        <span className="text-[0.65rem] font-bold uppercase text-white bg-primary/20 border border-primary/30 px-2.5 py-0.5 rounded-full">
          {nutrition.caloriesKcal} kcal/dia
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg sm:text-xl font-black uppercase text-white tracking-tight">
          {nutrition.title}
        </h3>

        {/* Resumo de Macros */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="bg-[#090909] border border-[#262626] p-2.5 rounded-xl text-center">
            <span className="text-[0.62rem] font-bold uppercase text-muted-foreground block">Proteína</span>
            <span className="text-xs font-black text-primary">{nutrition.proteinGrams}g</span>
          </div>
          <div className="bg-[#090909] border border-[#262626] p-2.5 rounded-xl text-center">
            <span className="text-[0.62rem] font-bold uppercase text-muted-foreground block">Carbos</span>
            <span className="text-xs font-black text-amber-400">{nutrition.carbsGrams}g</span>
          </div>
          <div className="bg-[#090909] border border-[#262626] p-2.5 rounded-xl text-center">
            <span className="text-[0.62rem] font-bold uppercase text-muted-foreground block">Gorduras</span>
            <span className="text-xs font-black text-emerald-400">{nutrition.fatsGrams}g</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <Button
          onClick={() => (window.location.href = "/plano-alimentar")}
          variant="glow"
          className="w-full py-5 rounded-full font-black text-xs uppercase tracking-wider"
        >
          <span>VISUALIZAR PLANO COMPLETO</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        {nutrition.externalUrl && (
          <a href={nutrition.externalUrl} target="_blank" rel="noopener noreferrer" className="block">
            <Button variant="outline" className="w-full py-4 rounded-full font-bold text-[0.7rem] uppercase border-white/10 text-muted-foreground hover:text-white">
              <span>Plataforma Nutricional Externa</span>
              <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}
