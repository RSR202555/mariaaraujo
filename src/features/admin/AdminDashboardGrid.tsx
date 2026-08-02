"use client";

import { motion } from "framer-motion";
import { MetricCard } from "@/components/admin/MetricCard";
import { WorkQueue } from "@/components/admin/WorkQueue";
import { AgendaCard } from "@/components/admin/AgendaCard";
import { ActivityTimeline } from "@/components/admin/ActivityTimeline";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { NotificationPanel } from "@/components/admin/NotificationPanel";
import { MessagePanel } from "@/components/admin/MessagePanel";
import { Users, Clock, DollarSign, Calendar } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const topMetrics = [
  {
    title: "Alunas Ativas",
    value: 248,
    subtitle: "18 novos cadastros no mês",
    change: "+12.4%",
    trend: "up" as const,
    icon: Users,
  },
  {
    title: "Pendências em Fila",
    value: 19,
    subtitle: "12 avaliações • 7 treinos",
    change: "Atenção",
    trend: "down" as const,
    icon: Clock,
  },
  {
    title: "Receita Mensal",
    value: "R$ 48.950",
    subtitle: "R$ 397 ticket médio",
    change: "+14.8%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    title: "Reavaliações Hoje",
    value: 5,
    subtitle: "4 confirmadas na agenda",
    change: "Hoje",
    trend: "neutral" as const,
    icon: Calendar,
  },
];

export function AdminDashboardGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 text-left"
    >
      {/* 4 Cards de Métricas Principais Limpas e Concisas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topMetrics.map((m, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <MetricCard
              title={m.title}
              value={m.value}
              subtitle={m.subtitle}
              change={m.change}
              trend={m.trend}
              icon={m.icon}
            />
          </motion.div>
        ))}
      </div>

      {/* Fila de Trabalho (Primary Focus) */}
      <motion.div variants={itemVariants}>
        <WorkQueue />
      </motion.div>

      {/* Grid Principal de 2 Colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Esquerda (2/3): Receita & Atividades */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants}>
            <RevenueChart />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ActivityTimeline />
          </motion.div>
        </div>

        {/* Direita (1/3): Agenda, Conversas & Notificações */}
        <div className="space-y-6">
          <motion.div variants={itemVariants}>
            <AgendaCard />
          </motion.div>

          <motion.div variants={itemVariants}>
            <MessagePanel />
          </motion.div>

          <motion.div variants={itemVariants}>
            <NotificationPanel />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
