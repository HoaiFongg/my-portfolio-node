const mongoose = require('mongoose');

// Blog post schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String, // URL to the uploaded image
        default: '/images/blog-default.jpg'
    },
    author: {
        type: String,
        default: 'Phạm Nguyễn Hoài Phong'
    },
    tags: [{
        type: String,
        trim: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
blogSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog; 