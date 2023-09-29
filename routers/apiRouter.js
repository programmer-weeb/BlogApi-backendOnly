const express = require('express')
const router = express.Router()
const controller = require('../controller')
const Post = require('../models/PostModel')
const Comment = require('../models/CommentModel')
const passport = require('passport')
const PostModel = require('../models/PostModel')

router.get('/', (req, res) => {
	res.redirect('/api/posts')
})
router.get('/posts', controller.getAllPosts)
router.get('/posts/all_ids', controller.getAllIdsOfPosts)
router.get('/posts/:postId', controller.getASinglePostById)
router.get('/posts/:postId/comments', controller.getCommentsOfAPost)

router.get('/posts/:postId/comments/:commentId', controller.getCommentById)
router.get('/logout', controller.handleLogOut)

router.post('/posts', controller.handle_posting_a_post)
router.post('/posts/:postId/comments')
router.post('/signup', controller.handleSignup)
router.post('/login', controller.handleLogin)

router.delete('/posts/:postId', controller.handle_deleting_a_post_by_id)
router.delete('/posts/:postId/comments')
router.delete('/posts/:postId/comments/:commentId')

// for updating
router.put('/posts/:postId')
router.put('/posts/:postId/comments/:commentId')

module.exports = router
