import { AppShell } from "@/components/shell/AppShell";

export const metadata = {
  title: "Plataforma | Maria Araújo Personal",
  description: "Plataforma exclusiva de acompanhamento de alunos Maria Araújo Personal.",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
