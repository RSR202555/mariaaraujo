import { AuthCard } from "@/components/auth/AuthCard";
import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";

export const metadata = {
  title: "Criar Conta | Maria Araújo Personal",
  description: "Crie sua conta na plataforma Maria Araújo Personal.",
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Criar Sua Conta"
      subtitle="Preencha seus dados para criar sua conta de acesso à consultoria."
      badgeText="Cadastro VIP • Supabase Auth"
    >
      <RegisterForm />

      <div className="pt-2 text-center text-xs text-muted-foreground border-t border-[#262626]">
        Já possui uma conta?{" "}
        <Link href="/login" className="font-bold text-white hover:text-primary transition-colors">
          Fazer Login
        </Link>
      </div>
    </AuthCard>
  );
}
