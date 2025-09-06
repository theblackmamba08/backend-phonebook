const express = require('express')
// const morgan = require('morgan')
const path = require('path')
const mongoose = require('mongoose')
const personsRouter = require('./controllers/persons')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const Person = require('./models/person')

const app = express()

logger.info('Connecting to', config.MONGODB_URI)

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch((error) => {
        logger.error('Error connecting to MongoDB:', error.message)
    })

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

// morgan.token('body', (req) =>
//     req.method === 'POST' ? JSON.stringify(req.body) : ''
// )
// app.use(
//     morgan(
//         ':method :url :status :res[content-length] - :response-time ms :body'
//     )
// )

app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.get('/info', (request, response) => {
    const date = new Date()
    Person.countDocuments({})
        .then((count) => {
            response.send(
                `<p>Phonebook has info for ${count} people</p><p>${date}</p>`
            )
        })
        .catch((error) => {
            console.log(`${error.response.data.error}`)
            response.status(500).send({ error: 'Database error' })
        })
})

app.use('/api/persons', personsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})
