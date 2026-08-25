// ============================================================
// ASAAS PAYMENT GATEWAY PROVIDER
// Integração REST com a API do Asaas (Produção / Sandbox)
// ============================================================

// --- Input Interfaces ---

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

// --- Response Interfaces ---

export interface AsaasCustomerResponse {
  id: string;
  name: string;
  email: string;
  cpfCnpj: string;
}

export interface AsaasSubscriptionResponse {
  id: string;
  customer: string;
  value: number;
  status: string;
  billingType: string;
  nextDueDate: string;
}

export interface AsaasPaymentResponse {
  id: string;
  customer: string;
  subscription: string | null;
  value: number;
  status: string;
  billingType: string;
  invoiceUrl: string;
  bankSlipUrl: string | null;
  paymentDate: string | null;
}

export interface AsaasPixQrCodeResponse {
  encodedImage: string;       // QR Code em Base64
  payload: string;            // Código PIX Copia e Cola
  expirationDate: string;
}

// --- Provider Class ---

export class AsaasProvider {
  private static apiUrl = process.env.ASAAS_API_URL || 'https://api.asaas.com/api/v3';
  private static apiKey = process.env.ASAAS_API_KEY || '';

  private static getHeaders() {
    return {
      'Content-Type': 'application/json',
      'access_token': this.apiKey,
    };
  }

  /**
   * Faz uma requisição à API do Asaas com tratamento de erro padrão
   */
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.apiUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...(options.headers || {}),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data.errors?.[0]?.description || data.message || 'Erro na requisição ao Asaas';
      throw new Error(`AsaasProvider [${response.status}]: ${errorMsg}`);
    }

    return data as T;
  }

  // ============================================================
  // CUSTOMERS
  // ============================================================

  /**
   * Busca um cliente existente no Asaas pelo CPF/CNPJ.
   * Evita criar clientes duplicados em produção.
   */
  static async findCustomerByCpfCnpj(cpfCnpj: string): Promise<AsaasCustomerResponse | null> {
    try {
      const data = await this.request<{ data: AsaasCustomerResponse[] }>(
        `/customers?cpfCnpj=${cpfCnpj}`
      );
      if (data.data && data.data.length > 0) {
        return data.data[0];
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Cria um cliente no Asaas
   */
  static async createCustomer(input: AsaasCustomerInput): Promise<AsaasCustomerResponse> {
    return this.request<AsaasCustomerResponse>('/customers', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  /**
   * Busca cliente existente por CPF ou cria um novo.
   * Estratégia recomendada para produção — evita duplicatas.
   */
  static async findOrCreateCustomer(input: AsaasCustomerInput): Promise<AsaasCustomerResponse> {
    if (input.cpfCnpj) {
      const existing = await this.findCustomerByCpfCnpj(input.cpfCnpj);
      if (existing) {
        console.log(`[AsaasProvider] Cliente existente encontrado: ${existing.id}`);
        return existing;
      }
    }
    console.log(`[AsaasProvider] Criando novo cliente: ${input.name}`);
    return this.createCustomer(input);
  }

  // ============================================================
  // SUBSCRIPTIONS
  // ============================================================

  /**
   * Cria uma assinatura recorrente no Asaas (PIX, Cartão ou Boleto)
   */
  static async createSubscription(input: AsaasSubscriptionInput): Promise<AsaasSubscriptionResponse> {
    return this.request<AsaasSubscriptionResponse>('/subscriptions', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  /**
   * Lista as cobranças (payments) vinculadas a uma assinatura
   */
  static async getSubscriptionPayments(subscriptionId: string): Promise<AsaasPaymentResponse[]> {
    const data = await this.request<{ data: AsaasPaymentResponse[] }>(
      `/subscriptions/${subscriptionId}/payments`
    );
    return data.data || [];
  }

  // ============================================================
  // PAYMENTS
  // ============================================================

  /**
   * Consulta o status de um pagamento individual no Asaas
   */
  static async getPayment(paymentId: string): Promise<AsaasPaymentResponse> {
    return this.request<AsaasPaymentResponse>(`/payments/${paymentId}`);
  }

  /**
   * Busca o QR Code PIX de um pagamento pendente.
   * Só funciona para cobranças com billingType = PIX e status = PENDING.
   */
  static async getPixQrCode(paymentId: string): Promise<AsaasPixQrCodeResponse | null> {
    try {
      return await this.request<AsaasPixQrCodeResponse>(
        `/payments/${paymentId}/pixQrCode`
      );
    } catch (error) {
      console.warn(`[AsaasProvider] Não foi possível obter QR Code PIX para ${paymentId}:`, error);
      return null;
    }
  }

  // ============================================================
  // WEBHOOKS & STATUS
  // ============================================================

  /**
   * Valida o token de segurança nos Webhooks do Asaas
   */
  static validateWebhookToken(reqToken: string | null): boolean {
    const expectedToken = process.env.ASAAS_WEBHOOK_ACCESS_TOKEN;
    if (!expectedToken) return true; // Em dev se não configurado
    return reqToken === expectedToken;
  }

  /**
   * Retorna o status de configuração da integração com o ASAAS
   */
  static getStatus() {
    return {
      configured: Boolean(this.apiKey),
      environment: this.apiUrl.includes('sandbox') ? 'sandbox' : 'production',
      apiUrl: this.apiUrl,
    };
  }
}
