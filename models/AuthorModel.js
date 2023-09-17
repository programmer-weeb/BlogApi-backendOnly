const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const AuthorSchema = new Schema({
    username: { required: true, type: String },
    password: { required: true, type: String },
});

AuthorSchema.pre('save', async function (this, next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

AuthorSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', AuthorSchema)