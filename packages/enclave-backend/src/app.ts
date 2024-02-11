import "reflect-metadata"
import "dotenv/config"
import Fastify, { FastifyRequest } from "fastify"
import ServiceConfig from "./services/register.service"
import ServiceRouteMapper from "./serviceRouteMapper"
import { AppDataSource } from "./data-source"
import { User } from "./models/user/user.entity"
import { AuthService } from "./services/auth.service/auth.service"
import { HTTPError } from "./errors"

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

async function initialize() {
  const fastify = Fastify({
    logger: true
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
    async (request: FastifyRequest<{ Body: User }>, reply) => {
      const { email, password } = request.body
      const response = await AuthService.localSignIn(email, password)
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
