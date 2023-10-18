const path = require('path');

let public =path.join(__dirname,'public') ;
let postsImages = path.join(public,'posts-images');
let profilePicture = path.join(public, 'profile-pictures')
let coverPictureUrl = path.join(public, 'cover-pictures')
let houseImageUrl = path.join(public, 'house')
module.exports = {
    profilePicture, public, postsImages, coverPictureUrl, houseImageUrl
}