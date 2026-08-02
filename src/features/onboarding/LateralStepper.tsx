"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  User,
  Target,
  Dumbbell,
  HeartPulse,
  Utensils,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { StepperStep } from "@/types/onboarding";
import { cn } from "@/lib/utils";

interface LateralStepperProps {
  currentStep: number;
  onStepClick: (stepNumber: number) => void;
}

export const stepsList: StepperStep[] = [
  { number: 1, id: "welcome", title: "Boas-Vindas", subtitle: "Início da jornada", iconName: "Sparkles" },
  { number: 2, id: "personal", title: "Dados Pessoais", subtitle: "Perfil e contato", iconName: "User" },
  { number: 3, id: "objectives", title: "Objetivos", subtitle: "Metas e prazos", iconName: "Target" },
  { number: 4, id: "experience", title: "Experiência", subtitle: "Frequência e histórico", iconName: "Dumbbell" },
  { number: 5, id: "health", title: "Saúde & Lesões", subtitle: "Restrições médicas", iconName: "HeartPulse" },
  { number: 6, id: "nutrition", title: "Alimentação", subtitle: "Dieta e hábitos", iconName: "Utensils" },
  { number: 7, id: "routine", title: "Rotina & Sono", subtitle: "Horários disponíveis", iconName: "Calendar" },
  { number: 8, id: "summary", title: "Resumo", subtitle: "Revisão e confirmação", iconName: "CheckCircle2" },
];

const iconsMap: Record<string, any> = {
  Sparkles,
  User,
  Target,
  Dumbbell,
  HeartPulse,
  Utensils,
  Calendar,
  CheckCircle2,
};

export function LateralStepper({ currentStep, onStepClick }: LateralStepperProps) {
  return (
    <aside className="hidden lg:flex flex-col w-72 bg-[#141414] border-r border-[#262626] p-6 space-y-8 shrink-0">
      {/* Brand Header */}
      <div className="space-y-1">
        <span className="text-[0.65rem] font-black uppercase tracking-widest text-primary block">
          Consultoria Exclusiva
        </span>
        <h2 className="text-lg font-black uppercase text-white tracking-tight font-serif">
          MARIA ARAÚJO<span className="text-primary">.</span>
        </h2>
        <p className="text-[0.7rem] text-muted-foreground">Preenchimento de anamnese VIP</p>
      </div>

      {/* Stepper Vertical */}
      <nav className="space-y-1.5 flex-1 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#262626]">
        {stepsList.map((step) => {
          const IconComponent = iconsMap[step.iconName] || Sparkles;
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;

          return (
            <button
              key={step.id}
              onClick={() => onStepClick(step.number)}
              className={cn(
                "group relative w-full flex items-center space-x-3.5 p-2.5 rounded-2xl text-left transition-all duration-200",
                isCurrent
                  ? "bg-[#1B1B1B] border border-primary/40 shadow-lg shadow-black/40"
                  : "hover:bg-[#1B1B1B]/50"
              )}
            >
              {/* Active Pink Indicator Pill */}
              {isCurrent && (
                <motion.div
                  layoutId="activeStepperIndicator"
                  className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-primary shadow-[0_0_10px_rgba(216,92,138,0.6)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {/* Step Circle Icon */}
              <div
                className={cn(
                  "w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors z-10",
                  isCompleted
                    ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                    : isCurrent
                    ? "bg-primary text-white shadow-md shadow-primary/30"
                    : "bg-[#090909] border border-[#262626] text-muted-foreground group-hover:border-white/20"
                )}
              >
                {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <IconComponent className="h-4 w-4" />}
              </div>

              {/* Title & Subtitle */}
              <div className="min-w-0 flex-1">
                <span
                  className={cn(
                    "text-xs font-bold uppercase tracking-tight block truncate",
                    isCurrent ? "text-white" : isCompleted ? "text-gray-300" : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </span>
                <span className="text-[0.65rem] text-muted-foreground truncate block">{step.subtitle}</span>
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
