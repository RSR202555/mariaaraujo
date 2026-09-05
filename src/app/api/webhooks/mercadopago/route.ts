import { NextRequest, NextResponse } from "next/server";
import { PaymentService } from "@/services/payment.service";
import { MercadoPagoProvider } from "@/providers/mercadopago.provider";

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const action = url.searchParams.get('action') || url.searchParams.get('topic');
    const type = url.searchParams.get('type');
    
    // O MP pode mandar no body ou na URL dependendo se é Webhook ou IPN
    const body = await req.json().catch(() => ({}));

    const eventAction = body.action || action;
    const eventType = body.type || type;

    // Se for notificação de pagamento
    if (eventAction === "payment.updated" || eventAction === "payment.created" || eventType === "payment") {
      const paymentId = body.data?.id || url.searchParams.get('data.id') || url.searchParams.get('id');
      
      if (!paymentId) {
        return NextResponse.json({ success: true, message: "No payment ID" });
      }
      
      const payment = await MercadoPagoProvider.getPayment(paymentId);
      
      // Processa internamente com o service
      await PaymentService.handleMercadoPagoWebhook(payment);
    }

    // Mercado Pago exige retorno HTTP 200 OK imediato
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[MercadoPago Webhook Error]:", error);
    // Retornamos 200 de qualquer forma para o MP parar de retentar (ou 500 se quisermos que retente)
    return NextResponse.json({ error: "Erro interno", details: error.message }, { status: 500 });
  }
}
