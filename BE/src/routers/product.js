import express from "express"
import { create, get, getAll, remove, update } from "../controllers/product"
import { checkPermission } from "../middlewares/checkPermission"

const router = express.Router()

router.get("/products", getAll)
router.get("/product/:id", get)
router.post("/product", checkPermission, create)
router.delete("/product/:id", checkPermission, remove)
router.patch("/product/:id", checkPermission, update)

export default router

