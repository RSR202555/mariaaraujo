"use client";

import { motion } from "framer-motion";

interface OnboardingProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitle?: string;
}

export function OnboardingProgressBar({
  currentStep,
  totalSteps,
  stepTitle,
}: OnboardingProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, Math.round((currentStep / totalSteps) * 100)));

  return (
    <div className="w-full space-y-2 mb-8">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold uppercase tracking-wider text-primary">
          Etapa {currentStep} de {totalSteps} {stepTitle ? `• ${stepTitle}` : ""}
        </span>
        <span className="font-extrabold text-white">{percentage}% Concluído</span>
      </div>

      <div className="w-full h-2 rounded-full bg-[#141414] border border-[#262626] overflow-hidden p-0.5">
        <motion.div
          className="h-full rounded-full bg-primary shadow-[0_0_12px_rgba(216,92,138,0.6)]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
