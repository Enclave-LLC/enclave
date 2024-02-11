import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

export type UserData = Pick<User, "firstname" | "lastname" | "isVendor">

@Entity()
export class User extends BaseEntity {
  constructor(init?: Partial<User>) {
    super()
    if (init) {
      for (const [key, value] of Object.entries(init)) {
        this[key] = value
      }
    }
  }
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstname: string

  @Column()
  lastname: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ default: false })
  isVendor: boolean

  getUserData() {
    return {
      firstname: this.firstname,
      lastname: this.lastname,
      isVendor: this.isVendor
    }
  }

  setUserData(data: UserData) {
    for (const [key, value] of Object.entries(data)) {
      this[key] = value
    }
  }
}
