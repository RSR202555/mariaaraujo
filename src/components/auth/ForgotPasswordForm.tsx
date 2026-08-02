"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { forgotPasswordSchema, ForgotPasswordSchemaType } from "@/schemas/authSchema";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export function ForgotPasswordForm() {
  const { forgotPassword, error, clearError } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    clearError();
    setIsSubmitting(true);
    const result = await forgotPassword(data);
    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-4 text-center py-2">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold uppercase text-white">E-mail Enviado!</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Enviamos as instruções para redefinição de senha para o seu e-mail cadastrado. Verifique sua caixa de entrada e a pasta de spam.
          </p>
        </div>
        <div className="pt-3">
          <Link href="/login" className="w-full block">
            <Button variant="outline" className="w-full py-5 rounded-full text-xs font-bold uppercase tracking-wider border-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              VOLTAR AO LOGIN
            </Button>
          </Link>
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

      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
          E-mail Cadastrado
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

      <div className="pt-3 space-y-3">
        <Button
          type="submit"
          variant="glow"
          disabled={isSubmitting}
          className="w-full py-6 rounded-full font-black text-xs uppercase tracking-wider"
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Enviando e-mail...</span>
            </div>
          ) : (
            <>
              <span>ENVIAR LINK DE RECUPERAÇÃO</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        <Link href="/login" className="block text-center">
          <span className="text-xs text-muted-foreground hover:text-white transition-colors">
            Lembrou a senha? Voltar ao login
          </span>
        </Link>
      </div>
    </form>
  );
}
