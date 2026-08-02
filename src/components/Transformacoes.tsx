"use client";

import { motion } from "framer-motion";
import { ArrowRight, Trophy } from "lucide-react";
import styles from "./Transformacoes.module.css";

type Transformation = {
  id: number;
  objective: string;
  duration: string;
  result: string;
  details: string;
  bgGradient: string;
  statLabel: string;
};

export default function Transformacoes() {
  const transformations: Transformation[] = [
    {
      id: 1,
      objective: "Definição Abdominal & Recomposição",
      duration: "12 semanas",
      result: "-12% Gordura Corporal",
      statLabel: "Massa Gorda Reduzida",
      details: "Ajuste preciso de carboidratos cíclicos e treino de força periodizado focado em densidade.",
      bgGradient: "linear-gradient(135deg, #1f1218 0%, #0d0d0d 100%)",
    },
    {
      id: 2,
      objective: "Ganho de Volume & Densidade",
      duration: "16 semanas",
      result: "+6.5kg Massa Magra",
      statLabel: "Ganho Muscular Seco",
      details: "Superávit calórico estratégico aliado a treinos de intensidade progressiva e análise de vídeos.",
      bgGradient: "linear-gradient(135deg, #12181f 0%, #0d0d0d 100%)",
    },
    {
      id: 3,
      objective: "Emagrecimento Saudável",
      duration: "24 semanas",
      result: "-22kg Eliminados",
      statLabel: "Redução Total de Peso",
      details: "Déficit calórico planejado sem restrições extremas, foco em adesão a longo prazo e saúde articular.",
      bgGradient: "linear-gradient(135deg, #151f12 0%, #0d0d0d 100%)",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section id="transformacoes" className="section">
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className="section-subtitle">Casos de Sucesso</span>
          <h2 className="section-title">
            TRANSFORMAÇÕES <br />
            <span className={styles.italicPink}>QUE INSPIRAM.</span>
          </h2>
          <p className="section-desc">
            Análise real de dados e progresso de alunos que seguiram a metodologia à risca e redefiniram seus limites.
          </p>
        </div>

        {/* Transformations Grid */}
        <div className={styles.grid}>
          {transformations.map((item, i) => (
            <motion.div
              key={item.id}
              className={styles.card}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
            >
              {/* Graphic/Image Area representing Before/After metric data */}
              <div className={styles.visualArea} style={{ background: item.bgGradient }}>
                <div className={styles.gridPattern} />
                <div className={styles.trophyWrapper}>
                  <Trophy size={20} className={styles.trophyIcon} />
                </div>
                <div className={styles.dataBadge}>{item.duration}</div>

                {/* Progress bar graphics */}
                <div className={styles.chartContainer}>
                  <div className={styles.chartBarWrapper}>
                    <span className={styles.chartLabel}>Antes</span>
                    <div className={styles.chartBarBase}>
                      <div className={styles.chartBarBefore} />
                    </div>
                  </div>
                  <div className={styles.chartBarWrapper}>
                    <span className={styles.chartLabel}>Depois</span>
                    <div className={styles.chartBarBase}>
                      <div className={styles.chartBarAfter} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Transformation Text Details */}
              <div className={styles.details}>
                <h3 className={styles.objective}>{item.objective}</h3>
                <p className={styles.textDesc}>{item.details}</p>

                <div className={styles.metricRow}>
                  <div className={styles.metricGroup}>
                    <span className={styles.metricValue}>{item.result}</span>
                    <span className={styles.metricLabel}>{item.statLabel}</span>
                  </div>
                  <a href="#consultorias" className={styles.actionBtn}>
                    QUERO ESTE RESULTADO <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
