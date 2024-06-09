import "dotenv/config"
import Fastify, { FastifyRequest } from "fastify"
import cors from "@fastify/cors"
import "reflect-metadata"
import { AppDataSource } from "./data-source"
import { HTTPError } from "./errors"
import { User, UserEntity } from "./models/user/user.entity"
import ServiceRouteMapper from "./serviceRouteMapper"
import { AuthService } from "./services/auth.service/auth.service"
import ServiceConfig from "./services/register.service"

const SignUpAuthSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
    firstname: { type: "string" },
    lastname: { type: "string" },
    isVendor: { type: "boolean" }
  },
  required: ["email", "password", "firstname", "lastname"]
}

const SignInAuthSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" }
  },
  required: ["email", "password"]
}

const ValidateEmailSchema = {
  type: "object",
  properties: {
    email: { type: "string" }
  },
  required: ["email"]
}

async function initialize() {
  const fastify = Fastify({
    logger: true,
    ignoreTrailingSlash: true
  })
  const allowedOrigins = ["http://localhost:5173", "https://myenclave.space"]

  fastify.register(cors, {
    origin: (origin, callback) => {
      if (!origin) {
        // Allow requests with no origin (e.g., mobile apps, curl requests)
        return callback(null, true)
      }
      if (allowedOrigins.indexOf(origin) !== -1) {
        // Allow specific origins
        return callback(null, true)
      } else {
        // Disallow other origins
        return callback(new Error("Not allowed by CORS"), false)
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })

  fastify.setErrorHandler((error: HTTPError, request, reply) => {
    if (error.isHttpError) reply.status(error.code).send(error.message)
    throw error
  })

  // Initialize connection to DB!
  await AppDataSource.initialize()

  fastify.post(
    "/auth/signup",
    { schema: { body: SignUpAuthSchema } },
    async (request: FastifyRequest<{ Body: User }>, reply) => {
      const { email, password, ...userData } = request.body
      const response = await AuthService.localSignUp(email, password, userData)
      reply.send(response)
    }
  )
  fastify.post(
    "/auth/signin",
    { schema: { body: SignInAuthSchema } },
    async (request: FastifyRequest<{ Body: UserEntity }>, reply) => {
      const { email, password } = request.body
      const response = await AuthService.localSignIn(email, password)
      reply.send(response)
    }
  )
  fastify.post(
    "/auth/validate",
    { schema: { body: ValidateEmailSchema } },
    async (request: FastifyRequest<{ Body: { email: string } }>, reply) => {
      const { email } = request.body
      const response = await AuthService.validateEmail(email)
      reply.send(response)
    }
  )

  // Register Services here!
  ServiceRouteMapper(fastify, ServiceConfig)

  // Run the server!
  await fastify.listen({ port: 3000 }).catch((err) => {
    fastify.log.error(err)
    process.exit(1)
  })
}
initialize()
