import { BaseNotification, NotificationException } from "./BaseNotification"
import {
  EmailerConfig,
  NotificationBalance,
  NotificationDetails,
  NotificationKeyword,
  NotificationResponse,
  NotificationType,
} from "./interface"
import { createTransport, Transporter } from "nodemailer"
import { v4 } from "uuid"

export class EmailNotification implements BaseNotification {
  transporter: Transporter

  constructor(config: EmailerConfig) {
    this.transporter = createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.password,
      },
    })
  }

  async send<T>(details: NotificationDetails): Promise<NotificationResponse<T>> {
    try {
      const uuid = v4()
      const response = await this.transporter.sendMail({
        from: details.from, // sender address
        to: details.destination.join(","), // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
        messageId: uuid,
      })

      if (response.messageId) {
        return Promise.resolve({
          data: response,
          status: "success",
          requestId: response.messageId,
        })
      } else {
        return Promise.resolve({
          data: response,
          status: "failed",
          requestId: response.messageId,
        })
      }
    } catch (error) {
      throw new NotificationException({
        message: "Failed to send email notification",
        name: NotificationKeyword.EMAIL_NOTIFICATION_ERROR,
        data: {},
      })
    }
  }

  getStatus<T>(): Promise<NotificationResponse<T>> {
    throw new Error("Method not implemented.")
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  schedule<T>(_: Date, __: NotificationDetails): Promise<NotificationResponse<T>> {
    throw new Error("Method not implemented.")
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async checkBalance(_: NotificationType): Promise<NotificationBalance> {
    throw Error(NotificationKeyword.NOT_SUPPORTED_ERROR)
  }
}
