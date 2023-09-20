const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    res.redirect('/api/posts')
})
router.get('/posts',)
router.get('/posts/:postId',)
router.get('/posts/:postId/comments',)
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