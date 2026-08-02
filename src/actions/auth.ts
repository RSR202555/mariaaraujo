'use server';

import { createServerSupabaseClient } from '@/database/server';
import { loginSchema, registerSchema, LoginInput, RegisterInput } from '@/schemas/auth.schema';
import { EmailService } from '@/services/email.service';

export async function loginAction(formData: LoginInput) {
  const validation = loginSchema.safeParse(formData);
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message };
  }

  const { email, password } = validation.data;
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, user: data.user };
}

export async function registerAction(formData: RegisterInput) {
  const validation = registerSchema.safeParse(formData);
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message };
  }

  const { fullName, email, phone, password } = validation.data;
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone,
        role: 'ALUNO',
      },
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  // Disparo assíncrono de e-mail de boas-vindas
  try {
    await EmailService.sendWelcomeEmail(email, fullName);
  } catch (emailErr) {
    console.error('Erro ao enviar e-mail de boas-vindas:', emailErr);
  }

  return { success: true, user: data.user };
}

export async function logoutAction() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  return { success: true };
}
