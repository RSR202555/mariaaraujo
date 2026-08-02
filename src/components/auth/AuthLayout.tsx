"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  planName?: string;
}

export function AuthLayout({ children, title, subtitle, planName = "Plano Premium" }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#090909] text-white flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Neon Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 backdrop-blur-xl space-y-6"
      >
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-black tracking-tight text-white uppercase">
              MARIA ARAÚJO<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Asaas Payment Confirmed Badge */}
          {planName && (
            <div className="flex justify-center pt-1">
              <span className="inline-flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[0.68rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>{planName} • Pagamento Confirmado Asaas</span>
              </span>
            </div>
          )}

          <div className="pt-2">
            <h1 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">{title}</h1>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{subtitle}</p>
          </div>
        </div>

        {children}
      </motion.div>

      {/* Footer copyright */}
      <div className="mt-8 text-center text-xs text-muted-foreground space-y-1 relative z-10">
        <p>© {new Date().getFullYear()} Maria Araújo Personal. Consultoria VIP Exclusiva.</p>
        <p className="text-[0.65rem] text-muted-foreground/60">Ambiente seguro com criptografia de ponta a ponta.</p>
      </div>
    </div>
  );
}
