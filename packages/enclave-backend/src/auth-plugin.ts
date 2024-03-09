import fastifyJWT from "@fastify/jwt"
import fastifyPlugin from "fastify-plugin"

const AuthPlugin = {
  register: fastifyPlugin(async function (fastify) {
    fastify.register(fastifyJWT, {
      secret: process.env.JWT_SECRET
    })
  }),
  authenticate: async function (request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  }
}

export default AuthPlugin
