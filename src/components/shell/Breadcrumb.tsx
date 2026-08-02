"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const routeNames: Record<string, string> = {
  dashboard: "Dashboard",
  "meu-treino": "Meu Treino",
  "plano-alimentar": "Plano Alimentar",
  "minha-evolucao": "Minha Evolução",
  fotos: "Fotos",
  avaliacoes: "Avaliações",
  mensagens: "Mensagens",
  perfil: "Perfil",
  configuracoes: "Configurações",
};

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center space-x-1.5 text-xs text-muted-foreground" aria-label="Breadcrumb">
      <Link
        href="/dashboard"
        className="flex items-center space-x-1 hover:text-white transition-colors"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>

      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;
        const name = routeNames[segment] || segment;

        return (
          <div key={href} className="flex items-center space-x-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-[#262626]" />
            {isLast ? (
              <span className="font-bold text-white uppercase tracking-wider">{name}</span>
            ) : (
              <Link href={href} className="hover:text-white transition-colors font-medium">
                {name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
