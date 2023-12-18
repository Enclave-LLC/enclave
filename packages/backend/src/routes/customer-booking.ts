import { Router } from "express"
import { CustomerBookingController } from "../controllers"

const router = Router({ mergeParams: true })

router.get("/", async (req, res) => {
  await CustomerBookingController.getBookings(req, res)
})

router.patch("/:bookingId", async (req, res) => {
  await CustomerBookingController.patchBooking(req, res)
})

router.delete("/:bookingId", async (req, res) => {
  await CustomerBookingController.deleteBoooking(req, res)
})

export default router
