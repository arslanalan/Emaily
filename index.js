const express = require('express');
//On front-end we'll use syntax like --> import express from 'express';
// But on back-end not, because Node doesn't have support to this syntax
const app = express();

//Route handler
app.get('/', (req, res) => {
    res.send({ bye: 'buddy' });
});

//Defined PORT for Heroku adaptation.
//This configuration could be change based on service provider like AWS, or digitalocean.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
