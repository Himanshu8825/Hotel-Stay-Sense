const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    tittle: String,
    body: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    stars: {
        type: Number,
        max: 5,
        min: 1
    }
});
module.exports = mongoose.model('review', reviewSchema);