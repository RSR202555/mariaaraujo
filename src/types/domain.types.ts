// ==========================================================
// MARIA ARAÚJO PERSONAL - DOMAIN TYPES
// ==========================================================

export type UserRole = 'ADMIN' | 'PERSONAL' | 'ALUNO';

export type ConsultancyStatus = 'PENDING' | 'ACTIVE' | 'PAUSED' | 'EXPIRED' | 'CANCELLED';

export type SubscriptionStatus = 'PENDING' | 'ACTIVE' | 'OVERDUE' | 'CANCELLED' | 'EXPIRED';

export type PaymentStatus = 'PENDING' | 'CONFIRMED' | 'RECEIVED' | 'OVERDUE' | 'REFUNDED' | 'FAILED';

export type PaymentMethod = 'PIX' | 'CREDIT_CARD' | 'BOLETO';

export type PhotoType = 'FRONT' | 'BACK' | 'SIDE_LEFT' | 'SIDE_RIGHT' | 'EXTRA';

export type ProtocolStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED';

export type NotificationType = 'SYSTEM' | 'PAYMENT' | 'PROTOCOL' | 'EVALUATION' | 'MESSAGE';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
