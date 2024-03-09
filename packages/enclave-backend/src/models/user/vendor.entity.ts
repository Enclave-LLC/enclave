import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { UserEntity } from "./user.entity"

@Entity()
export class Vendor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @OneToOne(() => UserEntity, (user) => user.vendor)
  user: UserEntity
}
