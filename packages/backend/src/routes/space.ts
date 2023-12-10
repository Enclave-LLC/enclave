import { Router } from "express"

const router = Router({ mergeParams: true })

router.get("/", async (req, res) => {
  res.json({ message: "GET ALL event spaces" })
})

router.get("/:spaceId", async (req, res) => {
  res.json({ message: "GET event space" })
})

router.post("/", async (req, res) => {
  res.json({ message: "POST event space" })
})

router.delete("/:spaceId", async (req, res) => {
  res.json({ message: "DELETE event space" })
})

export default router
