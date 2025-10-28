import express from 'express'
import config from './config/config'
import userRouter from './routes/userRoutes'
import productRouter from './routes/productRoutes'
import pantryRouter from './routes/pantryRoutes'
import foodSupplyRouter from './routes/foodSupplyRoutes'
import shoppingListRouter from './routes/shoppingListRoutes'
import statRouter from './routes/statRoutes'
import recipeRouter from './routes/recipeRoutes'
import articleRouter from './routes/articleRoutes'
import adRouter from './routes/adRoutes'
import mongoose from 'mongoose'
import globalErrorHandler from './controllers/errorController'

const app = express()

app.use(express.json())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/pantries', pantryRouter)
app.use('/api/v1/foodSupplies', foodSupplyRouter)
app.use('/api/v1/shoppingLists', shoppingListRouter)
app.use('/api/v1/recipes', recipeRouter)
app.use('/api/v1/articles', articleRouter)
app.use('/api/v1/ads', adRouter)
app.use('/api/v1/stats', statRouter)

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
