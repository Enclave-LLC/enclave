import { BasePayment } from "./BasePayment"
import { CreatePaymentLinkResponse, PaymentPayload, PaymentsResponse, VerifyPaymentResponse } from "./interface"
import { Stripe } from "stripe"

export class StripePayment implements BasePayment {
  stripe: Stripe

  constructor(apiKey: string) {
    this.stripe = new Stripe.Stripe(apiKey, {
      timeout: 6000,
    })
  }

  async createLink(data: PaymentPayload): Promise<CreatePaymentLinkResponse> {
    const price = await this.stripe.prices.create({
      unit_amount: data.amount,
      active: true,
      currency: data.currency,
      product_data: {
        name: data.productName,
      },
    })

    const response = await this.stripe.paymentLinks.create({
      after_completion: {
        type: "redirect",
        redirect: {
          url: data.redirectUrl,
        },
      },
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      metadata: {
        ...data.metaData,
      },
    })

    if (response) {
      return Promise.resolve({
        status: "success",
        message: "Create payment link access",
        data: {
          access_code: response.id,
          authorization_url: response.url,
          reference: response.id,
        },
      })
    } else {
      return Promise.reject({
        status: "failed",
        message: "Failed to create payment link",
      })
    }
  }

  verifyLink(id: string): Promise<VerifyPaymentResponse> {
    throw new Error("Method not implemented."+id)
    // const response = this.stripe.paymentLinks.
  }

  list(): Promise<PaymentsResponse> {
    throw new Error("Method not implemented.")
  }
}
