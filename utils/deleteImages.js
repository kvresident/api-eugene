const path = require('path');
const fs = require('fs')
const {
    postsImages, 
    coverPictureUrl, 
    profilePicture
} = require('../urls');

function deleteImage(image, postImagesUrl){
    fs.unlinkSync(path.join(postImagesUrl, image))
}

module.exports = {
    deletePostImages: (image)=> deleteImage(image, postsImages),
    deleteCoverPicture: (image)=> deleteImage(image, coverPictureUrl),
    deleteProfilePicture: (image)=> deleteImage(image, profilePicture)
}