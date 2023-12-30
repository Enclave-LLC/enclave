import { Router } from "express"

const router = Router({ mergeParams: true })

router.get("/", async (req, res) => {
  res.json({ message: "GET ALL customers" })
})

router.get("/:customerId", async (req, res) => {
  res.json({ message: "GET customer" })
})

router.post("/", async (req, res) => {
  res.json({ message: "POST customer" })
})

router.delete("/:customerId", async (req, res) => {
  res.json({ message: "DELETE customer" })
})

export default router
