"use client";

import { useState, useEffect, useCallback } from "react";
import { OnboardingFullData } from "@/types/onboarding";
import { OnboardingService } from "@/services/onboardingService";

const initialData: OnboardingFullData = {
  personal: {
    fullName: "",
    phone: "",
    birthDate: "",
    gender: "feminino",
    heightCm: 165,
    weightKg: 62,
    city: "",
    state: "",
  },
  objectives: {
    primaryObjective: "emagrecer",
    targetWeightKg: 58,
    targetTimeframe: "3 meses",
  },
  experience: {
    trainingTime: "1_ano",
    weeklyFrequency: "4 dias por semana",
    hadPreviousCoach: "nao",
  },
  health: {
    hasInjuries: "nao",
    injuryDetails: "",
    hasDiseases: "nao",
    diseaseDetails: "",
    usesMedications: "nao",
    medicationDetails: "",
    limitations: "",
  },
  nutrition: {
    dietRating: "boa",
    mealsCount: "4 refeições",
    waterIntake: "2.5 Litros",
    supplements: "Whey Protein, Creatina",
  },
  routine: {
    availableTime: "Manhã (07h às 08:30h)",
    availableDays: ["Segunda", "Terça", "Quinta", "Sexta"],
    profession: "Administradora",
    stressLevel: "medio",
    sleepQuality: "boa",
  },
};

export function useOnboarding() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<OnboardingFullData>(initialData);
  const [isAutoSaving, setIsAutoSaving] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Carrega rascunho anterior ao inicializar
  useEffect(() => {
    async function loadSavedOnboarding() {
      const saved = await OnboardingService.loadDraft();
      if (saved) {
        if (saved.currentStep) setCurrentStep(saved.currentStep);
        if (saved.data) {
          setFormData((prev) => ({
            ...prev,
            ...saved.data,
          }));
        }
      }
    }

    loadSavedOnboarding();
  }, []);

  // Autosave a cada atualização nos dados ou mudança de etapa
  const triggerAutoSave = useCallback(
    async (stepToSave: number, updatedData: OnboardingFullData) => {
      setIsAutoSaving(true);
      await OnboardingService.saveDraft(stepToSave, updatedData);
      setIsAutoSaving(false);
      setLastSavedTime(
        new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      );
    },
    []
  );

  const updateStepData = <K extends keyof OnboardingFullData>(
    section: K,
    data: OnboardingFullData[K]
  ) => {
    setFormData((prev) => {
      const updated = { ...prev, [section]: data };
      triggerAutoSave(currentStep, updated);
      return updated;
    });
  };

  const nextStep = () => {
    if (currentStep < 8) {
      const next = currentStep + 1;
      setCurrentStep(next);
      triggerAutoSave(next, formData);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      triggerAutoSave(prev, formData);
    }
  };

  const jumpToStep = (stepNumber: number) => {
    if (stepNumber >= 1 && stepNumber <= 8) {
      setCurrentStep(stepNumber);
      triggerAutoSave(stepNumber, formData);
    }
  };

  return {
    currentStep,
    formData,
    isAutoSaving,
    lastSavedTime,
    updateStepData,
    nextStep,
    prevStep,
    jumpToStep,
  };
}
