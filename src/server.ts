import * as dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import connectToDatabase from "./db"
import orderRoutes from "./routes/order"
import productRoutes from "./routes/product"
import { webhookHandler } from "./webhook"

const app = express()
app.use(cors())

connectToDatabase()

app.get("/ping", (request, response) => {
  response.send("pong")
})

app.post("/webhook", express.raw({ type: "application/json" }), webhookHandler)

app.use(express.json())
app.use("/products", productRoutes)
app.use("/orders", orderRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Server up and running at port", PORT)
})
