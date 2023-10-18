const Post = require("../models/post")
const deletePostImages = require('../utils/deleteImages').deletePostImages
async function deletePost(req, res, next){
    try {
        const post = await Post.findOneAndDelete({ _id: req.body.id, createdBy: req.user._id });
        if (!post) {
          return res.status(404).json();
        }
        // Delete post images from S3
        post.images.forEach(image => deletePostImages(image));
        req.message = {success: 'post deleted successfully'};
        next();
      } catch (err) {
        console.log(err)
        res.status(500).json(err);
      }
}

module.exports = deletePost