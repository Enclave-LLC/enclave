import { BaseService } from "./base.service"
import { userService } from "./user.service/user.service"

type RequestMethods = "GET" | "POST" | "DELETE" | "PUT"

export type registrationType = {
  route: `/${string}` // ts force slash
  service: typeof BaseService<unknown>
  methods: RequestMethods[]
}

// Register your services here!
const ServiceConfig: registrationType[] = [
  {
    route: "/users",
    methods: ["GET"],
    service: userService
  }
]

export default ServiceConfig
