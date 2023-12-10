import { Router } from "express"

const router = Router({ mergeParams: true })

router.get("/", async (req, res) => {
  res.json({ message: "GET ALL event space bookings" })
})

router.get("/:bookingId", async (req, res) => {
  res.json({ message: "GET event space booking" })
})

router.post("/", async (req, res) => {
  res.json({ message: "POST space booking" })
})

router.delete("/:bookingId", async (req, res) => {
  res.json({ message: "DELETE event space booking" })
})

export default router
