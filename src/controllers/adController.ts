import { Request, Response } from 'express'

export const getAds = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Ads fetched',
    data: '<Ads DATA>',
  })
}

export const getAd = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Ad fetched',
    data: '<Ad DATA>',
  })
}

export const createAd = (req: Request, res: Response) => {
  // Middleware który sprawdza dane

  res.status(201).json({
    status: 'success',
    message: 'Ad added',
    data: '<Ad DATA>',
  })
}

export const updateAd = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Ad updated',
    data: '<UPDATED Ad DATA',
  })
}

export const deleteAd = (req: Request, res: Response) => {
  res.status(204).json({
    status: 'success',
    message: 'Ad deleted',
    data: null,
  })
}
