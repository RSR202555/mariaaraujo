"use client";

import { motion } from "framer-motion";
import { Save, CheckCircle2 } from "lucide-react";
import { stepsList } from "./LateralStepper";

interface TopProgressBarProps {
  currentStep: number;
  isAutoSaving?: boolean;
  lastSavedTime?: string | null;
}

export function TopProgressBar({
  currentStep,
  isAutoSaving = false,
  lastSavedTime = null,
}: TopProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, Math.round((currentStep / 8) * 100)));
  const currentStepObj = stepsList.find((s) => s.number === currentStep);

  return (
    <div className="w-full bg-[#141414]/90 border-b border-[#262626] p-3 sm:px-8 backdrop-blur-md sticky top-0 z-30 space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2 min-w-0">
          <span className="font-black uppercase tracking-wider text-white font-serif shrink-0">
            MARIA<span className="text-primary">.</span>
          </span>
          <span className="text-muted-foreground shrink-0">•</span>
          <span className="font-bold text-primary text-[0.68rem] uppercase truncate">
            Etapa {currentStep} de 8 {currentStepObj ? `— ${currentStepObj.title}` : ""}
          </span>
        </div>

        {/* Auto Save Status Badge */}
        <div className="flex items-center space-x-2 text-[0.65rem] text-muted-foreground shrink-0 pl-2">
          {isAutoSaving ? (
            <span className="text-amber-400 font-bold flex items-center space-x-1 animate-pulse">
              <Save className="h-3 w-3" />
              <span className="hidden sm:inline">Salvando...</span>
            </span>
          ) : lastSavedTime ? (
            <span className="text-emerald-400 font-medium flex items-center space-x-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Salvo</span>
            </span>
          ) : null}
          <span className="font-extrabold text-white">{percentage}%</span>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full h-1.5 rounded-full bg-[#090909] border border-[#262626] overflow-hidden p-0.5">
        <motion.div
          className="h-full rounded-full bg-primary shadow-[0_0_12px_rgba(216,92,138,0.7)]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
