"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Save, Target, Dumbbell, AlertTriangle, Stethoscope, Moon, Utensils, Calendar, FileText } from "lucide-react";
import { anamneseSchema, AnamneseFormData } from "@/lib/validations/onboarding";
import { OnboardingProgressBar } from "./OnboardingProgressBar";
import { Button } from "@/components/ui/button";

interface AnamneseStepFormProps {
  onComplete: (data: AnamneseFormData) => void;
}

const STORAGE_KEY = "maria_anamnese_draft";

export function AnamneseStepForm({ onComplete }: AnamneseStepFormProps) {
  const [step, setStep] = useState(1);
  const [autoSaved, setAutoSaved] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AnamneseFormData>({
    resolver: zodResolver(anamneseSchema),
    defaultValues: {
      mainObjective: "emagrecimento",
      secondaryObjectives: [],
      experienceLevel: "intermediario",
      currentRoutine: "",
      hasInjuries: "nao",
      injuryDetails: "",
      medicalConditions: "",
      medications: "",
      sleepHours: "7-8h",
      waterIntakeLiters: "2-3 litros",
      smokeOrAlcohol: "Não fumo / Bebida social ocasional",
      dietType: "flexivel",
      dietaryRestrictions: "",
      daysPerWeek: "4",
      sessionDurationMinutes: "60",
      additionalNotes: "",
    },
  });

  const formValues = watch();

  // Autosave no LocalStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          Object.keys(parsed).forEach((key) => {
            setValue(key as any, parsed[key]);
          });
        } catch (e) {
          console.error("Erro ao carregar rascunho de anamnese", e);
        }
      }
    }
  }, [setValue]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
      setAutoSaved(true);
      const timer = setTimeout(() => setAutoSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [formValues]);

  const stepTitles = [
    "Objetivos Principais",
    "Experiência com Treino",
    "Histórico de Lesões",
    "Condições de Saúde",
    "Hábitos & Estilo de Vida",
    "Hábitos Alimentares",
    "Disponibilidade de Tempo",
    "Observações Finais",
  ];

  const handleNextStep = () => {
    if (step < 8) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const onSubmitForm = (data: AnamneseFormData) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
    onComplete(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto shadow-2xl space-y-6 text-left relative"
    >
      {/* Autosave notification badge */}
      <div className="flex items-center justify-between">
        <OnboardingProgressBar currentStep={step} totalSteps={8} stepTitle={stepTitles[step - 1]} />
      </div>

      {autoSaved && (
        <span className="absolute top-4 right-6 text-[0.65rem] text-emerald-400 font-bold flex items-center space-x-1">
          <Save className="h-3 w-3" />
          <span>Rascunho salvo automaticamente</span>
        </span>
      )}

      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        <AnimatePresence mode="wait">
          {/* ETAPA 1: OBJETIVOS */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 text-primary">
                <Target className="h-6 w-6" />
                <h3 className="text-xl font-extrabold uppercase text-white">1. Seus Objetivos com a Consultoria</h3>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
                  Qual é o seu objetivo principal?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { value: "emagrecimento", label: "Emagrecimento & Definição" },
                    { value: "hipertrofia", label: "Ganho de Massa Magra" },
                    { value: "recomposicao", label: "Recomposição Corporal" },
                  ].map((obj) => (
                    <button
                      type="button"
                      key={obj.value}
                      onClick={() => setValue("mainObjective", obj.value)}
                      className={`p-4 rounded-2xl border text-left text-xs font-bold uppercase transition-all ${
                        watch("mainObjective") === obj.value
                          ? "border-primary bg-primary/15 text-white shadow-lg shadow-primary/10"
                          : "border-[#262626] bg-[#090909] text-muted-foreground hover:text-white hover:border-white/20"
                      }`}
                    >
                      {obj.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
                  Observações / Escreva mais detalhes sobre seus objetivos
                </label>
                <textarea
                  {...register("additionalNotes")}
                  rows={2}
                  placeholder="Escreva aqui detalhes sobre o que você quer alcançar..."
                  className="w-full p-3 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
                />
              </div>
            </motion.div>
          )}

          {/* ETAPA 2: EXPERIÊNCIA COM TREINO */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 text-primary">
                <Dumbbell className="h-6 w-6" />
                <h3 className="text-xl font-extrabold uppercase text-white">2. Experiência com Treino</h3>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
                  Nível de experiência com musculação
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { value: "iniciante", label: "Iniciante (0-6 meses)" },
                    { value: "intermediario", label: "Intermediário (6m-2 anos)" },
                    { value: "avancado", label: "Avançado (+2 anos)" },
                  ].map((lvl) => (
                    <button
                      type="button"
                      key={lvl.value}
                      onClick={() => setValue("experienceLevel", lvl.value)}
                      className={`p-4 rounded-2xl border text-left text-xs font-bold uppercase transition-all ${
                        watch("experienceLevel") === lvl.value
                          ? "border-primary bg-primary/15 text-white shadow-lg shadow-primary/10"
                          : "border-[#262626] bg-[#090909] text-muted-foreground hover:text-white hover:border-white/20"
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
                  Descreva brevemente sua rotina atual de exercícios
                </label>
                <textarea
                  {...register("currentRoutine")}
                  rows={3}
                  placeholder="Ex: Treino 3x por semana na academia do prédio..."
                  className="w-full p-3 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
                />
              </div>
            </motion.div>
          )}

          {/* ETAPA 3: LESÕES */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 text-primary">
                <AlertTriangle className="h-6 w-6" />
                <h3 className="text-xl font-extrabold uppercase text-white">3. Histórico de Lesões ou Dores</h3>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
                  Possui alguma lesão articular ou dor frequente?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setValue("hasInjuries", "nao")}
                    className={`p-4 rounded-2xl border text-center text-xs font-bold uppercase transition-all ${
                      watch("hasInjuries") === "nao"
                        ? "border-emerald-500 bg-emerald-500/15 text-emerald-400"
                        : "border-[#262626] bg-[#090909] text-muted-foreground"
                    }`}
                  >
                    Não possuo lesões
                  </button>
                  <button
                    type="button"
                    onClick={() => setValue("hasInjuries", "sim")}
                    className={`p-4 rounded-2xl border text-center text-xs font-bold uppercase transition-all ${
                      watch("hasInjuries") === "sim"
                        ? "border-rose-500 bg-rose-500/15 text-rose-400"
                        : "border-[#262626] bg-[#090909] text-muted-foreground"
                    }`}
                  >
                    Sim, tenho dores/lesões
                  </button>
                </div>
              </div>

              {watch("hasInjuries") === "sim" && (
                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
                    Detalhe a lesão e os exercícios que causam desconforto
                  </label>
                  <textarea
                    {...register("injuryDetails")}
                    rows={3}
                    placeholder="Ex: Condromalácia patelar no joelho esquerdo, dor na lombar ao agachar..."
                    className="w-full p-3 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
                  />
                </div>
              )}
            </motion.div>
          )}

          {/* ETAPA 4: DOENÇAS / CONDIÇÕES */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 text-primary">
                <Stethoscope className="h-6 w-6" />
                <h3 className="text-xl font-extrabold uppercase text-white">4. Condições Médicas & Medicamentos</h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
                  Possui alguma condição médica diagnosticada?
                </label>
                <textarea
                  {...register("medicalConditions")}
                  rows={2}
                  placeholder="Ex: Hipotireoidismo, hipertensão, diabetes, síndrome do ovário policístico..."
                  className="w-full p-3 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
                  Faz uso continuo de algum medicamento ou suplemento?
                </label>
                <textarea
                  {...register("medications")}
                  rows={2}
                  placeholder="Ex: Pura T4 50mcg, anticoncepcional, polivitamínico..."
                  className="w-full p-3 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
                />
              </div>
            </motion.div>
          )}

          {/* ETAPA 5: HÁBITOS */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 text-primary">
                <Moon className="h-6 w-6" />
                <h3 className="text-xl font-extrabold uppercase text-white">5. Sono, Hidratação & Hábitos</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
                    Horas de Sono por Noite
                  </label>
                  <select
                    {...register("sleepHours")}
                    className="w-full h-11 px-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
                  >
                    <option value="menos-5h">Menos de 5 horas</option>
                    <option value="5-6h">5 a 6 horas</option>
                    <option value="7-8h">7 a 8 horas (Recomendado)</option>
                    <option value="mais-8h">Mais de 8 horas</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
                    Ingestão Diária de Água
                  </label>
                  <select
                    {...register("waterIntakeLiters")}
                    className="w-full h-11 px-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
                  >
                    <option value="menos-1l">Menos de 1 Litro</option>
                    <option value="1-2l">1 a 2 Litros</option>
                    <option value="2-3l">2 a 3 Litros</option>
                    <option value="mais-3l">Mais de 3 Litros</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* ETAPA 6: ALIMENTAÇÃO */}
          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 text-primary">
                <Utensils className="h-6 w-6" />
                <h3 className="text-xl font-extrabold uppercase text-white">6. Padrão Alimentar</h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
                  Tipo de Dieta Atual
                </label>
                <select
                  {...register("dietType")}
                  className="w-full h-11 px-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
                >
                  <option value="flexivel">Alimentação Flexível Tradicional</option>
                  <option value="vegetariana">Vegetariana / Vegana</option>
                  <option value="lowcarb">Low Carb / Cetogênica</option>
                  <option value="sem-lactose">Sem Lactose / Intolerância</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
                  Aversões ou Restrições Alimentares
                </label>
                <textarea
                  {...register("dietaryRestrictions")}
                  rows={2}
                  placeholder="Ex: Não gosto de peixe, intolerância a glúten..."
                  className="w-full p-3 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
                />
              </div>
            </motion.div>
          )}

          {/* ETAPA 7: DISPONIBILIDADE */}
          {step === 7 && (
            <motion.div
              key="step7"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 text-primary">
                <Calendar className="h-6 w-6" />
                <h3 className="text-xl font-extrabold uppercase text-white">7. Disponibilidade de Tempo</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
                    Dias por Semana para Treinar
                  </label>
                  <select
                    {...register("daysPerWeek")}
                    className="w-full h-11 px-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
                  >
                    <option value="3">3 Dias por Semana</option>
                    <option value="4">4 Dias por Semana (Recomendado)</option>
                    <option value="5">5 Dias por Semana</option>
                    <option value="6">6 Dias por Semana</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
                    Tempo por Sessão de Treino
                  </label>
                  <select
                    {...register("sessionDurationMinutes")}
                    className="w-full h-11 px-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
                  >
                    <option value="45">45 Minutos</option>
                    <option value="60">60 Minutos</option>
                    <option value="75">75 Minutos</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* ETAPA 8: OBSERVAÇÕES */}
          {step === 8 && (
            <motion.div
              key="step8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 text-primary">
                <FileText className="h-6 w-6" />
                <h3 className="text-xl font-extrabold uppercase text-white">8. Observações Finais para a Maria</h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
                  Gostaria de acrescentar algum detalhe importante para a elaboração do seu protocolo?
                </label>
                <textarea
                  {...register("additionalNotes")}
                  rows={4}
                  placeholder="Ex: Trabalho viajando frequentemente, prefiro treinos focados em glúteos e ombros..."
                  className="w-full p-3 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botoes de Navegação */}
        <div className="flex items-center justify-between pt-6 border-t border-[#262626]">
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevStep}
              className="rounded-full text-xs font-bold uppercase tracking-wider border-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              VOLTAR
            </Button>
          ) : (
            <div />
          )}

          {step < 8 ? (
            <Button
              type="button"
              variant="glow"
              onClick={handleNextStep}
              className="rounded-full text-xs font-black uppercase tracking-wider px-8"
            >
              <span>AVANÇAR</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              variant="glow"
              className="rounded-full text-xs font-black uppercase tracking-wider px-8 bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              <span>FINALIZAR ANAMNESE E IR PARA FOTOS</span>
            </Button>
          )}
        </div>
      </form>
    </motion.div>
  );
}
