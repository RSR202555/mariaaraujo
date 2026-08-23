import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maria Araújo Personal | Consultoria Fitness Premium",
  description: "Alcance o seu corpo estratégico. Treinos personalizados com base científica, protocolos alimentares integrados e acompanhamento premium individualizado.",
  keywords: ["personal trainer", "consultoria fitness", "treino online", "dieta personalizada", "maria araujo personal", "emagrecimento", "hipertrofia"],
  authors: [{ name: "Maria Araújo" }],
  openGraph: {
    title: "Maria Araújo Personal | Consultoria Fitness Premium",
    description: "Alcance o seu corpo estratégico. Treinos personalizados com base científica, protocolos alimentares integrados e acompanhamento premium individualizado.",
    type: "website",
    locale: "pt_BR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${sora.variable} ${inter.variable}`}>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
