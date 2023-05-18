import { Request, response, Response } from "express"
import Product from "../models/product"
import { IProduct } from "../types"

type CreateProductRequestType = Pick<
  IProduct,
  "image" | "name" | "description" | "price"
>

export const createProduct = async (request: Request, response: Response) => {
  try {
    const { image, name, price, description }: CreateProductRequestType =
      request.body

    const product = await Product.create({
      image,
      name,
      price,
      description,
    })
    response.send(product)
  } catch (error) {
    console.log("error in createProduct", error)
    response.send({
      message: "Something went wrong while creating product",
    })
    throw error
  }
}

export const getProducts = async (request: Request, response: Response) => {
  try {
    const products = await Product.find({})
    response.send(products)
  } catch (error) {
    console.log("error in getProducts", error)
    response.send({ message: "Something went wrong in get products" })
    throw error
  }
}

export const getProductById = async (request: Request, response: Response) => {
  try {
    const { id } = request.params
    const product = await Product.findById(id)
    response.send(product)
  } catch (error) {
    console.log("error in getProductById", error)
    response.send({
      message: "Something went wrong while fetching the product",
    })
    throw error
  }
}
