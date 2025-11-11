import { Request, Response } from 'express'
import Product from '../models/productModel'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'

export const getProducts = catchAsync(async (req: Request, res: Response) => {
  const [limit, skip] = [Number(req.query.limit), Number(req.query.skip)]

  const safeLimit = !isNaN(limit) && limit > 0 ? limit : 10
  const safeSkip = !isNaN(skip) && skip >= 0 ? skip : 0

  const filter: Record<string, any> = {}

  if (req.query.productName) {
    filter.product_name = { $regex: req.query.productName, $options: 'i' }
  }

  if (req.query.code) {
    filter.code = { $regex: req.query.code, $options: 'i' }
  }

  const [products, total] = await Promise.all([
    Product.find(filter)
      .sort({ product_name: 1 })
      .limit(safeLimit)
      .skip(safeSkip),
    Product.countDocuments(filter),
  ])

  res.status(200).json({
    status: 'success',
    message: `${products.length} products fetched`,
    data: {
      products,
    },
    pagination: {
      limit: safeLimit,
      skip: safeSkip,
      total,
      hasMore: safeSkip + safeLimit < total,
    },
  })
})

export const createProduct = catchAsync(async (req: Request, res: Response) => {
  const {
    code,
    product_name,
    brands,
    categories,
    categories_tags,
    countries,
    countries_tags,
    quantity,
    packaging,
    packaging_tags,
    ingredients_text,
    allergens,
    expiration_date,
    nutriments,
    images,
    labels,
    nova_groups,
  } = req.body

  if (!code || !product_name || !brands) {
    throw new AppError(
      'Missing required fileds: code, product_name, brands',
      400,
    )
  }

  const existing = await Product.findOne({ code })
  if (existing) throw new AppError('Product with this code already exists', 409)

  const product = await Product.create({
    code,
    product_name,
    brands,
    categories,
    categories_tags,
    countries,
    countries_tags,
    quantity,
    packaging,
    packaging_tags,
    ingredients_text,
    allergens,
    expiration_date,
    nutriments,
    images,
    labels,
    nova_groups,
  })

  res.status(201).json({
    status: 'success',
    message: 'Products created',
    data: {
      product,
    },
  })
})

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
