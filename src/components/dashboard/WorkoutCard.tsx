"use client";

import { Dumbbell, ExternalLink, Play, Sparkles, Clock } from "lucide-react";
import { TodayWorkout } from "@/types/dashboard";
import { Button } from "@/components/ui/button";

interface WorkoutCardProps {
  workout?: TodayWorkout;
}

const defaultWorkout: TodayWorkout = {
  title: "Treino B • Membros Inferiores & Glúteos",
  category: "Hipertrofia & Modelagem",
  durationMinutes: 55,
  exercisesCount: 8,
  mfitUrl: "https://mfitpersonal.com.br",
  isReady: true,
};

export function WorkoutCard({ workout = defaultWorkout }: WorkoutCardProps) {
  if (!workout.isReady) {
    return (
      <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-7 text-left space-y-4 shadow-2xl flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center space-x-1.5">
            <Dumbbell className="h-4 w-4 text-primary" />
            <span>Treino de Hoje</span>
          </span>
          <span className="text-[0.65rem] font-bold uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
            Em Preparação
          </span>
        </div>

        <div className="space-y-2 py-2">
          <h4 className="text-lg font-black uppercase text-white">Montando seu Protocolo</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            A Maria Araújo está analisando sua Anamnese e prescrevendo seus treinos. Você receberá uma notificação assim que estiver pronto.
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
          <Dumbbell className="h-4 w-4 text-primary" />
          <span>Treino do Dia</span>
        </span>
        <span className="text-[0.65rem] font-extrabold uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
          Disponível
        </span>
      </div>

      <div className="space-y-1.5">
        <h3 className="text-lg sm:text-xl font-black uppercase text-white tracking-tight">
          {workout.title}
        </h3>
        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
          <span>{workout.category}</span>
          <span>•</span>
          <span>{workout.durationMinutes} min</span>
          <span>•</span>
          <span>{workout.exercisesCount} exercícios</span>
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <Button
          onClick={() => (window.location.href = "/meu-treino")}
          variant="glow"
          className="w-full py-5 rounded-full font-black text-xs uppercase tracking-wider"
        >
          <Play className="mr-2 h-4 w-4 fill-white" />
          <span>ABRIR TREINO INTERATIVO</span>
        </Button>

        {workout.mfitUrl && (
          <a href={workout.mfitUrl} target="_blank" rel="noopener noreferrer" className="block">
            <Button variant="outline" className="w-full py-4 rounded-full font-bold text-[0.7rem] uppercase border-white/10 text-muted-foreground hover:text-white">
              <span>Abrir no MFIT Personal</span>
              <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}
