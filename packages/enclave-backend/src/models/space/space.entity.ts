import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { EntityType } from "../type"
import { Vendor } from "../user/vendor.entity"

export enum Amenities {
  Parking = "parking",
  Catering = "catering"
}

@Entity()
export class SpaceEntity extends BaseEntity {
  constructor(init?: Partial<SpaceEntity>) {
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
  name: string

  @ManyToOne(() => Vendor)
  vendor: Vendor

  @Column()
  address: string //TODO can be split into city, region & others.

  @Column({ type: "jsonb", nullable: true })
  location: { lng: number; lat: number }

  @Column()
  size: number // square footage
  @Column({
    type: "enum",
    enum: Amenities,
    array: true,
    default: []
  })
  amenities: Amenities[] // array of enums!

  @Column()
  capacity: number // human number capacity. eg. 1000 people!
}

export type Space = EntityType<SpaceEntity>
