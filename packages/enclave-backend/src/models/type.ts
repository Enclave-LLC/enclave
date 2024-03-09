import { BaseEntity } from "typeorm"

export type EntityType<T> = {
  [P in Exclude<keyof T, keyof BaseEntity>]: T[P]
}
