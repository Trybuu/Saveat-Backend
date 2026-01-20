import { Request } from 'express'
import { IUserInReq } from '../mongoose/user'

export interface RequestCustom extends Request {
  user?: IUserInReq
}
