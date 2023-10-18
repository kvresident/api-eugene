const mongoose = require('mongoose')
const loginSchema = new mongoose.Schema({
    deviceName: {type: String, required: true},
    deviceType: {type: String, required: true},
    os:{type: String, require: true},
    deviceDescription: {type: String},
    loginDescription: {type: String},
    startTime: {type: Date, required: true},
    endTime: {type: Date, default: null},
    authType: {type: String},
    appType: {type: String}, 
    accountId: {type: String,  required: true}
});

const Login = mongoose.model('Login', loginSchema)

module.exports = Login