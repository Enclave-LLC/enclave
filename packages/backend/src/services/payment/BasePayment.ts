import { CreatePaymentLinkResponse, PaymentPayload, PaymentsResponse, VerifyPaymentResponse } from "./interface"

export declare interface BasePayment {
  createLink(data: PaymentPayload): Promise<CreatePaymentLinkResponse>

  verifyLink(id: string): Promise<VerifyPaymentResponse>

  list(): Promise<PaymentsResponse>
}
