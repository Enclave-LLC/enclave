import { Router } from "express"

const router = Router({ mergeParams: true })

router.get("/", async (req, res) => {
  res.json({ message: "GET ALL clients" })
})

router.get("/:clientId", async (req, res) => {
  res.json({ message: "GET client" })
})

router.post("/", async (req, res) => {
  res.json({ message: "POST client" })
})

router.delete("/:clientId", async (req, res) => {
  res.json({ message: "DELETE client" })
})

export default router
