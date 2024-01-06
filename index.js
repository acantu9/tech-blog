const router = require('express').Router();
const session = require('express-session');
const server = require('./server');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const Post = require('../models/Post');
const BlogPost = require('../models/BlogPost');
const validator = require('./validator');

// Routes
// Rendering Main Page
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll();

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Rendering a Single Post
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        // Serialize data so the template can read it
        const post = postData.get({ plain: true });

        // Pass serialized data and session flag into template
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Rendering the New Post Form
router.get('/new', (req, res) => {
    // Pass any necessary data into new post handlebars template.
    const defaultPostData = {
       title: "",
       content: "",
       // ... other default data values ...
    };
   
    res.render('new-post', {
       defaultPostData,
       loggedIn: req.session.loggedIn
    });
});

// Creating New Blog Post
router.post('/new', async (req, res) => {
    // Create a new blog post in the database with the provided data from the new post form
   
    try {
       const { title, content, author } = req.body;
   
       // Call the validation and sanitization functions
       const { sanitizedTitle, sanitizedContent, sanitizedAuthor } = validator.validateAndSanitize(title, content, author);
   
       const newBlogPost = new BlogPost({
         title: sanitizedTitle,
         content: sanitizedContent,
         author: sanitizedAuthor,
         createdAt: new Date()
       });
   
       await newBlogPost.save();
       res.redirect('/');
    } catch (err) {
       res.status(500).json(err);
    }
});

// Updating a Blog Post
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author } = req.body;

        // Call the validation and sanitization functions
        const { sanitizedTitle, sanitizedContent, sanitizedAuthor } = validator.validateAndSanitize(title, content, author);

        // Update the specified blog post in the database with the provided data from the edit post form
        const updatedBlogPost = await BlogPost.findByIdAndUpdate(id, {
            title: sanitizedTitle,
            content: sanitizedContent,
            author: sanitizedAuthor,
            updatedAt: new Date()
        }, { new: true });

        res.status(200).json(updatedBlogPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Deleting a Blog Post
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the specified blog post from the database
        await BlogPost.findByIdAndDelete(id);

        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;