"use client";

import { motion } from "framer-motion";
import styles from "./ComoFunciona.module.css";

type Step = {
  num: string;
  stepLabel: string;
  title: string;
  description: string;
};

export default function ComoFunciona() {
  const steps: Step[] = [
    {
      num: "01",
      stepLabel: "PASSO 01",
      title: "ESCOLHA A CONSULTORIA",
      description: "Selecione o plano que melhor se adapta aos seus objetivos atuais e nível de experiência.",
    },
    {
      num: "02",
      stepLabel: "PASSO 02",
      title: "PAGAMENTO",
      description: "Processo rápido e seguro via Mercado Pago com liberação imediata.",
    },
    {
      num: "03",
      stepLabel: "PASSO 03",
      title: "CRIAÇÃO DA CONTA",
      description: "Acesso imediato à sua área exclusiva de aluno com dashboard personalizado.",
    },
    {
      num: "04",
      stepLabel: "PASSO 04",
      title: "ANAMNESE",
      description: "Questionário detalhado sobre seu histórico médico, rotina, lesões e preferências.",
    },
    {
      num: "05",
      stepLabel: "PASSO 05",
      title: "UPLOAD DAS FOTOS",
      description: "Registro visual padronizado para análise de composição corporal e postura.",
    },
    {
      num: "06",
      stepLabel: "PASSO 06",
      title: "AVALIAÇÃO",
      description: "Análise técnica minuciosa de todos os seus dados pela equipe Maria Araújo.",
    },
    {
      num: "07",
      stepLabel: "PASSO 07",
      title: "PROTOCOLOS",
      description: "Recebimento do seu protocolo de treinos 100% individualizado.",
    },
    {
      num: "08",
      stepLabel: "PASSO 08",
      title: "ACOMPANHAMENTO",
      description: "Suporte contínuo, ajustes periódicos e reavaliações para garantir sua evolução.",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="metodologia" className="section">
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className="section-subtitle">Metodologia</span>
          <h2 className="section-title">
            A JORNADA DA SUA <br />
            <span className={styles.italicPink}>TRANSFORMAÇÃO.</span>
          </h2>
          <p className="section-desc">
            Um processo estruturado, estratégico e validado para garantir que cada minuto do seu esforço seja revertido em resultados visíveis e duradouros.
          </p>
        </div>

        {/* Timeline Grid (8 cards) */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.num}
              className={styles.card}
              variants={cardVariants}
            >
              <div className={styles.cardHeader}>
                <span className={styles.stepLabel}>{step.stepLabel}</span>
                <span className={styles.bigNumber}>{step.num}</span>
              </div>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardDesc}>{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
