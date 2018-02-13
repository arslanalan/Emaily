const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// not use "require('./models/User');"
// It's called in server\index.js
// one argument means fetch, two argumens mean load data into 'users'
const User = mongoose.model('users');

//Take model, and put some information to cookie
passport.serializeUser((user, done) => {
    //user.id is not profile.id, it's the id which automaticaly generated by MongoDB
    //We're not just use Google strategy for auth, there could be another strategies
    //so instead of googleID, we'll use DB ID here (Cookies)
    done(null, user.id);
});

//Pull it back out and turn it back into a user at some point in the future
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

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
            User.findOne({ googleId: profile.id }).then(existingUser => {
                if (existingUser) {
                    // We already have a user record with the given profile ID
                    done(null, existingUser);
                    // "null" means no error, everything is OK. Because there is no error, just the user exist.
                } else {
                    // We don't have a user record with this ID, make a new record
                    //created model instance, and saved with saved() method
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user));
                }
            });
        }
    )
);
