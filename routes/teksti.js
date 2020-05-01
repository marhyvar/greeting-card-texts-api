const express = require('express');
const router = express.Router();
const { pool } = require('../config')

const haeTekstit = (request, response) => {
    pool.query('SELECT * FROM tekstit', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const haeTekstiIdnAvulla = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM tekstit WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const lisaaTeksti = (request, response) => {
    const teksti = request.body.teksti 
    const teema_id = parseInt(request.body.teema_id)
    pool.query('INSERT INTO tekstit (teksti, teema_id) VALUES ($1, $2)', [teksti, teema_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('Teksti luotu')
    })
}

const paivitaTeksti = (request, response) => {
    const id = parseInt(request.params.id)
    const teksti = request.body.teksti 
    const teema_id = parseInt(request.body.teema_id)
    pool.query(
        'UPDATE tekstit SET teksti = $1, teema_id = $2 WHERE id = $3',
        [teksti, teema_id, id],
        (error, results) => {
            if (error) {
                throw error
            }
        response.status(200).send(`Teksti muokattu, ID: ${id}`)
        }
    )
}

const poistaTeksti = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM tekstit WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Teksti poistettu, ID: ${id}`)
    })
}

router.get('/', haeTekstit)
router.get('/:id', haeTekstiIdnAvulla)
router.post('/', lisaaTeksti)
router.put('/:id', paivitaTeksti)
router.delete('/:id', poistaTeksti)

module.exports = router