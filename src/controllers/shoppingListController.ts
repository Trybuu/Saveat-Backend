import { Request, Response } from 'express'

export const getShoppingLists = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Shopping Lists fetched',
    data: '<SHOPPING LISTS DATA>',
  })
}

export const createShoppingList = (req: Request, res: Response) => {
  res.status(201).json({
    status: 'success',
    message: 'Shopping List created',
    data: '<SHOPPING LIST DATA>',
  })
}

export const getShoppingList = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Shopping List fetched',
    data: '<SHOPPING LIST DATA>',
  })
}

export const updateShoppingList = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Shopping List updated',
    data: '<UPDATED SHOPPING LIST DATA>',
  })
}

export const deleteShoppingList = (req: Request, res: Response) => {
  res.status(204).json({
    status: 'success',
    message: 'Shopping List deleted',
    data: null,
  })
}
