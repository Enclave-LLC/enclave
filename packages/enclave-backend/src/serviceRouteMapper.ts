import fastify = require("fastify")
import AuthPlugin from "./auth-plugin"
import { AuthUserType } from "./services/auth.service/auth.service"
import { registrationType } from "./services/register.service"

const onRequest = (needsAuth: boolean) => (needsAuth ? [AuthPlugin.authenticate] : undefined)

function ServiceRouteMapper(app: fastify.FastifyInstance, services: registrationType[]) {
  app.register(AuthPlugin.register)
  for (const service of services) {
    const { methods, route, service: mService, needsAuth } = service
    const serviceObj = new mService()
    if (methods.includes("GET")) {
      // #/
      app.get(route, { onRequest: onRequest(needsAuth) }, async (request, reply) => {
        // TODO: validate query!
        const query = request.query
        const res = await serviceObj.find(query, request.user as AuthUserType)
        reply.send(res)
      })
      // #/:id
      app.get(
        `${route}/:id`,
        { onRequest: onRequest(needsAuth) },
        async (request: fastify.FastifyRequest<{ Params: { id: string } }>, reply) => {
          const res = await serviceObj.get(request.params.id, request.user as AuthUserType)
          reply.send(res)
        }
      )
    }
    if (methods.includes("POST")) {
      app.post(route, { onRequest: onRequest(needsAuth) }, async (request, reply) => {
        // TODO: validate datas
        const data = request.body
        const res = await serviceObj.create(data, request.user as AuthUserType)
        reply.send(res)
      })
    }
    if (methods.includes("PUT")) {
      app.put(
        `${route}/:id`,
        { onRequest: onRequest(needsAuth) },
        async (request: fastify.FastifyRequest<{ Params: { id: string } }>, reply) => {
          // TODO: validate datas
          const data = request.body
          const id = request.params.id
          const res = await serviceObj.update(id, data, request.user as AuthUserType)
          reply.send(res)
        }
      )
    }
    if (methods.includes("DELETE")) {
      app.delete(
        `${route}/:id`,
        { onRequest: onRequest(needsAuth) },
        async (request: fastify.FastifyRequest<{ Params: { id: string } }>, reply) => {
          const id = request.params.id
          const res = await serviceObj.delete(id, request.user as AuthUserType)
          reply.send(res)
        }
      )
    }
  }
}

export default ServiceRouteMapper
