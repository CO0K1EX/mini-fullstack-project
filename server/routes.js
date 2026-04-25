const express = require('express');
const router = express.Router();
const db = require('./db');
const { searchDocs } = require('./ai');

router.get('/logs', (req, res) => {
    db.all("SELECT * FROM logs", [], (err, rows) => res.json(rows));
});

router.post('/logs', (req, res) => {
    db.run("INSERT INTO logs(message) VALUES(?)", [req.body.message]);
    res.json({ok: true});
});

router.get('/search', (req, res) => {
    res.json(searchDocs(req.query.q));
});

module.exports = router;