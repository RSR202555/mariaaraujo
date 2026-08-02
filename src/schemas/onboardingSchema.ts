import { z } from "zod";

export const personalDataSchema = z.object({
  fullName: z.string().min(3, "Digite seu nome completo."),
  phone: z.string().min(10, "Digite seu telefone com DDD."),
  birthDate: z.string().min(1, "Informe sua data de nascimento."),
  gender: z.enum(["feminino", "masculino", "outro"]),
  heightCm: z.number().min(100, "Altura mínima de 100 cm.").max(230, "Altura máxima de 230 cm."),
  weightKg: z.number().min(30, "Peso mínimo de 30 kg.").max(250, "Peso máximo de 250 kg."),
  city: z.string().min(2, "Informe sua cidade."),
  state: z.string().min(2, "Informe seu estado (UF)."),
});

export const objectivesSchema = z.object({
  primaryObjective: z.enum(["emagrecer", "ganhar_massa", "definir", "melhorar_saude", "performance"]),
  targetWeightKg: z.number().min(30, "Peso inválido.").max(250, "Peso inválido."),
  targetTimeframe: z.string().min(1, "Selecione o prazo desejado."),
});

export const experienceSchema = z.object({
  trainingTime: z.enum(["nunca", "menos_6_meses", "1_ano", "2_anos", "mais_3_anos"]),
  weeklyFrequency: z.string().min(1, "Selecione quantas vezes pretende treinar."),
  hadPreviousCoach: z.enum(["sim", "nao"]),
});

export const healthSchema = z.object({
  hasInjuries: z.enum(["sim", "nao"]),
  injuryDetails: z.string().optional(),
  hasDiseases: z.enum(["sim", "nao"]),
  diseaseDetails: z.string().optional(),
  usesMedications: z.enum(["sim", "nao"]),
  medicationDetails: z.string().optional(),
  limitations: z.string().optional(),
});

export const nutritionSchema = z.object({
  dietRating: z.enum(["ruim", "regular", "boa", "excelente"]),
  mealsCount: z.string().min(1, "Informe a quantidade de refeições."),
  waterIntake: z.string().min(1, "Informe o consumo de água."),
  supplements: z.string().optional(),
});

export const routineSchema = z.object({
  availableTime: z.string().min(1, "Informe o horário disponível."),
  availableDays: z.array(z.string()).min(1, "Selecione pelo menos um dia da semana."),
  profession: z.string().min(2, "Informe sua profissão/ocupação."),
  stressLevel: z.enum(["baixo", "medio", "alto"]),
  sleepQuality: z.enum(["ruim", "regular", "boa", "excelente"]),
});
