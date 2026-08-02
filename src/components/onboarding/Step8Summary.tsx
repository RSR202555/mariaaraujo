"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Edit3, ArrowLeft, User, Target, Dumbbell, HeartPulse, Utensils, Calendar } from "lucide-react";
import { OnboardingFullData } from "@/types/onboarding";
import { Button } from "@/components/ui/button";

interface Step8SummaryProps {
  data: OnboardingFullData;
  onEditStep: (stepNumber: number) => void;
  onComplete: () => void;
  onPrev: () => void;
}

export function Step8Summary({ data, onEditStep, onComplete, onPrev }: Step8SummaryProps) {
  const sections = [
    {
      stepNumber: 2,
      title: "1. Dados Pessoais",
      icon: User,
      items: [
        { label: "Nome", value: data.personal.fullName || "Não informado" },
        { label: "Contato", value: `${data.personal.phone} • ${data.personal.city}/${data.personal.state}` },
        { label: "Métricas", value: `${data.personal.heightCm} cm • ${data.personal.weightKg} kg` },
      ],
    },
    {
      stepNumber: 3,
      title: "2. Objetivos",
      icon: Target,
      items: [
        { label: "Foco Principal", value: data.objectives.primaryObjective.replace("_", " ").toUpperCase() },
        { label: "Meta de Peso", value: `${data.objectives.targetWeightKg} kg` },
        { label: "Prazo", value: data.objectives.targetTimeframe },
      ],
    },
    {
      stepNumber: 4,
      title: "3. Experiência",
      icon: Dumbbell,
      items: [
        { label: "Tempo de Treino", value: data.experience.trainingTime.replace("_", " ") },
        { label: "Frequência", value: data.experience.weeklyFrequency },
        { label: "Personal Prévio", value: data.experience.hadPreviousCoach === "sim" ? "Sim" : "Não" },
      ],
    },
    {
      stepNumber: 5,
      title: "4. Histórico de Saúde",
      icon: HeartPulse,
      items: [
        { label: "Lesões/Dores", value: data.health.hasInjuries === "sim" ? data.health.injuryDetails || "Sim" : "Sem lesões" },
        { label: "Condições", value: data.health.hasDiseases === "sim" ? data.health.diseaseDetails || "Sim" : "Sem doenças" },
        { label: "Medicamentos", value: data.health.usesMedications === "sim" ? data.health.medicationDetails || "Sim" : "Nenhum" },
      ],
    },
    {
      stepNumber: 6,
      title: "5. Hábitos Alimentares",
      icon: Utensils,
      items: [
        { label: "Qualidade", value: data.nutrition.dietRating.toUpperCase() },
        { label: "Refeições & Água", value: `${data.nutrition.mealsCount} • ${data.nutrition.waterIntake}` },
        { label: "Suplementos", value: data.nutrition.supplements || "Nenhum" },
      ],
    },
    {
      stepNumber: 7,
      title: "6. Rotina & Sono",
      icon: Calendar,
      items: [
        { label: "Horários & Profissão", value: `${data.routine.availableTime} • ${data.routine.profession}` },
        { label: "Dias Disponíveis", value: data.routine.availableDays.join(", ") },
        { label: "Estresse & Sono", value: `Estresse: ${data.routine.stressLevel} • Sono: ${data.routine.sleepQuality}` },
      ],
    },
  ];

  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-5 sm:p-10 text-left space-y-6 shadow-2xl">
      <div className="space-y-1">
        <span className="text-[0.65rem] sm:text-[0.68rem] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-0.5 rounded-full inline-block mb-1">
          Etapa 8 de 8 • Confirmação Final
        </span>
        <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">Resumo da Anamnese</h2>
        <p className="text-xs text-muted-foreground">
          Revise suas respostas antes de enviar para a Maria Araújo. Você pode editar qualquer seção.
        </p>
      </div>

      {/* Grid das Seções Resumidas */}
      <div className="space-y-3 max-h-[380px] sm:max-h-[420px] overflow-y-auto pr-1">
        {sections.map((sec) => {
          const IconComp = sec.icon;
          return (
            <div key={sec.stepNumber} className="bg-[#090909] border border-[#262626] rounded-2xl p-3.5 sm:p-4 space-y-2">
              <div className="flex items-center justify-between border-b border-[#262626] pb-2">
                <div className="flex items-center space-x-2 text-primary">
                  <IconComp className="h-4 w-4" />
                  <span className="text-xs font-black uppercase text-white tracking-tight">{sec.title}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onEditStep(sec.stepNumber)}
                  className="text-[0.68rem] font-bold uppercase text-primary hover:underline flex items-center space-x-1"
                >
                  <Edit3 className="h-3 w-3" />
                  <span>Editar</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
                {sec.items.map((item, idx) => (
                  <div key={idx}>
                    <span className="text-[0.65rem] uppercase text-muted-foreground block font-bold">{item.label}</span>
                    <span className="text-xs font-semibold text-gray-200 truncate block">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navegação e Envio Final Totalmente Responsivo para Mobile */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-[#262626]">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          className="w-full sm:w-auto py-5 rounded-full text-xs font-bold uppercase border-white/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          VOLTAR
        </Button>

        <Button
          type="button"
          onClick={onComplete}
          variant="glow"
          className="w-full sm:w-auto py-5 px-6 rounded-full font-black text-xs uppercase tracking-wider bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30"
        >
          <CheckCircle2 className="mr-2 h-4 w-4" />
          <span>CONFIRMAR E CONTINUAR</span>
        </Button>
      </div>
    </div>
  );
}
