import express from 'express';
import Post from '../models/post.models.js';
import User from '../models/user.models.js';

const router = express.Router();

// Create a new post - GET route
router.get('/new', (req, res) => {
    res.render('new-post');
});

// Create a new post - POST route
router.post('/posts', async (req, res) => {
    try {
        const { caption, image } = req.body;

        // Create a new post
        const newPost = new Post({ caption, image });
        await newPost.save();

        // Optionally, you could add some default user reference here if needed
        // For example: await User.findByIdAndUpdate(defaultUserId, { $push: { posts: newPost._id } });

        res.redirect('/');
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).send('Server Error');
    }
});

// View all posts - GET route
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().exec();
        res.render('index', { posts });
    } catch (err) {
        console.error('Error retrieving posts:', err);
        res.status(500).send('Server Error');
    }
});

// Edit post - GET route
router.get('/edit/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.render('edit-post', { post, index: req.params.id });
    } catch (err) {
        console.error('Error retrieving post for editing:', err);
        res.status(500).send('Server Error');
    }
});

// Update post - POST route
router.post('/update/:id', async (req, res) => {
    try {
        const { caption, image } = req.body;
        const postId = req.params.id;

        // Update post
        await Post.findByIdAndUpdate(postId, { caption, image });

        res.redirect('/');
    } catch (err) {
        console.error('Error updating post:', err);
        res.status(500).send('Server Error');
    }
});

// Delete post - POST route
router.post('/delete/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).send('Post not found');
        }

        await Post.findByIdAndDelete(postId);

        // Optionally, you could remove the post reference from a default user if needed
        // For example: await User.findByIdAndUpdate(defaultUserId, { $pull: { posts: postId } });

        res.redirect('/');
    } catch (err) {
        console.error('Error deleting post:', err);
        res.status(500).send('Server Error');
    }
});

export default router;
