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
  quantityValue: number
  quantityUnit: string
  creationDate: Date
  expirationDate?: Date
}

export default IPantry
