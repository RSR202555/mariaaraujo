export interface AsaasCustomerInput {
  name: string;
  email: string;
  cpfCnpj?: string;
  phone?: string;
  mobilePhone?: string;
}

export interface AsaasSubscriptionInput {
  customer: string; // Asaas customer ID (cus_xxx)
  billingType: 'PIX' | 'CREDIT_CARD' | 'BOLETO';
  value: number;
  nextDueDate: string; // YYYY-MM-DD
  cycle: 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
  description?: string;
  creditCard?: {
    holderName: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
  };
  creditCardHolderInfo?: {
    name: string;
    email: string;
    cpfCnpj: string;
    phone: string;
  };
}

export class AsaasProvider {
  private static apiUrl = process.env.ASAAS_API_URL || 'https://sandbox.asaas.com/api/v3';
  private static apiKey = process.env.ASAAS_API_KEY || '';

  private static getHeaders() {
    return {
      'Content-Type': 'application/json',
      'access_token': this.apiKey,
    };
  }

  /**
   * Cria um cliente no Asaas
   */
  static async createCustomer(input: AsaasCustomerInput) {
    const response = await fetch(`${this.apiUrl}/customers`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(input),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`AsaasProvider.createCustomer: ${data.errors?.[0]?.description || 'Erro ao criar cliente'}`);
    }

    return {
      id: data.id as string,
      name: data.name as string,
      email: data.email as string,
    };
  }

  /**
   * Cria uma assinatura recorrente no Asaas (PIX, Cartão ou Boleto)
   */
  static async createSubscription(input: AsaasSubscriptionInput) {
    const response = await fetch(`${this.apiUrl}/subscriptions`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(input),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`AsaasProvider.createSubscription: ${data.errors?.[0]?.description || 'Erro ao criar assinatura no Asaas'}`);
    }

    return {
      id: data.id as string,
      customer: data.customer as string,
      value: data.value as number,
      status: data.status as string,
      billingType: data.billingType as string,
      nextDueDate: data.nextDueDate as string,
    };
  }

  /**
   * Consulta o status de um pagamento individual no Asaas
   */
  static async getPayment(paymentId: string) {
    const response = await fetch(`${this.apiUrl}/payments/${paymentId}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`AsaasProvider.getPayment: ${data.errors?.[0]?.description || 'Erro ao consultar pagamento no Asaas'}`);
    }

    return {
      id: data.id as string,
      customer: data.customer as string,
      subscription: data.subscription as string,
      value: data.value as number,
      status: data.status as string,
      billingType: data.billingType as string,
      invoiceUrl: data.invoiceUrl as string,
      paymentDate: data.paymentDate as string,
    };
  }

  /**
   * Valida o token de segurança nos Webhooks do Asaas
   */
  static validateWebhookToken(reqToken: string | null): boolean {
    const expectedToken = process.env.ASAAS_WEBHOOK_ACCESS_TOKEN;
    if (!expectedToken) return true; // Em dev se não configurado
    return reqToken === expectedToken;
  }
}
