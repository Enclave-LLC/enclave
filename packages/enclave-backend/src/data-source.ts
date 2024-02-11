import * as path from "path"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [path.join(__dirname, "./models/**/*.entity{.ts,.js}")],
  subscribers: [],
  migrations: []
})
