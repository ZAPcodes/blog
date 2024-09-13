import express from 'express';
import Post from '../models/post.models.js';
import User from '../models/user.models.js';

const router = express.Router();


router.get('/new', (req, res) => {
    res.render('new-post');
});

router.post('/posts', async (req, res) => {
    try {
        const { caption, image } = req.body;

        
        const newPost = new Post({ caption, image });
        await newPost.save();

        

        res.redirect('/');
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).send('Server Error');
    }
});


router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().exec();
        res.render('index', { posts });
    } catch (err) {
        console.error('Error retrieving posts:', err);
        res.status(500).send('Server Error');
    }
});


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


router.post('/update/:id', async (req, res) => {
    try {
        const { caption, image } = req.body;
        const postId = req.params.id;

        ByIdAndUpdate(postId, { caption, image });

        res.redirect('/');
    } catch (err) {
        console.error('Error updating post:', err);
        res.status(500).send('Server Error');
    }
});


router.post('/delete/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).send('Post not found');
        }

        await Post.findByIdAndDelete(postId);

        res.redirect('/');
    } catch (err) {
        console.error('Error deleting post:', err);
        res.status(500).send('Server Error');
    }
});

export default router;
