"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { resetPasswordSchema, ResetPasswordSchemaType } from "@/schemas/authSchema";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export function ResetPasswordForm() {
  const router = useRouter();
  const { resetPassword, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordSchemaType) => {
    clearError();
    setIsSubmitting(true);
    const result = await resetPassword(data);
    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-4 text-center py-2">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold uppercase text-white">Senha Alterada!</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Sua senha foi redefinida com sucesso no Supabase. Redirecionando para o login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
      {error && (
        <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Nova Senha */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
          Nova Senha
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

      {/* Confirmar Nova Senha */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
          Confirmar Nova Senha
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            placeholder="Repita a nova senha"
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
              <span>Atualizando senha...</span>
            </div>
          ) : (
            <>
              <span>REDEFINIR MINHA SENHA</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
