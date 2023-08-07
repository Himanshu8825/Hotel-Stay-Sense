const express = require('express');
const router = express.Router();

const Hotel = require('../models/hotel');

//CLOUDANARY
const multer = require('multer');
const storage = require('../cloudinary/index');
const upload = multer({ storage });

//MAPBOX
const geocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = geocoding({ accessToken: process.env.MAPBOX_TOKEN });

router.get('/', (req, res) => {
    res.render('landing', { page: 'Home - Hotels' });
})
router.get('/hotels', async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.render('hotels/index', { hotels, page: 'All Hotel - Hotels' });
    } catch (error) {
        res.send(error);
    }
})
router.get('/hotels/new', (req, res) => {
    res.render('hotels/new', { page: 'New Hotel - Hotels' })
})
router.post('/hotels', upload.array('image'), async (req, res) => {

    try {
        const newHotel = new Hotel(req.body.hotel)
        // req.files -> array -> index:path
        for (let img of req.files) {
            newHotel.image.push(img.path);
        }
        const query = req.body.hotel.address;
        const result = await geocodingClient
            .forwardGeocode({
                query,
                limit: 1
            })
            .send()
        // console.log(result.body.features[0].geometry);
        await newHotel.save();
        res.redirect(`/hotels/${newHotel._id}`);
    } catch (error) {
        res.send(error);
    }
})
router.get('/hotels/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id).populate('reviews');

        res.render('hotels/show', { hotel, page: 'Hotel' });
    } catch (error) {
        res.send(error)
    }
})
router.get('/hotels/:id/edit', async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.render('hotels/edit', { hotel, page: 'Edit - Hotel' });
    } catch (error) {
        res.send(error);
    }
})
router.patch('/hotels/:id', async (req, res) => {
    try {
        await Hotel.findByIdAndUpdate(req.params.id, req.body.hotel);
        res.redirect(`/hotels/${req.params.id}`);
    } catch (error) {
        res.send(error)
    }
})
router.delete('/hotels/:id', async (req, res) => {
    try {
        await Hotel.findByIdAndRemove(req.params.id)
        res.redirect('/hotels');
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;