"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, ShieldAlert, Eye, EyeOff } from "lucide-react";
import styles from "./page.module.css";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock authentication loading
    setTimeout(() => {
      setIsLoading(false);
      alert("Acesso simulação: painel do administrador.");
    }, 1500);
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
              PAINEL DO <br />
              <span className={styles.italicPink}>ADMIN.</span>
            </h1>
            <p className={styles.subtitle}>
              Acesso exclusivo para gerenciamento de alunos, treinos e protocolos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Username/Email Field */}
            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.label}>
                Identificador / Usuário
              </label>
              <div className={styles.inputWrapper}>
                <ShieldAlert size={18} className={styles.inputIcon} />
                <input
                  type="text"
                  id="username"
                  required
                  placeholder="admin.maria"
                  className={styles.input}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className={styles.inputGroup}>
              <div className={styles.passwordLabelRow}>
                <label htmlFor="password" className={styles.label}>
                  Senha de Segurança
                </label>
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
              {isLoading ? "AUTENTICANDO..." : "AUTENTICAR NO PAINEL"}
            </button>
          </form>

          {/* Footer info */}
          <div className={styles.cardFooter}>
            <p className={styles.secureText}>
              🔒 Conexão criptografada segura de administrador.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
