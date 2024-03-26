import {
  MNotifyResponse,
  NotificationBalance,
  NotificationDetails,
  NotificationResponse,
  NotificationType,
} from "./interface"
import { BaseNotification } from "./BaseNotification"
import Axios, { AxiosInstance } from "axios"

export class MnotifyNotification implements BaseNotification {
  axios: AxiosInstance

  constructor() {
    this.axios = Axios.create({
      baseURL: "https://api.mnotify.com/api/",
      timeout: 3000,
      params: {
        key: "YOUR_API_KEY",
      },
    })
  }

  async send<T>(details: NotificationDetails): Promise<NotificationResponse<T>> {
    try {
      const url = "template"

      let payload = {
        recipient: details.destination,
        sender: details.from,
        message: details.message,
        is_schedule: "false",
        schedule_date: "",
      }

      const response = await this.axios.post(url, payload)
      if (response.status === 200) {
        const data = response.data as MNotifyResponse
        return Promise.resolve({
          requestId: response.data.summary._id,
          data: response.data,
          status: "success",
        })
      } else {
        return Promise.reject({
          requestId: response.data.summary._id,
          data: response.data,
          status: "failed",
        })
      }
    } catch (e: any) {
      /// log internally
      return {
        data: e.response.data,
        requestId: "",
        status: "failed",
      }
    }
  }

  async getStatus<T>(id: string): Promise<NotificationResponse<T>> {
    try {
      const url = `status/${id}`

      const response = await this.axios.get(url)
      if (response.status === 200) {
        const data = response.data as MNotifyResponse
        return Promise.resolve({
          requestId: data.summary._id,
          data: response.data,
          status: "success",
        })
      } else {
        return Promise.reject({
          requestId: response.data.summary._id,
          data: response.data,
          status: "failed",
        })
      }
    } catch (e: any) {
      /// log internally
      return {
        data: e.response.data,
        requestId: "",
        status: "failed",
      }
    }
  }

  schedule(when: Date, details: NotificationDetails): Promise<NotificationResponse<any>> {
    return this.send({ ...details })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async checkBalance(type: NotificationType): Promise<NotificationBalance> {
    try {
      const url = "balance/sms"

      const response = await this.axios.get(url)

      if (response.status === 200) {
        return {
          balance: response.data.balance,
          status: "success",
          bonus: response.data.bonus,
        }
      } else {
        return {
          balance: 0,
          bonus: 0,
          status: "failed",
        }
      }
    } catch (e) {
      return {
        balance: 0,
        bonus: 0,
        status: "failed",
        data: e,
      }
    }
  }
}
