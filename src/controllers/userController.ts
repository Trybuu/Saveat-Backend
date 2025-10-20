import { Request, Response } from 'express'

export const getUsers = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Users fetched',
    data: '<USERS DATA>',
  })
}

export const getUser = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'User fetched',
    data: '<USER DATA>',
  })
}

export const createUser = (req: Request, res: Response) => {
  // Middleware który sprawdza dane

  res.status(201).json({
    status: 'success',
    message: 'User added',
    data: '<USER DATA>',
  })
}

export const updateUser = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'User updated',
    data: '<UPDATED USER DATA',
  })
}

export const deleteUser = (req: Request, res: Response) => {
  res.status(204).json({
    status: 'success',
    message: 'User deleted',
    data: null,
  })
}
