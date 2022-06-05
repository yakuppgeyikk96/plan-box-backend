const express = require('express')
const cors = require('cors')
require('./app/db/mongoose')

const app = express()

app.use(express.json())
app.use(cors())

/**
 * Routers
 */
const taskRouter = require('./app/routers/task.router')
app.use(taskRouter)

const port = process.env.PORT || 3000

app.listen(port, () => console.log('Listening on port: ' + port))
