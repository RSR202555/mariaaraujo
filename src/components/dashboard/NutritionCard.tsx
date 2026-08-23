"use client";

import { Utensils, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NutritionCardProps {
  dietboxUrl?: string;
  isReady?: boolean;
}

const DEFAULT_DIETBOX_URL = "https://web.dietbox.me";

export function NutritionCard({
  dietboxUrl = DEFAULT_DIETBOX_URL,
  isReady = true,
}: NutritionCardProps) {
  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-7 text-left space-y-5 shadow-2xl flex flex-col justify-between group hover:border-emerald-500/40 transition-all duration-300">
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
          <Utensils className="h-4 w-4 text-emerald-400" />
          <span>Plano Alimentar</span>
        </span>
        <span className="text-[0.65rem] font-extrabold uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Dietbox VIP
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg sm:text-xl font-black uppercase text-white tracking-tight">
          Nutrição Estratégica
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Sua dieta individualizada, calculada especificamente para seu objetivo, está disponível para consulta na plataforma Dietbox.
        </p>
      </div>

      <div className="pt-2">
        <a href={dietboxUrl} target="_blank" rel="noopener noreferrer" className="block">
          <Button
            variant="outline"
            className="w-full py-5 rounded-full font-black text-xs uppercase tracking-wider border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors"
          >
            <Utensils className="mr-2 h-4 w-4" />
            <span>ACESSAR DIETA NO DIETBOX</span>
            <ExternalLink className="ml-2 h-3.5 w-3.5" />
          </Button>
        </a>
      </div>
    </div>
  );
}
