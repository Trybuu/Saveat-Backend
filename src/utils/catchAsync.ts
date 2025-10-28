import { Request, Response, NextFunction } from 'express'

const catchAsync = <
  T = unknown,
  Req extends Request = Request,
  Res extends Response = Response,
>(
  fn: (req: Req, res: Res, next: NextFunction) => Promise<T>,
) => {
  return (req: Req, res: Res, next: NextFunction): void => {
    fn(req, res, next).catch(next)
  }
}

export default catchAsync
