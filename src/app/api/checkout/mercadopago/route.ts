import { NextRequest, NextResponse } from "next/server";
import { checkoutSchema } from "@/schemas/checkoutSchema";
import { MercadoPagoProvider } from "@/providers/mercadopago.provider";

const planDetails: Record<string, { value: number; cycle: "MONTHLY" | "QUARTERLY" | "YEARLY"; title: string }> = {
  mensal: { value: 200, cycle: "MONTHLY", title: "Consultoria Mensal" },
  trimestral: { value: 500, cycle: "QUARTERLY", title: "Consultoria Trimestral VIP" },
  semestral: { value: 900, cycle: "YEARLY", title: "Consultoria Semestral VIP" },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = checkoutSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Dados de checkout inválidos", details: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { fullName, email, cpfCnpj, phone, planId } = validation.data;
    const plan = planDetails[planId] || planDetails.mensal;

    const externalReference = `mra_${planId}_${Date.now()}`;

    // Tentar separar DDD e número do telefone de forma simplificada
    const cleanPhone = phone.replace(/\D/g, '');
    let areaCode = '';
    let phoneNumber = cleanPhone;
    if (cleanPhone.length >= 10) {
      areaCode = cleanPhone.substring(0, 2);
      phoneNumber = cleanPhone.substring(2);
    }

    // Identificação (CPF ou CNPJ)
    const cleanCpfCnpj = cpfCnpj.replace(/\D/g, '');
    const docType = cleanCpfCnpj.length > 11 ? 'CNPJ' : 'CPF';

    // Cria Preference no Mercado Pago
    const preference = await MercadoPagoProvider.createPreference({
      externalReference,
      title: `Assinatura ${plan.title} - Maria Araújo Personal`,
      description: `Pagamento único para o plano ${plan.title}`,
      unitPrice: plan.value,
      payer: {
        name: fullName,
        email: email,
        phone: {
          area_code: areaCode,
          number: phoneNumber
        },
        identification: {
          type: docType,
          number: cleanCpfCnpj
        }
      }
    });

    return NextResponse.json({
      success: true,
      mode: "live",
      paymentId: preference.id, // O ID da preference atua como nossa referência principal antes da criação do pagamento
      value: plan.value,
      planTitle: plan.title,
      invoiceUrl: preference.initPoint, // Mantemos o nome da propriedade 'invoiceUrl' para facilitar compatibilidade no frontend
    });
  } catch (error: any) {
    console.error("[MercadoPago Checkout Route Error]:", error);
    return NextResponse.json(
      { error: "Erro ao processar pagamento no Mercado Pago", details: error.message },
      { status: 500 }
    );
  }
}
