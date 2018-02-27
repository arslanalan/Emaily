//On front-end we'll use syntax like --> import express from 'express';
// But on back-end not, because Node doesn't have support to this syntax
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
//Order of requires are important, move models to up
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
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
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file
    app.use(express.static('client/build'));

    // Express will serve up the index.html file
    // if it doesn't recognize the route.
    // Order of routes is important
    // If the route could not be found in 'authRoutes', 'billingRoutes' and
    // 'client/build'
    // then look this route
    // this route says, send back index.html which is under
    // 'client\build' folder structure to any request
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//Defined PORT for Heroku adaptation.
//This configuration could be change based on service provider like AWS, or digitalocean.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
