const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
//On front-end we'll use syntax like --> import express from 'express';
// But on back-end not, because Node doesn't have support to this syntax
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

//"require" returns a function,
//and we call that function with paramater "app"
require('./routes/authRoutes')(app);

//Defined PORT for Heroku adaptation.
//This configuration could be change based on service provider like AWS, or digitalocean.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
