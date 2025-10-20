import { Request, Response } from 'express'

export const getFoodSupplies = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Food Supplies fetched',
    data: '<FOOD SUPPLIES DATA>',
  })
}

export const createFoodSupply = (req: Request, res: Response) => {
  res.status(201).json({
    status: 'success',
    message: 'Food Supply created',
    data: '<FOOD SUPPLY DATA>',
  })
}

export const getFoodSupply = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Food Supply fetched',
    data: '<FOOD SUPPLY DATA>',
  })
}

export const updateFoodSupply = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Food supply updated',
    data: '<UPDATED FOOD SUPPLY DATA>',
  })
}

export const deleteFoodSupply = (req: Request, res: Response) => {
  res.status(204).json({
    status: 'success',
    message: 'Food supply deleted',
    data: null,
  })
}
