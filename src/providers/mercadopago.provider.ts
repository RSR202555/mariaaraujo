const accessToken = process.env.MP_ACCESS_TOKEN || "APP_USR-1197218699354022-083119-58b4f9880a2559e3015c5cd7b964f40f-415652636";

import * as https from 'https';

export interface CreatePreferenceInput {
  externalReference: string;
  title: string;
  description: string;
  unitPrice: number;
  payer: {
    name: string;
    surname?: string;
    email: string;
    phone?: {
      area_code?: string;
      number?: string;
    };
    identification?: {
      type: string;
      number: string;
    };
  };
}

export class MercadoPagoProvider {
  /**
   * Faz requisição HTTP via módulo nativo 'https' do Node.js
   * para contornar problemas de TLS/Certificado do fetch nativo.
   */
  private static async request(path: string, method: string, payload?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const options: https.RequestOptions = {
        hostname: 'api.mercadopago.com',
        port: 443,
        path: path,
        method: method,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        rejectUnauthorized: false, // Ignora erros de certificado localmente
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (res.statusCode && res.statusCode >= 400) {
              console.error("[MercadoPagoProvider] API Error Body:", parsed);
              reject(new Error(parsed.message || `HTTP ${res.statusCode} - ${JSON.stringify(parsed)}`));
            } else {
              resolve(parsed);
            }
          } catch (e) {
            reject(new Error("Erro ao parsear resposta do Mercado Pago"));
          }
        });
      });

      req.on('error', (e) => {
        reject(e);
      });

      if (payload) {
        req.write(JSON.stringify(payload));
      }
      req.end();
    });
  }

  /**
   * Cria uma Preferência (Checkout Pro)
   * Retorna o URL de inicialização (init_point)
   */
  static async createPreference(input: CreatePreferenceInput) {
    try {
      const body = {
        items: [
          {
            id: input.externalReference,
            title: input.title,
            description: input.description,
            quantity: 1,
            unit_price: input.unitPrice,
            currency_id: 'BRL',
          }
        ],
        payer: {
          name: input.payer.name,
          surname: input.payer.surname,
          email: input.payer.email,
          phone: input.payer.phone,
          identification: input.payer.identification,
        },
        external_reference: input.externalReference,
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/cadastro?status=success`,
          failure: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout?status=failure`,
          pending: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout?status=pending`
        },
        payment_methods: {
          default_payment_method_id: "pix",
        },
        // auto_return: 'approved',
        // notification_url: process.env.MP_WEBHOOK_URL,
      };

      console.log("[MercadoPagoProvider] Enviando body para MP:", JSON.stringify(body, null, 2));

      const data = await this.request('/checkout/preferences', 'POST', body);

      return {
        id: data.id,
        initPoint: data.init_point,
        sandboxInitPoint: data.sandbox_init_point,
      };
    } catch (error) {
      console.error("[MercadoPagoProvider] Erro ao criar preference:", error);
      throw new Error("Erro ao criar pagamento no Mercado Pago");
    }
  }

  static async getPayment(paymentId: string | number) {
    try {
      const data = await this.request(`/v1/payments/${paymentId}`, 'GET');
      return data;
    } catch (error) {
      console.error("[MercadoPagoProvider] Erro ao buscar pagamento:", error);
      throw error;
    }
  }
}
