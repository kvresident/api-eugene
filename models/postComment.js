const mongoose = require('mongoose')

const postCommentSchema = new mongoose.Schema({
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true},
    createdAt: {type: Date, default: Date.now, required: true},
    originalPost: {type: mongoose.Schema.Types.ObjectId, ref:'Post', required: true},
    content: {type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true}
})

const PostComment = mongoose.model('PostComment', postCommentSchema);

module.exports = PostComment