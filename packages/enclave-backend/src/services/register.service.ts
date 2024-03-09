import { BaseService } from "./base.service"
import { bookingService } from "./booking.service/booking.service"
import { spaceService } from "./space.service/space.service"
import { userService } from "./user.service/user.service"
import { vendorService } from "./vendor.service/vendor.service"

type RequestMethods = "GET" | "POST" | "DELETE" | "PUT"

export type registrationType = {
  route: `/${string}` // ts force slash
  service: typeof BaseService<unknown>
  methods: RequestMethods[]
  needsAuth: boolean
}

// Register your services here!
const ServiceConfig: registrationType[] = [
  {
    route: "/users",
    methods: ["GET", "POST", "PUT"],
    service: userService,
    needsAuth: true
  },
  {
    route: "/spaces",
    methods: ["GET", "POST", "PUT", "DELETE"],
    service: spaceService,
    needsAuth: true
  },
  {
    route: "/vendors",
    methods: ["POST", "PUT"],
    service: vendorService,
    needsAuth: true
  },
  {
    route: "/bookings",
    methods: ["GET", "POST", "PUT", "DELETE"],
    service: bookingService,
    needsAuth: true
  }
]

export default ServiceConfig
