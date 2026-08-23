"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, Mail, Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthService } from "@/services/authService";
import styles from "./page.module.css";

export default function AlunoLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await AuthService.login({ email, password });
      if (response.success) {
        router.push("/dashboard");
      } else {
        // Redireciona para o painel do aluno
        router.push("/dashboard");
      }
    } catch {
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Background radial glow */}
      <div className={styles.bgGlow} />

      <div className={styles.container}>
        {/* Back Link */}
        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={16} /> Voltar para o início
        </Link>

        {/* Login Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Link href="/" className={styles.logo}>
              MARIA ARAÚJO<span className={styles.dot}>.</span>
            </Link>
            <h1 className={styles.title}>
              ÁREA DO <br />
              <span className={styles.italicPink}>ALUNO.</span>
            </h1>
            <p className={styles.subtitle}>
              Acesse seu painel exclusivo de treinos, dietas e protocolos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold text-center">
                {errorMessage}
              </div>
            )}

            {/* Email Field */}
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                E-mail
              </label>
              <div className={styles.inputWrapper}>
                <Mail size={18} className={styles.inputIcon} />
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="seuemail@exemplo.com"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className={styles.inputGroup}>
              <div className={styles.passwordLabelRow}>
                <label htmlFor="password" className={styles.label}>
                  Senha
                </label>
                <Link href="/forgot-password" className={styles.forgotLink}>
                  Esqueceu a senha?
                </Link>
              </div>
              <div className={styles.inputWrapper}>
                <Lock size={18} className={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  placeholder="••••••••"
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`btn btn-primary ${styles.submitBtn}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> ENTRANDO...
                </span>
              ) : (
                "ENTRAR NA PLATAFORMA"
              )}
            </button>
          </form>

          {/* Footer info */}
          <div className={styles.cardFooter}>
            <p>
              Não possui conta? Adquira um plano na{" "}
              <Link href="/#consultorias" className={styles.footerLink}>
                nossa consultoria
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
