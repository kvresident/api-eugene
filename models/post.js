const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  description: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  images: [{ type: String }],
  views: { type: Number, default: 0 },
  likes: [{ type: String }],
  type: { type: String, default: 'normal', enum: ['normal', 'share', 'comment'] },
  comments: [{
    content: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    ogPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    type: { type: String, default: 'comment' }
  }],
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
