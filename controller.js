const Post = require('./models/PostModel')


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