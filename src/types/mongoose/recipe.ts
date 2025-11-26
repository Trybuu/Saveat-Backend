import { Types } from 'mongoose'

export interface IRecipeIngredient {
  productId?: Types.ObjectId
  productCategory: string
  productSubstitutes?: string[]
  name: string
  quantityAmount: number
  quantityUnit: string
}

export interface IRecipe {
  title: string
  slug: string
  authorId: Types.ObjectId
  imageUrl: string
  category: string
  description: string
  prepTimeMinutes: number
  tags: string[]
  ingredients: IRecipeIngredient[]
  instructions: string[]
}
