
const tekstiRouter = require('./routes/teksti')
const teemaRouter = require('./routes/teema')
const express = require('express')
const cors = require('cors')
const { pool } = require('./config')
const rateLimit = require("express-rate-limit")
const baseURL = '/api/v1'
const app = express()
const router = express.Router()
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minuuttia
    max: 40 // 40 pyyntöä per IP per 5 minuuttia
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(limiter)
router.use('/teemat', teemaRouter)
router.use('/tekstit', tekstiRouter)
app.use(baseURL, router)
app.get('/', (req, res) => {
    res.json({ info: 'Express and PostgreSQL API'})
})

app.get('/tekstit', (request, response) => {
    pool.query('SELECT * FROM tekstit', (error, results) => {
        if (error) {
            response.status(500).send('error')
        }
        if (results.rows.length > 0) {
            response.status(200).json(results.rows)
        } else {
            response.status(404).send('Not found')
        }
    })
})

// Käynnistä palvelin
app.listen(process.env.PORT || 3002, () => {
    console.log(`Palvelin kuulolla...`)
})