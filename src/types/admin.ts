export interface AdminMetric {
  id: string;
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down" | "neutral";
  iconName: string;
  sparklineData?: number[];
}

export type WorkQueueStatus =
  | "aguardando_anamnese"
  | "aguardando_fotos"
  | "aguardando_avaliacao"
  | "aguardando_protocolo"
  | "concluido";

export interface WorkQueueItem {
  id: string;
  studentName: string;
  studentAvatar: string;
  planName: string;
  purchaseDate: string;
  daysWaiting: number;
  status: WorkQueueStatus;
}

export interface AgendaAppointment {
  id: string;
  time: string;
  studentName: string;
  studentAvatar: string;
  type: "Avaliação Inicial" | "Reavaliação Quinzenal" | "Alinhamento de Dieta";
  status: "confirmado" | "pendente" | "concluido";
}

export interface ActivityEvent {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  type: "user" | "payment" | "anamnese" | "photo" | "protocol" | "message";
}

export interface RevenueMonth {
  month: string;
  revenue: number;
  salesCount: number;
}

export interface RevenueData {
  currentMonthRevenue: number;
  totalRevenue: number;
  averageTicket: number;
  monthlyHistory: RevenueMonth[];
}

export interface AdminNotification {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  unread: boolean;
}

export interface AdminMessageSummary {
  id: string;
  studentName: string;
  studentAvatar: string;
  lastMessage: string;
  timeAgo: string;
  unreadCount: number;
}
