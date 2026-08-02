import { AuthCard } from "@/components/auth/AuthCard";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata = {
  title: "Redefinir Senha | Maria Araújo Personal",
  description: "Crie uma nova senha de acesso para sua conta.",
};

export default function ResetPasswordPage() {
  return (
    <AuthCard
      title="Nova Senha"
      subtitle="Digite e confirme sua nova senha para atualizar seu acesso no Supabase."
      badgeText="Redefinição de Senha"
    >
      <ResetPasswordForm />
    </AuthCard>
  );
}
