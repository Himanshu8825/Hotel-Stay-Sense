const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const moongoose = require('mongoose');
const methodOverride = require('method-override')
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('db connected')
    })
    .catch((error) => {
        console.log(error)
    })


app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));


const hotelRoutes = require('./routes/hotels');
app.use(hotelRoutes);
const reviewRoutes = require('./routes/reviews');
app.use(reviewRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log('server started');
})