"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, Dumbbell, ShieldCheck, FileCheck, Camera, Sparkles } from "lucide-react";

export function AssessmentTimeline() {
  const timelineItems = [
    {
      id: 1,
      title: "Assinatura Confirmada no Asaas",
      description: "Pagamento do primeiro mês aprovado com sucesso.",
      status: "completed",
      icon: ShieldCheck,
      time: "Confirmado",
    },
    {
      id: 2,
      title: "Conta VIP Criada",
      description: "Dados de acesso e perfil configurados.",
      status: "completed",
      icon: CheckCircle2,
      time: "Concluído",
    },
    {
      id: 3,
      title: "Anamnese Enviada",
      description: "Questionário com seus 8 blocos de hábitos e saúde recebido.",
      status: "completed",
      icon: FileCheck,
      time: "Concluído",
    },
    {
      id: 4,
      title: "Fotos de Evolução Recebidas",
      description: "4 registros posturais anexados com sucesso.",
      status: "completed",
      icon: Camera,
      time: "Concluído",
    },
    {
      id: 5,
      title: "Avaliação em Andamento",
      description: "A Maria Araújo está analisando sua biomecânica e dieta.",
      status: "current",
      icon: Clock,
      time: "Em Análise",
    },
    {
      id: 6,
      title: "Liberação de Protocolos",
      description: "Sua ficha de treino e dieta serão ativadas no app.",
      status: "pending",
      icon: Dumbbell,
      time: "Em breve",
    },
  ];

  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-8 space-y-6 text-left shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#262626] pb-5">
        <div>
          <span className="inline-flex items-center space-x-1 text-[0.68rem] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-2">
            <Clock className="h-3.5 w-3.5 mr-1 animate-pulse" />
            Status: Aguardando Avaliação pela Maria
          </span>
          <h3 className="text-xl font-black uppercase text-white tracking-tight">
            Timeline de Entrada do Aluno
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Acompanhe o status de preparação da sua consultoria VIP em tempo real.
          </p>
        </div>

        <div className="bg-[#090909] border border-white/10 px-4 py-2.5 rounded-2xl text-xs text-muted-foreground flex items-center space-x-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Prazo estimado: <strong className="text-white">até 48h úteis</strong></span>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#262626]">
        {timelineItems.map((item) => {
          const IconComp = item.icon;
          const isCompleted = item.status === "completed";
          const isCurrent = item.status === "current";

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex items-start space-x-4 group"
            >
              {/* Dot Icon Indicator */}
              <div
                className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border transition-all ${
                  isCompleted
                    ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                    : isCurrent
                    ? "bg-amber-500/20 border-amber-500/40 text-amber-400 animate-pulse glow-pink"
                    : "bg-[#090909] border-[#262626] text-muted-foreground"
                }`}
              >
                <IconComp className="h-3.5 w-3.5" />
              </div>

              <div className="flex-grow bg-[#090909]/60 border border-[#262626] rounded-2xl p-4 transition-all group-hover:border-white/10">
                <div className="flex items-center justify-between">
                  <h4
                    className={`text-sm font-bold uppercase tracking-tight ${
                      isCompleted
                        ? "text-white"
                        : isCurrent
                        ? "text-amber-300"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.title}
                  </h4>
                  <span
                    className={`text-[0.65rem] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                      isCompleted
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : isCurrent
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-white/5 text-muted-foreground"
                    }`}
                  >
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
