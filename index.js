
const tekstiRouter = require('./routes/teksti')
const teemaRouter = require('./routes/teema');
const express = require('express')
const cors = require('cors')
//const baseURL = '/api/v1'
const app = express()
//const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/api/v1/teemat', teemaRouter)
app.use('/api/v1/tekstit', tekstiRouter)
//app.use(baseURL, router)

// Käynnistä palvelin
app.listen(process.env.PORT || 3002, () => {
    console.log(`Palvelin kuulolla...`)
})