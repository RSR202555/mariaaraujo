"use client";

import { useRouter } from "next/navigation";
import { useOnboarding } from "@/hooks/useOnboarding";
import { OnboardingContainer } from "@/features/onboarding/OnboardingContainer";
import { Step1Welcome } from "@/components/onboarding/Step1Welcome";
import { Step2PersonalData } from "@/components/onboarding/Step2PersonalData";
import { Step3Objectives } from "@/components/onboarding/Step3Objectives";
import { Step4Experience } from "@/components/onboarding/Step4Experience";
import { Step5Health } from "@/components/onboarding/Step5Health";
import { Step6Nutrition } from "@/components/onboarding/Step6Nutrition";
import { Step7Routine } from "@/components/onboarding/Step7Routine";
import { Step8Summary } from "@/components/onboarding/Step8Summary";
import { OnboardingService } from "@/services/onboardingService";

export default function VIPOnboardingPage() {
  const router = useRouter();
  const {
    currentStep,
    formData,
    isAutoSaving,
    lastSavedTime,
    updateStepData,
    nextStep,
    prevStep,
    jumpToStep,
  } = useOnboarding();

  const handleFinalSubmit = async () => {
    // Limpa o rascunho temporário do localStorage/Supabase pós-envio
    OnboardingService.clearDraft();
    // Redireciona para o Dashboard
    router.push("/dashboard");
  };

  return (
    <OnboardingContainer
      currentStep={currentStep}
      isAutoSaving={isAutoSaving}
      lastSavedTime={lastSavedTime}
      onStepClick={jumpToStep}
    >
      {currentStep === 1 && <Step1Welcome onNext={nextStep} />}

      {currentStep === 2 && (
        <Step2PersonalData
          initialValues={formData.personal}
          onNext={(data) => {
            updateStepData("personal", data);
            nextStep();
          }}
        />
      )}

      {currentStep === 3 && (
        <Step3Objectives
          initialValues={formData.objectives}
          onNext={(data) => {
            updateStepData("objectives", data);
            nextStep();
          }}
          onPrev={prevStep}
        />
      )}

      {currentStep === 4 && (
        <Step4Experience
          initialValues={formData.experience}
          onNext={(data) => {
            updateStepData("experience", data);
            nextStep();
          }}
          onPrev={prevStep}
        />
      )}

      {currentStep === 5 && (
        <Step5Health
          initialValues={formData.health}
          onNext={(data) => {
            updateStepData("health", data);
            nextStep();
          }}
          onPrev={prevStep}
        />
      )}

      {currentStep === 6 && (
        <Step6Nutrition
          initialValues={formData.nutrition}
          onNext={(data) => {
            updateStepData("nutrition", data);
            nextStep();
          }}
          onPrev={prevStep}
        />
      )}

      {currentStep === 7 && (
        <Step7Routine
          initialValues={formData.routine}
          onNext={(data) => {
            updateStepData("routine", data);
            nextStep();
          }}
          onPrev={prevStep}
        />
      )}

      {currentStep === 8 && (
        <Step8Summary
          data={formData}
          onEditStep={jumpToStep}
          onPrev={prevStep}
          onComplete={handleFinalSubmit}
        />
      )}
    </OnboardingContainer>
  );
}
