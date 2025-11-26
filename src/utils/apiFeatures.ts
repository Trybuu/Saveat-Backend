import { Query } from 'mongoose'
import { ParsedQs } from 'qs'

class ApiFeatures<T> {
  query: Query<T[], T>
  queryString: ParsedQs
  currentPage: number = 1
  currentLimit: number = 10

  constructor(query: Query<T[], T>, queryString: ParsedQs) {
    this.query = query
    this.queryString = queryString
  }

  // Filtering (?name=Nestle&countries=Poland)
  // Poprawić filtrowanie aby wyszukiwać bez względu na wielkość liter oraz po wyrazach np. wpisze "ser" to zwróci "ser polski kanapkowy" ale nie zwróci "sernik"
  filter() {
    const queryObj = { ...this.queryString }
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach((el) => delete queryObj[el])

    // Change (gt, gte, lt, lte) operators into MongoDB operators
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }

  // Sorting (?sort=price,-ratingsAverage)
  sort() {
    const rawSort = this.queryString.sort

    if (typeof rawSort === 'string') {
      const sortBy = rawSort.split(',').join(' ')
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort('-code')
    }

    return this
  }

  //   Fields limitation (?fields=product_name,brands)
  limitFields() {
    const rawFields = this.queryString.fields

    if (typeof rawFields === 'string') {
      const fields = rawFields.split(',').join(' ')
      this.query = this.query.select(fields)
    } else {
      this.query = this.query.select('-__v')
    }

    return this
  }

  // Pagination (?page=2&limit=10)
  paginate() {
    const page = Number(this.queryString.page) * 1 || 1
    const limit = Number(this.queryString.limit) * 1 || 10
    const skip = (page - 1) * limit

    this.query = this.query.skip(skip).limit(limit)

    this.currentPage = page
    this.currentLimit = limit

    return this
  }
}

export default ApiFeatures
