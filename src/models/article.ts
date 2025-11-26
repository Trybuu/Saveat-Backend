import mongoose, { Schema } from 'mongoose'
import slugify from 'slugify'
import { ARTICLE_CATEGORIES } from '../config/constants'
import type { IArticle } from '../types/mongoose/article'

const articleSchema = new mongoose.Schema<IArticle>(
  {
    title: {
      type: String,
      minLength: 10,
      required: [true, 'Article must have a title.'],
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Article must have an author reference.'],
    },
    category: {
      type: String,
      enum: ARTICLE_CATEGORIES,
      required: [true, 'Article must have category defined.'],
    },
    content: {
      type: String,
      minLength: 50,
      required: true,
    },
    coverImageUrl: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
)

articleSchema.pre('validate', function (next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }
  next()
})

const Article = mongoose.model('Article', articleSchema)

export default Article
