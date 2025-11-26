import ApiFeatures from '../utils/apiFeatures'
import AppError from '../utils/appError'
import catchAsync from '../utils/catchAsync'

export const deleteOne = (Model: any) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id)

    if (!doc) {
      return next(new AppError('No document found with that Id', 404))
    }

    res.status(204).json({
      status: 'success',
      data: null,
    })
  })

export const updateOne = (Model: any) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!doc) return next(new AppError('No document found with that Id', 404))

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    })
  })

export const createOne = (Model: any) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body)

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    })
  })

export const getOne = (Model: any, populateOptions?: string) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id)

    if (populateOptions) query = query.populate(populateOptions)

    const doc = await query

    if (!doc) return next(new AppError('No document found with that Id', 404))

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    })
  })

export const getAll = (Model: any) =>
  catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()

    const doc = await features.query

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    })
  })
