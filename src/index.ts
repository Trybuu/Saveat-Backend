const dotenv = require('dotenv')
const express = require('express')

dotenv.config({ path: `${__dirname}/config.env` })

const app = express()
const port = process.env.PORT || 8000

app.listen(() => {
  console.log(`Server running on port ${port}`)
})
