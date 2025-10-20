import { Request, Response } from 'express'

export const getStats = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Stats fetched',
    data: '<Stats DATA>',
  })
}

export const getStat = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Stat fetched',
    data: '<Stat DATA>',
  })
}

export const createStat = (req: Request, res: Response) => {
  // Middleware który sprawdza dane

  res.status(201).json({
    status: 'success',
    message: 'Stat added',
    data: '<Stat DATA>',
  })
}

export const updateStat = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Stat updated',
    data: '<UPDATED Stat DATA>',
  })
}

export const deleteStat = (req: Request, res: Response) => {
  res.status(204).json({
    status: 'success',
    message: 'Stat deleted',
    data: null,
  })
}
