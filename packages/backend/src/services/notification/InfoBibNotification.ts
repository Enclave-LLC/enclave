import { NotificationBalance, NotificationDetails, NotificationResponse, NotificationType } from "./interface"
import { BaseNotification } from "./BaseNotification"
import axios from "axios"
import { v4 } from "uuid"

export class InfoBibNotification implements BaseNotification {
  async send<T>(details: NotificationDetails): Promise<NotificationResponse<T>> {
    try {
      const url = "/sms/2/text/advanced"
      const payload = {
        bulkId: v4(),
        messages: [
          {
            destinations: details.destination.map((x) => {
              return {
                to: x,
              }
            }),
            from: details.from,
            text: details.message,
          },
        ],
        includeSmsCountInResponse: true,
        // sendingSpeedLimit: {
        //   amount:
        // }
      }

      const response = await axios.post(url, payload)
      if (response.status === 200) {
        return Promise.resolve({
          requestId: response.data.messageId,
          data: response.data,
          status: "success",
        })
      } else {
        return Promise.reject({
          requestId: response.data.messageId,
          data: response.data,
          status: "failed",
        })
      }
    } catch (e) {
      /// log internally
      return {
        data: {} as T,
        requestId: "",
        status: "failed",
      }
    }
  }
  async getStatus<T>(id: string): Promise<NotificationResponse<T>> {
    try {
      const url = "/sms/1/bulks/status"

      const response = await axios.get(url, {
        params: {
          bulkId: id,
        },
      })
      if (response.status === 200) {
        return Promise.resolve({
          requestId: response.data.messageId,
          data: response.data,
          status: "success",
        })
      } else {
        return Promise.reject({
          requestId: response.data.messageId,
          data: response.data,
          status: "failed",
        })
      }
    } catch (e) {
      /// log internally
      return {
        data: {  }as T,
        requestId: "",
        status: "failed",
      }
    }
  }

  schedule<T>(when: Date, details: NotificationDetails): Promise<NotificationResponse<T>> {
    return this.send({ ...details })
  }

  checkBalance(type: NotificationType): Promise<NotificationBalance> {
    console.log(type);
    throw new Error("Method not implemented.")
  }
}
