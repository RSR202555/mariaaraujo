import React from "react";
import { PageHeader } from "@/components/shell/PageHeader";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, CreditCard, ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import { createServerSupabaseClient } from "@/database/server";

export default async function AdminFinanceiroPage() {
  const supabase = await createServerSupabaseClient();
  
  // Fetch real latest payments
  const { data: rawPayments } = await supabase
    .from("payments")
    .select(`
      id,
      amount,
      status,
      billing_type,
      created_at,
      students (
        profiles (
          full_name
        )
      ),
      subscriptions (
        plans (
          title
        )
      )
    `)
    .order("created_at", { ascending: false })
    .limit(10);

  const transactions = rawPayments?.map((p: any) => ({
    id: p.id,
    student: p.students?.profiles?.full_name || "Desconhecido",
    plan: p.subscriptions?.plans?.title || "Plano Avulso",
    value: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(p.amount),
    method: p.billing_type === "CREDIT_CARD" ? "Cartão de Crédito" : p.billing_type,
    date: new Date(p.created_at).toLocaleDateString("pt-BR"),
    status: p.status,
  })) || [];

  return (
    <div className="space-y-8 text-left">
      <PageHeader
        badge="Integração Mercado Pago"
        title="Financeiro & Assinaturas"
        description="Acompanhe o faturamento em tempo real, recebimentos, PIX automáticos e cobranças ativas do Mercado Pago."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0f0f0f] border border-[#262626] rounded-2xl p-5">
          <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
            Receita Este Mês
          </p>
          <h3 className="text-3xl font-black text-white mt-1">R$ 0,00</h3>
          <span className="text-[0.65rem] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> Em breve
          </span>
        </div>

        <div className="bg-[#0f0f0f] border border-[#262626] rounded-2xl p-5">
          <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
            Cobranças Pendentes
          </p>
          <h3 className="text-3xl font-black text-amber-400 mt-1">R$ 0,00</h3>
          <span className="text-[0.65rem] text-amber-400 font-semibold flex items-center gap-1 mt-1">
            Nenhuma fatura em aberto
          </span>
        </div>

        <div className="bg-[#0f0f0f] border border-[#262626] rounded-2xl p-5">
          <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
            Ticket Médio
          </p>
          <h3 className="text-3xl font-black text-primary mt-1">R$ 0,00</h3>
          <span className="text-[0.65rem] text-muted-foreground font-semibold flex items-center gap-1 mt-1">
            Calculado automaticamente
          </span>
        </div>
      </div>

      {/* Lista de Transações */}
      <div className="bg-[#090909] border border-[#262626] rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-extrabold text-white uppercase tracking-tight font-serif">
          Últimas Transações Mercado Pago
        </h3>

        {transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">Nenhuma transação encontrada ainda.</p>
        ) : (
          <div className="divide-y divide-[#1c1c1c]">
            {transactions.map((tx) => (
              <div key={tx.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-white block text-sm">{tx.student}</span>
                    <span className="text-[0.7rem] text-muted-foreground">{tx.plan} • {tx.method}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-black text-white text-sm block">{tx.value}</span>
                  <span className={`text-[0.65rem] font-bold ${tx.status === "CONFIRMED" || tx.status === "RECEIVED" || tx.status === "approved" ? "text-emerald-400" : "text-amber-400"}`}>
                    {tx.status === "CONFIRMED" || tx.status === "RECEIVED" || tx.status === "approved" ? "Confirmado" : "Pendente / Aguardando"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
