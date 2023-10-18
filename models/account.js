const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userName: {type: String, unique: true, required: true},
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  accessKey: { type: String, required: true},
  gender:{type:String},
  password: { type: String, required: true },
  joinedDate:{type: Date},
  residence: { type: String},
  profilePicture: {type: String},
  coverPicture: {type: String},
  about: {type: String},
  followers: [{type:String}],
  followed: [{type:String}],
  loginInfo: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Login', required: true }],
  liked: [{type: String, unique: true}]
}, { timestamps: true });

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;