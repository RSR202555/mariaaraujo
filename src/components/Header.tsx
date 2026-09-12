"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, MessageSquareText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Resultados", href: "/#transformacoes" },
    { name: "Metodologia", href: "/#metodologia" },
    { name: "Consultorias", href: "/#consultorias" },
    { name: "Sobre", href: "/#sobre" },
    { name: "FAQ", href: "/#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#090909]/90 backdrop-blur-md border-b border-[#262626] py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center"
          aria-label="Maria Araújo Personal Home"
        >
          MARIA ARAÚJO<span className="text-primary font-black">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:block" aria-label="Navegação Principal">
          <ul className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-xs font-bold uppercase tracking-widest text-[#B8B8B8] hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center space-x-3">
          <Link
            href="/aluno"
            className="hidden sm:inline-flex text-xs font-bold uppercase tracking-wider text-white px-5 py-2.5 rounded-full bg-white/[0.03] border border-[#262626] hover:border-primary hover:bg-primary/10 transition-all duration-300"
          >
            ÁREA DO ALUNO
          </Link>

          {/* Mobile Menu Toggle Button (44px Minimum Touch Target) */}
          <button
            className="md:hidden text-white p-2.5 rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-transform focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Touch Optimized) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed top-[60px] left-0 right-0 bg-[#090909]/95 backdrop-blur-2xl border-b border-[#262626] px-5 py-6 space-y-4 shadow-2xl z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col space-y-3" aria-label="Navegação Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-bold uppercase tracking-wider text-gray-200 hover:text-primary py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
              <div className="pt-4 border-t border-[#262626] space-y-2.5">
                <Link
                  href="/aluno"
                  className="block text-center text-xs font-black uppercase tracking-wider text-white py-3.5 rounded-full bg-primary shadow-lg shadow-primary/30"
                  onClick={() => setIsOpen(false)}
                >
                  ÁREA DO ALUNO
                </Link>
                <a
                  href="https://wa.me/557192352255?text=Ol%C3%A1%20Maria!%20Gostaria%20de%20saber%20mais%20sobre%20a%20consultoria."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-wider text-gray-300 py-3 rounded-full bg-white/5 border border-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  <MessageSquareText className="h-4 w-4 text-primary" />
                  <span>Falar no WhatsApp</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
