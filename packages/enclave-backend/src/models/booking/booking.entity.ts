import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { SpaceEntity } from "../space/space.entity"
import { EntityType } from "../type"
import { UserEntity } from "../user/user.entity"

@Entity()
export class BookingEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string

  @ManyToOne(() => UserEntity)
  user: UserEntity

  @ManyToOne(() => SpaceEntity) // space their booking
  space: SpaceEntity // on-way relation
}

export type Booking = EntityType<BookingEntity>
