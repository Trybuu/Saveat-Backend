import express from 'express'
import mongoose from 'mongoose'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import { xss } from 'express-xss-sanitizer'
import hpp from 'hpp'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import config from './config/config'
import globalErrorHandler from './controllers/errorController'
import userRouter from './routes/userRoutes'
import productRouter from './routes/productRoutes'
import pantryRouter from './routes/pantryRoutes'
import shoppingListRouter from './routes/shoppingListRoutes'
import statRouter from './routes/wasteTrackingRoutes'
import recipeRouter from './routes/recipeRoutes'
import articleRouter from './routes/articleRoutes'
import adRouter from './routes/adRoutes'
import appEventRouter from './routes/appEventRoutes'
import adEventRouter from './routes/adEventRoutes'

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'To many requets from this Ip. try again later.',
})

const app = express()

app.use(helmet())
app.use(express.json({ limit: '10kb' }))
app.use(cookieParser())

// app.use(mongoSanitize()) <-- ten middleware powoduje problem (znaleźć rozzwiązanie sanityzacji danych)
app.use(cors({ origin: true, credentials: true }))
app.use(xss())
app.use(
  hpp({
    whitelist: ['duration'],
  }),
)
app.use('/api', limiter)

app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/pantries', pantryRouter)
app.use('/api/v1/shoppingLists', shoppingListRouter)
app.use('/api/v1/wasteTracking', statRouter)
app.use('/api/v1/articles', articleRouter)
app.use('/api/v1/recipes', recipeRouter)
app.use('/api/v1/ads', adRouter)
app.use('/api/v1/adEvents', adEventRouter)
app.use('/api/v1/appEvents', appEventRouter)

const port = config.port

if (!config.dbConnectionString || !config.dbUser || !config.dbPassword) {
  throw new Error('Database connection data is not defined!')
}

const connectionString = config.dbConnectionString
  .replace('<USER>', config.dbUser)
  .replace('<PASSWORD>', config.dbPassword)

mongoose
  .connect(connectionString, {
    retryWrites: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log('Server connected to the Database succesfully')
  })
  .catch((err) => {
    console.log('Server could not connect to the DB: ', err)
  })

app.use(globalErrorHandler)

app.listen(port, () => {
  console.log(`Server running ${config.nodeEnv} mode on port ${port}`)
})
