const express = require('express');
const router = express.Router();
const { pool } = require('../config')

const haeTeemat = (request, response) => {
    pool.query('SELECT * FROM teemat', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const lisaaTeema = (request, response) => {
    const teema = request.body.teema 
    pool.query('INSERT INTO teemat (teema) VALUES ($1)', [teema], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('Teema luotu')
    })
}

const haeTekstitTeemalla = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM tekstit WHERE teema_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

router.get('/', haeTeemat)
router.post('/', lisaaTeema)
router.get('/:id/tekstit', haeTekstitTeemalla)

module.exports = router