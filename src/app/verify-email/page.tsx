import { Suspense } from "react";
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
      <Suspense fallback={<div className="text-center py-4 text-xs text-muted-foreground">Carregando verificação...</div>}>
        <VerifyEmailView />
      </Suspense>
    </AuthCard>
  );
}
