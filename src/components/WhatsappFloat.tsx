"use client";

import { motion } from "framer-motion";
import { MessageSquareText } from "lucide-react";

export default function WhatsappFloat() {
  return (
    <motion.a
      href="https://wa.me/557192352255?text=Ol%C3%A1%20Maria!%20Gostaria%20de%20saber%20mais%20sobre%20a%20consultoria."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 glow-pink hover:bg-primary/90 active:scale-95 transition-all duration-300 group"
      aria-label="Fale conosco no WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.4 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
    >
      <div className="relative flex items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
        <MessageSquareText className="h-5 w-5 sm:h-6 sm:w-6 relative z-10" />
      </div>
      <span className="hidden sm:inline-block max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 text-xs font-bold uppercase transition-all duration-300 ease-in-out">
        Falar com a Maria
      </span>
    </motion.a>
  );
}
