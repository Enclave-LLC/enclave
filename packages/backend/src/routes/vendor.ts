import { Router } from "express"

const router = Router({ mergeParams: true })

router.get("/", async (req, res) => {
  res.json({ message: "GET ALL vendors" })
})

router.get("/:vendorId", async (req, res) => {
  res.json({ message: "GET vendor" })
})

router.post("/", async (req, res) => {
  res.json({ message: "POST vendor" })
})

router.delete("/:spaceOwnerId", async (req, res) => {
  res.json({ message: "DELETE vendor" })
})

export default router
