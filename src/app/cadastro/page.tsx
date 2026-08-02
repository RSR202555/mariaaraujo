import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";

export const metadata = {
  title: "Criar Conta VIP | Maria Araújo Personal",
  description: "Crie sua conta exclusiva após a aprovação do pagamento da consultoria.",
};

export default function CadastroPage() {
  return (
    <AuthLayout
      title="Criar Sua Conta VIP"
      subtitle="Seu pagamento foi confirmado! Crie seus dados de acesso para iniciar a consultoria."
      planName="Plano Premium VIP"
    >
      <RegisterForm />

      <div className="pt-2 text-center text-xs text-muted-foreground border-t border-[#262626]">
        Já possui uma conta?{" "}
        <Link href="/login" className="font-bold text-white hover:text-primary transition-colors">
          Fazer Login
        </Link>
      </div>
    </AuthLayout>
  );
}
