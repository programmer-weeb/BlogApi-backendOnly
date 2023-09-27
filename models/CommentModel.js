const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    date: { type: Date, default: Date.now() },
    post: { type: mongoose.Schema.Types.ObjectId }
})

commentSchema.virtual('url').get(function (postId) {
    return `api/posts/${postId}/comments/${this._id}`
})

commentSchema.virtual('dateFormated').get(function () {
    return this.date.toLocaleDateString("en-gb", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minutes: "2-digit",
    })
})

module.exports = mongoose.model('Comment', commentSchema)
