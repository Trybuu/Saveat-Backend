import { Request, Response } from 'express'
import Product from '../models/productModel'

export const getProducts = async (req: Request, res: Response) => {
  try {
    const limit = 25
    const products = await Product.find().limit(limit)

    res.status(200).json({
      status: 'success',
      message: `${limit} products fetched`,
      data: {
        products,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `Error while fetching products: ${err}`,
      data: null,
    })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body)

    res.status(201).json({
      status: 'success',
      message: 'Products created',
      data: {
        product,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `Could not create a product: ${err}`,
      data: null,
    })
  }
}

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      res.status(404).json({
        status: 'fail',
        message: 'No product found with that id',
        data: null,
      })
    }

    res.status(200).json({
      status: 'success',
      message: 'Product fetched',
      data: {
        product,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `Error while fetching the product: ${err}`,
      data: null,
    })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      status: 'success',
      message: `Product updated`,
      data: {
        product,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `Could not update a product: ${err}`,
    })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await Product.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: 'success',
      message: 'Product deleted',
      data: null,
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `Could not delete the product ${err}`,
      data: null,
    })
  }
}
