import { RequestStatus } from "../interface"

export interface PaymentPayload {
  redirectUrl: string
  currency: string
  amount: number
  productName: string
  email: string
  phoneNumber: string
  reference?: string
  callback_url?: string
  metaData: object
}

export interface CreatePaymentLinkResponse {
  status: RequestStatus
  message: string
  data: {
    authorization_url: string
    access_code: string
    reference: string
  } | null
}

export interface VerifyPaymentResponse {
  status: RequestStatus
  message: string
  data: object
}
export interface PaymentsResponse {
  status: RequestStatus
  message: string
  data: object
}
