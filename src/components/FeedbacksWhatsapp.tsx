"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import styles from "./FeedbacksWhatsapp.module.css";

type FeedbackPrint = {
  id: number;
  alt: string;
  src: string;
};

export default function FeedbacksWhatsapp() {
  const prints: FeedbackPrint[] = [
    {
      id: 1,
      alt: "Feedback Whatsapp 1",
      src: "/feedbacks/4c0889af-53ab-491e-a000-3dedd1868f8b.jpg",
    },
    {
      id: 2,
      alt: "Feedback Whatsapp 2",
      src: "/feedbacks/5a0e42e0-8abf-4215-804d-6c22ebd5306c.jpg",
    },
    {
      id: 3,
      alt: "Feedback Whatsapp 3",
      src: "/feedbacks/89314dca-cb52-403f-ba84-5daa2f9d001c.jpg",
    },
    {
      id: 4,
      alt: "Feedback Whatsapp 4",
      src: "/feedbacks/97c1c275-3b37-440e-8207-5864d7bf86cc.jpg",
    },
    {
      id: 5,
      alt: "Feedback Whatsapp 5",
      src: "/feedbacks/b9224769-6362-455e-8b17-96566f61f1c1.jpg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(2); // Start with the middle one (index 2) active
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === prints.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? prints.length - 1 : prev - 1));
  };

  return (
    <section id="feedbacks-whatsapp" className={styles.section}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className="section-subtitle">Resultados Comprovados</span>
          <h2 className="section-title">
            FEEDBACKS DE <br />
            <span className={styles.italicPink}>ALUNOS.</span>
          </h2>
          <p className="section-desc">
            Conversas reais que comprovam o suporte individualizado diário e a evolução constante dos nossos alunos.
          </p>
        </div>

        {/* Carousel / Slider Container */}
        <div className={styles.carouselContainer}>
          <div className={styles.slider}>
            {prints.map((print, index) => {
              // Determine card classification
              let cardClass = styles.slideCard;
              if (index === activeIndex) {
                cardClass += ` ${styles.activeCard}`;
              } else if (
                index === activeIndex - 1 ||
                (activeIndex === 0 && index === prints.length - 1)
              ) {
                cardClass += ` ${styles.leftCard}`;
              } else if (
                index === activeIndex + 1 ||
                (activeIndex === prints.length - 1 && index === 0)
              ) {
                cardClass += ` ${styles.rightCard}`;
              } else {
                cardClass += ` ${styles.hiddenCard}`;
              }

              return (
                <div
                  key={print.id}
                  className={cardClass}
                  onClick={() => {
                    if (index === activeIndex) {
                      setSelectedImage(print.src);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                >
                  <div className={styles.phoneMockup}>
                    {/* Physical Side Buttons */}
                    <div className={styles.volumeButtons} />
                    <div className={styles.powerButton} />
                    
                    {/* Sleek Camera Notch (Dynamic Island) */}
                    <div className={styles.phoneHeader}>
                      <div className={styles.dynamicIsland}>
                        <div className={styles.cameraLens} />
                        <div className={styles.indicatorDot} />
                      </div>
                    </div>

                    <div className={styles.phoneScreen}>
                      <Image
                        src={print.src}
                        alt={print.alt}
                        fill
                        unoptimized
                        className={styles.printImage}
                        priority={index === activeIndex}
                      />
                      
                      {/* Diagonal Glass Reflection */}
                      <div className={styles.phoneReflection} />
                      
                      {/* Zoom Indicator Icon Overlay */}
                      <div className={styles.zoomOverlay}>
                        <ZoomIn size={24} className={styles.zoomIcon} />
                        <span>Clique para Ampliar</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Slider navigation controls */}
          <div className={styles.controls}>
            <button 
              className={styles.controlBtn} 
              onClick={prevSlide}
              aria-label="Feedback anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <div className={styles.dots}>
              {prints.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ""}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Ir para feedback ${index + 1}`}
                />
              ))}
            </div>
            <button 
              className={styles.controlBtn} 
              onClick={nextSlide}
              aria-label="Próximo feedback"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox / Zoom Overlay */}
      {selectedImage && (
        <div 
          className={styles.lightbox} 
          onClick={() => setSelectedImage(null)}
          aria-label="Fechar ampliação"
        >
          <div className={styles.lightboxContent}>
            <div className={styles.lightboxHeader}>
              <span>Visualizando Feedback</span>
              <button className={styles.closeBtn} onClick={() => setSelectedImage(null)}>
                Fechar [x]
              </button>
            </div>
            <div className={styles.lightboxImageWrapper}>
              <Image
                src={selectedImage}
                alt="Feedback do WhatsApp Ampliado"
                width={360}
                height={720}
                unoptimized
                className={styles.lightboxImage}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
