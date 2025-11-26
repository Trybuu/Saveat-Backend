import { Types } from 'mongoose'

export interface IArticle {
  title: string
  slug: string
  authorId: Types.ObjectId
  category: string
  content: string
  coverImageUrl: string
  images?: string[]
  likes: number
  dislikes: number
}
