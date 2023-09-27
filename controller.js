const Post = require('./models/PostModel')
const Comment = require('./models/CommentModel')


exports.getAllPosts = async (req, res, next) => {
    const posts = await Post.find().exec()
    console.log('responding all posts');
    console.log({ posts });

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
    console.log(allIds);
    res.send(allIds)
}

exports.getASinglePostById = async (req, res, next) => {
    const aPost = await Post.findById(req.params.postId)
    res.json(aPost)
}

exports.getCommentsOfAPost = async (req, res, next) => {
    const allCommentsOfAPost = await Post.findById(req.params.postId).populate('comments').select('comments').exec();
    console.log(allCommentsOfAPost);
    res.json(allCommentsOfAPost);
}