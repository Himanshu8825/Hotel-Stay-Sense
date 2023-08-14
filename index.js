const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const moongoose = require('mongoose');
const methodOverride = require('method-override')
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const localStratergy = require('passport-local');
const moment = require('moment');
const flash = require('connect-flash');


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('db connected')
    })
    .catch((error) => {
        console.log(error)
    })



app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 2
        // secure: true 
    }
}))

// const User = require('./models/user');
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new localStratergy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


const { passportInit } = require('./config/passport');
passportInit(app);

app.use(flash());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.locals.moment = moment;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
})


const hotelRoutes = require('./routes/hotels');
app.use(hotelRoutes);
const reviewRoutes = require('./routes/reviews');
app.use(reviewRoutes);
const authRoutes = require('./routes/auth');
app.use(authRoutes);
const oAuthRoutes = require('./routes/oAuth');
app.use(oAuthRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log('server started');
})