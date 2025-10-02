import express from 'express'
import { router } from './routes/index.ts'
import cors from 'cors'

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(router)

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
