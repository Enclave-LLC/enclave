import { Router } from "express"

const router = Router({ mergeParams: true })

router.get("/", async (req, res) => {
  res.json({ message: "GET ALL space owners" })
})

router.get("/:spaceOwnerId", async (req, res) => {
  res.json({ message: "GET space owner" })
})

router.post("/", async (req, res) => {
  res.json({ message: "POST space owner" })
})

router.delete("/:spaceOwnerId", async (req, res) => {
  res.json({ message: "DELETE space owner" })
})

export default router
