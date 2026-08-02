"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Mail, Lock, AlertCircle, Loader2 } from "lucide-react";
import { loginSchema, LoginSchemaType } from "@/schemas/authSchema";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();
  const { login, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    clearError();
    setIsSubmitting(true);
    const result = await login(data);
    setIsSubmitting(false);

    if (result.success) {
      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
      {/* Mensagem de Erro Elegante */}
      {error && (
        <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Campo: E-mail */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
          E-mail de Acesso
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
          <input
            type="email"
            {...register("email")}
            placeholder="seu@email.com"
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
        {errors.email && (
          <p className="text-[0.7rem] font-medium text-rose-400">{errors.email.message}</p>
        )}
      </div>

      {/* Campo: Senha */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
            Sua Senha
          </label>
          <Link href="/forgot-password" className="text-xs font-semibold text-primary hover:underline">
            Esqueci minha senha
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Sua senha de acesso"
            className="w-full h-11 pl-10 pr-10 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-white transition-colors"
            aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-[0.7rem] font-medium text-rose-400">{errors.password.message}</p>
        )}
      </div>

      {/* Checkbox: Lembrar-me */}
      <div className="flex items-center justify-between pt-1">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            {...register("rememberMe")}
            className="rounded border-[#262626] bg-[#090909] text-primary focus:ring-primary accent-primary h-4 w-4"
          />
          <span className="text-xs text-muted-foreground">Lembrar-me neste navegador</span>
        </label>
      </div>

      {/* Botão Entrar */}
      <div className="pt-3">
        <Button
          type="submit"
          variant="glow"
          disabled={isSubmitting}
          className="w-full py-6 rounded-full font-black text-xs uppercase tracking-wider"
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Autenticando...</span>
            </div>
          ) : (
            <>
              <span>ENTRAR NA PLATAFORMA</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
