//On front-end we'll use syntax like --> import express from 'express';
// But on back-end not, because Node doesn't have support to this syntax
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
//Order of models are important, move them to up
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

//Tell express to use cookie for user state
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
//Tell passport that it should make use of cookies to  handle authentication
app.use(passport.initialize());
app.use(passport.session());

//"require" returns a function,
//and we call that function with paramater "app"
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

//Defined PORT for Heroku adaptation.
//This configuration could be change based on service provider like AWS, or digitalocean.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
