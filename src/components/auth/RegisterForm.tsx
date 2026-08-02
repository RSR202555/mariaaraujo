"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, User, Mail, Lock, AlertCircle, Loader2 } from "lucide-react";
import { registerSchema, RegisterSchemaType } from "@/schemas/authSchema";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export function RegisterForm() {
  const router = useRouter();
  const { register: registerAuth, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    clearError();
    setIsSubmitting(true);
    const result = await registerAuth(data);
    setIsSubmitting(false);

    if (result.success) {
      router.push(`/verify-email?email=${encodeURIComponent(data.email)}&name=${encodeURIComponent(data.fullName)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
      {error && (
        <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Nome Completo */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
          Nome Completo
        </label>
        <div className="relative">
          <User className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            {...register("fullName")}
            placeholder="Seu nome completo"
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
        {errors.fullName && (
          <p className="text-[0.7rem] font-medium text-rose-400">{errors.fullName.message}</p>
        )}
      </div>

      {/* E-mail */}
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

      {/* Senha */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
          Criar Senha
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Mínimo 8 caracteres, 1 maiúscula, 1 número"
            className="w-full h-11 pl-10 pr-10 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-[0.7rem] font-medium text-rose-400">{errors.password.message}</p>
        )}
      </div>

      {/* Confirmar Senha */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
          Confirmar Senha
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            placeholder="Repita sua senha"
            className="w-full h-11 pl-10 pr-10 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-white transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-[0.7rem] font-medium text-rose-400">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Checkbox Termos */}
      <div className="pt-2">
        <label className="flex items-start space-x-2.5 cursor-pointer">
          <input
            type="checkbox"
            {...register("acceptTerms")}
            className="mt-0.5 rounded border-[#262626] bg-[#090909] text-primary focus:ring-primary accent-primary h-4 w-4"
          />
          <span className="text-xs text-muted-foreground leading-snug">
            Li e aceito os{" "}
            <a href="#" className="text-white underline hover:text-primary">
              Termos de Uso
            </a>{" "}
            e a{" "}
            <a href="#" className="text-white underline hover:text-primary">
              Política de Privacidade
            </a>
            .
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="text-[0.7rem] font-medium text-rose-400 mt-1">{errors.acceptTerms.message}</p>
        )}
      </div>

      {/* Botão Submeter */}
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
              <span>Criando conta no Supabase...</span>
            </div>
          ) : (
            <>
              <span>CRIAR CONTA VIP</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
