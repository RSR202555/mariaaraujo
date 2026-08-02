"use client";

import React from "react";
import { LateralStepper } from "./LateralStepper";
import { TopProgressBar } from "./TopProgressBar";
import { AnimatePresence, motion } from "framer-motion";

interface OnboardingContainerProps {
  currentStep: number;
  isAutoSaving?: boolean;
  lastSavedTime?: string | null;
  onStepClick: (stepNumber: number) => void;
  children: React.ReactNode;
}

export function OnboardingContainer({
  currentStep,
  isAutoSaving,
  lastSavedTime,
  onStepClick,
  children,
}: OnboardingContainerProps) {
  return (
    <div className="min-h-screen bg-[#090909] text-white flex flex-col lg:flex-row antialiased selection:bg-primary selection:text-white relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Desktop Lateral Stepper */}
      <LateralStepper currentStep={currentStep} onStepClick={onStepClick} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 z-10">
        {/* Top Progress Bar for Mobile/Tablet */}
        <TopProgressBar
          currentStep={currentStep}
          isAutoSaving={isAutoSaving}
          lastSavedTime={lastSavedTime}
        />

        {/* Content Container with Generous Negative Space */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
