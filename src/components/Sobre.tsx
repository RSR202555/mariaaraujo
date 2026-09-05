"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Briefcase, GraduationCap } from "lucide-react";
import styles from "./Sobre.module.css";

export default function Sobre() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="sobre" className="section">
      <div className={`${styles.container} container`}>
        <div className={styles.grid}>
          {/* Coluna da Imagem */}
          <motion.div
            className={styles.imageColumn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={imageVariants}
          >
            <div className={styles.imageFrame}>
              <Image
                src="/fotocapa.png"
                alt="Maria Araújo Personal Trainer"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={styles.image}
              />
              <div className={styles.imageOverlay} />
            </div>
          </motion.div>

          {/* Coluna de Conteúdo */}
          <motion.div
            className={styles.contentColumn}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span variants={itemVariants} className="section-subtitle">
              Sua Mentora
            </motion.span>
            <motion.h2 variants={itemVariants} className="section-title">
              MARIA <br />
              <span className={styles.italicPink}>ARAÚJO.</span>
            </motion.h2>
            <motion.p variants={itemVariants} className={styles.aboutText}>
              Minha missão é guiar você na construção de um corpo forte, funcional e esteticamente alinhado com a sua melhor versão. Unindo ciência, acompanhamento personalizado e alta performance, meu método é focado em resultados reais que se sustentam a longo prazo.
            </motion.p>

            {/* Especializações e Certificados */}
            <div className={styles.features}>
              <motion.div variants={itemVariants} className={styles.featureItem}>
                <div className={styles.iconWrapper}>
                  <GraduationCap size={20} className={styles.icon} />
                </div>
                <div>
                  <h4 className={styles.featureTitle}>Educação Física</h4>
                  <p className={styles.featureDesc}>Formação sólida em Educação Física.</p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className={styles.featureItem}>
                <div className={styles.iconWrapper}>
                  <Briefcase size={20} className={styles.icon} />
                </div>
                <div>
                  <h4 className={styles.featureTitle}>+5 Anos de Atuação</h4>
                  <p className={styles.featureDesc}>Liderando transformações físicas com mais de 300 vidas impactadas.</p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className={styles.featureItem}>
                <div className={styles.iconWrapper}>
                  <Award size={20} className={styles.icon} />
                </div>
                <div>
                  <h4 className={styles.featureTitle}>Atleta Wellness</h4>
                  <p className={styles.featureDesc}>Atleta de fisiculturismo há 8 anos, com uma trajetória construída dentro do esporte e múltiplos títulos Overall na categoria Wellness.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
