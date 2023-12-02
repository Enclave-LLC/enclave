import * as http from "http"
import express, { Express } from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import morgan from "morgan"
import registerRoutes from "./src/routes"
import logger from "./lib/logger"
import cors from "cors"
import io from "./lib/io"
import stripe from "./lib/stripe"

dotenv.config()
const app: Express = express()

const corsConfig = {
  origin: "*",
  optionsSuccessStatus: 200,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept-Features", "Accept"],
  preflightContinue: true,
  credentials: true
}

// Application level middleware
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"))
app.use(cors(corsConfig))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// Register routes on app
registerRoutes(app)

// Error Handler
app.use(
  (
    err: { message?: string; stack?: string; status?: number },
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: express.NextFunction
  ) => {
    logger.log("error", "an error occured with message %s and status %s", err.stack, err.status)
    console.log(err)
    const message = err.message ? err.message : "An error occured"

    if (err.message == "Unauthenticated") err.status = 401

    if (!err.status) err.status = 500
    return res.status(err.status).json({
      code: err.status,
      message: message
    })
  }
)

const port = parseInt(process.env.PORT || "9999")
app.set("port", port)

const server = http.createServer(app)
io.init(server)
stripe.init()

server.listen(port, () => {
  const addr = server.address()
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port

  console.log(`Listening on ${bind}`)
})
