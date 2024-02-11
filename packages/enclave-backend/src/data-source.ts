import { DataSource } from "typeorm"
import { User } from "./models/user/user.entity"

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [User], // TODO: change to glob pattern!
  subscribers: [],
  migrations: []
})
