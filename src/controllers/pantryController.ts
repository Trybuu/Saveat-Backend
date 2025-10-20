import { Request, Response } from 'express'

export const getPantries = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Pantries fetched',
    data: '<PANTRIES DATA>',
  })
}

export const createPantry = (req: Request, res: Response) => {
  res.status(201).json({
    status: 'success',
    message: 'Pantry created',
    data: '<PANTRY DATA>',
  })
}

export const getPantry = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Pantry fetched',
    data: '<PANTRY DATA>',
  })
}

export const updatePantry = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Pantry updated',
    data: '<UPDATED PANTRY DATA>',
  })
}

export const deletePantry = (req: Request, res: Response) => {
  res.status(204).json({
    status: 'success',
    message: 'Pantry deleted',
    data: null,
  })
}
