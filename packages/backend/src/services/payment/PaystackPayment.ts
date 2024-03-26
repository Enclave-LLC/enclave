import { BasePayment } from "./BasePayment"
import { CreatePaymentLinkResponse, PaymentPayload, PaymentsResponse, VerifyPaymentResponse } from "./interface"
import axios, { AxiosError } from "axios"
import { v4 } from "uuid"

export class PaystackPayment implements BasePayment {
  axiosInstance = axios.create({
    baseURL: "https://api.paystack.co/",
    headers: {
      Authorization: "Bearer {SECRET_KEY}",
      "Content-Type": "application/json",
    },
  })

  async createLink(payload: PaymentPayload): Promise<CreatePaymentLinkResponse> {
    try {
      const ref = payload.reference ?? v4()
      const response = await this.axiosInstance.post("transaction/initialize", {
        email: payload.email,
        amount: payload.amount,
        currency: payload.currency,
        reference: ref,
        callback_url: payload.callback_url,
        meta_data: payload.metaData,
      })

      if (response.status === 200) {
        const data = response.data as CreatePaymentLinkResponse

        return Promise.resolve({
          message: "Payment page created ",
          status: "success",
          data: {
            access_code: data.data!.access_code,
            authorization_url: data.data!.authorization_url,
            reference: data.data!.reference,
          },
        })
      } else {
        return Promise.reject({
          message: "Failed to create payment link",
          status: "failed",
          data: null,
        })
      }
    } catch (e) {
      throw new Error((e as AxiosError)["response"]?.data?.toString())
    }
  }

  async verifyLink(id: string): Promise<VerifyPaymentResponse> {
    try {
      const url = "transaction/verify/" + id

      const response = await this.axiosInstance.get(url)

      if (response.status === 200) {
        const data = response.data
        return Promise.resolve({
          status: "success",
          data: data,
          message: "Verification fetched successfully",
        })
      } else {
        return Promise.reject({
          status: "failed",
          data: null,
          message: "Failed to receive ",
        })
      }
    } catch (e) {
      throw new Error("Failed to fetch ")
    }
  }

  async list(): Promise<PaymentsResponse> {
    try {
      const url = "transaction"
      const response = await this.axiosInstance.get(url)

      if (response.status == 200) {
        return Promise.resolve({
          status: "success",
          message: "success",
          data: response.data.data,
        })
      } else {
        return Promise.reject({
          status: "failed",
          message: "failed",
          data: null,
        })
      }
    } catch (e) {
      throw new Error("Method not implemented.")
    }
  }
}
