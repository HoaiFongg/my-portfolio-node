const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const helmet = require('helmet');
const compression = require('compression');
const fs = require('fs');
const app = express();
// Try alternative ports if default is in use
const PORT = process.env.PORT || 3000;
const ALTERNATIVE_PORTS = [3001, 3002, 3003, 4000, 8080];

// Create required directories
const uploadDir = path.join(__dirname, 'public/uploads/blog');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Security middleware - simplified for development
app.use(helmet({
    contentSecurityPolicy: false // Disable CSP for development
}));

// Performance middleware
app.use(compression());

// Request parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files middleware - must come before layout setup
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// Routes
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const blogRouter = require('./routes/blog');

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/blog', blogRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('pages/error', {
        title: 'Error',
        message: 'Something went wrong!',
        activeTab: ''
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('pages/error', {
        title: '404 Not Found',
        message: 'The page you are looking for does not exist.',
        activeTab: ''
    });
});

// Function to try starting server on different ports
function startServer(port, alternatives = []) {
    const server = app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE' && alternatives.length > 0) {
            const nextPort = alternatives[0];
            console.log(`Port ${port} is in use, trying ${nextPort}...`);
            startServer(nextPort, alternatives.slice(1));
        } else {
            console.error('Failed to start server:', err.message);
        }
    });
}

// Start server with fallback ports
startServer(PORT, ALTERNATIVE_PORTS);
