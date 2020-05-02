
const tekstiRouter = require('./routes/teksti')
const teemaRouter = require('./routes/teema')
const express = require('express')
const cors = require('cors')
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

// Käynnistä palvelin
app.listen(process.env.PORT || 3002, () => {
    console.log(`Palvelin kuulolla...`)
})