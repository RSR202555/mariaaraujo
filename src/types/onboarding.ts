export interface PersonalData {
  fullName: string;
  phone: string;
  birthDate: string;
  gender: "feminino" | "masculino" | "outro";
  heightCm: number;
  weightKg: number;
  city: string;
  state: string;
}

export interface ObjectivesData {
  primaryObjective: "emagrecer" | "ganhar_massa" | "definir" | "melhorar_saude" | "performance";
  targetWeightKg: number;
  targetTimeframe: string;
}

export interface ExperienceData {
  trainingTime: "nunca" | "menos_6_meses" | "1_ano" | "2_anos" | "mais_3_anos";
  weeklyFrequency: string;
  hadPreviousCoach: "sim" | "nao";
}

export interface HealthData {
  hasInjuries: "sim" | "nao";
  injuryDetails?: string;
  hasDiseases: "sim" | "nao";
  diseaseDetails?: string;
  usesMedications: "sim" | "nao";
  medicationDetails?: string;
  limitations?: string;
}

export interface NutritionData {
  dietRating: "ruim" | "regular" | "boa" | "excelente";
  mealsCount: string;
  waterIntake: string;
  supplements?: string;
}

export interface RoutineData {
  availableTime: string;
  availableDays: string[];
  profession: string;
  stressLevel: "baixo" | "medio" | "alto";
  sleepQuality: "ruim" | "regular" | "boa" | "excelente";
}

export interface OnboardingFullData {
  personal: PersonalData;
  objectives: ObjectivesData;
  experience: ExperienceData;
  health: HealthData;
  nutrition: NutritionData;
  routine: RoutineData;
}

export interface StepperStep {
  number: number;
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
}
