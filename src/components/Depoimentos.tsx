"use client";

import { motion } from "framer-motion";
import styles from "./Depoimentos.module.css";

type TestimonialItem = {
  quote: string;
  author: string;
  role: string;
  duration: string;
};

export default function Depoimentos() {
  const items: TestimonialItem[] = [
    {
      quote: "Com a consultoria da Maria Araújo, entendi que a consistência vem da estratégia. Os treinos são intensos, focados e respeitam minha individualidade biológica. Meu corpo mudou completamente em 3 meses.",
      author: "Juliana Mendes",
      role: "Médica Dermatologista",
      duration: "Acompanhamento de 6 meses",
    },
    {
      quote: "Profissionalismo de nível corporativo. A Maria entrega o plano com extrema clareza científica. Sem firulas, sem dietas malucas. O suporte técnico por vídeo faz toda a diferença na execução dos movimentos.",
      author: "Rodrigo Vasconcelos",
      role: "Diretor de Tecnologia",
      duration: "Acompanhamento de 8 meses",
    },
    {
      quote: "O acompanhamento de treinos é incrível. Pela primeira vez na vida consegui conciliar um físico altamente definido com uma rotina exaustiva de viagens de negócios. Indico de olhos fechados.",
      author: "Camila Fernandes",
      role: "Empresária & Investidora",
      duration: "Acompanhamento de 1 ano",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="depoimentos" className="section">
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className="section-subtitle">Opiniões Reais</span>
          <h2 className="section-title">
            O QUE NOSSOS <br />
            <span className={styles.italicPink}>ALUNOS DIZEM.</span>
          </h2>
        </div>

        {/* Editorial Layout without traditional cards */}
        <motion.div
          className={styles.editorialGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              className={styles.editorialItem}
              variants={itemVariants}
            >
              <blockquote className={styles.blockquote}>
                <span className={styles.quoteMark}>“</span>
                {item.quote}
              </blockquote>
              <div className={styles.meta}>
                <cite className={styles.author}>{item.author}</cite>
                <span className={styles.role}>{item.role}</span>
                <span className={styles.duration}>{item.duration}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
