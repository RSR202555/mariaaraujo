import { AuthLayout } from "@/components/auth/AuthLayout";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata = {
  title: "Recuperar Senha | Maria Araújo Personal",
  description: "Recupere o acesso à sua conta de aluna VIP.",
};

export default function EsqueciSenhaPage() {
  return (
    <AuthLayout
      title="Recuperação de Senha"
      subtitle="Digite o e-mail cadastrado na sua conta para receber um link de redefinição."
      planName="Consultoria Maria Araújo"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
