import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Product code is required.'],
    unique: true,
  },
  product_name: {
    type: String,
    required: [true, 'Product name is required.'],
  },
  brands: {
    type: String,
    required: [true, 'Product brands is required.'],
  },
  categories: {
    type: String,
  },
  categories_tags: {
    type: Array,
  },
  countries: {
    type: String,
  },
  countries_tags: {
    type: Array,
  },
  quantity: {
    type: String,
  },
  packaging: {
    type: Array,
  },
  packaging_tags: {
    type: String,
  },
  ingredients_text: {
    type: String,
  },
  allergens: {
    type: String,
  },
  expiration_date: {
    type: String,
  },
  nutriments: {
    type: Object,
  },
  images: {
    type: Object,
  },
  labels: {
    type: String,
  },
  nova_groups: {
    type: String,
  },
})

const Product = mongoose.model('Product', productSchema)

export default Product
