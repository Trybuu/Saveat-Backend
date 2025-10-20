import { Request, Response } from 'express'

export const getArticles = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Articles fetched',
    data: '<ARTICLES DATA>',
  })
}

export const getArticle = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Article fetched',
    data: '<Article DATA>',
  })
}

export const createArticle = (req: Request, res: Response) => {
  // Middleware który sprawdza dane

  res.status(201).json({
    status: 'success',
    message: 'Article added',
    data: '<Article DATA>',
  })
}

export const updateArticle = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Article updated',
    data: '<UPDATED Article DATA',
  })
}

export const deleteArticle = (req: Request, res: Response) => {
  res.status(204).json({
    status: 'success',
    message: 'Article deleted',
    data: null,
  })
}
