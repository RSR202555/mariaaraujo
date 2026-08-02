"use client";

import { motion } from "framer-motion";
import { ConsultancyStatusCard } from "@/components/dashboard/ConsultancyStatusCard";
import { WorkoutCard } from "@/components/dashboard/WorkoutCard";
import { NutritionCard } from "@/components/dashboard/NutritionCard";
import { ProgressChart } from "@/components/dashboard/ProgressChart";
import { PhotoGalleryCard } from "@/components/dashboard/PhotoGalleryCard";
import { EvaluationCard } from "@/components/dashboard/EvaluationCard";
import { NotificationList } from "@/components/dashboard/NotificationList";
import { MessagePreview } from "@/components/dashboard/MessagePreview";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function DashboardGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* SEÇÃO 1: Status da Consultoria (Card Grande Superior) */}
      <motion.div variants={itemVariants}>
        <ConsultancyStatusCard />
      </motion.div>

      {/* SEÇÃO 2 & 3: Treino do Dia & Plano Alimentar (Lado a Lado) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <WorkoutCard />
        </motion.div>
        <motion.div variants={itemVariants}>
          <NutritionCard />
        </motion.div>
      </div>

      {/* SEÇÃO 4 & 5: Gráfico de Evolução de Peso & Galeria de Fotos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <ProgressChart />
        </motion.div>
        <motion.div variants={itemVariants}>
          <PhotoGalleryCard />
        </motion.div>
      </div>

      {/* SEÇÃO 6, 7 & 8: Reavaliação, Notificações & Mensagens */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants}>
          <EvaluationCard />
        </motion.div>
        <motion.div variants={itemVariants}>
          <NotificationList />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MessagePreview />
        </motion.div>
      </div>
    </motion.div>
  );
}
