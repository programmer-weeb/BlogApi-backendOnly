const express = require('express');
const router = express.Router()
const controller = require('../controller');
const Post = require('../models/PostModel');
const Comment = require('../models/CommentModel');

router.get('/', (req, res) => {
    res.redirect('/api/posts')
})
router.get('/posts', controller.getAllPosts)
router.get('/posts/all_ids', controller.getAllIdsOfPosts)
router.get('/posts/:postId', controller.getASinglePostById)
router.get('/posts/:postId/comments', controller.getCommentsOfAPost);

router.get('/posts/:postId/comments/:commentId',)
router.get('/logout',)

router.post('/posts',)
router.post('/posts/:postId/comments',)
router.post('/signup',)
router.post('/login',)

router.delete('/posts/:postId',)
router.delete('/posts/:postId/comments',)
router.delete('/posts/:postId/comments/:commentId',)

// for updating
router.put('/posts/:postId',)
router.put('/posts/:postId/comments/:commentId',)

module.exports = router