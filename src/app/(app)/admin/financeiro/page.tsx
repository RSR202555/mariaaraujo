"use client";

import React from "react";
import { PageHeader } from "@/components/shell/PageHeader";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, CreditCard, ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminFinanceiroPage() {
  const transactions = [
    {
      id: "tx-1",
      student: "Camila Ribeiro",
      plan: "Consultoria VIP Trimestral",
      value: "R$ 660,00",
      method: "PIX",
      date: "10/01/2026",
      status: "CONFIRMED",
    },
    {
      id: "tx-2",
      student: "Fernanda Lima",
      plan: "Consultoria Mensal",
      value: "R$ 250,00",
      method: "Cartão de Crédito",
      date: "18/02/2026",
      status: "CONFIRMED",
    },
    {
      id: "tx-3",
      student: "Beatriz Oliveira",
      plan: "Protocolo Express",
      value: "R$ 150,00",
      method: "PIX",
      date: "21/02/2026",
      status: "PENDING",
    },
  ];

  return (
    <div className="space-y-8 text-left">
      <PageHeader
        badge="Integração Asaas Pay"
        title="Financeiro & Assinaturas"
        description="Acompanhe o faturamento em tempo real, recebimentos de mensalidades, PIX automáticos e cobranças ativas do Asaas."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0f0f0f] border border-[#262626] rounded-2xl p-5">
          <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
            Receita Este Mês
          </p>
          <h3 className="text-3xl font-black text-white mt-1">R$ 1.060,00</h3>
          <span className="text-[0.65rem] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> +15% vs mês anterior
          </span>
        </div>

        <div className="bg-[#0f0f0f] border border-[#262626] rounded-2xl p-5">
          <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
            Cobranças Pendentes
          </p>
          <h3 className="text-3xl font-black text-amber-400 mt-1">R$ 150,00</h3>
          <span className="text-[0.65rem] text-amber-400 font-semibold flex items-center gap-1 mt-1">
            1 fatura em aberto
          </span>
        </div>

        <div className="bg-[#0f0f0f] border border-[#262626] rounded-2xl p-5">
          <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
            Ticket Médio por Aluna
          </p>
          <h3 className="text-3xl font-black text-primary mt-1">R$ 353,33</h3>
          <span className="text-[0.65rem] text-muted-foreground font-semibold flex items-center gap-1 mt-1">
            Plano VIP mais vendido
          </span>
        </div>
      </div>

      {/* Lista de Transações */}
      <div className="bg-[#090909] border border-[#262626] rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-extrabold text-white uppercase tracking-tight font-serif">
          Últimas Transações Asaas
        </h3>

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
                <span className={`text-[0.65rem] font-bold ${tx.status === "CONFIRMED" ? "text-emerald-400" : "text-amber-400"}`}>
                  {tx.status === "CONFIRMED" ? "Confirmado" : "Aguardando PIX"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
