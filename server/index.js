const express = require('express');
//On front-end we'll use syntax like --> import express from 'express';
// But on back-end not, because Node doesn't have support to this syntax
const app = express();

//Route handler
app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

app.listen(5000);
