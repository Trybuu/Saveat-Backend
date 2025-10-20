import { Request, Response } from 'express'

export const getRecipes = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Recipes fetched',
    data: '<RECIPES DATA>',
  })
}

export const getRecipe = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Recipe fetched',
    data: '<RECIPE DATA>',
  })
}

export const createRecipe = (req: Request, res: Response) => {
  // Middleware który sprawdza dane

  res.status(201).json({
    status: 'success',
    message: 'Recipe added',
    data: '<RECIPE DATA>',
  })
}

export const updateRecipe = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Recipe updated',
    data: '<UPDATED RECIPE DATA>',
  })
}

export const deleteRecipe = (req: Request, res: Response) => {
  res.status(204).json({
    status: 'success',
    message: 'Recipe deleted',
    data: null,
  })
}
