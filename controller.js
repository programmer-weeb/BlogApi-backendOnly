const Post = require('./models/PostModel')
const Comment = require('./models/CommentModel')
const passport = require('passport')
const PostModel = require('./models/PostModel')

exports.getAllPosts = async (req, res, next) => {
	const posts = await Post.find().exec()
	console.log('responding all posts')
	console.log({ posts })

	// console.log('all unpublished');
	// const unPublishedPosts = posts.filter((post) => {
	//     return post.published === false
	// })
	// console.log(unPublishedPosts);

	res.json(posts)
}

exports.getAllIdsOfPosts = async (req, res, next) => {
	const allPosts = await Post.find().exec()
	const allIds = allPosts.map((post) => {
		return post.id
	})
	console.log(allIds)
	res.send(allIds)
}

exports.getASinglePostById = async (req, res, next) => {
	const aPost = await Post.findById(req.params.postId).populate('comments')
	res.json(aPost)
}

exports.getCommentsOfAPost = async (req, res, next) => {
	const allCommentsOfAPost = await Post.findById(req.params.postId)
		.populate('comments')
		.select('comments')
		.exec()
	console.log(allCommentsOfAPost)
	res.json(allCommentsOfAPost)
}

exports.getCommentById = async (req, res, next) => {
	const aComment = await Comment.findById(req.params.commentId)
	console.log(aComment)
	res.json(aComment)
}

exports.handleLogin = [
	passport.authenticate('login'),
	(req, res) => {
		console.log('succ login')
		res.send('succ login')
	},
]

exports.handleSignup = [
	passport.authenticate('signup'),
	(req, res, next) => {
		res.send('succ signup')
	},
]

exports.handleLogOut = (req, res, next) => {
	req.logOut((err) => {
		if (err) console.log(err)
		console.log('logging Author out')
		res.send('done logging out')
	})
}

exports.isLoggedInAuthor = (req, res, next) => {
	if (req.isAuthenticated()) {
		next()
	} else {
		res.sendStatus(401).json({ msg: 'you are not author' })
	}
}

exports.post_a_new_post = async (req, res) => {
	const { title, text, published } = req.body
	const aNewPost = await PostModel.create({ title, text, published })
	res.json({
		theNewPost: aNewPost,
	})
}

exports.handle_posting_a_post = [
	this.isLoggedInAuthor,
	this.post_a_new_post
]