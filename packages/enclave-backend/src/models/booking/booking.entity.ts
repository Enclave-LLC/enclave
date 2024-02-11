import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm"
import { SpaceEntity } from "../space/space.entity"
import { EntityType } from "../type"
import { UserEntity } from "../user/user.entity"

@Entity()
export class BookingEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string

  @ManyToOne(() => UserEntity)
  user: UserEntity // making the booking

  @RelationId((booking: BookingEntity) => booking.user)
  userId: string

  @ManyToOne(() => SpaceEntity) // space their booking
  space: SpaceEntity // on-way relation

  @RelationId((booking: BookingEntity) => booking.space)
  spaceId: string
}

export type Booking = EntityType<BookingEntity>
