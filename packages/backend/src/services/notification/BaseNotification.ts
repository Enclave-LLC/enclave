import { NotificationBalance, NotificationDetails, NotificationResponse, NotificationType } from "./interface"

export declare interface BaseNotification {
  send<T>(details: NotificationDetails): Promise<NotificationResponse<T>>

  schedule<T>(when: Date, details: NotificationDetails): Promise<NotificationResponse<T>>

  getStatus<T>(id: string): Promise<NotificationResponse<T>>

  checkBalance(type: NotificationType): Promise<NotificationBalance>
}

export class NotificationException implements Error {
  data: object
  name: string
  message: string
  stack?: string | undefined

  constructor(data: NotificationException) {
    this.data = data.data
    this.name = data.name
    this.message = data.message
    this.stack = data.stack
  }
}
