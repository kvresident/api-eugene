const Post = require('../models/post')
const postImagesUrl = require('../urls').postsImages
const path = require('path')

async function createPost (req, res, next){
    if(req.body.pass){
      req.caption  = null;
      next();
      return
    }
    try {

        const {accountId, description, type } = req.body;
        if (!description) {
          return res.status(400).json({ error: 'Description required.' });
        }
        if(!accountId){
           return res.status(400).json({error:'Account id required'})
        }
        let post = new Post({
            description,
            images: [],
            createdBy: accountId,
            type: type?'normal': type
        });
        post = await post.save();
        if (req.files) {
          if (Array.isArray(req.files.images)) {
            if (req.files.images.length > 4) {
              return res.status(400).json({ error: 'You can only upload up to 4 images.' });
            }
            let promises = [];
            for (let file of req.files.images) {
            const filename = `${new Date().valueOf()}-${file.name}`;
            const promise = new Promise((resolve, reject) => {
                file.mv(path.join(postImagesUrl, filename), err => {
                if (err) {
                    reject(err);
                } else {
                    resolve(filename);
                }
                });
            });
            promises.push(promise);
            }
            await Promise.all(promises)
            .then(async arr => {
                post.images = arr;
                await post.save()
            })
            .catch(err => {
                console.error(err);
            });
          } else {
            const filename = `${new Date().valueOf()}-${req.files.images.name}`;
            req.files.images.mv(path.join(postImagesUrl, filename),async err => {
              if (err) {
                console.error(err);
              } else {
                post.images.push(filename);
                post = await post.save()
              }
    
            });
          }
        }
        req.caption = post;
        next()
      } catch (err) {
        console.log(err)
        res.status(400).json(err);
      }
}

module.exports = createPost