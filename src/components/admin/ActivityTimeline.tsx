"use client";

import { motion } from "framer-motion";
import {
  UserPlus,
  ShieldCheck,
  FileCheck,
  Camera,
  Send,
  MessageSquare,
  Activity,
} from "lucide-react";
import { ActivityEvent } from "@/types/admin";

interface ActivityTimelineProps {
  events?: ActivityEvent[];
}

const defaultEvents: ActivityEvent[] = [
  {
    id: "1",
    title: "Pagamento Aprovado no Asaas",
    description: "Juliana Mendes assinou a Consultoria Premium VIP.",
    timeAgo: "Há 10 min",
    type: "payment",
  },
  {
    id: "2",
    title: "Fotos de Evolução Recebidas",
    description: "Camila Fernandes enviou 4 fotos da reavaliação.",
    timeAgo: "Há 40 min",
    type: "photo",
  },
  {
    id: "3",
    title: "Anamnese Preenchida",
    description: "Beatriz Ramos concluiu as 8 etapas do onboarding.",
    timeAgo: "Há 1 hora",
    type: "anamnese",
  },
  {
    id: "4",
    title: "Protocolo Liberado",
    description: "Você enviou a nova ficha de treino B para Patrícia Souza.",
    timeAgo: "Há 3 horas",
    type: "protocol",
  },
  {
    id: "5",
    title: "Nova Mensagem",
    description: "Fernanda Costa enviou um dúvida sobre suplementos.",
    timeAgo: "Há 4 horas",
    type: "message",
  },
];

const typeIcons: Record<string, any> = {
  payment: ShieldCheck,
  photo: Camera,
  anamnese: FileCheck,
  protocol: Send,
  message: MessageSquare,
  user: UserPlus,
};

export function ActivityTimeline({ events = defaultEvents }: ActivityTimelineProps) {
  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-7 text-left space-y-5 shadow-2xl group hover:border-primary/40 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="h-4 w-4 text-primary" />
          <h3 className="text-xl font-black uppercase text-white tracking-tight">
            Atividade Recente
          </h3>
        </div>
        <span className="text-[0.65rem] font-bold uppercase text-muted-foreground bg-[#090909] border border-[#262626] px-2.5 py-1 rounded-full">
          Em tempo real
        </span>
      </div>

      <div className="relative pl-6 space-y-4 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#262626]">
        {events.map((evt) => {
          const IconComp = typeIcons[evt.type] || Activity;
          return (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex items-start space-x-3"
            >
              <div className="absolute -left-6 top-0.5 w-6 h-6 rounded-full bg-[#090909] border border-primary/40 text-primary flex items-center justify-center">
                <IconComp className="h-3 w-3" />
              </div>

              <div className="bg-[#090909] border border-[#262626] rounded-2xl p-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase">{evt.title}</span>
                  <span className="text-[0.62rem] text-muted-foreground">{evt.timeAgo}</span>
                </div>
                <p className="text-[0.7rem] text-muted-foreground mt-0.5">{evt.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
