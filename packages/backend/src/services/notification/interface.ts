import { RequestStatus } from "../interface"

export interface NotificationDetails {
  destination: string[]
  subject: string
  message?: string
  template?: string
  from: string
}

export interface NotificationBalance {
  status: RequestStatus
  balance: number
  bonus: number
  data?: object
}

export interface NotificationResponse<T> {
  data: T
  status: RequestStatus
  requestId: string
}

export interface EmailerConfig {
  host: string
  port: number
  secure: boolean
  user: string
  password: string
}

export enum NotificationType {
  email = "email",
  sms = "sms",
}

export enum NotificationKeyword {
  EMAIL_NOTIFICATION_ERROR = "EMAIL_NOTIFICATION_ERROR",
  NOT_SUPPORTED_ERROR = "NOT_SUPPORTED_ERROR",
}

export interface MNotifyResponse {
  status: string
  code: string
  message: string
  summary: Summary
}

export interface Summary {
  _id: string
  type: string
  total_sent: number
  contacts: number
  total_rejected: number
  numbers_sent: string[]
  credit_used: number
  credit_left: number
}
