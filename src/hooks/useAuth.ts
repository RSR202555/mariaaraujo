"use client";

import { useState, useEffect } from "react";
import { AuthService } from "@/services/authService";
import { AuthUser, AuthState } from "@/types/auth";
import {
  LoginSchemaType,
  RegisterSchemaType,
  ForgotPasswordSchemaType,
  ResetPasswordSchemaType,
} from "@/schemas/authSchema";

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function loadSession() {
      try {
        const user = await AuthService.getCurrentUser();
        setState((prev) => ({
          ...prev,
          user,
          isLoading: false,
        }));
      } catch {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    }

    loadSession();
  }, []);

  const login = async (credentials: LoginSchemaType) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const result = await AuthService.login(credentials);

    if (!result.success) {
      setState((prev) => ({ ...prev, isLoading: false, error: result.error || "Erro ao entrar." }));
      return result;
    }

    setState((prev) => ({ ...prev, user: result.data || null, isLoading: false, error: null }));
    return result;
  };

  const register = async (credentials: RegisterSchemaType) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const result = await AuthService.register(credentials);

    if (!result.success) {
      setState((prev) => ({ ...prev, isLoading: false, error: result.error || "Erro ao cadastrar." }));
      return result;
    }

    setState((prev) => ({ ...prev, isLoading: false, error: null }));
    return result;
  };

  const forgotPassword = async (data: ForgotPasswordSchemaType) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const result = await AuthService.forgotPassword(data);

    if (!result.success) {
      setState((prev) => ({ ...prev, isLoading: false, error: result.error || "Erro ao solicitar recuperação." }));
      return result;
    }

    setState((prev) => ({ ...prev, isLoading: false, error: null }));
    return result;
  };

  const resetPassword = async (data: ResetPasswordSchemaType) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const result = await AuthService.resetPassword(data);

    if (!result.success) {
      setState((prev) => ({ ...prev, isLoading: false, error: result.error || "Erro ao redefinir senha." }));
      return result;
    }

    setState((prev) => ({ ...prev, isLoading: false, error: null }));
    return result;
  };

  const logout = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    await AuthService.logout();
    setState({ user: null, session: null, isLoading: false, error: null });
  };

  const clearError = () => setState((prev) => ({ ...prev, error: null }));

  return {
    user: state.user,
    isLoading: state.isLoading,
    error: state.error,
    login,
    register,
    forgotPassword,
    resetPassword,
    logout,
    clearError,
  };
}
