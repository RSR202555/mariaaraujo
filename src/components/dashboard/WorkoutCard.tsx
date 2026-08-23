"use client";

import { Dumbbell, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkoutCardProps {
  mfitUrl?: string;
  isReady?: boolean;
}

const DEFAULT_MFIT_URL = "https://app.mfitpersonal.com.br/login";

export function WorkoutCard({
  mfitUrl = DEFAULT_MFIT_URL,
  isReady = true,
}: WorkoutCardProps) {
  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-7 text-left space-y-5 shadow-2xl flex flex-col justify-between group hover:border-primary/40 transition-all duration-300">
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-wider text-primary flex items-center space-x-1.5">
          <Dumbbell className="h-4 w-4 text-primary" />
          <span>Plataforma de Treino</span>
        </span>
        <span className="text-[0.65rem] font-extrabold uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> MFIT Personal
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg sm:text-xl font-black uppercase text-white tracking-tight">
          Prescrição de Treinos VIP
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Seus treinos individualizados, vídeos de execução e registros de cargas estão disponíveis e sincronizados no aplicativo MFIT Personal.
        </p>
      </div>

      <div className="pt-2">
        <a href={mfitUrl} target="_blank" rel="noopener noreferrer" className="block">
          <Button
            variant="glow"
            className="w-full py-5 rounded-full font-black text-xs uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-[1.01] transition-transform"
          >
            <Dumbbell className="mr-2 h-4 w-4" />
            <span>ACESSAR TREINO NO MFIT</span>
            <ExternalLink className="ml-2 h-3.5 w-3.5" />
          </Button>
        </a>
      </div>
    </div>
  );
}
