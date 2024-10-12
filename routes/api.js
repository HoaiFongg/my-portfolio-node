// routes/api.js
const express = require('express');
const router = express.Router();

// Định tuyến API (Ví dụ)
router.get('/example', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});

module.exports = router; // Xuất router
