const express = require('express');
const router = express.Router();

router.get('/status', (req, res) => {
    return res.status(200).json({
        versao: '2.0.0',
        status: 'online'
    });
});

router.get('/versao', (req, res) => {
    return res.status(200).json({
        versao: '2.0.0',
        status: 'online'
    });
});

module.exports = router;
