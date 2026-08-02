export interface ConsultancyInfo {
  status: "ativa" | "em_renovacao" | "pausada";
  startDate: string;
  nextEvaluationDate: string;
  daysRemaining: number;
  totalDays: number;
  progressPercentage: number;
}

export interface TodayWorkout {
  title: string;
  category: string;
  durationMinutes: number;
  exercisesCount: number;
  mfitUrl?: string;
  isReady: boolean;
}

export interface NutritionPlan {
  title: string;
  caloriesKcal: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  externalUrl?: string;
  isReady: boolean;
}

export interface WeightHistoryPoint {
  date: string;
  weight: number;
}

export interface WeightProgress {
  initialWeight: number;
  currentWeight: number;
  targetWeight: number;
  progressPercentage: number;
  history: WeightHistoryPoint[];
}

export interface EvolutionPhoto {
  id: string;
  angle: "Frente" | "Costas" | "Perfil D" | "Perfil E";
  url: string;
  date: string;
}

export interface EvaluationStatusInfo {
  nextDate: string;
  daysLeft: number;
  checklist: {
    photosUploaded: boolean;
    weightLogged: boolean;
    anamneseUpdated: boolean;
  };
}

export interface DashboardNotificationItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  type: "update" | "message" | "evaluation";
  unread: boolean;
}

export interface DashboardMessage {
  id: string;
  senderName: string;
  senderAvatar: string;
  lastMessage: string;
  timeAgo: string;
  unreadCount: number;
}
