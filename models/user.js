const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    phone: String,
    age: Number,
    address: String,
    googleId: String,
    googleToken: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userSchema);