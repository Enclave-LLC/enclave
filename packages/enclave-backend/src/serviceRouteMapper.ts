import fastify = require("fastify")
import { registrationType } from "./services/register.service"

function ServiceRouteMapper(app: fastify.FastifyInstance, services: registrationType[]) {
  for (const service of services) {
    const { methods, route, service: mService } = service
    const serviceObj = new mService()
    if (methods.includes("GET")) {
      // #/
      app.get(route, async (request, reply) => {
        // TODO: validate query!
        const query = request.query
        const res = await serviceObj.find(query)
        reply.send(res)
      })
      // #/:id
      app.get(`${route}/:id`, async (request: fastify.FastifyRequest<{ Params: { id: string } }>, reply) => {
        const res = await serviceObj.get(request.params.id)
        reply.send(res)
      })
    }
    if (methods.includes("POST")) {
      app.post(route, async (request, reply) => {
        // TODO: validate datas
        const data = request.body
        const res = await serviceObj.create(data)
        reply.send(res)
      })
    }
    if (methods.includes("PUT")) {
      app.post(`${route}/:id`, async (request, reply) => {
        // TODO: validate datas
        const data = request.body
        const query = request.query
        const res = await serviceObj.update(query, data)
        reply.send(res)
      })
    }
    if (methods.includes("DELETE")) {
      app.delete(`${route}/:id`, async (request: fastify.FastifyRequest<{ Params: { id: string } }>, reply) => {
        const id = request.params.id
        const res = await serviceObj.delete(id)
        reply.send(res)
      })
    }
  }
}

export default ServiceRouteMapper
