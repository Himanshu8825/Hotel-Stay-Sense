const mongoose = require('mongoose');


const hotelSchema = new mongoose.Schema({
    name: String,
    price: String,
    address: String,
    description: String,
    image: [String],
    createAt: {
        type: Date,
        default: Date.now()
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'review'
        }
    ],
    sumOfRatings: {
        type: Number,
        default: 0
    },
    averageRatings: {
        type: Number,
        default: 0
    },
    totalRatings: {
        type: Number,
        default: 0
    },
    Location: {
        type: {
            type:String,
            default:'point'
        },
        coordinates: [Number]
    }
})

module.exports = mongoose.model('hotel', hotelSchema);


