const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
	title: { type: String, maxLength: 22 },
	date: { type: Date, default: Date.now() },
	text: { type: String, required: true },
	published: { type: Boolean, default: false },
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
})

postSchema.virtual('dateFormated').get(function () {
	return this.date.toLocaleDateString('en-gb', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	})
})

module.exports = mongoose.model('Post', postSchema)
