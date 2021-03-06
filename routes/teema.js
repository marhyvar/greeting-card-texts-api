const express = require('express');
const router = express.Router();
const { pool } = require('../config')
const { check, validationResult } = require('express-validator');

//hae teemat
router.get('/', (request, response) => {
    pool.query('SELECT * FROM teemat', (error, results) => {
        if (error) {
            response.status(500).send(error)
        } else if (results) {
            response.status(200).json(results.rows)
        } else {
            response.status(404).send('Not found')
        }
    })
})

//lisää teema
router.post('/', [
    check('teema')
    .not().isEmpty()
    .isLength({ min: 2, max: 100})
    .trim()
    .escape()
], (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() })
    }
    const teema = request.body.teema 
    pool.query('INSERT INTO teemat (teema) VALUES ($1) RETURNING teema_id', [teema], (error, results) => {
        if (error) {
            return response.status(500).send(error)
        }
        response.status(201).send(results.rows[0])
    })
})

// hae samaan teemaan kuuluvat tekstit
router.get('/:id/tekstit', (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM tekstit WHERE teema_id = $1', [id], (error, results) => {
        if (error) {
            return response.status(500).send(error)
        }
        if (results) {
            response.status(200).json(results.rows)
        } else {
            response.status(404).send('Not found')
        }
    })
})

module.exports = router