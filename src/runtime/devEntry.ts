import { startServer } from './index'
startServer({ port: Number(process.env.PORT) || 3000 })