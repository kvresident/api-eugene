const express = require('express')
const Post = require('../models/post')
const auth = require('../middlewares/auth')
const Account = require('../models/account')
const SharePost = require('../models/sharePost')
const createPost = require('../controllers/createPost')
const deletePost = require('../controllers/deletePost')
const Comment = require('../models/postComment')
const router = express.Router()

// Create a new post
router.post('/', auth, createPost,(req, res)=>{
  res.json(req.caption);
} );

// Get a post by id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json();
    }
    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post by id
router.patch('/:id', auth, async (req, res) => {
    try {
        const {description, createdBy} = req.body;
        const id = req.params.id

        const post = await Post.findById(id);
        if(post.createdBy != createdBy){
            return res.status(403).json({error: 'You are not authorized to modify this post'});
        }
        post.description = description;
        await post.save()
        res.json(post)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

// Delete a post by id
router.delete('/', auth, deletePost, (req, res)=>{
  res.json(req.message)
});

// Add a view to a post
router.post('/view/:id', auth ,async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json();
      }
      post.views += 1;
      await post.save();
      res.json(post);
    } catch (err) {
      res.status(500).json(err);
    }
});

function removeElement(arr, element){
  let index = arr.indexOf(element);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

router.post('/like', async (req, res)=>{
  try {
    let liker = await Account.findById(req.body.accountId);
    let post = await Post.findById(req.body.post)

    console.log(liker, post)
    function like(){
      let userLikes = new Set([...liker.liked, post._id.toString()]);
      let postLikes = new Set([...post.likes, liker._id.toString()]); 
      console.log(postLikes)
      liker.liked = [...userLikes];
      post.likes = [...postLikes];
    }
    function unlike(){
      post.likes = removeElement(post.likes, liker._id.toString())
      liker.liked = removeElement(liker.liked, post._id.toString())
    }
    
    if(post.likes.includes(liker._id.toString()) || liker.liked.includes(post._id.toString())){
      unlike()
    }else{
      like()
    }

    console.log(liker.liked, post.likes);

    await post.save()
    await liker.save()

    res.json({likes:post.likes})

  } catch (error) {
    console.log(error)
    res.status(500).json({error})
  }
})

router.post('/share', auth, createPost,async (req, res)=>{
  try {
      const {postId, accountId} = req.body;

      const post = await Post.findById(postId);
      const account = await Account.findById(accountId);
      console.log(post)
      let raw = {
        sharedBy: accountId,
        shareOn: Date.now(),
        originalPost: post._id
      }

     if(req.caption){
      raw.caption = req.caption._id;
     }

     const share = new SharePost(raw);
     await share.save();
     res.json(share)

  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
})

router.delete('/share', auth, async (req, res, next)=>{
  try{
    const share = await SharePost.findByIdAndDelete(req.body.shareId);
    if(share.caption){
      req.body.id = share.caption;
      next();
    }
    res.json({success: 'Shared post deleted successfully'})
  }catch(error){
    console.log(error)
    res.status(500).json({error})
  }
}, deletePost)


router.post('/comment', auth, (req, res, next)=>{
  req.body.type = 'comment';
  next()
}, createPost, async (req, res)=>{
  try{
    const post = await Post.findById(req.body.postId);
    const comment = new Comment({
      createdBy: req.user._id,
      createdAt: Date.now(),
      content: req.caption._id,
      originalPost: post._id
    })
    await comment.save();
    res.json(comment);
  }catch(error){
    console.log(error)
    res.status(500).json(error)
  }
})

router.delete('/comment', auth, async (req, res, next)=>{
  try{
    const comment = await Comment.findOneAndDelete({createdBy: req.user._id, _id: req.body.id});
    req.body.id = comment.content;
    next();
  }catch(error){
    console.log(error)
    res.status(500).json(error)
  }
}, deletePost,(req, res)=>{
  res.json({messages: [
    {success:'Comment deleted successfully'},
    req.message
  ]})
} )
module.exports = router

