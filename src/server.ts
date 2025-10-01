import express from 'express'

const PORT = process.env.PORT || 3000

const app = express()

app.get('/leads', (request, response) => {
  response.json({ message: 'Hello!' })
})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
