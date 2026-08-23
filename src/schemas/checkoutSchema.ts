import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z
    .string()
    .email("E-mail inválido"),
  cpfCnpj: z
    .string()
    .min(11, "CPF/CNPJ deve ter pelo menos 11 dígitos")
    .max(18, "CPF/CNPJ inválido"),
  phone: z
    .string()
    .min(10, "Telefone inválido (mínimo 10 dígitos)"),
  planId: z.enum(["mensal", "trimestral", "semestral"]),
  billingType: z.enum(["PIX", "CREDIT_CARD", "BOLETO"]),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
