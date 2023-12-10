import { Router } from "express"
import { ClientBookingController } from "../controllers"

const router = Router({ mergeParams: true })

router.get("/", async (req, res) => {
  await ClientBookingController.getBookings(req, res)
})

router.patch("/:bookingId", async (req, res) => {
  await ClientBookingController.patchBooking(req, res)
})

router.delete("/:bookingId", async (req, res) => {
  await ClientBookingController.deleteBoooking(req, res)
})

export default router
