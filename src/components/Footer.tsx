"use client";

import { Instagram, Send } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/90 border-t border-white/10 pt-16 pb-12 text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="text-xl font-extrabold text-foreground tracking-wider inline-block">
              MARIA ARAÚJO<span className="text-primary font-black">.</span>
            </a>
            <p className="text-sm text-muted-foreground max-w-sm">
              Treinamento físico estratégico, consultoria de alta performance e protocolos personalizados para resultados estéticos reais.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#resultados" className="hover:text-primary transition-colors">Resultados</a></li>
              <li><a href="#metodologia" className="hover:text-primary transition-colors">Metodologia</a></li>
              <li><a href="#consultorias" className="hover:text-primary transition-colors">Consultorias</a></li>
              <li><a href="#sobre" className="hover:text-primary transition-colors">Sobre Maria</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Social / Contact */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Contato Direct</h4>
            <div className="flex flex-col space-y-2 text-sm">
              <a
                href="https://instagram.com/mariaaraujopersonal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 text-primary" />
                <span>@mariaaraujopersonal</span>
              </a>
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-primary transition-colors"
                aria-label="WhatsApp"
              >
                <Send className="h-4 w-4 text-primary" />
                <span>WhatsApp Oficial</span>
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs space-y-4 sm:space-y-0">
          <p>© {currentYear} Maria Araújo Personal. Todos os direitos reservados.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
