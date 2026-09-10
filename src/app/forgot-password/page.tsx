import { AuthCard } from "@/components/auth/AuthCard";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata = {
  title: "Recuperar Senha | Maria Araújo Personal",
  description: "Recupere o acesso à sua conta de aluno VIP.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Recuperação de Senha"
      subtitle="Digite seu e-mail para receber um link de redefinição via Supabase."
      badgeText="Segurança • Supabase Auth"
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
