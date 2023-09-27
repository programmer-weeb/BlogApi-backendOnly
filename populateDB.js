const mongoose = require('mongoose');
const Comment = require('./models/CommentModel');
const Post = require('./models/PostModel');

mongoose.connect('mongodb://127.0.0.1:27017/blog_post_db').then(res => {
    console.log('connected to db to populate');
})

// Create sample comments
const commentsData = [
    {
        content: 'This is the first comment for Post 1',
        post: null,//set this to the corresponding Post ID later
    },
    {
        content: 'Another comment for Post 1',
        post: null,
    },
    {
        content: 'Comment for Post 2',
        post: null,
    },
];

// Create sample posts
const postsData = [
    {
        title: 'First Post',
        text: 'This is the content of the first post.',
        published: true,
    },
    {
        title: 'Second Post',
        text: 'Content for the second post.',
        published: false,
    },
];

// Helper function to save comments and update post references
async function seedData() {
    try {
        // Create comments and store their IDs
        const commentIds = await Promise.all(commentsData.map(async (comment) => {
            const newComment = new Comment(comment);
            await newComment.save();
            return newComment._id;
        }));

        // Update post references in comments
        commentsData.forEach((comment, index) => {
            comment.post = commentIds[index];
        });

        // Create posts with comments
        await Promise.all(postsData.map(async (post, index) => {
            post.comments = [commentIds[index]];
            const newPost = new Post(post);
            await newPost.save();
        }));

        console.log('Data seeded successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.disconnect();
    }
}

seedData();
