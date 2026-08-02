import { createClient } from "@/lib/supabase/client";
import { OnboardingFullData } from "@/types/onboarding";

const LOCAL_STORAGE_KEY = "maria_onboarding_vip_draft";

export class OnboardingService {
  private static getSupabase() {
    return createClient();
  }

  /**
   * Salva o rascunho do onboarding em tempo real (Supabase DB + LocalStorage)
   */
  static async saveDraft(currentStep: number, data: Partial<OnboardingFullData>): Promise<boolean> {
    try {
      // 1. Persistência imediata no LocalStorage (Fall-back ultra-rápido sem latência)
      if (typeof window !== "undefined") {
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({ step: currentStep, data, updatedAt: new Date().toISOString() })
        );
      }

      // 2. Persistência assíncrona na tabela Supabase 'onboarding_drafts'
      const supabase = this.getSupabase();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        await supabase.from("onboarding_drafts").upsert(
          {
            user_id: user.id,
            current_step: currentStep,
            step_data: data,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );
      }

      return true;
    } catch (error) {
      console.error("Erro ao salvar rascunho de onboarding:", error);
      return false;
    }
  }

  /**
   * Carrega o rascunho anterior para o aluno continuar exatamente de onde parou
   */
  static async loadDraft(): Promise<{ currentStep: number; data: Partial<OnboardingFullData> } | null> {
    try {
      // Tenta buscar no Supabase se o usuário estiver logado
      const supabase = this.getSupabase();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("onboarding_drafts")
          .select("current_step, step_data")
          .eq("user_id", user.id)
          .single();

        if (data) {
          return { currentStep: data.current_step, data: data.step_data };
        }
      }

      // Fallback para LocalStorage
      if (typeof window !== "undefined") {
        const local = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (local) {
          const parsed = JSON.parse(local);
          return { currentStep: parsed.step, data: parsed.data };
        }
      }

      return null;
    } catch {
      return null;
    }
  }

  /**
   * Limpa o rascunho após a conclusão do onboarding
   */
  static clearDraft() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }
}
