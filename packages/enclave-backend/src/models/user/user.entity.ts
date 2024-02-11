import { AfterLoad, BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { EntityType } from "../type"
import { Vendor } from "./vendor.entity"

export type UserData = Pick<User, "firstname" | "lastname" | "id">

export type User = EntityType<UserEntity>

@Entity()
export class UserEntity extends BaseEntity {
  constructor(init?: Partial<UserEntity>) {
    super()
    if (init) {
      for (const [key, value] of Object.entries(init)) {
        this[key] = value
      }
    }
  }
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  firstname: string

  @Column()
  lastname: string

  @Column()
  email: string

  @Column()
  password: string

  get isVendor() {
    return !!this.vendor
  }

  @OneToOne(() => Vendor, (vendor) => vendor.user, { cascade: true })
  @JoinColumn()
  vendor?: Vendor

  @AfterLoad()
  onLoad() {
    delete this.password
  }

  getUserData() {
    return {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      isVendor: this.isVendor
    }
  }

  setUserData(data: Omit<UserData, "id">) {
    for (const [key, value] of Object.entries(data)) {
      this[key] = value
    }
  }
}
