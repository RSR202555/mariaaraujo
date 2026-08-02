"use client";

import { Search, Command, X } from "lucide-react";
import { useAppShell } from "./AppShellContext";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function SearchInput() {
  const { searchOpen, setSearchOpen } = useAppShell();
  const [query, setQuery] = useState("");

  const quickLinks = [
    { title: "Meu Treino", href: "/meu-treino" },
    { title: "Plano Alimentar", href: "/plano-alimentar" },
    { title: "Minha Evolução", href: "/minha-evolucao" },
    { title: "Minhas Avaliações", href: "/avaliacoes" },
    { title: "Configurações da Conta", href: "/configuracoes" },
  ];

  return (
    <>
      {/* Search Trigger on Desktop/Tablet */}
      <button
        onClick={() => setSearchOpen(true)}
        className="hidden sm:flex items-center justify-between w-48 sm:w-64 h-9 px-3 rounded-xl border border-[#262626] bg-[#141414] text-xs text-muted-foreground hover:border-white/20 hover:text-white transition-all group"
      >
        <div className="flex items-center space-x-2">
          <Search className="h-3.5 w-3.5 group-hover:text-primary transition-colors" />
          <span className="font-medium">Buscar no sistema...</span>
        </div>
        <kbd className="inline-flex items-center space-x-0.5 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[0.65rem] font-bold text-muted-foreground">
          <Command className="h-2.5 w-2.5 mr-0.5" />
          <span>K</span>
        </kbd>
      </button>

      {/* Search Icon Trigger on Mobile */}
      <button
        onClick={() => setSearchOpen(true)}
        className="sm:hidden p-2 rounded-xl border border-[#262626] bg-[#141414] text-muted-foreground hover:text-white transition-all"
        aria-label="Buscar no sistema"
      >
        <Search className="h-4 w-4" />
      </button>

      {/* Global Command Palette Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="bg-[#141414] border border-primary/40 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden text-white"
            >
              <div className="flex items-center px-4 border-b border-[#262626]">
                <Search className="h-4 w-4 text-primary shrink-0 mr-3" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Digite o que deseja buscar..."
                  className="w-full h-12 bg-transparent text-sm text-white placeholder:text-muted-foreground focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1 text-muted-foreground hover:text-white rounded-lg hover:bg-white/5"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-3 max-h-72 overflow-y-auto space-y-1">
                <span className="px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground block">
                  Acesso Rápido
                </span>
                {quickLinks
                  .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
                  .map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-200 hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <span>{item.title}</span>
                      <span className="text-[0.65rem] uppercase text-muted-foreground">Ir para rota</span>
                    </a>
                  ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
