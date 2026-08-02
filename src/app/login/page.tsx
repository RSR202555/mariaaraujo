import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export const metadata = {
  title: "Login | Maria Araújo Personal",
  description: "Acesse sua conta na plataforma de consultoria Maria Araújo Personal.",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Acessar Plataforma"
      subtitle="Bem-vindo(a) de volta! Digite seus dados para acessar seus treinos e acompanhamento."
      badgeText="Área do Aluno • Supabase Auth"
    >
      <LoginForm />

      <div className="pt-2 text-center text-xs text-muted-foreground border-t border-[#262626]">
        Ainda não possui uma conta?{" "}
        <Link href="/register" className="font-bold text-white hover:text-primary transition-colors">
          Criar Conta
        </Link>
      </div>
    </AuthCard>
  );
}
