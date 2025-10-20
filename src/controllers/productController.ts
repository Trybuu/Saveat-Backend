import { Request, Response } from 'express'

export const getProducts = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Products fetched',
    data: '<PRODUCTS DATA>',
  })
}

export const createProduct = (req: Request, res: Response) => {
  res.status(201).json({
    status: 'success',
    message: 'Products created',
    data: '<PRODUCT DATA>',
  })
}

export const getProduct = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Product fetched',
    data: '<PRODUCT DATA>',
  })
}

export const updateProduct = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Product updated',
    data: '<PRODUCT UPDATED DATA>',
  })
}

export const deleteProduct = (req: Request, res: Response) => {
  res.status(204).json({
    status: 'success',
    message: 'Product deleted',
    data: null,
  })
}
