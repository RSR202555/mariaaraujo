import { AuthCard } from "@/components/auth/AuthCard";
import { VerifyEmailView } from "@/components/auth/VerifyEmailView";

export const metadata = {
  title: "Verificar E-mail | Maria Araújo Personal",
  description: "Confirme seu e-mail para ativar sua conta na plataforma.",
};

export default function VerifyEmailPage() {
  return (
    <AuthCard
      title="Confirmação de Acesso"
      subtitle="Validação do e-mail de cadastro de aluna VIP."
      badgeText="Confirmação de E-mail"
    >
      <VerifyEmailView />
    </AuthCard>
  );
}
