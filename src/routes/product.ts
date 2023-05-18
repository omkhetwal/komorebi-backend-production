import express from "express"
import {
  createProduct,
  getProductById,
  getProducts,
} from "../controller/product"

const productRoutes = express.Router()

productRoutes.get("/", getProducts)
productRoutes.get("/:id", getProductById)
productRoutes.post("/", createProduct)

export default productRoutes
