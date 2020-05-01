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

router.get('/', haeTeemat)

module.exports = router