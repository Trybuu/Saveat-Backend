import { Types } from 'mongoose'

interface IPantry {
  ownerId: Types.ObjectId
  name: string
  description: string
  usersAccess: Types.ObjectId[] | []
  supplies: ISupply[] | []
}

interface ISupply {
  productId: Types.ObjectId
  name: String
  quantityValue: number
  quantityUnit: string
  creationDate: Date
  expirationDate?: Date
}

export default IPantry
