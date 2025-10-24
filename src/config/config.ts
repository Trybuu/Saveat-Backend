import dotenv from 'dotenv'

dotenv.config()

interface Config {
  port: number
  nodeEnv: string
  dbUser?: string
  dbPassword?: string
  dbConnectionString?: string
}

const config: Config = {
  port: Number(process.env.SERVER_PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbConnectionString: process.env.DB_CONNECTION_STRING,
}

export default config
