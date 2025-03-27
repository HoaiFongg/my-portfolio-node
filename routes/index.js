// routes/index.js
const express = require('express');
const router = express.Router();

// Định tuyến cho trang chủ
router.get('/home', (req, res) => {
    res.render('pages/index', {
        title: 'Home',
        activeTab: 'home'
    });
});

router.get('/', (req, res) => {
    res.render('pages/index', {
        title: 'Home',
        activeTab: 'home'
    });
});

// Định tuyến cho trang About
router.get('/about', (req, res) => {
    res.render('pages/about', {
        title: 'About Me',
        activeTab: 'about'
    });
});

// Định tuyến cho trang Projects
router.get('/projects', (req, res) => {
    res.render('pages/projects', {
        title: 'Projects',
        activeTab: 'projects'
    });
});

// Định tuyến cho trang Contact
router.get('/contact', (req, res) => {
    res.render('pages/contact', {
        title: 'Contact',
        activeTab: 'contact'
    });
});

// CV page
router.get('/cv', (req, res) => {
    res.render('pages/show', {
        title: 'My CV',
        activeTab: 'about'
    });
});

module.exports = router;
