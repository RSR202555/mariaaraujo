import { z } from "zod";

export const complementaryDataSchema = z.object({
  phone: z
    .string()
    .min(10, "Digite seu telefone/WhatsApp completo com DDD."),
  birthDate: z
    .string()
    .min(1, "Informe sua data de nascimento."),
  gender: z
    .enum(["feminino", "masculino", "outro"]),
  heightCm: z
    .number()
    .min(100, "Altura mínima 100 cm.")
    .max(230, "Altura máxima 230 cm."),
  weightKg: z
    .number()
    .min(30, "Peso mínimo 30 kg.")
    .max(250, "Peso máximo 250 kg."),
  city: z.string().min(2, "Informe sua cidade."),
  state: z.string().min(2, "Informe seu estado (UF)."),
});

export type ComplementaryFormData = z.infer<typeof complementaryDataSchema>;

export const anamneseSchema = z.object({
  // Etapa 1: Objetivos
  mainObjective: z.string().min(1, "Selecione seu objetivo principal."),
  secondaryObjectives: z.array(z.string()).optional(),

  // Etapa 2: Experiência com treino
  experienceLevel: z.string().min(1, "Informe seu nível de experiência com musculação."),
  currentRoutine: z.string().min(1, "Descreva sua rotina atual de exercícios."),

  // Etapa 3: Lesões
  hasInjuries: z.enum(["sim", "nao"]),
  injuryDetails: z.string().optional(),

  // Etapa 4: Doenças / Condições médicas
  medicalConditions: z.string().optional(),
  medications: z.string().optional(),

  // Etapa 5: Hábitos
  sleepHours: z.string().min(1, "Informe a média de horas de sono por noite."),
  waterIntakeLiters: z.string().min(1, "Informe a média de ingestão diária de água."),
  smokeOrAlcohol: z.string().optional(),

  // Etapa 6: Alimentação
  dietType: z.string().min(1, "Informe seu tipo de alimentação atual."),
  dietaryRestrictions: z.string().optional(),

  // Etapa 7: Disponibilidade
  daysPerWeek: z.string().min(1, "Selecione quantos dias por semana pode treinar."),
  sessionDurationMinutes: z.string().min(1, "Informe quanto tempo tem disponível por treino."),

  // Etapa 8: Observações
  additionalNotes: z.string().optional(),
});

export type AnamneseFormData = z.infer<typeof anamneseSchema>;
