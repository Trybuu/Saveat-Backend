import mongoose, { Schema, Types } from 'mongoose'
import {
  MEAL_TYPES,
  PRODUCT_TYPES,
  QUANTITY_UNITS,
  RECIPE_TAGS,
} from '../config/constants'
import slugify from 'slugify'
import { IRecipe } from '../types/mongoose/recipe'

const recipeSchema = new mongoose.Schema<IRecipe>(
  {
    title: {
      type: String,
      minLength: 5,
      required: [true, 'A Recipe must have a title!'],
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'A Recipe must have an image.'],
    },
    category: {
      type: String,
      enum: MEAL_TYPES,
      required: [true, 'A Recipe must have a category.'],
    },
    description: {
      type: String,
      minLength: 20,
      required: [true, 'A Recipe must have a description.'],
    },
    prepTimeMinutes: {
      type: Number,
      min: 1,
      required: [true, 'A Recipe must contains preparation time in minutes.'],
    },
    tags: {
      type: [String],
      enum: RECIPE_TAGS,
      validate: {
        validator: function (v: string[]) {
          return v && v.length > 0
        },
        message: 'A Recipe must have at least one tag specified.',
      },
    },
    ingredients: {
      type: [
        {
          productId: {
            type: Types.ObjectId,
            ref: 'Product',
            required: false,
          },
          productCategory: {
            type: String,
            required: true,
            enum: PRODUCT_TYPES,
          },
          productSubstitutes: {
            type: [String],
            required: false,
            enum: PRODUCT_TYPES,
          },
          name: {
            type: String,
            required: true,
          },
          quantityAmount: {
            type: Number,
            required: true,
          },
          quantityUnit: {
            type: String,
            enum: QUANTITY_UNITS,
            required: true,
          },
        },
      ],
      validate: {
        validator: function (v: string[]) {
          return v && v.length > 0
        },
        message: 'A Recipe must contain at least one ingredient.',
      },
    },
    instructions: {
      type: [String],
      validate: {
        validator: function (v: string[]) {
          return v && v.length > 0
        },
        message: 'A Recipe must contain at least one instruction step.',
      },
    },
  },
  { timestamps: true },
)

recipeSchema.pre('save', function (next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }
  next()
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe
