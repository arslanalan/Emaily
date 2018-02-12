const express = require('express');
//On front-end we'll use syntax like --> import express from 'express';
// But on back-end not, because Node doesn't have support to this syntax
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

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
            console.log('access token', accessToken);
            console.log('profile', profile);
        }
    )
);

//Route handler
//Try to login
app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

//When user redirectec after login process
app.get('/auth/google/callback', passport.authenticate('google'));

//Defined PORT for Heroku adaptation.
//This configuration could be change based on service provider like AWS, or digitalocean.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
