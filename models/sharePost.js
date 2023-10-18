const mongoose = require('mongoose')

const sharePostSchema = new mongoose.Schema({
    sharedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
    shareOn: {type: Date, default: Date.now},
    originalPost: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    caption: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
  }, { timestamps: true });
  
  const SharePost = mongoose.model('SharePost', sharePostSchema);
  
  module.exports = SharePost;
  