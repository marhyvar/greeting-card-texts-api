const express = require('express');
const router = express.Router();
const { pool } = require('../config')
const { check, validationResult } = require('express-validator');

//hae tekstit
router.get('/', (request, response) => {
    pool.query('SELECT * FROM tekstit', (error, results) => {
        if (error) {
            response.status(500).send(error)
        } else if (results) {
            response.status(200).json(results.rows)
        } else {
            response.status(404).send('Not found')
        }
    })
})

//hae teksti id:llä
router.get('/:id', (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM tekstit WHERE id = $1', [id], (error, results) => {
        if (error) {
            response.status(500).send(error)
        } else if (results) {
            response.status(200).json(results.rows)
        } else {
            response.status(404).send('Not found')
        }
    })
})

//lisää teksti
router.post('/', [
    check('teksti')
    .not().isEmpty()
    .isLength({ min: 2, max: 500})
    .trim()
    .escape(),
    check('teema_id')
    .not().isEmpty()
    .isNumeric()
], (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() })
    }

    const teksti = request.body.teksti 
    const teema_id = parseInt(request.body.teema_id)
    pool.query('INSERT INTO tekstit (teksti, teema_id) VALUES ($1, $2) RETURNING id', [teksti, teema_id], (error, results) => {
        if (error) {
            return response.status(500).send(error)
        }
        response.status(201).send(result.rows[0])
    })
})

//muokkaa tekstiä
router.put('/:id', [
    check('teksti')
    .not().isEmpty()
    .isLength({ min: 2, max: 500})
    .trim()
    .escape(),
    check('teema_id')
    .not().isEmpty()
    .isNumeric()
], (request, response) => {
    const id = parseInt(request.params.id)
    const teksti = request.body.teksti 
    const teema_id = parseInt(request.body.teema_id)
    pool.query(
        'UPDATE tekstit SET teksti = $1, teema_id = $2 WHERE id = $3',
        [teksti, teema_id, id],
        (error, results) => {
            if (error) {
                return response.status(500).send(error)
            }
        response.status(200).send(`Teksti muokattu, ID: ${id}`)
        }
    )
})

//poista teksti
router.delete('/:id', (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM tekstit WHERE id = $1', [id], (error, results) => {
        if (error) {
            return response.status(500).send(error)
        }
        response.status(200).send(`Teksti poistettu, ID: ${id}`)
    })
})

module.exports = router