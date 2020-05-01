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

router.get('/', haeTekstit)

module.exports = router