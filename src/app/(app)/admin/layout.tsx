"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Lock, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const AUTHORIZED_ADMIN_EMAIL = "mariiaraujoo32@gmail.com";

export default function AdminLayoutGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center space-y-4 text-muted-foreground">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-xs font-semibold">Verificando permissões de segurança...</p>
      </div>
    );
  }

  const currentUserEmail = user?.email?.trim().toLowerCase() || "";
  const isAuthorizedAdmin = currentUserEmail === AUTHORIZED_ADMIN_EMAIL.toLowerCase();

  if (!isAuthorizedAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 text-left">
        <div className="bg-[#090909] border border-rose-500/30 rounded-3xl p-8 max-w-lg w-full space-y-6 shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <span className="text-[0.65rem] font-black uppercase tracking-widest text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full inline-block">
              Acesso Restrito ao Painel Admin
            </span>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              Área Exclusiva da Personal
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              O acesso a esta rota é restrito estritamente à Personal Maria Araújo. Sua conta atual não possui privilégios de administradora.
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <Link href="/admin/login" className="block">
              <Button
                variant="glow"
                className="w-full py-5 rounded-2xl font-black text-xs uppercase tracking-wider"
              >
                <Lock className="mr-2 h-4 w-4" />
                <span>Entrar como Administradora</span>
              </Button>
            </Link>

            <Link href="/dashboard" className="block">
              <Button
                variant="outline"
                className="w-full py-5 rounded-2xl font-bold text-xs uppercase tracking-wider border-white/10 text-muted-foreground hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span>Voltar para o Dashboard</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
