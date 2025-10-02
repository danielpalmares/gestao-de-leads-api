import express from 'express'
import cors from 'cors'
import { router } from './routes/index.ts'
import { corsOptions } from './config/cors.ts'

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use(router)

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
