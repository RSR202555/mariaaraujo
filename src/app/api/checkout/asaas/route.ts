import { NextRequest, NextResponse } from "next/server";
import { checkoutSchema } from "@/schemas/checkoutSchema";
import { AsaasProvider } from "@/providers/asaas.provider";

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

    const { fullName, email, cpfCnpj, phone, planId, billingType } = validation.data;
    const plan = planDetails[planId] || planDetails.mensal;

    // Data de vencimento inicial (hoje no formato YYYY-MM-DD)
    const today = new Date();
    const nextDueDate = today.toISOString().split("T")[0];

    const isApiKeyConfigured = Boolean(process.env.ASAAS_API_KEY);

    if (!isApiKeyConfigured) {
      // Fallback gracioso para ambiente de desenvolvimento/simulação
      console.log(`[Asaas Mock Checkout] Assinatura criada para ${fullName} (${email}) - Plano ${plan.title} - ${billingType}`);

      const mockPaymentId = `pay_mock_${Date.now()}`;
      const mockSubId = `sub_mock_${Date.now()}`;

      return NextResponse.json({
        success: true,
        mode: "simulation",
        subscriptionId: mockSubId,
        customerId: `cus_mock_${Date.now()}`,
        paymentId: mockPaymentId,
        billingType,
        value: plan.value,
        planTitle: plan.title,
        invoiceUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/cadastro?plan=${planId}&payment_id=${mockPaymentId}`,
        pixQrCode: "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-4266141740005204000053039865405200.005802BR5920Maria Araujo Personal6009Sao Paulo62070503***6304E2CA",
      });
    }

    // 1. Criar ou buscar cliente no Asaas
    const customer = await AsaasProvider.createCustomer({
      name: fullName,
      email,
      cpfCnpj,
      mobilePhone: phone,
    });

    // 2. Criar Assinatura no Asaas
    const subscription = await AsaasProvider.createSubscription({
      customer: customer.id,
      billingType,
      value: plan.value,
      nextDueDate,
      cycle: plan.cycle,
      description: `Assinatura ${plan.title} - Maria Araújo Personal`,
    });

    return NextResponse.json({
      success: true,
      mode: "live",
      subscriptionId: subscription.id,
      customerId: subscription.customer,
      billingType: subscription.billingType,
      value: subscription.value,
      planTitle: plan.title,
      nextDueDate: subscription.nextDueDate,
    });
  } catch (error: any) {
    console.error("[Asaas Checkout Route Error]:", error);
    return NextResponse.json(
      { error: "Erro ao processar assinatura no Asaas", details: error.message },
      { status: 500 }
    );
  }
}
