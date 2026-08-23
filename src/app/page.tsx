import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ComoFunciona from "@/components/ComoFunciona";
import Consultorias from "@/components/Consultorias";
import Sobre from "@/components/Sobre";
import Transformacoes from "@/components/Transformacoes";
import FeedbacksWhatsapp from "@/components/FeedbacksWhatsapp";
import FAQ from "@/components/FAQ";
import CtaFinal from "@/components/CtaFinal";
import Footer from "@/components/Footer";
import WhatsappFloat from "@/components/WhatsappFloat";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ComoFunciona />
        <Consultorias />
        <Sobre />
        <Transformacoes />
        <FeedbacksWhatsapp />
        <FAQ />
        <CtaFinal />
      </main>
      <Footer />
      <WhatsappFloat />
    </>
  );
}
