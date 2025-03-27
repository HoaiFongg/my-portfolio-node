const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../public/uploads/blog');
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueFilename = `${uuidv4()}-${file.originalname}`;
        cb(null, uniqueFilename);
    }
});

const fileFilter = (req, file, cb) => {
    // Accept only images
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB file size limit
    },
    fileFilter: fileFilter
});

// In-memory blog posts storage (replace with a database in production)
let blogPosts = [
    {
        id: '1',
        title: 'Getting Started with Node.js',
        content: `<h2>Introduction to Node.js</h2>
        <p>Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on your server, making it possible to build scalable network applications.</p>
        <p>One of the biggest advantages of Node.js is its event-driven, non-blocking I/O model, which makes it lightweight and efficient - perfect for data-intensive applications that run across distributed devices.</p>
        <h3>Why should you learn Node.js?</h3>
        <ul>
            <li>It uses JavaScript, so you can use the same language for both frontend and backend</li>
            <li>It has a vast ecosystem of packages through npm</li>
            <li>It's perfect for building real-time applications</li>
            <li>It's supported by a large community</li>
        </ul>
        <p>If you're just getting started, the first step is to install Node.js on your machine and explore some simple examples.</p>`,
        image: '/uploads/blog/default-blog-1.jpg',
        author: 'John Doe',
        createdAt: new Date('2023-06-15'),
        tags: ['JavaScript', 'Node.js', 'Backend']
    },
    {
        id: '2',
        title: 'The Power of CSS Grid Layout',
        content: `<h2>Understanding CSS Grid</h2>
        <p>CSS Grid Layout is a two-dimensional layout system designed for the web. It lets you layout items in rows and columns, and has many features that make building complex layouts straightforward.</p>
        <p>Unlike Flexbox which is primarily one-dimensional, Grid Layout is designed for two-dimensional layouts - meaning it can handle both columns and rows.</p>
        <h3>Basic Grid Concepts</h3>
        <p>To create a grid container, you set the display property to grid:</p>
        <pre><code>.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
}</code></pre>
        <p>This creates a three-column grid with equal width columns and 20px gaps between items.</p>
        <h3>Why Use CSS Grid?</h3>
        <ul>
            <li>It simplifies complex layouts</li>
            <li>It's great for responsive design</li>
            <li>It provides better control over alignment</li>
            <li>It reduces the need for media queries in many cases</li>
        </ul>
        <p>CSS Grid works well with Flexbox - use Grid for the overall layout, and Flexbox for alignment within grid items.</p>`,
        image: '/uploads/blog/default-blog-2.jpg',
        author: 'Jane Smith',
        createdAt: new Date('2023-07-20'),
        tags: ['CSS', 'Web Design', 'Frontend']
    }
];

// Helper function to get blog post by ID
const getBlogPostById = (id) => {
    return blogPosts.find(post => post.id === id);
};

// Helper function to get related posts based on tags
const getRelatedPosts = (currentPost, limit = 3) => {
    // If no tags, return random posts
    if (!currentPost.tags || currentPost.tags.length === 0) {
        return blogPosts
            .filter(post => post.id !== currentPost.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, limit);
    }

    // Get posts that share tags with the current post
    return blogPosts
        .filter(post => post.id !== currentPost.id)
        .map(post => {
            // Calculate tag overlap score
            const sharedTags = post.tags ? post.tags.filter(tag =>
                currentPost.tags.includes(tag)
            ).length : 0;

            return {
                ...post,
                score: sharedTags
            };
        })
        .sort((a, b) => b.score - a.score) // Sort by score (highest first)
        .slice(0, limit); // Take only the top N
};

// Blog index page
router.get('/', (req, res) => {
    res.render('pages/blog/index', {
        title: 'Blog',
        posts: blogPosts,
        activeTab: 'blog'
    });
});

// New blog post form
router.get('/new', (req, res) => {
    res.render('pages/blog/new', {
        title: 'Create New Blog Post',
        activeTab: 'blog'
    });
});

// Create new blog post
router.post('/new', upload.single('image'), (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];

        // Create new blog post
        const newPost = {
            id: uuidv4(),
            title,
            content,
            author: 'Admin', // Replace with actual user in production
            createdAt: new Date(),
            tags: tagsArray,
            image: req.file ? `/uploads/blog/${req.file.filename}` : '/uploads/blog/default-blog.jpg'
        };

        // Add to our "database"
        blogPosts.unshift(newPost);

        // Redirect to the blog post
        res.redirect(`/blog/${newPost.id}`);
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).render('pages/error', {
            title: 'Error',
            message: 'Failed to create blog post',
            activeTab: 'blog'
        });
    }
});

// Show single blog post
router.get('/:id', (req, res) => {
    const post = getBlogPostById(req.params.id);

    if (!post) {
        return res.status(404).render('pages/error', {
            title: 'Not Found',
            message: 'Blog post not found',
            activeTab: 'blog'
        });
    }

    // Get related posts
    const relatedPosts = getRelatedPosts(post);

    res.render('pages/blog/show', {
        title: post.title,
        post,
        relatedPosts,
        activeTab: 'blog'
    });
});

module.exports = router; 