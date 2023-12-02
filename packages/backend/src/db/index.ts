import { PrismaClient, Prisma } from "@prisma/client"
import logger from "../../lib/logger"
const prisma = new PrismaClient(
  process.env.SHOW_PRISMA_LOGS === "true"
    ? {
        log: [
          {
            emit: "event",
            level: "query"
          }
        ]
      }
    : {
        log: []
      }
)

;(async () => {
  try {
    await prisma.$connect()
    prisma.$on("query", (e) => {
      console.log("Query: " + e.query)
      console.log("Params: " + e.params)
      console.log("Duration: " + e.duration + "ms")
    })
  } catch (e: unknown) {
    if (e instanceof Prisma.PrismaClientInitializationError) {
      logger.log("error", "an error occured whilst connecting to database with message: %s", e.message)
    }
  }
})()

export default prisma
