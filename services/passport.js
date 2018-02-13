const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// not use "require('./models/User');"
// It's called in server\index.js
// one argument means fetch, two argumens mean load data into 'users'
const User = mongoose.model('users');

//Aware passport the presence of new authentication strategy named 'GoogleStrategy'
// console.developers.google.com
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            //created model instance, and saved with saved() method
            new User({ googleId: profile.id }).save();
        }
    )
);
