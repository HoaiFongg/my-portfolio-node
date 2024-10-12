// routes/index.js
const express = require('express');
const router = express.Router();

// Định tuyến cho trang chủ
router.get('/home', (req, res) => {
    res.render('pages/index.ejs'); // Render tệp EJS cho trang chủ
});

router.get('/', (req, res) => {
    res.render('pages/index.ejs'); // Render tệp EJS cho trang chủ
});

// Định tuyến cho trang About
router.get('/about', (req, res) => {
    res.render('pages/about.ejs'); // Render tệp EJS cho trang giới thiệu
});

// Định tuyến cho trang Projects
router.get('/projects', (req, res) => {
    res.render('pages/projects.ejs'); // Render tệp EJS cho trang dự án
});

// Định tuyến cho trang Contact
router.get('/contact', (req, res) => {
    res.render('pages/contact.ejs'); // Render tệp EJS cho trang liên hệ
});

module.exports = router;
