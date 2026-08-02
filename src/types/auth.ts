import { User as SupabaseUser, Session } from "@supabase/supabase-js";

export interface AuthUser {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  role?: "aluna" | "admin";
}

export interface AuthState {
  user: AuthUser | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
}

export interface AuthResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
